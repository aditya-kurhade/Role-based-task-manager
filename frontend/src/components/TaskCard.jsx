import API from "../api";

export default function TaskCard({ task }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(atob(token.split(".")[1]));

  const update = async () => {
    await API.put(`/tasks/${task.id}`, { status: "COMPLETED" }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  return (
  <div className="border p-3">
    <h3 className="font-medium">{task.title}</h3>
    <p className="text-sm">{task.description}</p>
    <p className="text-sm mb-2">Status: {task.status}</p>

    {user.role === "member" && (
      <button
        className="border px-2 py-1 text-sm"
        onClick={update}
      >
        Complete
      </button>
    )}
  </div>
);
}