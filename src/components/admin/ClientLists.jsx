import { useEffect, useState } from "react";
import api from "../../assets/api";
import logo from "../../assets/images/logo.png";
export default function ClientLists() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedRole, setSelectedRole] = useState("Rider"); // ✅ default is Rider

  useEffect(() => {
    api
      .get("/api/clients/")
      .then((res) => {
        setClients(res.data);
        setFilteredClients(res.data.filter((c) => c.role === "Rider")); // ✅ filter right away
      })
      .catch((err) => console.error("Error fetching clients:", err));
  }, []);

  const handleFilter = (role) => {
    setSelectedRole(role);
    setFilteredClients(clients.filter((c) => c.role === role));
  };

  return (
    <ul role="list" className="divide-y divide-white/5 px-4 mt-4">
      <div className="flex flex-col items-center justify-between mb-12 gap-3">
        <p className="text-gray-800 font-bold">Clients/Riders Lists</p>
        <div className="text-gray-800 text-xs flex flex-row">
          <p
            className={`cursor-pointer after:content-['|'] after:mx-2 after:text-gray-600 last:after:content-none ${
              selectedRole === "Rider" ? "font-bold text-orange-600" : ""
            }`}
            onClick={() => handleFilter("Rider")}
          >
            Rider
          </p>
          <p
            className={`cursor-pointer after:content-['|'] after:mx-2 after:text-gray-600 last:after:content-none ${
              selectedRole === "Courier" ? "font-bold text-orange-600" : ""
            }`}
            onClick={() => handleFilter("Courier")}
          >
            Courier
          </p>
          <p
            className={`cursor-pointer last:after:content-none ${
              selectedRole === "Customer" ? "font-bold text-orange-600" : ""
            }`}
            onClick={() => handleFilter("Customer")}
          >
            Customer
          </p>
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">No Lists Found</p>
      ) : (
        filteredClients.map((client) => (
          <li
            key={client.user.id}
            className="flex justify-between gap-x-6 py-3"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={
                  client.profile_picture || logo
                }
                className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-800">
                  {client.user.first_name || client.user.username}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-400">
                  {client.user.email || "No Email"}
                </p>
              </div>
            </div>
            {/* <div className="shrink-0 flex flex-col items-end">
              <p className="text-sm/6 text-gray-800">{client.role || "N/A"}</p>
              <div className="flex flex-row items-center">
                <p
                  className={`text-xs ${
                    client.status === "Pending"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {client.status}
                </p>{" "}
                <span className="text-gray-500 mx-2">|</span>{" "}
                <p className="text-red-600 text-xs">Delete</p>
              </div>
            </div> */}
          </li>
        ))
      )}
    </ul>
  );
}
