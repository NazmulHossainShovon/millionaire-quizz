import React, { createContext, useState } from "react";

interface ContextType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

// Step 1: Create the context
export const MyContext = createContext<ContextType>();

// Step 2: Create a Provider Component
export const MyProvider = ({ children }) => {
  const [userName, setUserName] = useState<string>("");

  return (
    <MyContext.Provider value={{ userName, setUserName }}>
      {children}
    </MyContext.Provider>
  );
};
