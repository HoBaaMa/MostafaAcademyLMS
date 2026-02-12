import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  CreditCard,
  AlertTriangle,
  Calendar,
  User,
  BookOpen,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

type Payment = {
  id: string;
  parentId: string;
  parentName: string;
  amount: number;
  currency: string;
  lessonsCount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
};

export function FinanceDashboard() {
  // KPI Data
  const kpis = {
    totalRevenue: 125840,
    totalOutstanding: 18650,
    totalPaidLessons: 847,
    totalUnpaidLessons: 142,
    creditParents: 23,
    overdueParents: 8
  };

  // Calculate trends (mock percentages)
  const trends = {
    revenue: 12.5,
    outstanding: -8.3,
    paidLessons: 15.2,
    unpaidLessons: -5.4,
    creditParents: 18.7,
    overdueParents: -12.1
  };

  // Revenue by Month Data
  const revenueByMonth = [
    { month: 'Jul', revenue: 18500, target: 20000 },
    { month: 'Aug', revenue: 22300, target: 20000 },
    { month: 'Sep', revenue: 19800, target: 20000 },
    { month: 'Oct', revenue: 24100, target: 20000 },
    { month: 'Nov', revenue: 21450, target: 20000 },
    { month: 'Dec', revenue: 19690, target: 20000 }
  ];

  // Payments Trend Data
  const paymentsTrend = [
    { date: 'Week 1', payments: 12500 },
    { date: 'Week 2', payments: 15800 },
    { date: 'Week 3', payments: 13200 },
    { date: 'Week 4', payments: 18400 },
    { date: 'Week 5', payments: 16700 },
    { date: 'Week 6', payments: 21300 }
  ];

  // Outstanding Balance Trend
  const outstandingTrend = [
    { date: 'Week 1', balance: 25000 },
    { date: 'Week 2', balance: 22500 },
    { date: 'Week 3', balance: 20800 },
    { date: 'Week 4', balance: 19200 },
    { date: 'Week 5', balance: 19800 },
    { date: 'Week 6', balance: 18650 }
  ];

  // Revenue by Teacher
  const revenueByTeacher = [
    { name: 'Dr. Ahmed Hassan', revenue: 32500 },
    { name: 'Prof. Fatima Al-Sayed', revenue: 28900 },
    { name: 'Ms. Maria Garcia', revenue: 24300 },
    { name: 'Mr. John Smith', revenue: 21800 },
    { name: 'Dr. Sarah Williams', revenue: 18340 }
  ];

  // Revenue by Subject
  const revenueBySubject = [
    { name: 'Mathematics', value: 38500, percentage: 30.6 },
    { name: 'Physics', value: 32400, percentage: 25.7 },
    { name: 'Chemistry', value: 24800, percentage: 19.7 },
    { name: 'English', value: 18200, percentage: 14.5 },
    { name: 'Biology', value: 11940, percentage: 9.5 }
  ];

  const SUBJECT_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  // Recent Payments
  const recentPayments: Payment[] = [
    {
      id: 'PAY015',
      parentId: 'PAR001',
      parentName: 'John Smith',
      amount: 1200,
      currency: 'AED',
      lessonsCount: 8,
      date: '2026-02-12',
      status: 'Completed'
    },
    {
      id: 'PAY014',
      parentId: 'PAR008',
      parentName: 'Maria Chen',
      amount: 900,
      currency: 'AED',
      lessonsCount: 6,
      date: '2026-02-11',
      status: 'Completed'
    },
    {
      id: 'PAY013',
      parentId: 'PAR003',
      parentName: 'Ahmed Hassan',
      amount: 1500,
      currency: 'AED',
      lessonsCount: 10,
      date: '2026-02-10',
      status: 'Completed'
    },
    {
      id: 'PAY012',
      parentId: 'PAR012',
      parentName: 'Emily Rodriguez',
      amount: 750,
      currency: 'AED',
      lessonsCount: 5,
      date: '2026-02-09',
      status: 'Completed'
    },
    {
      id: 'PAY011',
      parentId: 'PAR005',
      parentName: 'Omar Abdullah',
      amount: 600,
      currency: 'AED',
      lessonsCount: 4,
      date: '2026-02-08',
      status: 'Pending'
    },
    {
      id: 'PAY010',
      parentId: 'PAR014',
      parentName: 'Fatima Al-Mansoori',
      amount: 1350,
      currency: 'AED',
      lessonsCount: 9,
      date: '2026-02-07',
      status: 'Completed'
    },
    {
      id: 'PAY009',
      parentId: 'PAR002',
      parentName: 'Sarah Williams',
      amount: 800,
      currency: 'AED',
      lessonsCount: 5,
      date: '2026-02-06',
      status: 'Completed'
    },
    {
      id: 'PAY008',
      parentId: 'PAR019',
      parentName: 'Mohammed Al-Rashid',
      amount: 1100,
      currency: 'AED',
      lessonsCount: 7,
      date: '2026-02-05',
      status: 'Completed'
    },
    {
      id: 'PAY007',
      parentId: 'PAR007',
      parentName: 'Lisa Thompson',
      amount: 450,
      currency: 'AED',
      lessonsCount: 3,
      date: '2026-02-04',
      status: 'Failed'
    },
    {
      id: 'PAY006',
      parentId: 'PAR011',
      parentName: 'David Martinez',
      amount: 1000,
      currency: 'AED',
      lessonsCount: 6,
      date: '2026-02-03',
      status: 'Completed'
    }
  ];

  const formatCurrency = (amount: number): string => {
    return `AED ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="size-4" />;
    if (trend < 0) return <ArrowDown className="size-4" />;
    return <Minus className="size-4" />;
  };

  const getTrendColor = (trend: number, inverse: boolean = false) => {
    if (inverse) {
      if (trend > 0) return 'text-red-600 bg-red-50';
      if (trend < 0) return 'text-green-600 bg-green-50';
    } else {
      if (trend > 0) return 'text-green-600 bg-green-50';
      if (trend < 0) return 'text-red-600 bg-red-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="size-6 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Finance Dashboard</h1>
          </div>
          <p className="text-gray-600">Financial KPIs and analytics overview</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Total Revenue */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="size-6 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(trends.revenue)}`}>
                {getTrendIcon(trends.revenue)}
                {Math.abs(trends.revenue)}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(kpis.totalRevenue)}</p>
            <p className="text-xs text-gray-500 mt-2">All-time revenue from lessons</p>
          </div>

          {/* Total Outstanding Balance */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="size-6 text-orange-600" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(trends.outstanding, true)}`}>
                {getTrendIcon(trends.outstanding)}
                {Math.abs(trends.outstanding)}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Outstanding Balance</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(kpis.totalOutstanding)}</p>
            <p className="text-xs text-gray-500 mt-2">Unpaid lessons total value</p>
          </div>

          {/* Total Paid Lessons */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="size-6 text-green-600" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(trends.paidLessons)}`}>
                {getTrendIcon(trends.paidLessons)}
                {Math.abs(trends.paidLessons)}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Paid Lessons</h3>
            <p className="text-2xl font-bold text-gray-900">{kpis.totalPaidLessons.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Completed and paid lessons</p>
          </div>

          {/* Total Unpaid Lessons */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="size-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="size-6 text-red-600" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(trends.unpaidLessons, true)}`}>
                {getTrendIcon(trends.unpaidLessons)}
                {Math.abs(trends.unpaidLessons)}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Unpaid Lessons</h3>
            <p className="text-2xl font-bold text-gray-900">{kpis.totalUnpaidLessons.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Pending payment lessons</p>
          </div>

          {/* Credit Parents */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="size-6 text-purple-600" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(trends.creditParents)}`}>
                {getTrendIcon(trends.creditParents)}
                {Math.abs(trends.creditParents)}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Credit Parents</h3>
            <p className="text-2xl font-bold text-gray-900">{kpis.creditParents}</p>
            <p className="text-xs text-gray-500 mt-2">Parents with remaining credit</p>
          </div>

          {/* Overdue Parents */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="size-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="size-6 text-yellow-600" />
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(trends.overdueParents, true)}`}>
                {getTrendIcon(trends.overdueParents)}
                {Math.abs(trends.overdueParents)}%
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Overdue Parents</h3>
            <p className="text-2xl font-bold text-gray-900">{kpis.overdueParents}</p>
            <p className="text-xs text-gray-500 mt-2">Parents with overdue payments</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue by Month */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">Revenue by Month</h3>
              <p className="text-sm text-gray-600">Monthly revenue vs target</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#E5E7EB" name="Target" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payments Trend */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">Payments Trend</h3>
              <p className="text-sm text-gray-600">Weekly payment collections</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={paymentsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="payments" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Payments"
                  dot={{ fill: '#10B981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Outstanding Balance Trend */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">Outstanding Balance Trend</h3>
              <p className="text-sm text-gray-600">Weekly outstanding balance tracking</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={outstandingTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#F59E0B" 
                  fill="#FEF3C7"
                  strokeWidth={2}
                  name="Outstanding Balance"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Teacher */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">Revenue by Teacher</h3>
              <p className="text-sm text-gray-600">Top performing teachers</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByTeacher} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" stroke="#6B7280" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#6B7280" fontSize={11} width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="revenue" fill="#8B5CF6" name="Revenue" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Subject - Full Width */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-1">Revenue by Subject</h3>
            <p className="text-sm text-gray-600">Subject distribution breakdown</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueBySubject}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueBySubject.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SUBJECT_COLORS[index % SUBJECT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend Table */}
            <div className="flex flex-col justify-center">
              <div className="space-y-3">
                {revenueBySubject.map((subject, index) => (
                  <div key={subject.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="size-4 rounded-full" 
                        style={{ backgroundColor: SUBJECT_COLORS[index] }}
                      />
                      <span className="font-medium text-gray-900">{subject.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatCurrency(subject.value)}</p>
                      <p className="text-xs text-gray-600">{subject.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Payments Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Recent Payments</h2>
              </div>
              <span className="text-sm text-gray-600">Latest 10 transactions</span>
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
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Lessons Count</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPayments.map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-mono text-sm text-blue-600 font-medium">{payment.id}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-mono text-sm text-gray-900">{payment.parentId}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-gray-400" />
                        <span className="text-sm text-gray-900 font-medium">{payment.parentName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <span className="font-semibold text-sm text-gray-900">
                        {formatCurrency(payment.amount)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1">
                        <BookOpen className="size-3 text-gray-400" />
                        <span className="text-sm text-gray-700">{payment.lessonsCount}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="size-3" />
                        {formatDate(payment.date)}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
