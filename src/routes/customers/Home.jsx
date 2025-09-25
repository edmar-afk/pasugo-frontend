import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Greetings from "../../components/admin/Greetings";
import FoodLists from "../../components/customers/FoodLists";
import RiderHome from "../rider-courier/RiderHome";
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
          // console.log("Profile:", res.data);
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
          profile.role === "Rider" ? <RiderHome /> : <FoodLists />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Home;
