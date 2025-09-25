import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Back({ isRight = false }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(-1)}
      className={`z-[99999] fixed top-6 ${isRight ? "right-6" : "left-6"} bg-orange-500 text-white px-1 py-2 rounded-full shadow-xl cursor-pointer active:scale-95 transition`}
    >
      <ArrowBackIosIcon className={`${isRight ? "rotate-360 ml-2" : "ml-2"}`} fontSize="small" />
    </div>
  );
}

export default Back;
