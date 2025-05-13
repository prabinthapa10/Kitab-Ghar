import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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
        loading: !!token, // Only load if we have a token
        error: null,
      };
    } catch (error) {
      console.error("Error initializing auth state:", error);
      return {
        token: null,
        user: null,
        isLoggedIn: false,
        loading: false,
        error: "Failed to initialize auth state",
      };
    }
  });

  const { token, user, isLoggedIn, loading, error } = authState;

  const updateAuthState = useCallback((newState) => {
    setAuthState((prev) => ({
      ...prev,
      ...newState,
    }));
  }, []);

  const updateUser = useCallback(
    (newUserDetails) => {
      try {
        if (newUserDetails) {
          localStorage.setItem("user", JSON.stringify(newUserDetails));
          updateAuthState({ user: newUserDetails, error: null });
        } else {
          localStorage.removeItem("user");
          updateAuthState({ user: null });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        updateAuthState({ error: "Failed to update user" });
      }
    },
    [updateAuthState]
  );

  const updateToken = useCallback(
    (newToken) => {
      try {
        if (newToken) {
          localStorage.setItem("token", newToken);
          updateAuthState({
            token: newToken,
            isLoggedIn: true,
            loading: true, // Set loading true when we get a new token
            error: null,
          });
        } else {
          localStorage.removeItem("token");
          updateAuthState({
            token: null,
            isLoggedIn: false,
            user: null,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Error updating token:", error);
        updateAuthState({ error: "Failed to update token" });
      }
    },
    [updateAuthState]
  );

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      updateAuthState({
        token: null,
        user: null,
        isLoggedIn: false,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error during logout:", error);
      updateAuthState({ error: "Failed to logout" });
    }
  }, [updateAuthState]);

  useEffect(() => {
    let isMounted = true;

    const fetchUserDetails = async () => {
      if (!token) {
        updateAuthState({ loading: false });
        return;
      }

      try {
        const userDetails = await getUserDetails(token);
        if (!isMounted) return;

        if (userDetails) {
          updateAuthState({
            user: userDetails,
            isLoggedIn: true,
            loading: false,
            error: null,
          });
        } else {
          // Token might be invalid, but don't logout automatically
          updateAuthState({
            loading: false,
            error: "Failed to fetch user details",
          });
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Error in fetchUserDetails:", error);
        updateAuthState({
          loading: false,
          error: error.message,
        });
        // Don't automatically logout - let the UI decide
      }
    };

    fetchUserDetails();

    return () => {
      isMounted = false;
    };
  }, [token, updateAuthState]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: updateUser,
        token,
        setToken: updateToken,
        loading,
        logout,
        id: user?.userId,
        role: user?.role,
        name: user?.name,
        email: user?.email,
        isLoggedIn,
        error,
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
