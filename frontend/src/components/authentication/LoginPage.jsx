import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css"

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");

      await login(email, password); //start login request and wait for it to finish
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Log in</h1>
        <p className="login-message">
          Welcome back! Log in to manage your tasks.
        </p>

        <label>
          <input
            className="login-input"
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            className="login-input"
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </label>

        <button className="login-submit" type="submit">
          Login{" "}
        </button>

        {error && <p className="login-error">{error}</p>}

        <div className="login-register">
          <p>Don't have an account?</p>
          <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
