"use client";

import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { ArrowUpRightFromSquare, ChevronUp } from "@gravity-ui/icons";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-gray-200 bg-white text-gray-800 py-14 px-6">
      <div className="max-w-full px-7 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand / About */}
        <div className="space-y-4">
          <div className="text-2xl font-bold tracking-tight">ElecTrova</div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Partner with us for quality gadgets and tech essentials designed with
            everyday reliability, clear pricing, and trust.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm underline underline-offset-4 text-gray-900"
          >
            Click for more details
            <ArrowUpRightFromSquare className="w-3.5 h-3.5" />
          </a>

          {/* Simple Social Circles */}
          <div className="flex items-center gap-2 pt-2">
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-xs font-semibold hover:bg-gray-100"
            >
              f
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-xs font-semibold hover:bg-gray-100"
            >
              in
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-xs font-semibold hover:bg-gray-100"
            >
              yt
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">Store Locator</a></li>
            <li><a href="#" className="hover:underline">Featured Products</a></li>
            <li><a href="#" className="hover:underline">Blogs</a></li>
          </ul>
        </div>

        {/* Column 3: Terms of Use */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-4">Terms of Use</h3>
          <ul className="space-y-2.5 text-sm text-gray-600">
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Exchange Policy</a></li>
          </ul>
        </div>

        {/* Column 4: Sign Up for Email */}
        <div>
          <h3 className="text-base font-medium text-gray-900 mb-3">Sign Up for Email</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Sign up to get first dibs on new arrivals, sales, exclusive content,
            events and more!
          </p>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2">
            <Input
              type="email"
              placeholder="Enter email add..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="bordered"
              radius="none"
              className="flex-1"
              required
            />
            <Button
              type="submit"
              radius="none"
              className="bg-slate-900 text-white font-medium px-5"
            >
              Subscribe
            </Button>
          </form>
        </div>

      </div>

      {/* Bottom-right Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-5 right-5 w-9 h-9 bg-white border border-gray-300 flex items-center justify-center shadow-sm hover:bg-gray-50"
      >
        <ChevronUp className="w-4 h-4 text-gray-700" />
      </button>
    </footer>
  );
}