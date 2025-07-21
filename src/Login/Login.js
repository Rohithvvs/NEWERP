import { useState } from "react";
import { login, saveToken } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ Username: "", PasswordHash: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await login(formData);
      saveToken(res.data.token); // Save JWT
      alert("Login successful!");
navigate("/InvoiceForm");

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
   <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
  <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
    <div className="text-center mb-4">
      <h2 className="text-primary">ERP Portal Login</h2>
      <p className="text-muted">Please enter your credentials</p>
    </div>

    {error && <div className="alert alert-danger">{error}</div>}

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="text" className="form-label">Username address</label>
        <input
          type="text"
          name="Username"
          className="form-control"
          id="Username"
          placeholder="Enter Username"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="PasswordHash" className="form-label">PasswordHash</label>
        <input
          type="PasswordHash"
          name="PasswordHash"
          className="form-control"
          id="PasswordHash"
          placeholder="Enter PasswordHash"
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
        </div>
        <a href="/forgot-PasswordHash" className="text-decoration-none">Forgot PasswordHash?</a>
      </div>

      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>

    <div className="text-center mt-3">
      <p className="mb-0">
        Don’t have an account?{" "}
        <a href="/Register" className="text-primary text-decoration-none">Register</a>
      </p>
    </div>
  </div>
</div>

  );
};

export default Login;
