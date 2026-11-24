"use client";
import { useEffect, useState } from "react";
import { Link, Button, Spinner } from "@heroui/react";
import logo from "../../public/images/Logo.png";
import Image from "next/image";
import { Magnifier, Person, ShoppingCart } from "@gravity-ui/icons";
import { ThemeSwitch } from "./ThemeSwitch";
import { authClient } from "@/app/lib/auth-client";
import CartItems from "./CartItems";

export default function Navbar() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data, isPending, error, refetch } = authClient.useSession();
  // console.log("Session data ", data?.user?.id);
  const userId = data?.user?.id;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCart = () => {
    setIsCartOpen(true);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`);

        if (!res.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await res.json();
        setCart(data);
        // console.log(cart);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isCartOpen]);

  if (loading) {
    return <p className="p-5">Loading cart...</p>;
  }
  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <Link href="/">
              <Image
                src={logo}
                alt="Navbar Logo"
                width={150}
                height={80}
                className="h-auto w-38"
              />
            </Link>
          </div>
          <ul className="hidden items-center gap-4 md:flex">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <ThemeSwitch />
            </li>
          </ul>

          <ul className="items-center gap-4 flex">
            <li>
              <Link href="#">
                <Magnifier />
              </Link>
            </li>
            <li>
              <Link href={data?.user ? "/dashboard" : "/signin"}>
                {isPending ? (
                  <div className="flex flex-col items-center gap-2">
                    <Spinner
                      size="sm"
                      color="current"
                      className="animate-[spin_1.5s_linear_infinite] motion-reduce:animate-none"
                    />
                  </div>
                ) : data?.user ? (
                  <p>Hi, {data?.user.name.slice(0, 3)}</p>
                ) : (
                  <Person />
                )}
              </Link>
            </li>
            <li>
              <button onClick={handleCart} className="cursor-pointer">
                <ShoppingCart />
              </button>
            </li>
          </ul>
        </header>
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-2 p-4">
              <li>
                <Link href="#" className="block py-2">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="block py-2">
                  Products
                </Link>
              </li>
            </ul>
          </div>
        )}
        {/* Overlay */}
        {isCartOpen && (
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/50"
          />
        )}

        {/* Cart Sidebar */}
      </nav>
      <aside
        className={`fixed right-0 top-0 z-50 h-dvh
  w-full sm:w-100 md:w-150
  bg-white dark:bg-gray-900 shadow-xl
  transition-transform duration-300 ease-in-out
  flex flex-col
  ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <h2 className="text-xl font-semibold">Your Cart</h2>

          <button
            onClick={() => setIsCartOpen(false)}
            className="text-xl cursor-pointer hover:text-red-500 transition"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart && isCartOpen ? (
            <CartItems
              cart={cart}
              userid={userId}
              
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              Your cart is empty!
            </p>
          )}
        </div>

        {/* Checkout Section */}
        <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-900">
          <Link href="/checkout" className="w-full">
            <Button className="w-full bg-blue-700 hover:bg-green-800 text-white rounded-lg py-6 text-base font-semibold">
              Checkout
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
