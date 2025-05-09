import { createContext, useContext, useState, useEffect } from "react";
import getUserDetails from "../utils/CheckUserDetails";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "null");
      return {
        token,
        user, 
        isLoggedIn: !!token,
        loading: true,
      };
    } catch (error) {
      console.error("Error retrieving token from localStorage:", error);
      return {
        token: null,
        user: null,
        isLoggedIn: false,
        loading: false,
      };
    }
  });

  const { token, user, isLoggedIn, loading } = authState;

  const updateAuthState = (newState) => {
    setAuthState((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  const updateUser = (newUserDetails) => {
    if (newUserDetails) {
      localStorage.setItem("user", JSON.stringify(newUserDetails));
      updateAuthState({ user: newUserDetails });
    } else {
      localStorage.removeItem("user");
      updateAuthState({ user: null });
    }
  };

  const updateToken = (newToken) => {
    console.log("Updating token:", newToken);
    try {
      if (newToken) {
        localStorage.setItem("token", newToken);
        console.log("Token saved to localStorage:", localStorage.getItem("token")); // Verify immediately
        updateAuthState({
          token: newToken,
          isLoggedIn: true,
        });
      } else {
        localStorage.removeItem("token");
        updateAuthState({
          token: null,
          isLoggedIn: false,
        });
      }
    } catch (error) {
      console.error("LocalStorage error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    updateAuthState({
      token: null,
      user: null,
      isLoggedIn: false,
      loading: false,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!authState.token) {
        updateAuthState({ loading: false });
        return;
      }

      try {
        const userDetails = await getUserDetails(authState.token);
        updateAuthState({
          user: userDetails,
          isLoggedIn: true, // Ensure isLoggedIn stays true
          loading: false
        });
      } catch (error) {
        console.error("Failed to fetch user details", error);
        logout();
      }
    };

    fetchUser();
  }, [authState.token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: updateUser,
        token,
        setToken: updateToken,
        loading,
        logout,
        role: user?.role,
        name: user?.name,
        isLoggedIn,
        setIsLoggedIn: (value) => updateAuthState({ isLoggedIn: value }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
