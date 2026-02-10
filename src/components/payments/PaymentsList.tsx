import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Receipt,
  Edit3,
  Save,
  X,
  AlertCircle,
  Check,
  DollarSign,
  Calendar,
  UserCog
} from 'lucide-react';

type Payment = {
  id: string;
  parentId: string;
  parentName: string;
  paymentDate: string;
  amount: number;
  currency: string;
  note: string;
};

type Parent = {
  id: string;
  name: string;
};

const CURRENCIES = ['CAD', 'USD', 'EUR', 'EGP'];

export function PaymentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [parentIdFilter, setParentIdFilter] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [amountMinFilter, setAmountMinFilter] = useState('');
  const [amountMaxFilter, setAmountMaxFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRows, setEditingRows] = useState<Set<string>>(new Set());
  const [editedData, setEditedData] = useState<Record<string, Partial<Payment>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const itemsPerPage = 10;

  // Mock parents data for dropdown
  const mockParents: Parent[] = [
    { id: 'PARENT102938', name: 'Abdullah Al-Saud' },
    { id: 'PARENT103456', name: 'Fatima Hassan' },
    { id: 'PARENT104567', name: 'Mohammed Ali' },
    { id: 'PARENT105678', name: 'Sara Ibrahim' },
    { id: 'PARENT106789', name: 'Omar Abdullah' },
    { id: 'PARENT107890', name: 'Layla Mohammed' },
    { id: 'PARENT108901', name: 'Yousef Ahmad' },
    { id: 'PARENT109012', name: 'Maryam Khalid' },
    { id: 'PARENT110123', name: 'Ali Hassan' },
    { id: 'PARENT111234', name: 'Nora Salem' },
  ];

  // Mock payments data
  const [payments, setPayments] = useState<Payment[]>([
    { 
      id: 'PAY001234', 
      parentId: 'PARENT102938', 
      parentName: 'Abdullah Al-Saud',
      paymentDate: '2026-02-05', 
      amount: 450.00, 
      currency: 'CAD', 
      note: 'Monthly tuition - February' 
    },
    { 
      id: 'PAY001235', 
      parentId: 'PARENT103456', 
      parentName: 'Fatima Hassan',
      paymentDate: '2026-02-04', 
      amount: 380.00, 
      currency: 'USD', 
      note: 'Monthly tuition' 
    },
    { 
      id: 'PAY001236', 
      parentId: 'PARENT104567', 
      parentName: 'Mohammed Ali',
      paymentDate: '2026-02-03', 
      amount: 1200.00, 
      currency: 'EGP', 
      note: 'Quarterly payment' 
    },
    { 
      id: 'PAY001237', 
      parentId: 'PARENT105678', 
      parentName: 'Sara Ibrahim',
      paymentDate: '2026-02-02', 
      amount: 500.00, 
      currency: 'CAD', 
      note: 'Monthly tuition - February - 2 students' 
    },
    { 
      id: 'PAY001238', 
      parentId: 'PARENT106789', 
      parentName: 'Omar Abdullah',
      paymentDate: '2026-02-01', 
      amount: 320.00, 
      currency: 'USD', 
      note: 'Monthly tuition with discount' 
    },
    { 
      id: 'PAY001239', 
      parentId: 'PARENT107890', 
      parentName: 'Layla Mohammed',
      paymentDate: '2026-01-30', 
      amount: 675.00, 
      currency: 'CAD', 
      note: 'Monthly tuition - 3 students' 
    },
    { 
      id: 'PAY001240', 
      parentId: 'PARENT108901', 
      parentName: 'Yousef Ahmad',
      paymentDate: '2026-01-29', 
      amount: 425.00, 
      currency: 'USD', 
      note: 'Monthly tuition - January' 
    },
    { 
      id: 'PAY001241', 
      parentId: 'PARENT109012', 
      parentName: 'Maryam Khalid',
      paymentDate: '2026-01-28', 
      amount: 600.00, 
      currency: 'EUR', 
      note: 'Monthly tuition - 2 students with discount' 
    },
    { 
      id: 'PAY001242', 
      parentId: 'PARENT110123', 
      parentName: 'Ali Hassan',
      paymentDate: '2026-01-27', 
      amount: 400.00, 
      currency: 'CAD', 
      note: 'Monthly tuition' 
    },
    { 
      id: 'PAY001243', 
      parentId: 'PARENT111234', 
      parentName: 'Nora Salem',
      paymentDate: '2026-01-26', 
      amount: 350.00, 
      currency: 'USD', 
      note: 'Monthly tuition - January' 
    },
    { 
      id: 'PAY001244', 
      parentId: 'PARENT102938', 
      parentName: 'Abdullah Al-Saud',
      paymentDate: '2026-01-05', 
      amount: 450.00, 
      currency: 'CAD', 
      note: 'Monthly tuition - January' 
    },
    { 
      id: 'PAY001245', 
      parentId: 'PARENT103456', 
      parentName: 'Fatima Hassan',
      paymentDate: '2026-01-04', 
      amount: 380.00, 
      currency: 'USD', 
      note: 'Monthly tuition - January' 
    },
  ]);

  // Filter logic
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesParent = !parentIdFilter || payment.parentId === parentIdFilter;
    
    const matchesCurrency = !currencyFilter || payment.currency === currencyFilter;
    
    const paymentDate = new Date(payment.paymentDate);
    const matchesDateFrom = !dateFromFilter || paymentDate >= new Date(dateFromFilter);
    const matchesDateTo = !dateToFilter || paymentDate <= new Date(dateToFilter);
    
    const minAmount = amountMinFilter ? parseFloat(amountMinFilter) : 0;
    const maxAmount = amountMaxFilter ? parseFloat(amountMaxFilter) : Infinity;
    const matchesAmount = payment.amount >= minAmount && payment.amount <= maxAmount;
    
    return matchesSearch && matchesParent && matchesCurrency && matchesDateFrom && matchesDateTo && matchesAmount;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

  const toggleEditMode = (paymentId: string) => {
    const newEditingRows = new Set(editingRows);
    if (newEditingRows.has(paymentId)) {
      newEditingRows.delete(paymentId);
      // Clear edited data for this row
      const newEditedData = { ...editedData };
      delete newEditedData[paymentId];
      setEditedData(newEditedData);
      
      // Clear errors for this row
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(paymentId)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    } else {
      newEditingRows.add(paymentId);
    }
    setEditingRows(newEditingRows);
  };

  const handleCellChange = (paymentId: string, field: keyof Payment, value: any) => {
    setEditedData({
      ...editedData,
      [paymentId]: {
        ...editedData[paymentId],
        [field]: value,
      }
    });

    // Clear error for this field when user starts editing
    const errorKey = `${paymentId}-${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const getCellValue = (payment: Payment, field: keyof Payment) => {
    if (editedData[payment.id] && field in editedData[payment.id]) {
      return editedData[payment.id][field];
    }
    return payment[field];
  };

  const validateChanges = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(editedData).forEach(([paymentId, data]) => {
      // Validate amount
      if ('amount' in data) {
        const amount = data.amount as number;
        if (amount <= 0) {
          newErrors[`${paymentId}-amount`] = 'Amount must be greater than 0';
        }
        if (isNaN(amount)) {
          newErrors[`${paymentId}-amount`] = 'Must be a valid number';
        }
      }

      // Validate parent ID exists
      if ('parentId' in data) {
        const parentId = data.parentId as string;
        const parentExists = mockParents.some(p => p.id === parentId);
        if (!parentExists) {
          newErrors[`${paymentId}-parentId`] = 'Parent ID must reference an existing parent';
        }
      }

      // Validate currency
      if ('currency' in data) {
        const currency = data.currency as string;
        if (!CURRENCIES.includes(currency)) {
          newErrors[`${paymentId}-currency`] = 'Invalid currency';
        }
      }

      // Validate date
      if ('paymentDate' in data) {
        const date = data.paymentDate as string;
        if (!date || date.trim().length === 0) {
          newErrors[`${paymentId}-paymentDate`] = 'Payment date is required';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = () => {
    if (!validateChanges()) {
      return;
    }

    // Apply changes to payments
    const updatedPayments = payments.map(payment => {
      if (editedData[payment.id]) {
        const updates = editedData[payment.id];
        const result = { ...payment, ...updates };
        
        // Update parent name if parent ID changed
        if ('parentId' in updates) {
          const parent = mockParents.find(p => p.id === updates.parentId);
          if (parent) {
            result.parentName = parent.name;
          }
        }
        
        return result;
      }
      return payment;
    });

    setPayments(updatedPayments);
    setEditedData({});
    setEditingRows(new Set());
    setErrors({});
  };

  const handleDiscardChanges = () => {
    setEditedData({});
    setEditingRows(new Set());
    setErrors({});
  };

  const hasChanges = Object.keys(editedData).length > 0;

  // Calculate stats
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const thisMonthPayments = payments.filter(p => {
    const date = new Date(p.paymentDate);
    return date.getMonth() === 1 && date.getFullYear() === 2026; // February 2026
  });
  const thisMonthAmount = thisMonthPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Payments</h1>
            </div>
            <p className="text-gray-600">Manage payment records and financial transactions</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Payments</p>
            <p className="text-2xl font-semibold text-gray-900">{payments.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-2xl font-semibold text-green-700">
              ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-2xl font-semibold text-blue-700">
              ${thisMonthAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Editing</p>
            <p className="text-2xl font-semibold text-orange-700">{editingRows.size}</p>
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
              {/* Search by Payment ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Search Payment ID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="PAY001234..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
                  />
                </div>
              </div>

              {/* Filter by Parent ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Filter by Parent
                </label>
                <select
                  value={parentIdFilter}
                  onChange={(e) => setParentIdFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Parents</option>
                  {mockParents.map(parent => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name} ({parent.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Filter by Currency
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date From
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="date"
                    value={dateFromFilter}
                    onChange={(e) => setDateFromFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date To
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="date"
                    value={dateToFilter}
                    onChange={(e) => setDateToFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Amount Min */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Min Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amountMinFilter}
                    onChange={(e) => setAmountMinFilter(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Amount Max */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Max Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amountMaxFilter}
                    onChange={(e) => setAmountMaxFilter(e.target.value)}
                    placeholder="No limit"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Payment ID
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Parent
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Payment Date
                  </th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-700">
                    Amount
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Currency
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Note
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedPayments.map(payment => {
                  const isEditing = editingRows.has(payment.id);
                  const hasEdits = !!editedData[payment.id];
                  
                  return (
                    <tr 
                      key={payment.id} 
                      className={`hover:bg-gray-50 transition-colors ${hasEdits ? 'bg-blue-50' : ''}`}
                    >
                      {/* Payment ID - Read-only */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-gray-900">{payment.id}</span>
                          {isEditing && (
                            <Edit3 className="size-3 text-blue-600" />
                          )}
                        </div>
                      </td>

                      {/* Parent ID & Name */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div>
                            <select
                              value={getCellValue(payment, 'parentId')}
                              onChange={(e) => {
                                const selectedParent = mockParents.find(p => p.id === e.target.value);
                                handleCellChange(payment.id, 'parentId', e.target.value);
                                if (selectedParent) {
                                  handleCellChange(payment.id, 'parentName', selectedParent.name);
                                }
                              }}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${
                                errors[`${payment.id}-parentId`] ? 'border-red-500' : 'border-blue-300'
                              }`}
                            >
                              {mockParents.map(parent => (
                                <option key={parent.id} value={parent.id}>
                                  {parent.name} ({parent.id})
                                </option>
                              ))}
                            </select>
                            {errors[`${payment.id}-parentId`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`${payment.id}-parentId`]}</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <div className="font-medium text-gray-900">{payment.parentName}</div>
                            <div className="text-sm text-gray-500 font-mono">{payment.parentId}</div>
                          </div>
                        )}
                      </td>

                      {/* Payment Date */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div>
                            <input
                              type="date"
                              value={getCellValue(payment, 'paymentDate')}
                              onChange={(e) => handleCellChange(payment.id, 'paymentDate', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${
                                errors[`${payment.id}-paymentDate`] ? 'border-red-500' : 'border-blue-300'
                              }`}
                            />
                            {errors[`${payment.id}-paymentDate`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`${payment.id}-paymentDate`]}</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-900">
                            {new Date(payment.paymentDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 text-right">
                        {isEditing ? (
                          <div>
                            <input
                              type="number"
                              min="0.01"
                              step="0.01"
                              value={getCellValue(payment, 'amount')}
                              onChange={(e) => handleCellChange(payment.id, 'amount', parseFloat(e.target.value) || 0)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-right font-mono ${
                                errors[`${payment.id}-amount`] ? 'border-red-500' : 'border-blue-300'
                              }`}
                            />
                            {errors[`${payment.id}-amount`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`${payment.id}-amount`]}</p>
                            )}
                          </div>
                        ) : (
                          <span className="font-semibold text-gray-900 font-mono">
                            {payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        )}
                      </td>

                      {/* Currency */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div>
                            <select
                              value={getCellValue(payment, 'currency')}
                              onChange={(e) => handleCellChange(payment.id, 'currency', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm ${
                                errors[`${payment.id}-currency`] ? 'border-red-500' : 'border-blue-300'
                              }`}
                            >
                              {CURRENCIES.map(currency => (
                                <option key={currency} value={currency}>{currency}</option>
                              ))}
                            </select>
                            {errors[`${payment.id}-currency`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`${payment.id}-currency`]}</p>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 font-mono">
                            {payment.currency}
                          </span>
                        )}
                      </td>

                      {/* Note */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={getCellValue(payment, 'note')}
                            onChange={(e) => handleCellChange(payment.id, 'note', e.target.value)}
                            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Add a note..."
                          />
                        ) : (
                          <span className="text-sm text-gray-600">{payment.note}</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleEditMode(payment.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                              isEditing 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                          >
                            {isEditing ? (
                              <>
                                <Check className="size-4" />
                                Done
                              </>
                            ) : (
                              <>
                                <Edit3 className="size-4" />
                                Edit
                              </>
                            )}
                          </button>
                          <Link
                            to={`/payments/${payment.id}`}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-1"
                          >
                            <Eye className="size-4" />
                            View
                          </Link>
                          <Link
                            to={`/parents/${payment.parentId}`}
                            className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium flex items-center gap-1"
                          >
                            <UserCog className="size-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Empty State */}
            {paginatedPayments.length === 0 && (
              <div className="text-center py-12 bg-gray-50">
                <Receipt className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No payments found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {paginatedPayments.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPayments.length)} of {filteredPayments.length} payments
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
      </div>

      {/* Sticky Save/Discard Bar */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="size-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Unsaved Changes</p>
                  <p className="text-sm text-gray-600">
                    {Object.keys(editedData).length} payment{Object.keys(editedData).length > 1 ? 's' : ''} modified
                  </p>
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="size-4 text-red-700" />
                  <span className="text-sm text-red-700 font-medium">
                    Please fix validation errors before saving
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDiscardChanges}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                >
                  <X className="size-4" />
                  Discard
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Save className="size-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
