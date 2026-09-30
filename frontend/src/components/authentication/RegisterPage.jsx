import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords son't match!");
      return;
    }

    try {
      setError("");

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.email?.[0] || "Registration failed");
      }

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="register-form">
        <h1 className="title">Sign Up</h1>
        <p className="register-message">
          Create your account to start managing your tasks.
        </p>

        <label>
          <input
            className="register-input"
            type="text"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span>Name</span>
        </label>

        <label>
          <input
            className="register-input"
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            className="register-input"
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </label>

        <label>
          <input
            className="register-input"
            type="password"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span>Confirm Password</span>
        </label>

        <button className="register-submit" type="submit">
          Sign Up
        </button>
        {error && <p>{error}</p>}

        <p className="register-login">Already have an account?</p>
        <div className="login-register">
          <Link to="/login">Log in </Link>
        </div>
      </form>
    </div>
  );
}
export default RegisterPage;
