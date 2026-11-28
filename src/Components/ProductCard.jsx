"use client";

import { CircleDollar } from "@gravity-ui/icons";
import { Avatar, Button, Card } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { authClient } from "@/app/lib/auth-client";


const ProductCard = ({ item }) => {
  const router = useRouter();
  const searchParams = useSearchParams();const { data, isPending, error, refetch } = authClient?.useSession();

  const { _id, title, description, ratings, currentPrice, images,discountedPrice } = item;

  const handleClick = () => {
    const query = searchParams.toString();

    router.push(`/products/${_id}${query ? `?${query}` : ""}`);
  };
  
  let userId;
  {
    data?.user?.id ? (userId = data?.user?.id) : "";
  }
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
          productName: title,
          productPrice: discountedPrice,
        }),
      },
    );
    router.push('/checkout')
  };

  return (
    <Card onClick={handleClick} className="cursor-pointer">
      <Card.Header>
        <Avatar className="size-50 w-full rounded-xl hover:scale-103 duration-500">
          <Avatar.Image alt={title} src={images[0]} />
          <Avatar.Fallback>{title.slice(0, 21)}</Avatar.Fallback>
        </Avatar>
      </Card.Header>

      <Card.Content className="mt-1 gap-2">
        <p className="text-xl leading-4 font-medium truncate p-3">{title}</p>
        <p className="text-sm text-muted truncate">{description}</p>

        <div className="flex gap-2 items-center">
          <FaStar />
          <p className="text-md text-muted">{ratings}</p>
        </div>

        <div className="flex justify-between p-1">
          <p className="flex text-lg font-semibold items-center gap-1">
            <CircleDollar className="w-6 h-6" />
            {currentPrice}
          </p>
          <Button onClick={handleAddToCart} variant="outline">Buy Now</Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
