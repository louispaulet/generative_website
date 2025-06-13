import { NavLink } from "react-router-dom";

export default function Navbar() {
  const base =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
  const active = "text-white bg-blue-600";
  const inactive = "text-gray-700 hover:text-blue-600";

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-blue-600">MySite</h1>
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
