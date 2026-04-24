import { useState } from "react";
import API from "../api";

export default function CreateTask({ refresh }) {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  const create = async () => {
    await API.post("/tasks", data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    refresh();
  };

  return (
  <div className="border p-3 w-72">
    
    <p className="mb-2">Create Task</p>

    <input
      className="border w-full p-2 mb-2"
      placeholder="title"
      onChange={e => setData({ ...data, title: e.target.value })}
    />

    <input
      className="border w-full p-2 mb-2"
      placeholder="desc"
      onChange={e => setData({ ...data, description: e.target.value })}
    />

    <input
      className="border w-full p-2 mb-2"
      placeholder="user id"
      onChange={e =>
        setData({ ...data, assigned_to: Number(e.target.value) })
      }
    />

    <button
      className="border w-full p-2"
      onClick={create}
    >
      Create
    </button>

  </div>
);
}