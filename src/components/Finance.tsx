import { DollarSign, TrendingUp, Receipt, CreditCard } from 'lucide-react';

export function Finance() {
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-6 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Finance</h1>
          </div>
          <p className="text-gray-600">Payment tracking and financial management</p>
        </div>

        {/* Placeholder Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">$45,680</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Receipt className="size-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-semibold text-gray-900">$8,240</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="size-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">$12,450</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <DollarSign className="size-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Finance Module</h3>
          <p className="text-gray-600">Financial tracking and payment management coming soon</p>
        </div>
      </div>
    </div>
  );
}
