import React from "react";
import logo from "../../assets/images/logo.png";

function UsersLists({ name }) {
  const users = Array.from({ length: 5 });
  const roles = ["Courier", "Rider"];

  return (
    <>
      <div className="flex flex-row items-center justify-between px-4 mt-8">
        <p className="font-semibold text-sm text-gray-800">{name}</p>
        <p className="text-xs text-orange-500">View More</p>
      </div>
      <div className="flex overflow-x-auto space-x-6 p-4">
        {users.map((_, index) => {
          const randomRole = roles[Math.floor(Math.random() * roles.length)];
          return (
            <div
              key={index}
              className="flex flex-col items-center flex-shrink-0 w-24"
            >
              <img src={logo} className="w-20" alt={`user-${index}`} />
              <p className="text-sm w-full truncate text-center">
                NameWithLongText{index + 1}
              </p>
              <p className="text-xs text-gray-500 truncate w-full text-center">
                {randomRole}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UsersLists;
