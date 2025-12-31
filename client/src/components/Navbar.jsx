import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authActions";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <h3>Task Manager</h3>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </nav>
  );
};

export default Navbar;
