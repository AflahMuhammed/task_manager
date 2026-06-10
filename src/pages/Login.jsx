import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAuthError("");

    try {
      const res = await api.post("/auth/login", formData);

      await login(res.data.token);
      navigate("/dashboard");

    } catch (error) {
      setAuthError(error.response?.data?.message || "Login Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-grid">
        <div className="intro-panel">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h1>Sign in to view your tasks.</h1>
            <p className="intro-copy">
              Use the same account in the app and in Postman so the tasks stay linked to the right user.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <strong>Clear access</strong>
              <span>Sign in with the account that owns the tasks.</span>
            </article>
            <article className="feature-card">
              <strong>Task control</strong>
              <span>Add, update, and remove tasks in one place.</span>
            </article>
            <article className="feature-card">
              <strong>Account based</strong>
              <span>Only the signed-in user can see their own tasks.</span>
            </article>
          </div>
        </div>

        <div className="auth-panel">
          <p className="eyebrow">Sign in</p>
          <h2>Continue to your dashboard</h2>
          <p>Enter the account that owns the tasks you want to view.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {authError ? <p className="form-error auth-banner">{authError}</p> : null}

            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="primary-button" disabled={submitting}>
              {submitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;