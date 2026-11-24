import { useState, useEffect } from "react";
import { Table } from "@heroui/react";
const CartItems = ({ userid }) => {
  const [cartItem, setCartItem] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/${userid}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch cart");
        }

        const cartItems = await res.json();
        setCartItem(cartItems);
      } catch (error) {
        console.error(error);
      }
    };

    if (userid) {
      fetchCart();
    }
  }, [userid]);

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
      const data = await res.json();

      setCartItem((prev) =>
        prev.map((cart) =>
          cart._id === item._id ? { ...cart, quantity: data.quantity } : cart,
        ),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  const subtotal = cartItem.reduce(
    (total, item) => total + Number(item.productPrice) * Number(item.quantity),
    0,
  );

  return (
    <div className="flex-1 overflow-y-auto pl-3 pr-3">
      {cartItem.length === 0 && <p>Your cart is empty</p>}

      {cartItem.length > 0 && (
        <div className="w-full overflow-x-auto mt-5">
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Shopping cart items"
                className="min-w-120"
              >
                <Table.Header>
                  <Table.Column isRowHeader>Product Name</Table.Column>
                  <Table.Column>Quantity</Table.Column>
                  <Table.Column>Price</Table.Column>
                </Table.Header>

                <Table.Body>
                  {cartItem.map((item) => (
                    <Table.Row key={item._id}>
                      <Table.Cell>{item.productName}</Table.Cell>

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
                          ৳{Number(item.productPrice) * Number(item.quantity)}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>

          {/* Subtotal */}
          <div className="flex justify-between items-center border-t-2 mt-3 pt-4 px-3 font-semibold">
            <span>Subtotal</span>
            <span>৳{subtotal}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
