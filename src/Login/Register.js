import { useRef, useState } from "react";
import { Registation } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const Usernameref = useRef();
  const Passwordref = useRef();
  const ShopNameref = useRef();
  const Arearef = useRef();
  const Townref = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Username = Usernameref.current.value;
    const Password = Passwordref.current.value;
    const ShopName = ShopNameref.current.value;
    const Area = Arearef.current.value;
    const Town = Townref.current.value;

    const data = {
      username: Username,
      PasswordHash: Password,
      shopName: ShopName,
      area: Area,
      town: Town,
    };

    try {
      const res = await Registation(data);
      if (res.data) {
        
        setSuccess("Registration successful!");
        setError("");
        setTimeout(() => navigate("/"), 1500); // redirect to login
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
  <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
    <div className="text-center mb-4">
      <h2 className="text-primary">ERP Portal Register</h2>
      <p className="text-muted">Create a new account</p>
    </div>

    {success && <div className="alert alert-success">{success}</div>}
    {error && <div className="alert alert-danger">{error}</div>}

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="Username" className="form-label">Username</label>
        <input
          ref={Usernameref}
          type="text"
          className="form-control"
          id="Username"
          placeholder="Enter username"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="Password" className="form-label">Password</label>
        <input
          ref={Passwordref}
          type="password"
          className="form-control"
          id="Password"
          placeholder="Enter password"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="ShopName" className="form-label">Shop Name</label>
        <input
          ref={ShopNameref}
          type="text"
          className="form-control"
          id="ShopName"
          placeholder="Enter shop name"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="Area" className="form-label">Area</label>
        <input
          ref={Arearef}
          type="text"
          className="form-control"
          id="Area"
          placeholder="Enter area"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="Town" className="form-label">Town</label>
        <input
          ref={Townref}
          type="text"
          className="form-control"
          id="Town"
          placeholder="Enter town"
        />
      </div>

      <button type="submit" className="btn btn-success w-100">Register</button>
    </form>

    <div className="text-center mt-3">
      <p className="mb-0">
        Already have an account?{" "}
        <a href="/" className="text-primary text-decoration-none">Login</a>
      </p>
    </div>
  </div>
</div>

  );
};

export default Register;
