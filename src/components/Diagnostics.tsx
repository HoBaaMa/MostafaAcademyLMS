import { Activity, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export function Diagnostics() {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="size-6 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Diagnostics</h1>
          </div>
          <p className="text-gray-600">System health monitoring and diagnostics</p>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <p className="text-sm font-medium text-gray-900">System Status</p>
            </div>
            <p className="text-lg font-semibold text-green-700">Operational</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="size-5 text-blue-600" />
              <p className="text-sm font-medium text-gray-900">Active Users</p>
            </div>
            <p className="text-lg font-semibold text-blue-700">142</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="size-5 text-purple-600" />
              <p className="text-sm font-medium text-gray-900">Response Time</p>
            </div>
            <p className="text-lg font-semibold text-purple-700">45ms</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="size-5 text-yellow-600" />
              <p className="text-sm font-medium text-gray-900">Warnings</p>
            </div>
            <p className="text-lg font-semibold text-yellow-700">2</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <Activity className="size-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Diagnostics Module</h3>
          <p className="text-gray-600">System monitoring and diagnostics tools coming soon</p>
        </div>
      </div>
    </div>
  );
}
