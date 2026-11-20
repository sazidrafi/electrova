import { Button } from "@heroui/react";
import ProductCard from "@/Components/ProductCard";
const ProductsPage = async () => {
  const products = [
    {
      id: 1,
      title: "Apple AirPods Pro 2nd gen",
      description:
        "Apple AirPods Pro (2nd Gen) with MagSafe Charging Case (USB-C) and Active Noise Cancellation.",
      ratings: 4.5,
      price: 399.99,
      image:
        "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 2,
      title: "Bose QuietComfort 45",
      description:
        "The Bose QuietComfort 45 headphones deliver world-class noise cancellation and deep, clear audio.",
      ratings: 4.5,
      price: 329.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 3,
      title: "Samsung Galaxy S23",
      description:
        "The Samsung Galaxy S23 offers an epic camera system, fast mobile processor, and sleek design.",
      ratings: 4.5,
      price: 799.99,
      image:
        "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 4,
      title: "Garmin Venu 2",
      description:
        "The Garmin Venu 2 smartwatch blends advanced health monitoring with fitness features and AMOLED display.",
      ratings: 4.5,
      price: 349.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 5,
      title: "PlayStation 5",
      description:
        "The PlayStation 5 takes gaming to the next level with ultra-high-speed SSD and haptic feedback.",
      ratings: 4.5,
      price: 499.99,
      image:
        "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 6,
      title: "Canon EOS R5",
      description:
        "The Canon EOS R5 is a game-changing full-frame mirrorless camera with 8K video and 45MP sensor.",
      ratings: 4.5,
      price: 3899.99,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 7,
      title: "MacBook Pro 16",
      description:
        "The MacBook Pro 16, powered by Apple silicon, delivers extraordinary performance and battery life.",
      ratings: 4.5,
      price: 2499.99,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 8,
      title: "Sony WF-1000XM5",
      description:
        "Sony WF-1000XM5 true wireless earbuds feature industry-leading noise cancellation and superior sound.",
      ratings: 4.5,
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 9,
      title: "Samsung Projector 4k",
      description:
        "The Samsung 4K Projector offers an immersive portable cinema experience with 360-degree sound.",
      ratings: 4.5,
      price: 1499.99,
      image:
        "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
      id: 10,
      title: "ASUS ROG Zephyrus G16",
      description:
        "The ASUS ROG Zephyrus G16 gaming laptop combines ultra-slim portability with high-refresh-rate visuals.",
      ratings: 4.5,
      price: 1999.99,
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&h=500&q=80",
    },
  ];
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${url}/products`);
  const allProducts = await res.json();
   console.log(allProducts[0]);

  const categories = [
    "All",
    "Earbuds",
    "Headphones",
    "Smartphones",
    "Smartwatches",
    "Gaming Consoles",
    "Cameras",
    "Laptops",
    "Projectors",
    "Gaming Laptops",
    "Audio",
    "Monitor",
    "Accessories",
  ];
  return (
    <div className="container mx-auto mt-10 mb-10">
      <div className="categories">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, idx) => (
            <Button key={idx} variant="outline">
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="products grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-9 mt-7 mb-10">
        {allProducts.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
