import { Link, useParams } from 'react-router';
import { 
  ArrowLeft, 
  Receipt, 
  Calendar, 
  DollarSign, 
  UserCog, 
  FileText,
  Clock,
  CheckCircle
} from 'lucide-react';

type Payment = {
  id: string;
  parentId: string;
  parentName: string;
  paymentDate: string;
  amount: number;
  currency: string;
  note: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
};

export function PaymentDetails() {
  const { id } = useParams();

  // Mock payment data - in real app, this would be fetched based on id
  const payment: Payment = {
    id: id || 'PAY001234',
    parentId: 'PARENT102938',
    parentName: 'Abdullah Al-Saud',
    paymentDate: '2026-02-05',
    amount: 450.00,
    currency: 'CAD',
    note: 'Monthly tuition - February',
    createdAt: '2026-02-05T10:30:00Z',
    updatedAt: '2026-02-05T10:30:00Z',
    status: 'Completed'
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/payments"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Payments
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Receipt className="size-6 text-blue-700" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Payment Details</h1>
                <p className="text-sm text-gray-600 font-mono mt-1">{payment.id}</p>
              </div>
            </div>
            
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <CheckCircle className="size-4 mr-1.5" />
              {payment.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="size-5 text-green-600" />
                <p className="text-sm font-medium text-gray-600">Payment Amount</p>
              </div>
              <p className="text-3xl font-semibold text-gray-900">
                {payment.amount.toLocaleString('en-US', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })} <span className="text-xl text-gray-600 font-mono">{payment.currency}</span>
              </p>
            </div>

            {/* Payment Date */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="size-5 text-blue-600" />
                <p className="text-sm font-medium text-gray-600">Payment Date</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">
                {new Date(payment.paymentDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
          
          <div className="space-y-4">
            {/* Payment ID */}
            <div className="flex items-start">
              <div className="w-48 text-sm font-medium text-gray-600">Payment ID</div>
              <div className="flex-1 font-mono text-sm text-gray-900">{payment.id}</div>
            </div>

            {/* Parent Information */}
            <div className="flex items-start">
              <div className="w-48 text-sm font-medium text-gray-600">Parent</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{payment.parentName}</span>
                  <Link
                    to={`/parents/${payment.parentId}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                  >
                    <UserCog className="size-3.5" />
                    View Parent
                  </Link>
                </div>
                <div className="text-sm text-gray-500 font-mono mt-1">{payment.parentId}</div>
              </div>
            </div>

            {/* Payment Date */}
            <div className="flex items-start">
              <div className="w-48 text-sm font-medium text-gray-600">Payment Date</div>
              <div className="flex-1 text-sm text-gray-900">
                {new Date(payment.paymentDate).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {/* Amount */}
            <div className="flex items-start">
              <div className="w-48 text-sm font-medium text-gray-600">Amount</div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 font-mono">
                  {payment.amount.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </span>
                <span className="ml-2 inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 font-mono">
                  {payment.currency}
                </span>
              </div>
            </div>

            {/* Currency */}
            <div className="flex items-start">
              <div className="w-48 text-sm font-medium text-gray-600">Currency</div>
              <div className="flex-1 text-sm text-gray-900 font-mono">{payment.currency}</div>
            </div>

            {/* Status */}
            <div className="flex items-start">
              <div className="w-48 text-sm font-medium text-gray-600">Status</div>
              <div className="flex-1">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="size-3.5 mr-1.5" />
                  {payment.status}
                </span>
              </div>
            </div>

            {/* Note */}
            <div className="flex items-start">
              <div className="w-48 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-1.5">
                  <FileText className="size-4" />
                  Note
                </div>
              </div>
              <div className="flex-1">
                {payment.note ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900">
                    {payment.note}
                  </div>
                ) : (
                  <span className="text-sm text-gray-400 italic">No note provided</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Metadata */}
        {payment.createdAt && payment.updatedAt && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Record Metadata</h2>
            
            <div className="space-y-3">
              {/* Created At */}
              <div className="flex items-start">
                <div className="w-48 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    Created At
                  </div>
                </div>
                <div className="flex-1 text-sm text-gray-900">
                  {new Date(payment.createdAt).toLocaleString('en-US', { 
                    weekday: 'short',
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {/* Updated At */}
              <div className="flex items-start">
                <div className="w-48 text-sm font-medium text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    Last Updated
                  </div>
                </div>
                <div className="flex-1 text-sm text-gray-900">
                  {new Date(payment.updatedAt).toLocaleString('en-US', { 
                    weekday: 'short',
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 flex items-center gap-3">
          <Link
            to="/payments"
            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Payments
          </Link>
          <Link
            to={`/parents/${payment.parentId}`}
            className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
          >
            <UserCog className="size-4" />
            View Parent Details
          </Link>
        </div>
      </div>
    </div>
  );
}
