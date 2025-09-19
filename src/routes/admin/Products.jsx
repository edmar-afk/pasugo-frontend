import React from "react";
import ProductLists from "../../components/admin/ProductLists";
import Header from "../../components/Header";
function Products() {
  return (
    <>
      <Header />
      <div className="mt-24">
        <ProductLists />
      </div>
    </>
  );
}

export default Products;
