// context
import React, { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [defaultUserData, setDefaultUserData] = useState(
    JSON.parse(localStorage.getItem("savedDefaultUserData")) || null
  );

  const updateDefaultUserData = (posts) => {
    setDefaultUserData(posts);
  };

  const contextValue = {
    defaultUserData,
    updateDefaultUserData,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
