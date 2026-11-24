import { TableFooter } from "@heroui/react";
import { useState, useEffect } from "react";

const CartItems = ({ cart, userid }) => {
  const { _id, userId, productId, quantity, updatedAt } = cart;
  //   console.log(userid);
  const [cartItem, setCartItem] = useState([]);
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
        console.log("Cart item ", cartItems);
        setCartItem(cartItems);
      } catch (error) {
        console.error(error);
      }
    };

    if (userid) {
      fetchCart();
    }
  }, [userid]);
  return (
    <div className="flex-1 overflow-y-auto pl-3 pr-3">
      {/* <p className="text-gray-600 dark:text-gray-300">
        {" "}
        Here are all cart items
      </p> */}

      { cartItem.length === 0 && <p>Your cart is empty</p>}

      {cartItem.length > 0 && (
        <div className="w-full overflow-x-auto mt-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="p-3">Product Name</th>
                <th className="p-3 text-center">Quantity</th>
                <th className="p-3 text-right">Price</th>
              </tr>
            </thead>

            <tbody>
              {cartItem.map((item) => (
                <tr
                  key={item._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="p-3 text-left">{item.productName}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">
                    ৳{Number(item.productPrice) * Number(item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 dark:border-gray-700 font-semibold">
                <td colSpan={2} className="p-3 text-left">
                  Subtotal
                </td>
                <td className="p-3 text-right">
                  ৳
                  {cartItem.reduce(
                    (total, item) =>
                      total + Number(item.productPrice) * Number(item.quantity),
                    0,
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default CartItems;
