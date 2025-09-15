import React from "react";
import greetingsImg from "../../assets/images/dashboard.png";
function Greetings() {
  return (
    <div className="bg-orange-400 p-4 mx-4 items-center rounded-lg flex flex-row justify-between gap-8">
      <p className="text-white font-bold text-sm">
        Welcome! Food, rides, and more — your requests are on the way.
      </p>
      <img src={greetingsImg} className="w-24" alt="" />
    </div>
  );
}

export default Greetings;
