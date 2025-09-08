import { useState } from "react";

export     const Settings = () => {
            const [settings, setSettings] = useState({
                emailNotifications: true,
                autoAssign: true,
                darkMode: false,
                slaSettings: {
                    critical: 4,
                    high: 8,
                    medium: 24,
                    low: 72
                }
            });
           console.log(settings.darkMode)
            const handleToggle = (key) => {
                setSettings({...settings, [key]: !settings[key]});
            };

            const handleSLAChange = (priority, value) => {
                setSettings({
                    ...settings,
                    slaSettings: {
                        ...settings.slaSettings,
                        [priority]: parseInt(value)
                    }
                });
            };

            return (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                        <p className="text-gray-600">Configure system preferences and options</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* General Settings */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-medium text-gray-900">Dark Mode</span>
                                        <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle('darkMode')}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            settings.darkMode ? 'bg-orange-600' : 'bg-gray-200'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-medium text-gray-900">Email Notifications</span>
                                        <p className="text-sm text-gray-500">Receive email updates for ticket changes</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle('emailNotifications')}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            settings.emailNotifications ? 'bg-orange-600' : 'bg-gray-200'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-medium text-gray-900">Auto-assign Tickets</span>
                                        <p className="text-sm text-gray-500">Automatically assign tickets based on department</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle('autoAssign')}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            settings.autoAssign ? 'bg-orange-600' : 'bg-gray-200'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                settings.autoAssign ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* SLA Settings */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">SLA Settings (Hours)</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Critical Priority</label>
                                    <input
                                        type="number"
                                        value={settings.slaSettings.critical}
                                        onChange={(e) => handleSLAChange('critical', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">High Priority</label>
                                    <input
                                        type="number"
                                        value={settings.slaSettings.high}
                                        onChange={(e) => handleSLAChange('high', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Medium Priority</label>
                                    <input
                                        type="number"
                                        value={settings.slaSettings.medium}
                                        onChange={(e) => handleSLAChange('medium', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Low Priority</label>
                                    <input
                                        type="number"
                                        value={settings.slaSettings.low}
                                        onChange={(e) => handleSLAChange('low', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Department Configuration */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Department Configuration</h3>
                            <div className="space-y-3">
                                {['IT', 'HR', 'Finance', 'Operations', 'Marketing'].map(dept => (
                                    <div key={dept} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium">{dept}</span>
                                        <div className="flex space-x-2">
                                            <button className="text-orange-600 hover:text-orange-800">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="text-red-600 hover:text-red-800">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-600 hover:border-orange-300 hover:text-orange-600">
                                    <i className="fas fa-plus mr-2"></i>Add Department
                                </button>
                            </div>
                        </div>

                        {/* System Information */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">System Information</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Version:</span>
                                    <span className="font-medium">2.1.0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Last Updated:</span>
                                    <span className="font-medium">Jan 15, 2025</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Database:</span>
                                    <span className="font-medium text-green-600">Connected</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Uptime:</span>
                                    <span className="font-medium">99.9%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700">
                            Save Settings
                        </button>
                    </div>
                </div>
            );
        };
