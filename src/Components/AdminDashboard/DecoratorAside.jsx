import React from "react";
import { NavLink } from "react-router";

const DecoratorAside = ({ navItemClass }) => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800">
      <div className="p-4 text-xl font-bold text-white border-b border-gray-800">
        Decorator Dashboard
      </div>

      <nav className="p-4 space-y-6">
        <div>
          <p className="mb-2 text-xs uppercase text-gray-400">Work</p>
          <ul className="space-y-1">
            <li>
              <NavLink to="assigned-projects" className={navItemClass}>
                My Assigned Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="today-schedule" className={navItemClass}>
                Today's Schedule
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase text-gray-400">
            Project Progress
          </p>
          <ul className="space-y-1">
            <li>
              <NavLink to="update-project-status" className={navItemClass}>
                Update Project Status
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase text-gray-400">Finance</p>
          <ul className="space-y-1">
            <li>
              <NavLink to="payment-history" className={navItemClass}>
                Payment History
              </NavLink>
            </li>
            <li>
              <NavLink to="earnings-summary" className={navItemClass}>
                Earnings Summary
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default DecoratorAside;
