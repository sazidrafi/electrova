import ProductDetailsCard from "@/Components/ProductDetailsCard";


const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  // console.log(id);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`,
  );
  const data = await res.json();
  const product = data[0];
  console.log(product);

  return (
    <div className="container mx-auto m-5 mb-15">
      <ProductDetailsCard product={product}/>
    </div>
  );
};

export default ProductDetailsPage;
