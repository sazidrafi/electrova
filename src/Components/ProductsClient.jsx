"use client";
import { Button } from "@heroui/react";
import ProductCard from "@/Components/ProductCard";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
//changed from here
const ProductsClient = ({ categories, products }) => {
   const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";

  const handleCategoryClick = (category) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`/products?${params.toString()}`);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.categoryId === selectedCategory);
  return (
    <div className="container mx-auto mt-10 mb-10">
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          className={
            selectedCategory === "All"
              ? "bg-green-700 text-white border-green-700 hover:bg-green-800"
              : ""
          }
          onPress={() => handleCategoryClick("All")}
        >
          All
        </Button>

        {categories.map((category) => (
          <Button
            key={category._id}
            variant="outline"
            className={
              selectedCategory === category._id
                ? "bg-green-700 text-white border-green-700 hover:bg-green-800"
                : ""
            }
            onPress={() => handleCategoryClick(category._id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Products */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-9 mt-7 mb-10">
        {filteredProducts.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsClient;
