import React from "react";
import Header from "../../components/Header";
import Greetings from "../../components/admin/Greetings";
import FoodLists from "../../components/customers/FoodLists";
function Home() {
  return (
    <>
      <Header />
      <div className="mt-24">
        <Greetings />
        <FoodLists />
      </div>
    </>
  );
}

export default Home;
