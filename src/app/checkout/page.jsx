"use client";

import { Button, Input } from "@heroui/react";

const CartPage = () => {
  return (
    <div className="container mx-auto mt-6 sm:mt-10 mb-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8">
        <div className="w-full min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Your <span className="text-green-700">Cart</span>
            </h1>

            <h2 className="text-lg sm:text-2xl text-gray-400">3 Items</h2>
          </div>

          <div className="border-b-2 border-gray-200 dark:border-gray-700 mt-5 mb-5" />

          <div className="overflow-x-auto">
            <div className="min-w-150">
              <div className="grid grid-cols-[minmax(200px,1fr)_100px_110px_110px] gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-base sm:text-lg font-semibold">Product</p>

                <p className="text-base sm:text-lg font-semibold text-center">
                  Price
                </p>

                <p className="text-base sm:text-lg font-semibold text-center">
                  Quantity
                </p>

                <p className="text-base sm:text-lg font-semibold text-center">
                  Subtotal
                </p>
              </div>

              {/* Product Items will be added here */}
            </div>
          </div>
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
                  fullWidth
                  placeholder="Enter Coupon"
                  variant="bordered"
                  radius="md"
                />
                <Button className="bg-green-700 hover:bg-green-800 text-white w-full rounded-lg">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
