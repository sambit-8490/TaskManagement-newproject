import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/auth/authActions";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { AUTH_REGISTER_RESET } from "../redux/auth/authTypes";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, registerSuccess } = useSelector(
  (state) => state.auth
);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
  if (registerSuccess) {
    alert("Registration successful! Please login.");
    setFormData({ name: "", email: "", password: "" });
    navigate("/login");
    dispatch({ type: AUTH_REGISTER_RESET });
  }
}, [registerSuccess, navigate, dispatch]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="switch-auth">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
