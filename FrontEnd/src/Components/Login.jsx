import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      navigate("/admin");
    } catch (error) {
      console.error(error);

      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF3E8] flex items-center justify-center px-4">
      <div className="w-full max-w-sm border border-black bg-[#FAF3E8]">
        <h2 className="text-base sm:text-lg font-semibold text-black text-center border-b border-black py-4">
          Admin Login
        </h2>

        <div className="p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col w-full">
            <label className="block text-black font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-black px-3 py-2 text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="block text-black font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black px-3 py-2 text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full border border-black bg-black text-white py-2 hover:bg-white hover:text-black transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
