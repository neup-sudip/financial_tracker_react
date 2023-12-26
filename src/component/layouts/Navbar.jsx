import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../redux/sagas/actions";

const Navbar = () => {
  const { profile } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(LOGOUT());
  };

  return (
    <div className="bg-light h-100" style={{ maxHeight: "55px" }}>
      <nav
        className="navbar navbar-expand-lg bg-light sticky-top mb-2 "
        data-bs-theme="light"
      >
        <div className="container-fluid">
          <span>{!profile && <h5>Financial tracker</h5>}</span>

          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                {profile ? (
                  <button
                    onClick={handleLogout}
                    className="nav-link text-danger "
                    type="button"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/auth/login" className="nav-link">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

export const NavLink = ({ title, link }) => {
  return (
    <li className="nav-item">
      <Link to={link} className="nav-link text-dark ">
        {title}
      </Link>
    </li>
  );
};
