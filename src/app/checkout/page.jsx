"use client";

import { Button, Input, Table } from "@heroui/react";
import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const { data, isPending } = authClient.useSession();
  const userid = data?.user?.id;

  useEffect(() => {
    if (isPending || !userid) return;

    let ignore = false;

    const fetchCart = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/${userid}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch cart");
        }

        const result = await res.json();
        const cartData = Array.isArray(result) ? result : result.cart;

        if (!ignore) {
          setCart(Array.isArray(cartData) ? cartData : []);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);

        if (!ignore) {
          setCart([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchCart();

    return () => {
      ignore = true;
    };
  }, [userid, isPending]);

  const handleQuantityChange = async (item, action) => {
    try {
      setUpdatingId(item._id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/${userid}/${item._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update quantity");
      }

      const result = await res.json();

      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: result.quantity }
            : cartItem,
        ),
      );
    } catch (error) {
      console.error("Quantity update error:", error);
    } finally {
      setUpdatingId(null);
    }
  };
  const subtotal = cart.reduce(
    (total, item) => total + Number(item.productPrice) * Number(item.quantity),
    0,
  );

  if (isPending || (userid && loading)) {
    return <p className="py-10 text-center">Loading cart...</p>;
  }

  if (!userid) {
    return (
      <p className="py-10 text-center text-gray-500">
        Please log in to view your cart.
      </p>
    );
  }

  const discount = appliedCoupon
    ? (subtotal * appliedCoupon) / 100
    : 0;

  const total = subtotal - discount;

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      setAppliedCoupon(null);
      setCouponMessage("Please enter a coupon code");
      return;
    }

    try {
      setIsVerifying(true);
      setAppliedCoupon(null);
      setCouponMessage("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/coupons/verify/${coupon}`,
      );
      const data = await res.json();

      if (!res.ok) {
        setAppliedCoupon(null);
        setCouponMessage(data.message);
        return;
      }

      setAppliedCoupon(data.discountPercentage);
      setCouponMessage(data.message);
    } catch (error) {
      console.error("Coupon verification error:", error);
      setAppliedCoupon(null);
      setCouponMessage("Something went wrong");
    }
    finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="container mx-auto mt-6 sm:mt-10 mb-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8">
        {/* Cart Section */}
        <div className="w-full min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Your <span className="text-blue-800">Cart</span>
            </h1>

            <h2 className="text-lg sm:text-2xl text-gray-400">{cart.length}</h2>
          </div>

          <div className="border-b-2 border-gray-200 dark:border-gray-700 mt-5 mb-5" />

          {cart.length === 0 ? (
            <p className="text-gray-500 py-5">Your cart is empty.</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-150">
                <Table>
                  <Table.ScrollContainer>
                    <Table.Content
                      aria-label="Cart items"
                      className="min-w-150"
                    >
                      <Table.Header>
                        <Table.Column isRowHeader>Product</Table.Column>

                        <Table.Column>
                          <div className="text-right">Price</div>
                        </Table.Column>

                        <Table.Column>
                          <div className="text-center">Quantity</div>
                        </Table.Column>

                        <Table.Column>
                          <div className="text-right">Subtotal</div>
                        </Table.Column>
                      </Table.Header>

                      <Table.Body>
                        {cart.map((item) => (
                          <Table.Row key={item._id}>
                            <Table.Cell>{item.productName}</Table.Cell>

                            <Table.Cell>
                              <div className="text-right">
                                ৳{item.productPrice}
                              </div>
                            </Table.Cell>

                            <Table.Cell>
                              <div className="flex items-center justify-center gap-3">
                                <button
                                  type="button"
                                  disabled={
                                    Number(item.quantity) <= 1 ||
                                    updatingId === item._id
                                  }
                                  onClick={() =>
                                    handleQuantityChange(item, "decrease")
                                  }
                                  className="border rounded-md px-2 py-1 disabled:opacity-40"
                                >
                                  -
                                </button>

                                <span className="min-w-5 text-center">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  disabled={updatingId === item._id}
                                  onClick={() =>
                                    handleQuantityChange(item, "increase")
                                  }
                                  className="border rounded-md px-2 py-1 disabled:opacity-40"
                                >
                                  +
                                </button>
                              </div>
                            </Table.Cell>
                            <Table.Cell>
                              <div className="text-right">
                                ৳
                                {Number(item.productPrice) *
                                  Number(item.quantity)}
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Content>
                  </Table.ScrollContainer>
                </Table>

                <div className="border-t-2 mt-3 pt-4 px-3 space-y-3">
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toFixed(2)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>
                        Discount ({appliedCoupon}%)
                      </span>
                      <span>-৳{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-lg border-t pt-3">
                    <span>Total</span>
                    <span>৳{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-90 shrink-0">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
                Apply Coupon
              </h1>

              <div className="border-b-2 border-gray-200 dark:border-gray-700 mt-3 mb-5" />
            </div>

            <div>
              <p className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                Have any coupon or gift voucher?
              </p>

              <div className="w-full space-y-3">
                <Input
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setAppliedCoupon(null);
                    setCouponMessage("");
                  }}
                  fullWidth
                  placeholder="Enter Coupon"
                />

                <Button
                  onPress={handleApplyCoupon}
                  isDisabled={isVerifying}
                  className="bg-blue-700 hover:bg-blue-800 text-white w-full rounded-lg"
                >
                  {isVerifying ? "Verifying..." : "Apply"}
                </Button>

                {couponMessage && (
                  <p
                    className={`text-sm ${
                      appliedCoupon ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {couponMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* User information section */}
      
    </div>
  );
};

export default CartPage;
