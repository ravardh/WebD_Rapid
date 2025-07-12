import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  // Helper function to safely parse user from sessionStorage
  const getSafeUser = () => {
    try {
      const userString = sessionStorage.getItem("user");
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error("Error parsing user from sessionStorage:", error);
      sessionStorage.removeItem("user"); // Remove corrupted data
      return null;
    }
  };

  const [user, setUser] = useState(getSafeUser());
  const [isLogin, setIsLogin] = useState(!!getSafeUser());
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const storedUser = getSafeUser();
    
    if (storedUser) {
      setUser(storedUser);
      setIsLogin(true);
      setIsAdmin(storedUser.role === "Admin");
      setIsRecruiter(storedUser.role === "Recruiter");
      setIsUser(storedUser.role === "User");
    } else {
      setUser(null);
      setIsLogin(false);
      setIsAdmin(false);
      setIsRecruiter(false);
      setIsUser(false);
    }
  }, []); // Empty dependency array to run only once on mount

  // Update sessionStorage when user changes
  useEffect(() => {
    if (user) {
      try {
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsLogin(true);
        setIsAdmin(user.role === "Admin");
        setIsRecruiter(user.role === "Recruiter");
        setIsUser(user.role === "User");
      } catch (error) {
        console.error("Error saving user to sessionStorage:", error);
      }
    } else {
      sessionStorage.removeItem("user");
      setIsLogin(false);
      setIsAdmin(false);
      setIsRecruiter(false);
      setIsUser(false);
    }
  }, [user]);

  const value = {
    user,
    setUser,
    isLogin,
    isAdmin,
    isRecruiter,
    isUser,
    setIsLogin,
    setIsAdmin,
    setIsRecruiter,
    setIsUser,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
