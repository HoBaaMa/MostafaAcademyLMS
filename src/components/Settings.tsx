import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <SettingsIcon className="size-6 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Settings</h1>
          </div>
          <p className="text-gray-600">System configuration and preferences</p>
        </div>

        {/* Settings Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="size-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Account Settings</h3>
                <p className="text-sm text-gray-600">Manage your account</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Bell className="size-5 text-purple-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">Configure alerts</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="size-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Security</h3>
                <p className="text-sm text-gray-600">Privacy and security</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Palette className="size-5 text-orange-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Appearance</h3>
                <p className="text-sm text-gray-600">Customize interface</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <SettingsIcon className="size-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings Module</h3>
          <p className="text-gray-600">System configuration options coming soon</p>
        </div>
      </div>
    </div>
  );
}
