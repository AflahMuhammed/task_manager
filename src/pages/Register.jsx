import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      await api.post("/auth/register", formData);
      navigate("/login");

    } catch (error) {
      setAuthError(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-grid">
        <div className="intro-panel">
          <div>
            <p className="eyebrow">Create account</p>
            <h1>Create an account to start.</h1>
            <p className="intro-copy">
              Register once, then use the same account in the app or Postman to keep tasks in one place.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <strong>One account</strong>
              <span>All tasks stay attached to the same user.</span>
            </article>
            <article className="feature-card">
              <strong>Protected</strong>
              <span>Only a valid login can access the task routes.</span>
            </article>
            <article className="feature-card">
              <strong>Simple steps</strong>
              <span>Register, sign in, and start adding tasks.</span>
            </article>
          </div>
        </div>

        <div className="auth-panel">
          <p className="eyebrow">Register</p>
          <h2>Create your account</h2>
          <p>Use a unique email so the correct tasks appear after sign in.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {authError ? <p className="form-error auth-banner">{authError}</p> : null}

            <label>
              <span>Name</span>
              <input
                name="name"
                placeholder="Your name"
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Password</span>
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="primary-button" disabled={submitting}>
              {submitting ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;