import React, { useEffect, useState } from "react";
import ProductsCard from "../ProductsCard";
import AddProductModal from "../modals/AddProductModal";
import api from "../../assets/api";

function ProductLists() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    api
      .get("/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-orange-600 flex items-center pb-2 pr-2 border-b-2 border-orange-600 uppercase">
          <p className="font-semibold inline-block">Products</p>
        </div>
        <AddProductModal onProductAdded={fetchProducts} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductsCard
              key={product.id}
              name={product.name}
              picture={product.picture}
              date_posted={product.date_posted}
              status={product.status}
              price={product.price}
              type={product.type}
              id={product.id}
              onProductUpdated={fetchProducts} // ✅ pass refresh callback
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductLists;
