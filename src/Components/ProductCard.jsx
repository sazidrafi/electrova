'use client'
import { CircleDollar } from "@gravity-ui/icons";
import { Avatar, Button, Card, CloseButton, Link } from "@heroui/react";
import { redirect } from "next/navigation";

const ProductCard = ({ item }) => {
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
  specs: {
    connectivity,
    noiseCancellation,
    batteryLife,
    waterResistance,
  },
  inStock,
  stockCount,
  categoryId,
  images,
  status,
  createdAt,
  updatedAt,
  warrantyMonth,
} = item;
  const handleClick = () => {
redirect(`/products/${_id}`)
  }
  return (
    <Card onClick={handleClick} className="cursor-pointer ">
      <Card.Header>
        <Avatar className="size-50 w-full rounded-xl hover:scale-103 duration-500 ">
          <Avatar.Image alt="Demo 1" src={images[0]} />
          <Avatar.Fallback>{title.slice(0, 21)}</Avatar.Fallback>
        </Avatar>
      </Card.Header>
      <Card.Content className="mt-1 gap-2">
        <p className="text-xl leading-4 font-medium">{title.slice(0, 21)}</p>
        <p className="text-sm text-muted truncate">{description}</p>
        <p className="text-md text-muted">{ratings}</p>

        <div className="flex justify-between p-1">
          <p className="flex text-lg font-semibold items-center gap-1">
            <CircleDollar className="w-6 h-6"/>
            {currentPrice}
          </p>
          <Button variant="outline">Buy Now</Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
