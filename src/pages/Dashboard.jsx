import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [savingTask, setSavingTask] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: "", description: "" });
  const [taskError, setTaskError] = useState("");
  const [taskInfo, setTaskInfo] = useState("");
  const { user, logout, loading } = useAuth();

  const fetchTasks = async () => {
    setLoadingTasks(true);
    setTaskError("");
    setTaskInfo("");

    try {
      const res = await api.get("/tasks");

      setTasks(res.data);
    } catch (error) {
      setTaskError(error.response?.data?.message || "Unable to load tasks.");
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, []);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "completed").length;
    const pending = tasks.length - completed;

    return {
      total: tasks.length,
      completed,
      pending,
    };
  }, [tasks]);

  const handleChange = (e) => {
    setTaskForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!taskForm.title.trim() || !taskForm.description.trim()) {
      setTaskError("Please fill in both title and description.");
      return;
    }

    setSavingTask(true);
    setTaskError("");
    setTaskInfo("");

    try {
      await api.post("/tasks", {
        title: taskForm.title.trim(),
        description: taskForm.description.trim(),
      });

      setTaskForm({ title: "", description: "" });
      await fetchTasks();
      setTaskInfo("Task added to your board.");
    } catch (error) {
      setTaskError(error.response?.data?.message || "Unable to create task.");
    } finally {
      setSavingTask(false);
    }
  };

  const handleToggleStatus = async (taskId) => {
    try {
      await api.patch(`/tasks/${taskId}/status`);
      await fetchTasks();
      setTaskInfo("Task updated.");
    } catch (error) {
      setTaskError(error.response?.data?.message || "Unable to update task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      await fetchTasks();
      setTaskInfo("Task deleted.");
    } catch (error) {
      setTaskError(error.response?.data?.message || "Unable to delete task.");
    }
  };

  return (
    <main className="app-shell dashboard-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Task manager</p>
          <h1>Manage tasks for the signed-in user.</h1>
          <p className="hero-copy">
            Tasks are saved per account. Create a task, update it, or remove it when it is no longer needed.
          </p>
        </div>

        <div className="user-card">
          <div>
            <span className="label">Signed in as</span>
            <strong>{loading ? "Loading session..." : (user?.email || "Session active")}</strong>
          </div>

          <div className="user-actions">
            <button type="button" className="secondary-button" onClick={() => navigate("/login")}>
              Switch account
            </button>

            <button type="button" className="ghost-button" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </section>

      <section className="overview-strip">
        <article>
          <strong>Account based</strong>
          <span>Each user sees only their own tasks.</span>
        </article>
        <article>
          <strong>Simple actions</strong>
          <span>Add, mark done, or remove a task.</span>
        </article>
        <article>
          <strong>Clear status</strong>
          <span>Pending and completed counts update automatically.</span>
        </article>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total tasks</span>
          <strong>{stats.total}</strong>
        </article>
        <article className="stat-card">
          <span>Pending</span>
          <strong>{stats.pending}</strong>
        </article>
        <article className="stat-card">
          <span>Completed</span>
          <strong>{stats.completed}</strong>
        </article>
      </section>

      <section className="workspace-grid">
        <article className="panel task-form-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">New task</p>
              <h2>Add a task</h2>
            </div>
          </div>

          <form className="task-form" onSubmit={handleCreateTask}>
            {taskInfo ? <p className="form-success" aria-live="polite">{taskInfo}</p> : null}

            <label>
              <span>Task title</span>
              <input
                name="title"
                value={taskForm.title}
                onChange={handleChange}
                placeholder="Example: Call the doctor"
              />
            </label>

            <label>
              <span>Description</span>
              <textarea
                name="description"
                value={taskForm.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write a short note with the details you need to remember."
              />
            </label>

            {taskError ? <p className="form-error" aria-live="polite">{taskError}</p> : null}

            <button type="submit" className="primary-button" disabled={savingTask}>
              {savingTask ? "Saving task..." : "Add task"}
            </button>
          </form>
        </article>

        <article className="panel task-list-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Your tasks</p>
              <h2>Task list</h2>
            </div>

            <button type="button" className="ghost-button" onClick={fetchTasks}>
              Refresh
            </button>
          </div>

          {loadingTasks ? (
            <div className="empty-state">Loading your tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <strong>No tasks yet</strong>
              <span>Add one task above and it will appear here.</span>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <article key={task._id} className={`task-card ${task.status}`}>
                  <div className="task-card-top">
                    <div>
                      <span className="status-pill">{task.status}</span>
                      <h3>{task.title}</h3>
                    </div>

                    <button
                      type="button"
                      className="icon-button danger-button"
                      onClick={() => handleDeleteTask(task._id)}
                      aria-label={`Delete task ${task.title}`}
                    >
                      Remove
                    </button>
                  </div>

                  <p>{task.description}</p>

                  <div className="task-card-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => handleToggleStatus(task._id)}
                    >
                      Mark as {task.status === "completed" ? "not done" : "done"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}

export default Dashboard;