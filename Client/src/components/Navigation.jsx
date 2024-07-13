import { NavLink } from "react-router-dom";
import logoUrl from "../assets/Image/logo.png";

const Navigation = () => {
  const navLinkStyles = ({ isActive }) => {
    return isActive ? "font-bold text-red-500" : "text-black-500";
  };
  return (
    <div className="container mx-auto mt-2 flex items-center justify-between max-w-screen-lg mx-auto">
      <div className="w-24 rounded-2xl">
        <img src={logoUrl} alt="logo" />
      </div>
      <ul className="flex ">
        <li className="px-4">
          <NavLink className={navLinkStyles} to="/">
            Home
          </NavLink>
        </li>
        <li className="px-4">
          <NavLink className={navLinkStyles} to="/generator">
            Generate
          </NavLink>
        </li>
        <li className="px-4">
          <NavLink className={navLinkStyles} to="/generator">
            User
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
