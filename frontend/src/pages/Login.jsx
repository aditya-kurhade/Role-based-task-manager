import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({});
  const nav = useNavigate();

  const login = async () => {
    const res = await API.post("/auth/login", data);
    localStorage.setItem("token", res.data.access_token);
    nav("/dashboard");
  };

  return (
  <div className="flex h-screen items-center justify-center">
    <div className="p-4 border rounded w-72">
      
      <p className="mb-3">Login</p>

      <input
        className="border w-full p-2 mb-2"
        placeholder="Email"
        onChange={e => setData({...data, email: e.target.value})}
      />

      <input
        type="password"
        className="border w-full p-2 mb-3"
        placeholder="Password"
        onChange={e => setData({...data, password: e.target.value})}
      />

      <button
        className="border w-full p-2 mb-2"
        onClick={login}
      >
        Login
      </button>

      <p className="text-sm">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => nav("/register")}
        >
          Create account
        </span>
      </p>

    </div>
  </div>
);
}