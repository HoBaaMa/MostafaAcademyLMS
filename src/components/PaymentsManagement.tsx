import { useState, useEffect } from 'react';
import { 
  DollarSign,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
  Clock,
  Search,
  Plus
} from 'lucide-react';

type Lesson = {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  date: string;
  price: number;
  status: 'Completed_Unpaid' | 'Completed_Paid';
};

type Payment = {
  id: string;
  parentId: string;
  parentName: string;
  amount: number;
  currency: string;
  coveredLessonCount: number;
  remainingCredit: number;
  paymentDate: string;
  note: string;
};

export function PaymentsManagement() {
  const [parentId, setParentId] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('AED');
  const [coveredFromDate, setCoveredFromDate] = useState('');
  const [coveredToDate, setCoveredToDate] = useState('');
  const [note, setNote] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastPayment, setLastPayment] = useState<Payment | null>(null);

  // Mock data - Parents
  const parents = [
    { id: 'PAR001', name: 'John Smith', studentNames: 'Sarah Johnson' },
    { id: 'PAR002', name: 'Maria Chen', studentNames: 'Michael Chen' },
    { id: 'PAR003', name: 'Ahmed Hassan', studentNames: 'Layla Hassan, Omar Hassan' },
    { id: 'PAR004', name: 'Emily Rodriguez', studentNames: 'Sofia Rodriguez' }
  ];

  // Mock data - Completed Unpaid Lessons
  const [completedUnpaidLessons, setCompletedUnpaidLessons] = useState<Lesson[]>([
    {
      id: 'LSN001',
      studentId: 'STU001',
      studentName: 'Sarah Johnson',
      subject: 'Mathematics',
      date: '2026-01-15',
      price: 150,
      status: 'Completed_Unpaid'
    },
    {
      id: 'LSN002',
      studentId: 'STU001',
      studentName: 'Sarah Johnson',
      subject: 'Physics',
      date: '2026-01-18',
      price: 180,
      status: 'Completed_Unpaid'
    },
    {
      id: 'LSN003',
      studentId: 'STU001',
      studentName: 'Sarah Johnson',
      subject: 'Mathematics',
      date: '2026-01-22',
      price: 150,
      status: 'Completed_Unpaid'
    },
    {
      id: 'LSN004',
      studentId: 'STU001',
      studentName: 'Sarah Johnson',
      subject: 'Chemistry',
      date: '2026-01-25',
      price: 170,
      status: 'Completed_Unpaid'
    },
    {
      id: 'LSN005',
      studentId: 'STU001',
      studentName: 'Sarah Johnson',
      subject: 'Physics',
      date: '2026-01-29',
      price: 180,
      status: 'Completed_Unpaid'
    },
    {
      id: 'LSN006',
      studentId: 'STU001',
      studentName: 'Sarah Johnson',
      subject: 'Mathematics',
      date: '2026-02-01',
      price: 150,
      status: 'Completed_Unpaid'
    }
  ]);

  // Mock data - Payment History
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([
    {
      id: 'PAY001',
      parentId: 'PAR001',
      parentName: 'John Smith',
      amount: 500,
      currency: 'AED',
      coveredLessonCount: 3,
      remainingCredit: 20,
      paymentDate: '2026-01-10',
      note: 'January payment'
    },
    {
      id: 'PAY002',
      parentId: 'PAR002',
      parentName: 'Maria Chen',
      amount: 800,
      currency: 'AED',
      coveredLessonCount: 5,
      remainingCredit: 0,
      paymentDate: '2026-01-15',
      note: 'Monthly payment'
    },
    {
      id: 'PAY003',
      parentId: 'PAR003',
      parentName: 'Ahmed Hassan',
      amount: 1200,
      currency: 'AED',
      coveredLessonCount: 8,
      remainingCredit: 40,
      paymentDate: '2026-01-20',
      note: ''
    }
  ]);

  // Get lessons for selected parent
  const getParentLessons = (): Lesson[] => {
    if (!parentId) return [];
    
    const parent = parents.find(p => p.id === parentId);
    if (!parent) return [];

    let lessons = completedUnpaidLessons.filter(lesson => {
      // In real app, would filter by parent's students
      // For demo, filtering by first parent's student
      if (parentId === 'PAR001') {
        return lesson.studentId === 'STU001';
      }
      return false;
    });

    // Apply date filters if set
    if (coveredFromDate) {
      lessons = lessons.filter(l => l.date >= coveredFromDate);
    }
    if (coveredToDate) {
      lessons = lessons.filter(l => l.date <= coveredToDate);
    }

    // Sort by date (oldest first)
    return lessons.sort((a, b) => a.date.localeCompare(b.date));
  };

  // Calculate coverage preview
  const getCoveragePreview = () => {
    const paymentAmount = parseFloat(amount) || 0;
    const lessons = getParentLessons();
    
    let remainingAmount = paymentAmount;
    const coveredLessons: Lesson[] = [];
    
    for (const lesson of lessons) {
      if (remainingAmount >= lesson.price) {
        coveredLessons.push(lesson);
        remainingAmount -= lesson.price;
      } else {
        break;
      }
    }

    const totalCovered = coveredLessons.reduce((sum, l) => sum + l.price, 0);
    
    return {
      coveredLessons,
      totalCovered,
      remainingCredit: remainingAmount,
      coveredCount: coveredLessons.length
    };
  };

  const preview = getCoveragePreview();

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number, curr: string = currency): string => {
    return `${curr} ${amount.toFixed(2)}`;
  };

  const handleApplyPayment = () => {
    if (!parentId || !amount || parseFloat(amount) <= 0) {
      return;
    }

    const parent = parents.find(p => p.id === parentId);
    if (!parent) return;

    // Create payment record
    const paymentId = `PAY${String(paymentHistory.length + 1).padStart(3, '0')}`;
    const newPayment: Payment = {
      id: paymentId,
      parentId: parentId,
      parentName: parent.name,
      amount: parseFloat(amount),
      currency: currency,
      coveredLessonCount: preview.coveredCount,
      remainingCredit: preview.remainingCredit,
      paymentDate: new Date().toISOString().split('T')[0],
      note: note
    };

    // Update payment history
    setPaymentHistory(prev => [newPayment, ...prev]);

    // Update lesson statuses
    const coveredLessonIds = preview.coveredLessons.map(l => l.id);
    setCompletedUnpaidLessons(prev => 
      prev.filter(lesson => !coveredLessonIds.includes(lesson.id))
    );

    setLastPayment(newPayment);
    setShowSuccessModal(true);

    // Reset form
    setParentId('');
    setAmount('');
    setCoveredFromDate('');
    setCoveredToDate('');
    setNote('');
  };

  const isFormValid = () => {
    return parentId && amount && parseFloat(amount) > 0 && preview.coveredCount > 0;
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="size-6 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Payments Management</h1>
          </div>
          <p className="text-gray-600">Process payments and automatically cover completed lessons</p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Payment Coverage Logic</p>
              <p>
                Payments automatically cover the oldest completed unpaid lessons first. Lessons are marked as "Completed_Paid" 
                once covered. Any remaining credit is tracked for future lessons.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Payment Entry Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center gap-2">
                  <DollarSign className="size-5 text-blue-600" />
                  <h2 className="font-semibold text-gray-900">Payment Entry</h2>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Parent Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent ID *
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <select
                      value={parentId}
                      onChange={(e) => setParentId(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Select Parent</option>
                      {parents.map(parent => (
                        <option key={parent.id} value={parent.id}>
                          {parent.id} - {parent.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {parentId && (
                    <p className="text-xs text-gray-600 mt-1">
                      Students: {parents.find(p => p.id === parentId)?.studentNames}
                    </p>
                  )}
                </div>

                {/* Amount and Currency */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount *
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="AED">AED</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                {/* Auto-calculated Covered Lesson Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Covered Lesson Count
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <BookOpen className="size-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-2xl font-bold text-gray-900">{preview.coveredCount}</p>
                      <p className="text-xs text-gray-600">lessons will be covered</p>
                    </div>
                  </div>
                </div>

                {/* Date Range Filters */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Optional Date Range</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Covered From Date
                      </label>
                      <input
                        type="date"
                        value={coveredFromDate}
                        onChange={(e) => setCoveredFromDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Covered To Date
                      </label>
                      <input
                        type="date"
                        value={coveredToDate}
                        onChange={(e) => setCoveredToDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note (Optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add payment note..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                  />
                </div>

                {/* Apply Button */}
                <button
                  onClick={handleApplyPayment}
                  disabled={!isFormValid()}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
                >
                  <CheckCircle className="size-5" />
                  Apply Payment
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Coverage Preview Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
                <div className="flex items-center gap-2">
                  <FileText className="size-5 text-green-600" />
                  <h2 className="font-semibold text-gray-900">Coverage Preview</h2>
                </div>
              </div>

              <div className="p-6">
                {!parentId ? (
                  <div className="text-center py-12">
                    <User className="size-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-medium text-gray-900 mb-1">Select a Parent</h3>
                    <p className="text-gray-600 text-sm">Choose a parent to view their unpaid lessons</p>
                  </div>
                ) : preview.coveredLessons.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="size-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-medium text-gray-900 mb-1">No Lessons to Cover</h3>
                    <p className="text-gray-600 text-sm">
                      {amount ? 'No unpaid lessons found in the specified range' : 'Enter payment amount to see coverage'}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="size-4 text-blue-600" />
                          <p className="text-xs font-medium text-blue-900">Payment Amount</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-900">{formatCurrency(parseFloat(amount) || 0)}</p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="size-4 text-green-600" />
                          <p className="text-xs font-medium text-green-900">Total Covered</p>
                        </div>
                        <p className="text-2xl font-bold text-green-900">{formatCurrency(preview.totalCovered)}</p>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="size-4 text-purple-600" />
                          <p className="text-xs font-medium text-purple-900">Remaining Credit</p>
                        </div>
                        <p className="text-2xl font-bold text-purple-900">{formatCurrency(preview.remainingCredit)}</p>
                      </div>
                    </div>

                    {/* Lessons to be Covered Table */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Lessons to be Covered ({preview.coveredCount})</h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Lesson ID</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Student</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Subject</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Date</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Price</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {preview.coveredLessons.map((lesson) => (
                              <tr key={lesson.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className="font-mono text-sm text-gray-900">{lesson.id}</span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className="text-sm text-gray-900">{lesson.studentName}</span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className="text-sm text-gray-700">{lesson.subject}</span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Calendar className="size-3" />
                                    {formatDate(lesson.date)}
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-right">
                                  <span className="font-semibold text-sm text-gray-900">
                                    {formatCurrency(lesson.price)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                            <tr>
                              <td colSpan={4} className="px-4 py-3 text-right font-semibold text-gray-900">
                                Total:
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-gray-900">
                                {formatCurrency(preview.totalCovered)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      {preview.remainingCredit > 0 && (
                        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-purple-900">Remaining Credit</p>
                              <p className="text-sm text-purple-700 mt-1">
                                {formatCurrency(preview.remainingCredit)} will be kept as credit for future lessons.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-gray-600" />
              <h2 className="font-semibold text-gray-900">Payment History</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Payment ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Parent ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Parent Name</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Currency</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Covered Lessons</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">Remaining Credit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Payment Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Note</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-mono text-sm text-blue-600 font-medium">{payment.id}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-mono text-sm text-gray-900">{payment.parentId}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-900 font-medium">{payment.parentName}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <span className="font-semibold text-sm text-gray-900">
                        {payment.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{payment.currency}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {payment.coveredLessonCount} lessons
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <span className={`text-sm font-medium ${
                        payment.remainingCredit > 0 ? 'text-purple-600' : 'text-gray-500'
                      }`}>
                        {formatCurrency(payment.remainingCredit, payment.currency)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="size-3" />
                        {formatDate(payment.paymentDate)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{payment.note || '—'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paymentHistory.length === 0 && (
            <div className="text-center py-12 bg-gray-50">
              <FileText className="size-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-1">No payment history</h3>
              <p className="text-gray-600 text-sm">Process your first payment to see history</p>
            </div>
          )}
        </div>

        {/* Success Modal */}
        {showSuccessModal && lastPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="size-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Payment Applied Successfully</h3>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Payment ID:</span>
                    <span className="text-sm font-mono font-medium text-gray-900">{lastPayment.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amount Paid:</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(lastPayment.amount, lastPayment.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Lessons Covered:</span>
                    <span className="text-sm font-semibold text-green-600">
                      {lastPayment.coveredLessonCount} lessons
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining Credit:</span>
                    <span className="text-sm font-semibold text-purple-600">
                      {formatCurrency(lastPayment.remainingCredit, lastPayment.currency)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
