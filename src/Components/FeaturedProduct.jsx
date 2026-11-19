import { ArrowUpRightFromSquare } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Image from "next/image";

const FeaturedProduct = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
      <div className="relative">
        <Image
          src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&h=500&q=80"
          alt="Electronics product"
          width={450}
          height={650}
          className="h-163 w-113 rounded-xl object-cover"
        />

        <div className="absolute bottom-10 w-75 left-6 z-10 text-white">
          <p className="text-2xl font-bold">Power in Every Pixel</p>

          <p className="mt-2 text-xl">
            Shop the latest laptops for work, gaming and more
          </p>

          <Button
            variant="secondary"
            className="mt-5 rounded bg-orange-400 p-5 text-xl text-white"
          >
            Buy Now
            <ArrowUpRightFromSquare className="h-5 w-5" />
          </Button>
        </div>
          </div>

      <div className="relative">
        <Image
          src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&h=500&q=80"
          alt="Electronics product"
          width={450}
          height={650}
          className="h-163 w-113 rounded-xl object-cover"
        />

        <div className="absolute bottom-10 w-75 left-6 z-10 text-white">
          <p className="text-2xl font-bold">Power in Every Pixel</p>

          <p className="mt-2 text-xl">
            Shop the latest laptops for work, gaming and more
          </p>

          <Button
            variant="secondary"
            className="mt-5 rounded bg-orange-400 p-5 text-xl text-white"
          >
            Buy Now
            <ArrowUpRightFromSquare className="h-5 w-5" />
          </Button>
        </div>
          </div>

      <div className="relative">
        <Image
          src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&h=500&q=80"
          alt="Electronics product"
          width={450}
          height={650}
          className="h-163 w-113 rounded-xl object-cover"
        />

        <div className="absolute bottom-10 w-75 left-6 z-10 text-white">
          <p className="text-2xl font-bold">Power in Every Pixel</p>

          <p className="mt-2 text-xl">
            Shop the latest laptops for work, gaming and more
          </p>

          <Button
            variant="secondary"
            className="mt-5 rounded bg-orange-400 p-5 text-xl text-white"
          >
            Buy Now
            <ArrowUpRightFromSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
