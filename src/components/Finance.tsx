import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Lock,
  Calendar,
  Users,
  Minus,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router';

type FinancialStatus = 'Paid' | 'Partially Paid' | 'Overdue' | 'Credit';

type PaymentRecord = {
  date: string;
  amount: number;
  currency: string;
};

type ParentFinancial = {
  parentId: string;
  parentName: string;
  childrenIds: string[];
  totalCompletedLessons: number;
  totalLessonsValue: number;
  totalPayments: number;
  lastPaymentDate: string;
  currency: string;
  discountPercent: number;
  balance: number;
  status: FinancialStatus;
  paymentHistory: PaymentRecord[];
  notes: string;
};

const CURRENCIES = ['CAD', 'USD', 'EUR', 'EGP'];
const STATUSES: FinancialStatus[] = ['Paid', 'Partially Paid', 'Overdue', 'Credit'];

export function Finance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [balanceMinFilter, setBalanceMinFilter] = useState('');
  const [balanceMaxFilter, setBalanceMaxFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  
  const itemsPerPage = 10;

  // Mock financial data - 15 parents
  const financialData: ParentFinancial[] = [
    {
      parentId: 'PARENT102938',
      parentName: 'Hassan Family',
      childrenIds: ['MID102938', 'MID102939'],
      totalCompletedLessons: 16,
      totalLessonsValue: 800.00,
      totalPayments: 720.00,
      lastPaymentDate: '2026-02-10',
      currency: 'CAD',
      discountPercent: 10,
      balance: -80.00,
      status: 'Partially Paid',
      paymentHistory: [
        { date: '2026-02-10', amount: 360.00, currency: 'CAD' },
        { date: '2026-01-15', amount: 360.00, currency: 'CAD' }
      ],
      notes: 'Regular payment schedule - monthly installments'
    },
    {
      parentId: 'PARENT103456',
      parentName: 'Ahmed Family',
      childrenIds: ['MID103456'],
      totalCompletedLessons: 12,
      totalLessonsValue: 720.00,
      totalPayments: 720.00,
      lastPaymentDate: '2026-02-08',
      currency: 'USD',
      discountPercent: 0,
      balance: 0,
      status: 'Paid',
      paymentHistory: [
        { date: '2026-02-08', amount: 360.00, currency: 'USD' },
        { date: '2026-01-10', amount: 360.00, currency: 'USD' }
      ],
      notes: 'Pays in full each month - excellent payment history'
    },
    {
      parentId: 'PARENT104567',
      parentName: 'Ibrahim Family',
      childrenIds: ['MID104567', 'MID104568', 'MID104569'],
      totalCompletedLessons: 24,
      totalLessonsValue: 28800.00,
      totalPayments: 24480.00,
      lastPaymentDate: '2026-02-05',
      currency: 'EGP',
      discountPercent: 15,
      balance: -4320.00,
      status: 'Partially Paid',
      paymentHistory: [
        { date: '2026-02-05', amount: 12240.00, currency: 'EGP' },
        { date: '2026-01-08', amount: 12240.00, currency: 'EGP' }
      ],
      notes: 'Family discount applied - 3 children enrolled'
    },
    {
      parentId: 'PARENT105678',
      parentName: 'Khalil Family',
      childrenIds: ['MID105678'],
      totalCompletedLessons: 8,
      totalLessonsValue: 320.00,
      totalPayments: 320.00,
      lastPaymentDate: '2026-02-12',
      currency: 'EUR',
      discountPercent: 0,
      balance: 0,
      status: 'Paid',
      paymentHistory: [
        { date: '2026-02-12', amount: 160.00, currency: 'EUR' },
        { date: '2026-01-15', amount: 160.00, currency: 'EUR' }
      ],
      notes: 'Elementary level student - consistent payments'
    },
    {
      parentId: 'PARENT106789',
      parentName: 'Ali Family',
      childrenIds: ['MID106789'],
      totalCompletedLessons: 10,
      totalLessonsValue: 550.00,
      totalPayments: 550.00,
      lastPaymentDate: '2026-02-14',
      currency: 'CAD',
      discountPercent: 0,
      balance: 0,
      status: 'Paid',
      paymentHistory: [
        { date: '2026-02-14', amount: 275.00, currency: 'CAD' },
        { date: '2026-01-20', amount: 275.00, currency: 'CAD' }
      ],
      notes: 'Chemistry lessons - advanced level'
    },
    {
      parentId: 'PARENT107890',
      parentName: 'Mohammed Family',
      childrenIds: ['MID107890', 'MID107891'],
      totalCompletedLessons: 14,
      totalLessonsValue: 630.00,
      totalPayments: 535.50,
      lastPaymentDate: '2026-02-08',
      currency: 'USD',
      discountPercent: 15,
      balance: -94.50,
      status: 'Partially Paid',
      paymentHistory: [
        { date: '2026-02-08', amount: 267.75, currency: 'USD' },
        { date: '2026-01-12', amount: 267.75, currency: 'USD' }
      ],
      notes: 'Family discount - 2 children'
    },
    {
      parentId: 'PARENT108901',
      parentName: 'Ahmed Khan Family',
      childrenIds: ['MID108901'],
      totalCompletedLessons: 6,
      totalLessonsValue: 360.00,
      totalPayments: 180.00,
      lastPaymentDate: '2026-01-05',
      currency: 'CAD',
      discountPercent: 0,
      balance: -180.00,
      status: 'Overdue',
      paymentHistory: [
        { date: '2026-01-05', amount: 180.00, currency: 'CAD' }
      ],
      notes: 'Payment overdue - follow up required'
    },
    {
      parentId: 'PARENT109012',
      parentName: 'Hassan Noor Family',
      childrenIds: ['MID109012'],
      totalCompletedLessons: 9,
      totalLessonsValue: 450.00,
      totalPayments: 450.00,
      lastPaymentDate: '2026-02-11',
      currency: 'USD',
      discountPercent: 0,
      balance: 0,
      status: 'Paid',
      paymentHistory: [
        { date: '2026-02-11', amount: 225.00, currency: 'USD' },
        { date: '2026-01-18', amount: 225.00, currency: 'USD' }
      ],
      notes: 'Biology lessons - consistent schedule'
    },
    {
      parentId: 'PARENT110123',
      parentName: 'Ali Fatima Family',
      childrenIds: ['MID110123', 'MID110124'],
      totalCompletedLessons: 18,
      totalLessonsValue: 18000.00,
      totalPayments: 15300.00,
      lastPaymentDate: '2026-02-09',
      currency: 'EGP',
      discountPercent: 15,
      balance: -2700.00,
      status: 'Partially Paid',
      paymentHistory: [
        { date: '2026-02-09', amount: 7650.00, currency: 'EGP' },
        { date: '2026-01-14', amount: 7650.00, currency: 'EGP' }
      ],
      notes: 'Two elementary students - family discount'
    },
    {
      parentId: 'PARENT111234',
      parentName: 'Brown Family',
      childrenIds: ['MID111234'],
      totalCompletedLessons: 4,
      totalLessonsValue: 200.00,
      totalPayments: 250.00,
      lastPaymentDate: '2026-02-01',
      currency: 'CAD',
      discountPercent: 0,
      balance: 50.00,
      status: 'Credit',
      paymentHistory: [
        { date: '2026-02-01', amount: 250.00, currency: 'CAD' }
      ],
      notes: 'Overpayment - credit to be applied to next month'
    },
    {
      parentId: 'PARENT112345',
      parentName: 'Smith Family',
      childrenIds: ['MID112345', 'MID112346'],
      totalCompletedLessons: 20,
      totalLessonsValue: 1000.00,
      totalPayments: 1000.00,
      lastPaymentDate: '2026-02-15',
      currency: 'USD',
      discountPercent: 0,
      balance: 0,
      status: 'Paid',
      paymentHistory: [
        { date: '2026-02-15', amount: 500.00, currency: 'USD' },
        { date: '2026-01-20', amount: 500.00, currency: 'USD' }
      ],
      notes: 'Two high school students - Math and Science'
    },
    {
      parentId: 'PARENT113456',
      parentName: 'Davis Family',
      childrenIds: ['MID113456'],
      totalCompletedLessons: 7,
      totalLessonsValue: 350.00,
      totalPayments: 150.00,
      lastPaymentDate: '2025-12-28',
      currency: 'CAD',
      discountPercent: 0,
      balance: -200.00,
      status: 'Overdue',
      paymentHistory: [
        { date: '2025-12-28', amount: 150.00, currency: 'CAD' }
      ],
      notes: 'Payment significantly overdue - urgent follow up needed'
    },
    {
      parentId: 'PARENT114567',
      parentName: 'Wilson Family',
      childrenIds: ['MID114567'],
      totalCompletedLessons: 11,
      totalLessonsValue: 440.00,
      totalPayments: 440.00,
      lastPaymentDate: '2026-02-13',
      currency: 'EUR',
      discountPercent: 0,
      balance: 0,
      status: 'Paid',
      paymentHistory: [
        { date: '2026-02-13', amount: 220.00, currency: 'EUR' },
        { date: '2026-01-16', amount: 220.00, currency: 'EUR' }
      ],
      notes: 'English lessons - excellent student progress'
    },
    {
      parentId: 'PARENT115678',
      parentName: 'Martinez Family',
      childrenIds: ['MID115678', 'MID115679', 'MID115680'],
      totalCompletedLessons: 30,
      totalLessonsValue: 1500.00,
      totalPayments: 1425.00,
      lastPaymentDate: '2026-02-16',
      currency: 'USD',
      discountPercent: 5,
      balance: -75.00,
      status: 'Partially Paid',
      paymentHistory: [
        { date: '2026-02-16', amount: 475.00, currency: 'USD' },
        { date: '2026-01-22', amount: 475.00, currency: 'USD' },
        { date: '2025-12-20', amount: 475.00, currency: 'USD' }
      ],
      notes: 'Three students - small family discount applied'
    },
    {
      parentId: 'PARENT116789',
      parentName: 'Garcia Family',
      childrenIds: ['MID116789'],
      totalCompletedLessons: 5,
      totalLessonsValue: 250.00,
      totalPayments: 100.00,
      lastPaymentDate: '2026-01-10',
      currency: 'CAD',
      discountPercent: 0,
      balance: -150.00,
      status: 'Overdue',
      paymentHistory: [
        { date: '2026-01-10', amount: 100.00, currency: 'CAD' }
      ],
      notes: 'New family - payment plan setup needed'
    }
  ];

  // Filter logic
  const filteredData = financialData.filter(parent => {
    const matchesSearch = 
      parent.parentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCurrency = !currencyFilter || parent.currency === currencyFilter;
    const matchesStatus = !statusFilter || parent.status === statusFilter;
    
    const balanceMin = balanceMinFilter ? parseFloat(balanceMinFilter) : -Infinity;
    const balanceMax = balanceMaxFilter ? parseFloat(balanceMaxFilter) : Infinity;
    const matchesBalance = parent.balance >= balanceMin && parent.balance <= balanceMax;
    
    const lastPaymentDate = new Date(parent.lastPaymentDate);
    const matchesDateFrom = !dateFromFilter || lastPaymentDate >= new Date(dateFromFilter);
    const matchesDateTo = !dateToFilter || lastPaymentDate <= new Date(dateToFilter);
    
    return matchesSearch && matchesCurrency && matchesStatus && matchesBalance && 
           matchesDateFrom && matchesDateTo;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Calculate KPIs
  const totalCompletedLessons = financialData.reduce((sum, p) => sum + p.totalCompletedLessons, 0);
  const totalLessonsValue = financialData.reduce((sum, p) => sum + p.totalLessonsValue, 0);
  const totalPaymentsReceived = financialData.reduce((sum, p) => sum + p.totalPayments, 0);
  const totalOutstandingBalance = financialData.reduce((sum, p) => sum + Math.abs(Math.min(p.balance, 0)), 0);
  const parentsWithNegativeBalance = financialData.filter(p => p.balance < 0).length;

  const toggleRowExpansion = (parentId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(parentId)) {
      newExpanded.delete(parentId);
    } else {
      newExpanded.add(parentId);
    }
    setExpandedRows(newExpanded);
  };

  const getBalanceColor = (balance: number): string => {
    if (balance > 0) return 'text-green-700 bg-green-50 border-green-200';
    if (balance < 0) return 'text-red-700 bg-red-50 border-red-200';
    return 'text-gray-700 bg-gray-50 border-gray-200';
  };

  const getStatusColor = (status: FinancialStatus): string => {
    const colors = {
      'Paid': 'bg-green-100 text-green-800',
      'Partially Paid': 'bg-yellow-100 text-yellow-800',
      'Overdue': 'bg-red-100 text-red-800',
      'Credit': 'bg-blue-100 text-blue-800',
    };
    return colors[status];
  };

  const getStatusIcon = (status: FinancialStatus) => {
    if (status === 'Overdue') return <AlertTriangle className="size-3" />;
    if (status === 'Credit') return <TrendingUp className="size-3" />;
    return null;
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Financial Report</h1>
            </div>
            <p className="text-gray-600">Parent-level financial summary and payment tracking</p>
          </div>
        </div>

        {/* Read-Only Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="size-5 text-blue-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="size-4 text-blue-700" />
                <h3 className="font-semibold text-blue-900">Financial Report - Read-Only</h3>
              </div>
              <p className="text-sm text-blue-800">
                This is a read-only financial report for auditing and monitoring purposes. All data is calculated from completed lessons and payment records. 
                No modifications can be made from this screen.
              </p>
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="size-5 text-blue-600" />
              <p className="text-sm font-medium text-gray-600">Total Completed Lessons</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalCompletedLessons.toLocaleString()}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="size-5 text-green-700" />
              <p className="text-sm font-medium text-green-700">Total Lessons Value</p>
            </div>
            <p className="text-2xl font-bold text-green-900">
              ${totalLessonsValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="size-5 text-blue-700" />
              <p className="text-sm font-medium text-blue-700">Total Payments Received</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              ${totalPaymentsReceived.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="size-5 text-red-700" />
              <p className="text-sm font-medium text-red-700">Total Outstanding Balance</p>
            </div>
            <p className="text-2xl font-bold text-red-900">
              ${totalOutstandingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="size-5 text-orange-700" />
              <p className="text-sm font-medium text-orange-700">Parents With Negative Balance</p>
            </div>
            <p className="text-2xl font-bold text-orange-900">{parentsWithNegativeBalance}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-600" />
              <h2 className="font-medium text-gray-900">Filters</h2>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Search Parent ID / Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="PARENT102938 or Hassan Family..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Currency
                </label>
                <select
                  value={currencyFilter}
                  onChange={(e) => setCurrencyFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Currencies</option>
                  {CURRENCIES.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Statuses</option>
                  {STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Balance Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={balanceMinFilter}
                    onChange={(e) => setBalanceMinFilter(e.target.value)}
                    placeholder="Min"
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={balanceMaxFilter}
                    onChange={(e) => setBalanceMaxFilter(e.target.value)}
                    placeholder="Max"
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last Payment From
                </label>
                <input
                  type="date"
                  value={dateFromFilter}
                  onChange={(e) => setDateFromFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last Payment To
                </label>
                <input
                  type="date"
                  value={dateToFilter}
                  onChange={(e) => setDateToFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrencyFilter('');
                    setStatusFilter('');
                    setBalanceMinFilter('');
                    setBalanceMaxFilter('');
                    setDateFromFilter('');
                    setDateToFilter('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Report Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="sticky left-0 z-20 bg-gray-50 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300">
                    <div className="flex items-center gap-1">
                      Parent ID
                      <Lock className="size-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="sticky left-[140px] z-20 bg-gray-50 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300">
                    Parent Name
                  </th>
                  <th className="bg-blue-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Children IDs</th>
                  <th className="bg-purple-50 text-right px-4 py-3 text-xs font-medium text-gray-700">Total Completed Lessons</th>
                  <th className="bg-green-50 text-right px-4 py-3 text-xs font-medium text-gray-700">Total Lessons Value</th>
                  <th className="bg-green-50 text-right px-4 py-3 text-xs font-medium text-gray-700">Total Payments</th>
                  <th className="bg-orange-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Last Payment Date</th>
                  <th className="bg-gray-100 text-left px-4 py-3 text-xs font-medium text-gray-700">Currency</th>
                  <th className="bg-yellow-50 text-right px-4 py-3 text-xs font-medium text-gray-700">Discount %</th>
                  <th className="bg-red-50 text-right px-4 py-3 text-xs font-medium text-gray-700">Balance</th>
                  <th className="bg-pink-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Status</th>
                  <th className="bg-gray-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Notes</th>
                  <th className="sticky right-0 z-20 bg-gray-50 text-left px-4 py-3 text-xs font-medium text-gray-700 border-l-2 border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map(parent => {
                  const isExpanded = expandedRows.has(parent.parentId);
                  
                  return (
                    <>
                      <tr key={parent.parentId} className="hover:bg-gray-50 transition-colors">
                        {/* Frozen: Parent ID */}
                        <td className="sticky left-0 z-10 bg-white px-4 py-3 border-r-2 border-gray-200 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleRowExpansion(parent.parentId)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              {isExpanded ? (
                                <ChevronUp className="size-4 text-gray-600" />
                              ) : (
                                <ChevronDown className="size-4 text-gray-600" />
                              )}
                            </button>
                            <span className="font-mono text-xs text-gray-900">{parent.parentId}</span>
                          </div>
                        </td>
                        
                        {/* Frozen: Parent Name */}
                        <td className="sticky left-[140px] z-10 bg-white px-4 py-3 border-r-2 border-gray-200 whitespace-nowrap">
                          <span className="font-medium text-sm text-gray-900">{parent.parentName}</span>
                        </td>
                        
                        {/* Children IDs */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {parent.childrenIds.slice(0, 2).map(childId => (
                              <span key={childId} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 font-mono">
                                {childId}
                              </span>
                            ))}
                            {parent.childrenIds.length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                +{parent.childrenIds.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        
                        {/* Total Completed Lessons */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">{parent.totalCompletedLessons}</span>
                        </td>
                        
                        {/* Total Lessons Value */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span className="text-sm font-mono text-gray-900">
                            ${parent.totalLessonsValue.toFixed(2)}
                          </span>
                        </td>
                        
                        {/* Total Payments */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span className="text-sm font-mono font-semibold text-green-700">
                            ${parent.totalPayments.toFixed(2)}
                          </span>
                        </td>
                        
                        {/* Last Payment Date */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Calendar className="size-3 text-gray-400" />
                            <span className="text-xs font-mono text-gray-700">{parent.lastPaymentDate}</span>
                          </div>
                        </td>
                        
                        {/* Currency */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                            {parent.currency}
                          </span>
                        </td>
                        
                        {/* Discount Percent */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span className={`text-sm font-semibold ${parent.discountPercent > 0 ? 'text-orange-700' : 'text-gray-500'}`}>
                            {parent.discountPercent}%
                          </span>
                        </td>
                        
                        {/* Balance */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-bold font-mono border ${getBalanceColor(parent.balance)}`}>
                            {parent.balance > 0 ? '+' : ''}{parent.balance.toFixed(2)}
                          </span>
                        </td>
                        
                        {/* Status */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium gap-1 ${getStatusColor(parent.status)}`}>
                            {getStatusIcon(parent.status)}
                            {parent.status}
                          </span>
                        </td>
                        
                        {/* Notes */}
                        <td className="px-4 py-3 max-w-xs">
                          <span className="text-xs text-gray-600 line-clamp-2">{parent.notes}</span>
                        </td>
                        
                        {/* Actions */}
                        <td className="sticky right-0 z-10 bg-white px-4 py-3 border-l-2 border-gray-200 whitespace-nowrap">
                          <Link
                            to={`/parents/${parent.parentId}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-xs font-medium"
                          >
                            <Eye className="size-3" />
                            View
                          </Link>
                        </td>
                      </tr>
                      
                      {/* Expandable Row Details */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={13} className="bg-gray-50 px-4 py-4 border-b border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Children Details */}
                              <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <Users className="size-4 text-blue-600" />
                                  <h4 className="font-semibold text-sm text-gray-900">Children Enrolled</h4>
                                </div>
                                <div className="space-y-2">
                                  {parent.childrenIds.map(childId => (
                                    <Link
                                      key={childId}
                                      to={`/students/${childId}`}
                                      className="block px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                                    >
                                      <span className="text-xs font-mono text-blue-900">{childId}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Payment History */}
                              <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <Receipt className="size-4 text-green-600" />
                                  <h4 className="font-semibold text-sm text-gray-900">Payment History</h4>
                                </div>
                                <div className="space-y-2">
                                  {parent.paymentHistory.map((payment, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-3 py-2 bg-green-50 rounded border border-green-200">
                                      <span className="text-xs text-gray-600">{payment.date}</span>
                                      <span className="text-xs font-mono font-semibold text-green-900">
                                        ${payment.amount.toFixed(2)} {payment.currency}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Summary */}
                              <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <DollarSign className="size-4 text-purple-600" />
                                  <h4 className="font-semibold text-sm text-gray-900">Financial Summary</h4>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-xs text-gray-600">Lessons Value:</span>
                                    <span className="text-sm font-mono font-semibold text-gray-900">
                                      ${parent.totalLessonsValue.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-xs text-gray-600">Total Paid:</span>
                                    <span className="text-sm font-mono font-semibold text-green-700">
                                      ${parent.totalPayments.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                    <span className="text-xs text-gray-600">Discount:</span>
                                    <span className="text-sm font-semibold text-orange-700">
                                      {parent.discountPercent}%
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm font-semibold text-gray-900">Balance:</span>
                                    <span className={`text-base font-bold font-mono ${
                                      parent.balance > 0 ? 'text-green-700' : 
                                      parent.balance < 0 ? 'text-red-700' : 'text-gray-700'
                                    }`}>
                                      {parent.balance > 0 ? '+' : ''}{parent.balance.toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>

            {/* Empty State */}
            {paginatedData.length === 0 && (
              <div className="text-center py-12 bg-gray-50">
                <DollarSign className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No financial records found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {paginatedData.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} parents
              </p>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="size-4" />
                </button>
                
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Financial Report Notes</p>
              <p>
                This report is automatically calculated from completed lessons and recorded payments. All data is read-only for audit compliance.
                Balance is calculated as: Total Payments - (Total Lessons Value - Discounts). Negative balance indicates outstanding amount owed.
                For payment collection or adjustments, please use the Payments management section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
