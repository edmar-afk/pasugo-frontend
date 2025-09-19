import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import api from "../../assets/api";

function FoodLists() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/api/products/")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div className="px-4 pt-8">
      <p className="text-gray-800 font-bold">Fresh Hot foods Today</p>

      <div className="flex gap-4 mt-4 overflow-x-auto scrollbar-hide">
        {products.length > 0 ? (
          products.map((product) => (
            <FoodCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No products available.</p>
        )}
      </div>
    </div>
  );
}

export default FoodLists;
