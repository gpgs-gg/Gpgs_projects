import { useState } from "react";
import { useApp } from "./AppProvider";

export const Navigation = () => {
  const { currentView, setCurrentView, currentUser } = useApp();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'tickets', label: 'All Tickets', icon: 'fas fa-ticket-alt' },
    { id: 'create', label: 'Create Ticket', icon: 'fas fa-plus-circle' },
    { id: 'kanban', label: 'Kanban Board', icon: 'fas fa-columns' },
    { id: 'reports', label: 'Reports', icon: 'fas fa-chart-bar' },
    { id: 'users', label: 'Users', icon: 'fas fa-users', adminOnly: true },
    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 mb-6 no-print">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center space-x-2">
          <i className="fas fa-ticket-alt text-2xl text-orange-600"></i>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">GPGS Ticket System</h1>
        </div>

        {/* Desktop User Info */}
        <div className="hidden sm:flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
            <div className="text-xs text-gray-500">{currentUser.role}</div>
          </div>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-orange-600 focus:outline-none"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 sm:px-6">
        <div className={`flex-col sm:flex-row sm:flex space-y-2 sm:space-y-0 sm:space-x-6 ${isMobileMenuOpen ? 'flex' : 'hidden'} sm:flex`}>
          {menuItems.map(item => {
            if (item.adminOnly && currentUser.role !== 'Admin') return null;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false); // Close on mobile after selection
                }}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md sm:rounded-t-lg border-b-2 transition-colors w-full sm:w-auto text-left ${
                  currentView === item.id
                    ? 'text-orange-600 border-orange-600 bg-orange-50'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
