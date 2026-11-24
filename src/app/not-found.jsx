"use client";

import {
  ArrowLeft,
  Box,
  House,
  Magnifier,
  ShoppingCart,
  TriangleExclamation,
} from "@gravity-ui/icons";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Quick links shown as small cards. Change the paths to match your routes.
const quickLinks = [
  {
    title: "Browse Products",
    text: "See everything we sell",
    href: "/products",
    icon: Box,
  },
  {
    title: "Your Cart",
    text: "Check items you added",
    href: "/checkout",
    icon: ShoppingCart,
  },
  {
    title: "Home",
    text: "Start from the beginning",
    href: "/",
    icon: House,
  },
];

const NotFound = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-10 text-center">
      {/* Animated icon */}
      <div className="mb-6 flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-blue-50 text-blue-700 dark:bg-gray-800">
        <TriangleExclamation width={48} height={48} />
      </div>

      {/* 404 number */}
      <h1 className="text-7xl font-bold text-blue-800 sm:text-8xl">404</h1>

      <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
        Page <span className="text-blue-800">Not Found</span>
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Sorry, we could not find the page you are looking for. It may have been
        moved, or the link might be wrong.
      </p>

      {/* Search box */}
      <form
        onSubmit={handleSearch}
        className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
      >
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          placeholder="Search for a product..."
        />

        <Button
          type="submit"
          className="rounded-lg bg-blue-700 text-white hover:bg-blue-800"
        >
          <Magnifier />
          Search
        </Button>
      </form>

      {/* Main buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button
          onPress={() => router.back()}
          variant="secondary"
          className="rounded-lg"
        >
          <ArrowLeft />
          Go Back
        </Button>

        <Button
          onPress={() => router.push("/")}
          className="rounded-lg bg-blue-700 text-white hover:bg-blue-800"
        >
          <House />
          Back to Home
        </Button>
      </div>

      {/* Quick links */}
      <div className="mt-12 w-full max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-400">
          Or try one of these
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;

            return (
              <button
                key={link.href}
                type="button"
                onClick={() => router.push(link.href)}
                className="group rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-700 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white dark:bg-gray-700">
                  <Icon />
                </div>
                <p className="font-semibold">{link.title}</p>
                <p className="text-sm text-gray-500">{link.text}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotFound;