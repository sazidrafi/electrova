import { CircleDollar } from "@gravity-ui/icons";
import { Avatar, Button, Card, CloseButton, Link } from "@heroui/react";

const ProductCard = ({ item }) => {
  const { id, title, description, ratings, price, image } = item;
  return (
    <Card>
      <Card.Header>
        <Avatar className="size-50 w-full rounded-xl">
          <Avatar.Image alt="Demo 1" src={image} />
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
            {price}
          </p>
          <Button variant="outline">Buy Now</Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;
