"use client";

import { CircleDollar } from "@gravity-ui/icons";
import { Avatar, Button, Card } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ item }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { _id, title, description, ratings, currentPrice, images } = item;

  const handleClick = () => {
    const query = searchParams.toString();

    router.push(`/products/${_id}${query ? `?${query}` : ""}`);
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
        <p className="text-xl leading-4 font-medium truncate">{title}</p>
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
          <Button variant="outline">Buy Now</Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
