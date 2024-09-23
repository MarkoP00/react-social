import {
  FaHouseChimney,
  FaBell,
  FaChartPie,
  FaHeart,
  FaWallet,
  FaUser,
  FaSquarePlus,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
const loggedUserID = localStorage.getItem("loggedUserID");

export const ITEMDATA = [
  {
    text: "Profile",
    icon: <FaUser size={20}></FaUser>,
    path: `/singleUser/${loggedUserID}`,
  },
  {
    text: "Home",
    icon: <FaHouseChimney size={20}></FaHouseChimney>,
    path: "/mainPage",
  },
  {
    text: "Create",
    icon: <FaSquarePlus size={20}></FaSquarePlus>,
    path: "/createPost",
  },
  {
    text: "Heart",
    icon: <FaHeart size={20}></FaHeart>,
  },
  {
    text: "Notification",
    icon: <FaBell size={20}></FaBell>,
  },
  {
    text: "Wallet",
    icon: <FaWallet size={20}></FaWallet>,
  },
  {
    text: "Logout",
    icon: <FaArrowRightFromBracket size={20}></FaArrowRightFromBracket>,
    path: "/login",
  },
];
