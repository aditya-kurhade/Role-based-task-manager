import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const register = async () => {
    try {
      setError("");
      await API.post("/auth/register", data);
      nav("/");
    } catch (err) {
      setError(err?.response?.data?.detail || "Registration failed");
    }
  };

  return (
  <div className="flex h-screen items-center justify-center">
    <div className="border p-4 w-72">
      
      <p className="mb-3">Register</p>

      <input
        className="border w-full p-2 mb-2"
        placeholder="Name"
        value={data.name}
        onChange={e => setData({ ...data, name: e.target.value })}
      />

      <input
        className="border w-full p-2 mb-2"
        placeholder="Email"
        value={data.email}
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <input
        className="border w-full p-2 mb-2"
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <select
        className="border w-full p-2 mb-3"
        value={data.role}
        onChange={e => setData({ ...data, role: e.target.value })}
      >
        <option value="manager">manager</option>
        <option value="member">member</option>
      </select>

      <button
        className="border w-full p-2 mb-2"
        onClick={register}
      >
        Register
      </button>

      {error && <p className="text-sm">{error}</p>}

      <p className="text-sm">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => nav("/")}
        >
          Login
        </span>
      </p>

    </div>
  </div>
);
}