"use client";
import { authClient } from "@/app/lib/auth-client";
import { CircleDollar, StarFill } from "@gravity-ui/icons";
import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const ProductDetailsCard = ({ product }) => {
  const { data, isPending, error, refetch } = authClient?.useSession();
  let userId;
  { data?.user?.id ? userId = data?.user?.id : '' }
  const handleAddToCart = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: _id,
          quantity: 1,
        }),
      },
    );

    // const data = await res.json();
    // console.log(data);
  };

  const {
    _id,
    title,
    slug,
    description,
    ratings,
    currentPrice,
    discountedPrice,
    brandId,
    color,
    isFeatured,
    specs: { connectivity, noiseCancellation, batteryLife, waterResistance },
    inStock,
    stockCount,
    categoryId,
    images,
    status,
    createdAt,
    updatedAt,
    warrantyMonth,
  } = product;
  return (
    <div className="light:bg-gray-200  mt-10 pb-10 pt-3">
      <div className="lg:flex justify-between m-5 p-5  bg-gray-200 dark:bg-black  rounded-2xl gap-5">
        <Image
          src={images[0]}
          alt="title"
          width={500}
          height={300}
          className="rounded-2xl  object-contain"
        />

        <div className="sm:w-100 md:w-150 lg:w-200 space-y-3 mt-16">
          <h1 className="text-4xl font-semibold">{title}</h1>
          <div className="flex items-center gap-2">
            <div className="flex">
              <StarFill className="w-6 h-5" />
              <StarFill className="w-6 h-5" />
              <StarFill className="w-6 h-5" />
              <StarFill className="w-6 h-5" />
            </div>
            <p className="text-2xl">{ratings}</p>
          </div>
          <p className="text-xl">{connectivity}</p>
          <p className="text-xl">{noiseCancellation}</p>
          <p className="text-xl">{batteryLife}</p>
          <p className="text-xl">
            Water proof: {waterResistance ? "Yes" : "No"}
          </p>
          <p className="text-xl">Color: {color}</p>
          <p className="text-xl">
            {status === "instock" ? (
              <Chip color="success" className="text-xl p-2">
                Available
              </Chip>
            ) : (
              <Chip color="danger" className="text-xl p-2">
                Discontinued
              </Chip>
            )}
          </p>
          <p className="text-xl">
            {inStock ? (
              <Chip color="accent" className="text-xl p-2">
                In Stock
              </Chip>
            ) : (
              <Chip color="danger" className="text-xl p-2">
                Out of Stock
              </Chip>
            )}
          </p>

          <div className="flex gap-1 pt-5 pb-5">
            <CircleDollar className="w-11 h-11" />
            <p className="text-4xl">{discountedPrice}</p>
            <div className="flex gap-1 pt-5 pl-5">
              <CircleDollar className="w-6 h-6" />
              <p className="text-xl line-through text-gray-500">
                {currentPrice}
              </p>
            </div>
          </div>
          <div className="border border-gray-300 mb-5"></div>
          <div className="buttons flex justify-between gap-3">
            <Button
              onClick={handleAddToCart}
              className="text-xl text-black  md:pl-20 md:pr-20 xl:pl-35 xl:pr-35 pb-5 pt-5 xl:pb-7 xl:pt-7 bg-gray-300"
            >
              Add to cart
            </Button>
            <Link href="/checkout">
              <Button className="bg-green-800 text-xl md:pl-20 md:pr-20 pb-5 pt-5 xl:pl-35 xl:pr-35 xl:pb-7 xl:pt-7">
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 m-5 mt-15 mb-10 p-7 rounded-lg">
        <h1 className="text-2xl font-semibold mb-3">Product Description</h1>

        <div className="border border-green-700 mb-6"></div>

        <p className="text-xl font-sans mb-5">{description}</p>

        <div className="divide-y divide-gray-300 dark:divide-gray-700 border-y border-gray-300 dark:border-gray-700">
          {connectivity && (
            <div className="flex justify-between gap-5 py-4">
              <span className="font-semibold text-lg">Connectivity</span>
              <span className="text-lg">{connectivity}</span>
            </div>
          )}

          {noiseCancellation && (
            <div className="flex justify-between gap-5 py-4">
              <span className="font-semibold text-lg">Noise Cancellation</span>
              <span className="text-lg">{noiseCancellation}</span>
            </div>
          )}

          {batteryLife && (
            <div className="flex justify-between gap-5 py-4">
              <span className="font-semibold text-lg">Battery Life</span>
              <span className="text-lg">{batteryLife}</span>
            </div>
          )}

          {stockCount != null && (
            <div className="flex justify-between gap-5 py-4">
              <span className="font-semibold text-lg">Product in Stock</span>
              <span className="text-lg">{stockCount}</span>
            </div>
          )}

          {warrantyMonth != null && (
            <div className="flex justify-between gap-5 py-4">
              <span className="font-semibold text-lg">Warranty</span>
              <span className="text-lg">{warrantyMonth} months</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
