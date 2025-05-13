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
    const { userId, name, email, role } = response.data;
    console.log("Fetched user details:", { userId, name, email, role });

    return { userId, name, email, role };
  } catch (error) {
    console.error("Error fetching user details:", error);
    // Don't remove token here - let the calling code handle it
    return null;
  }
};

export default CheckUserDetails;
