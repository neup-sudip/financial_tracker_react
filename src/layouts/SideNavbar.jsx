import { useState } from "react";
import { Link } from "react-router-dom";

const Lis = ({ link, title, icon, active, setActive }) => {
  return (
    <li className="nav-item mb-1" onClick={() => setActive(link)}>
      <Link
        to={link}
        className={`nav-link ${active === link ? "active" : ""}`}
        aria-current="page"
      >
        {icon}
        <span className="ms-1">{title}</span>
      </Link>
    </li>
  );
};

const SideNavbar = () => {
  const [active, setActive] = useState(window.location.pathname);

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light h-100 ">
      <Link
        to="/"
        className="d-flex align-items-center link-dark text-decoration-none"
      >
        <span className="fs-4">Financial Tracker</span>
      </Link>
      <hr className="m-1 mb-2" />
      <ul className="nav nav-pills flex-column mb-auto">
        <Lis
          link="/income-category"
          title="Income Category"
          icon={<i className="fa-solid fa-shapes"></i>}
          active={active}
          setActive={setActive}
        />
        <Lis
          link="/income"
          title="Income"
          icon={<i className="fa-solid fa-money-bill"></i>}
          active={active}
          setActive={setActive}
        />
        <Lis
          link="/expense-category"
          title="Expense Category"
          icon={<i className="fa-solid fa-shapes"></i>}
          active={active}
          setActive={setActive}
        />
        <Lis
          link="/expense"
          title="Expense"
          icon={<i className="fa-solid fa-receipt"></i>}
          active={active}
          setActive={setActive}
        />
      </ul>
    </div>
  );
};

export default SideNavbar;
