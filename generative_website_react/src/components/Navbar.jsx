import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const base = "win95-button text-sm";
  const active = "bg-blue-600 text-white";
  const inactive = "hover:bg-blue-100 text-gray-800";

  return (
    <nav className="win95-navbar mb-6">
<div className="max-w-full sm:max-w-5xl mx-auto px-1 sm:px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-blue-600">
            <Link to="/" className="hover:underline flex items-center space-x-1">
              <img src="/retro_browser_logo.webp" alt="logo" className="w-12 h-12" />
              <span>GenWeb</span>
            </Link>
          </h1>
          <div className="space-x-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/tos"
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              TOS
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
