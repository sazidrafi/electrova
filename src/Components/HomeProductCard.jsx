
"use client";

import { CircleDollar } from "@gravity-ui/icons";
import { Avatar, Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";

const HomeProductCard = ({ item }) => {
  const router = useRouter();

  const {
    id,
    title = "Untitled Product",
    description = "No description available",
    ratings = 0,
    price = 0,
    image,
  } = item || {};

  const handleClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card.Header>
        <Avatar className="size-50 w-full rounded-xl hover:scale-103 duration-500">
          <Avatar.Image
            alt={title}
            src={image || "/placeholder.png"}
          />
          <Avatar.Fallback>
            {title.slice(0, 21)}
          </Avatar.Fallback>
        </Avatar>
      </Card.Header>

      <Card.Content className="mt-1 gap-2">
        <p className="text-xl leading-6 font-medium">
          {title.slice(0, 21)}
        </p>

        <p className="text-sm text-muted truncate">
          {description}
        </p>

        <p className="text-md text-muted">
          ⭐ {ratings} / 5
        </p>

        <div className="flex justify-between items-center p-1">
          <p className="flex text-lg font-semibold items-center gap-1">
            <CircleDollar className="w-6 h-6" />
            {price.toLocaleString("en-US")}
          </p>

          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Buy Now
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default HomeProductCard;
