import React, { createContext } from "react";
import logo from "../../assets/logo/logo-transparent-short.png";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";
// sidebar icons
import { FaBars } from "react-icons/fa";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { useState } from "react";
// sidebar content
import { ITEMDATA } from "./ItemContent";

export const SidebarContext = createContext();

export default function Sidebar() {
  const navigate = useNavigate();

  const loggedUserID = localStorage.getItem("loggedUserID");
  const loggedUserProfilePicture = localStorage.getItem(
    "loggedUserProfilePicture"
  );
  const loggedUsername = localStorage.getItem("loggedUsername");
  const loggedUserEmail = localStorage.getItem("loggedUserEmail");

  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Statistics");

  function handleActiveItem(item) {
    setActiveItem(item);
  }

  return (
    <>
      {/* Dugme koje se vidi samo na mobilnim uredjajima */}
      <button
        className="max-msm:flex hidden fixed top-4 left-4 bg-indigo-200/80 p-2 rounded-full shadow-lg z-[60]"
        onClick={() => setExpanded((prevState) => !prevState)}>
        {expanded ? <FaBars /> : <FaBars />}
      </button>

      {loggedUserProfilePicture && (
        <aside
          className={`fixed left-0 top-0 z-[60] ${
            expanded ? "" : "max-msm:hidden"
          }`}>
          <nav
            className={` min-h-screen flex flex-col bg-white border-r shadow-sm transition-all duration-300 ${
              expanded ? "min-h-screen" : "h-24"
            }`}>
            <div className="p-4 flex justify-between items-center">
              <img
                src={logo}
                alt="Chimp Logo"
                className={`overflow-hidden transition-all cursor-pointer ${
                  expanded ? "w-32" : "w-0"
                }`}
                onClick={() => {
                  navigate("/mainPage");
                  handleActiveItem("Home");
                }}
              />
              <button
                className="p-1.5 rounded-lg bg-gray-50 hover-bg-gray-100"
                onClick={() => setExpanded((prevState) => !prevState)}>
                {expanded ? <LuChevronFirst /> : <LuChevronLast />}
              </button>
            </div>

            <SidebarContext.Provider value={{ expanded }}>
              <ul className="flex-1 px-2">
                {ITEMDATA.map((item) => (
                  <SidebarItem
                    id={item.text}
                    text={item.text}
                    key={item.text}
                    active={activeItem === item.text}
                    icon={item.icon}
                    onClick={() => handleActiveItem(item.text)}
                    navigate={navigate}
                    path={item.path}
                  />
                ))}
              </ul>
            </SidebarContext.Provider>

            <div className="border-t flex py-3">
              {!expanded ? (
                <img
                  src={loggedUserProfilePicture}
                  className="w-14 h-14 rounded-full mx-auto cursor-pointer"
                  alt=""
                  onClick={() => {
                    navigate(`/singleUser/${loggedUserID}`);
                    handleActiveItem("Profile");
                  }}
                />
              ) : (
                <div
                  className={`flex justify-between items-center overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }`}>
                  <img
                    src={loggedUserProfilePicture}
                    className="w-14 h-14 rounded-full cursor-pointer"
                    alt=""
                    onClick={() => {
                      navigate(`/singleUser/${loggedUserID}`);
                      handleActiveItem("Profile");
                    }}
                  />
                  <div className="leading-4">
                    <h4 className="font-semibold">{loggedUsername}</h4>
                    <span className="text-xs text-gray-600">
                      {loggedUserEmail}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </aside>
      )}
    </>
  );
}
