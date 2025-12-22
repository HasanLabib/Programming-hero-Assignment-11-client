import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const UserAside = ({ navItemClass }) => {
    const {user} = useContext(AuthContext)
  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800">
      <div className="p-4 text-xl font-bold text-white border-b border-gray-800">
        User Dashboard
      </div>

      <nav className="p-4 space-y-6">
        <div>
          <p className="mb-2 text-xs uppercase text-gray-400">Account</p>
          <ul className="space-y-1">
            <li>
              <NavLink to="profile" className={navItemClass}>
                My Profile
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase text-gray-400">Bookings</p>
          <ul className="space-y-1">
            <li>
              <NavLink to={`bookings/user/${user?.email}`} className={navItemClass}>
                My Bookings
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase text-gray-400">Payments</p>
          <ul className="space-y-1">
            <li>
              <NavLink to="/payment-history" className={navItemClass}>
                Payment History
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default UserAside;
