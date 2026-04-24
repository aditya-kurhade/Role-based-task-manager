import { useEffect, useState } from "react";
import API from "../api";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");
   console.log(token);
  const user = JSON.parse(atob(token.split(".")[1]));
  console.log(user);

  const load = async () => {
    const res = await API.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
  <div className="p-4">
    <h2 className="mb-4">Dashboard <span>{user.role}</span></h2>
    {user.role === "manager" && (
      <div className="mb-4">
        <CreateTask refresh={load} />
      </div>
    )}

    <div className="space-y-2">
      {tasks.map(t => (
        <TaskCard key={t.id} task={t} />
      ))}
    </div>
  </div>
);
}