import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Greetings from "../../components/admin/Greetings";
import FoodLists from "../../components/customers/FoodLists";
import RiderHome from "../rider-courier/RiderHome";
import CourierHome from "../rider-courier/CourierHome";
import api from "../../assets/api";

function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      api
        .get(`/api/profile/${parsedUser.id}/`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });
    }
  }, []);

  return (
    <>
      <Header />
      <div className="mt-24">
        <Greetings />
        {profile ? (
          profile.role === "Rider" ? (
            <RiderHome />
          ) : profile.role === "Courier" ? (
            <CourierHome />
          ) : (
            <FoodLists />
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Home;
