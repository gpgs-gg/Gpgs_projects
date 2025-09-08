import { useApp } from "./AppProvider";

export  const Navigation = () => {
            const { currentView, setCurrentView, currentUser } = useApp();

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
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-ticket-alt text-2xl text-orange-600"></i>
                            <h1 className="text-2xl font-bold text-gray-900">GPGS Ticket System</h1>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
                                <div className="text-xs text-gray-500">{currentUser.role}</div>
                            </div>
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium">
                                {currentUser.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <nav className="px-6">
                        <div className="flex space-x-8">
                            {menuItems.map(item => {
                                if (item.adminOnly && currentUser.role !== 'Admin') return null;
                                
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setCurrentView(item.id)}
                                        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
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