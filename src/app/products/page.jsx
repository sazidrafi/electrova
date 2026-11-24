
import ProductsClient from "@/Components/ProductsClient";
const ProductsPage = async () => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  //* fetch all categories
  const categoryUrl = await fetch(`${url}/categories`);
  const categories = await categoryUrl.json();
  // console.log("Categories ", categories);
  //* fetch all products
  const res = await fetch(`${url}/products`);
  const products = await res.json();

  return (
    <div>
      <ProductsClient categories={categories} products={products} />
    </div>
   
  );
};

export default ProductsPage;
