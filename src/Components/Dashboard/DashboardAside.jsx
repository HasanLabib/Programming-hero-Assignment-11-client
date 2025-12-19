import React from "react";
import { NavLink } from "react-router";

const navItemClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg transition ${
    isActive
      ? "bg-amber-500 text-white font-semibold"
      : "text-gray-300 hover:bg-gray-700"
  }`;

const DashboardAside = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800">
      <div className="p-4 text-xl font-bold text-white border-b border-gray-800">
        Admin Dashboard
      </div>

      <nav className="p-4 space-y-6">
        {/* Core Management */}
        <div>
          <p className="mb-2 text-xs uppercase text-gray-400">Management</p>
          <ul className="space-y-1">
            <li>
              <NavLink to="decorators" className={navItemClass}>
                Manage Decorators
              </NavLink>
            </li>
            <li>
              <NavLink to="services" className={navItemClass}>
                Services & Packages
              </NavLink>
            </li>
            <li>
              <NavLink to="bookings" className={navItemClass}>
                Bookings
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Booking Actions */}
        <div>
          <p className="mb-2 text-xs uppercase text-gray-400">Operations</p>
          <ul className="space-y-1">
            <li>
              <NavLink to="assign-decorator" className={navItemClass}>
                Assign Decorator
              </NavLink>
            </li>
            <li>
              <NavLink to="payments" className={navItemClass}>
                Payment Status
              </NavLink>
            </li>
            <li>
              <NavLink to="decorator-approval" className={navItemClass}>
                Approve / Disable Decorators
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Finance & Analytics */}
        <div>
          <p className="mb-2 text-xs uppercase text-gray-400">Analytics</p>
          <ul className="space-y-1">
            <li>
              <NavLink to="revenue" className={navItemClass}>
                Revenue Monitoring
              </NavLink>
            </li>
            <li>
              <NavLink to="analytics" className={navItemClass}>
                Service Demand Chart
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardAside;
