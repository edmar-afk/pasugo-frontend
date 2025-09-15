import React from "react";
import welcome from "../assets/images/welcome.png";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Welcome() {
  return (
    <>
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-full h-44"
      >
        <path
          fill="#ff5500"
          fillOpacity="1"
          d="M0,64L26.7,85.3C53.3,107,107,149,160,165.3C213.3,181,267,171,320,160C373.3,149,427,139,480,117.3C533.3,96,587,64,640,64C693.3,64,747,96,800,144C853.3,192,907,256,960,250.7C1013.3,245,1067,171,1120,133.3C1173.3,96,1227,96,1280,106.7C1333.3,117,1387,139,1413,149.3L1440,160L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
        ></path>
      </svg>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col items-start -mt-14">
          <img src={welcome} className="w-80" alt="" />
        </div>

        <div className="mb-8">
          <p className="text-2xl font-extrabold text-gray-700 px-8 mt-8">
            Delivering what you need — whether it's a hot meal or a quick ride,
            we make it fast, easy, and reliable.
          </p>
          <div className="flex flex-row items-center px-8 mt-12">
            <ArrowForwardIcon
              fontSize="medium"
              className="text-orange-600 rounded-lg mr-2"
            />
            <Link
              to={"/login"}
              className="bg-white py-2 px-8 rounded-lg text-orange-700 font-bold shadow"
            >
              Login to Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
