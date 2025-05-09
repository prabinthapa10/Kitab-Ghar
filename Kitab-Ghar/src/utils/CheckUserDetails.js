import axios from "axios";

const CheckUserDetails = async (token) => {
  if (!token) {
    console.error("No token provided");
    return null;
  }

  try {
    const response = await axios.get("https://localhost:7195/api/Auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { name, role } = response.data;
    console.log("Fetched user details:", { name, role });

    return {
      name,
      role
    };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Error fetching data:", error);
      localStorage.removeItem("token");
    }
    return null;
  }
};

export default CheckUserDetails;
