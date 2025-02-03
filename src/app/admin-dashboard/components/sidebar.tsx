import React from "react";

const DashboardSidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white  flex flex-col p-4">
      <nav className="flex flex-col justify-between flex-grow">
        {/* Dashboard Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <a
                href="/admin-dashboard"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/admin-dashboard/orders"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Orders
              </a>
            </li>
            <li>
              <a
                href="/admin-dashboard/inventory"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Inventory
              </a>
            </li>
            <li>
              <a
                href="/admin-dashboard/delivery"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Delivery
              </a>
            </li>
          </ul>
        </div>

        {/* Settings Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <ul className="space-y-4">
            <li>
              <a
                href="/history"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                History
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Settings
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
