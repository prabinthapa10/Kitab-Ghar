import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import getUserDetails from "../utils/CheckUserDetails";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setToken, setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        "https://localhost:7195/api/Auth/login-token",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data.token;
      setToken(token);
      setIsLoggedIn(true);

      const userDetails = await getUserDetails(token);

      setUser(userDetails);
      if (userDetails?.role === "Admin") {
        toast.success("Login successful!");
        toast.info("Redirecting to Admin Dashboard...");
        navigate("/admin");
      } else if (userDetails?.role === "Member") {
        toast.success("Login successful!");
        toast.info("Redirecting to Home...");
        setTimeout(() => navigate("/"), 100);
        navigate("/");
      } else {
        toast.warn("Unrecognized role.");
        setTimeout(() => navigate("/"), 100);
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data || "Login failed.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 relative overflow-hidden">
        <img
          src="/assets/loginbg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
        />

        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md z-10">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="balamia@gmail.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-amber-50 hover:bg-amber-100 text-gray-800 font-medium rounded-md transition-colors"
            >
              Login now
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Don’t have an account?</span>{" "}
            <a
              href="/register"
              className="text-gray-800 font-medium hover:underline"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
