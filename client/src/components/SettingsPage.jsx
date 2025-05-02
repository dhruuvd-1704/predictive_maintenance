import React from 'react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-12">

        {/* Page Header */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-teal-400 mb-2">Settings</h1>
          <p className="text-gray-400">Manage your application’s configuration</p>
        </header>

        {/* Appearance Section */}
        <section className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Appearance</h2>
          <div className="space-y-4">
            <button
              className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              disabled
            >
              <span className="font-medium">Dark Mode</span>
            </button>
            <button
              className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              disabled
            >
              <span className="font-medium">Light Mode</span>
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" disabled className="h-5 w-5 bg-gray-700 border-gray-600 rounded" />
              <span className="text-gray-200">Enable Email Alerts</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" disabled className="h-5 w-5 bg-gray-700 border-gray-600 rounded" />
              <span className="text-gray-200">Enable Push Notifications</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" disabled className="h-5 w-5 bg-gray-700 border-gray-600 rounded" />
              <span className="text-gray-200">Enable SMS Alerts</span>
            </label>
          </div>
        </section>

        {/* Data & Privacy Section */}
        <section className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Data & Privacy</h2>
          <div className="space-y-4">
            <label className="flex flex-col">
              <span className="mb-1 text-gray-300">Data Retention (days)</span>
              <input
                type="number"
                placeholder="30"
                disabled
                className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 w-32"
              />
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" disabled className="h-5 w-5 bg-gray-700 border-gray-600 rounded" />
              <span className="text-gray-200">Anonymize User Data</span>
            </label>
          </div>
        </section>

        {/* Advanced Section */}
        <section className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Advanced Options</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input type="checkbox" disabled className="h-5 w-5 bg-gray-700 border-gray-600 rounded" />
              <span className="text-gray-200">Enable Detailed Logs</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" disabled className="h-5 w-5 bg-gray-700 border-gray-600 rounded" />
              <span className="text-gray-200">Beta Features</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" disabled className="h-5 w-5 bg-gray-700 border-gray-600 rounded" />
              <span className="text-gray-200">Developer Mode</span>
            </label>
          </div>
        </section>

        {/* Save Settings Button */}
        <div className="text-center">
          <button
            disabled
            className="px-8 py-3 bg-gray-600 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
