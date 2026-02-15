import { useState } from 'react';
import { 
  UserX,
  TrendingDown,
  BookOpen,
  DollarSign,
  Clock,
  AlertTriangle,
  Filter,
  Search,
  Eye,
  Calendar,
  MapPin,
  Globe,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  CreditCard,
  FileText,
  Award
} from 'lucide-react';

type StageLevel = 'Elementary' | 'Middle' | 'High';

type DroppedStudent = {
  studentId: string;
  studentName: string;
  stage: string;
  stageLevel: StageLevel;
  country: string;
  city: string;
  timezone: string;
  parentId: string;
  dateOfActive: string;
  dateOfDrop: string;
  durationDays: number;
  completedLessonsCount: number;
  totalPaidAmount: number;
  currency: string;
  lastPaymentDate: string;
  teacherNames: string[];
  dropReason: string;
  notes: string;
};

export function DroppedStudentsReport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [stageLevelFilter, setStageLevelFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [dropDateFrom, setDropDateFrom] = useState('');
  const [dropDateTo, setDropDateTo] = useState('');
  const [paidAmountMin, setPaidAmountMin] = useState('');
  const [paidAmountMax, setPaidAmountMax] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<DroppedStudent | null>(null);
  const itemsPerPage = 10;

  // Mock data
  const droppedStudentsData: DroppedStudent[] = [
    {
      studentId: 'MID123001',
      studentName: 'Khalid Ahmed',
      stage: 'Grade 9',
      stageLevel: 'Middle',
      country: 'Saudi Arabia',
      city: 'Riyadh',
      timezone: 'UTC+3',
      parentId: 'PAR90001',
      dateOfActive: '2023-09-01',
      dateOfDrop: '2024-01-15',
      durationDays: 136,
      completedLessonsCount: 12,
      totalPaidAmount: 2400,
      currency: 'CAD',
      lastPaymentDate: '2024-01-05',
      teacherNames: ['Sarah Johnson', 'Michael Chen'],
      dropReason: 'Scheduling conflicts',
      notes: 'Parent mentioned time zone issues'
    },
    {
      studentId: 'MID123002',
      studentName: 'Aisha Mohammed',
      stage: 'Grade 11',
      stageLevel: 'High',
      country: 'UAE',
      city: 'Dubai',
      timezone: 'UTC+4',
      parentId: 'PAR90002',
      dateOfActive: '2023-08-15',
      dateOfDrop: '2024-01-20',
      durationDays: 158,
      completedLessonsCount: 8,
      totalPaidAmount: 1600,
      currency: 'CAD',
      lastPaymentDate: '2023-12-20',
      teacherNames: ['Emily Rodriguez'],
      dropReason: 'Financial reasons',
      notes: 'Requested to pause but decided to drop'
    },
    {
      studentId: 'MID123003',
      studentName: 'Omar Hassan',
      stage: 'Grade 7',
      stageLevel: 'Middle',
      country: 'Egypt',
      city: 'Cairo',
      timezone: 'UTC+2',
      parentId: 'PAR90003',
      dateOfActive: '2023-10-01',
      dateOfDrop: '',
      durationDays: 106,
      completedLessonsCount: 5,
      totalPaidAmount: 1000,
      currency: 'USD',
      lastPaymentDate: '2023-11-15',
      teacherNames: ['David Thompson', 'Sarah Johnson'],
      dropReason: '',
      notes: 'Lost contact - no drop date recorded'
    },
    {
      studentId: 'MID123004',
      studentName: 'Fatima Ali',
      stage: 'Grade 10',
      stageLevel: 'High',
      country: 'Kuwait',
      city: 'Kuwait City',
      timezone: 'UTC+3',
      parentId: 'PAR90004',
      dateOfActive: '2023-07-20',
      dateOfDrop: '2024-01-10',
      durationDays: 174,
      completedLessonsCount: 18,
      totalPaidAmount: 3600,
      currency: 'CAD',
      lastPaymentDate: '2024-01-02',
      teacherNames: ['Michael Chen', 'Emily Rodriguez', 'Sarah Johnson'],
      dropReason: 'Found local tutor',
      notes: 'Very satisfied with service but prefers in-person'
    },
    {
      studentId: 'MID123005',
      studentName: 'Youssef Ibrahim',
      stage: 'Grade 8',
      stageLevel: 'Middle',
      country: 'Saudi Arabia',
      city: 'Jeddah',
      timezone: 'UTC+3',
      parentId: 'PAR90005',
      dateOfActive: '2023-11-01',
      dateOfDrop: '2024-01-25',
      durationDays: 85,
      completedLessonsCount: 6,
      totalPaidAmount: 1200,
      currency: 'SAR',
      lastPaymentDate: '2023-12-28',
      teacherNames: ['David Thompson'],
      dropReason: 'Student not interested',
      notes: 'Parent mentioned low engagement'
    },
    {
      studentId: 'MID123006',
      studentName: 'Layla Khalid',
      stage: 'Grade 12',
      stageLevel: 'High',
      country: 'Qatar',
      city: 'Doha',
      timezone: 'UTC+3',
      parentId: 'PAR90006',
      dateOfActive: '2023-06-15',
      dateOfDrop: '2024-01-05',
      durationDays: 204,
      completedLessonsCount: 24,
      totalPaidAmount: 4800,
      currency: 'CAD',
      lastPaymentDate: '2023-12-30',
      teacherNames: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Thompson'],
      dropReason: 'Graduated - no longer needed',
      notes: 'Completed objectives successfully'
    },
    {
      studentId: 'MID123007',
      studentName: 'Mohammed Salem',
      stage: 'Grade 6',
      stageLevel: 'Middle',
      country: 'Bahrain',
      city: 'Manama',
      timezone: 'UTC+3',
      parentId: 'PAR90007',
      dateOfActive: '2023-09-10',
      dateOfDrop: '2024-01-12',
      durationDays: 124,
      completedLessonsCount: 10,
      totalPaidAmount: 2000,
      currency: 'CAD',
      lastPaymentDate: '2024-01-01',
      teacherNames: ['Emily Rodriguez', 'David Thompson'],
      dropReason: 'Dissatisfied with teaching',
      notes: 'Requested teacher change but then decided to leave'
    },
    {
      studentId: 'MID123008',
      studentName: 'Nour Abdullah',
      stage: 'Grade 11',
      stageLevel: 'High',
      country: 'UAE',
      city: 'Abu Dhabi',
      timezone: 'UTC+4',
      parentId: 'PAR90008',
      dateOfActive: '2023-08-01',
      dateOfDrop: '2024-01-18',
      durationDays: 170,
      completedLessonsCount: 15,
      totalPaidAmount: 3000,
      currency: 'AED',
      lastPaymentDate: '2024-01-10',
      teacherNames: ['Michael Chen', 'Sarah Johnson'],
      dropReason: 'Too expensive',
      notes: 'Budget constraints mentioned'
    },
    {
      studentId: 'MID123009',
      studentName: 'Huda Mansour',
      stage: 'Grade 9',
      stageLevel: 'Middle',
      country: 'Egypt',
      city: 'Alexandria',
      timezone: 'UTC+2',
      parentId: 'PAR90009',
      dateOfActive: '2023-10-15',
      dateOfDrop: '2024-01-22',
      durationDays: 99,
      completedLessonsCount: 7,
      totalPaidAmount: 1400,
      currency: 'USD',
      lastPaymentDate: '2023-12-18',
      teacherNames: ['David Thompson', 'Emily Rodriguez'],
      dropReason: 'Technical issues',
      notes: 'Persistent connection problems'
    },
    {
      studentId: 'MID123010',
      studentName: 'Ahmed Yousef',
      stage: 'Grade 10',
      stageLevel: 'High',
      country: 'Saudi Arabia',
      city: 'Dammam',
      timezone: 'UTC+3',
      parentId: 'PAR90010',
      dateOfActive: '2023-07-01',
      dateOfDrop: '2024-01-08',
      durationDays: 191,
      completedLessonsCount: 20,
      totalPaidAmount: 4000,
      currency: 'CAD',
      lastPaymentDate: '2023-12-25',
      teacherNames: ['Sarah Johnson', 'Michael Chen'],
      dropReason: 'Relocated to different country',
      notes: 'Family moved, time zone no longer compatible'
    },
  ];

  const teachers = [
    { id: 'TCH001', name: 'Sarah Johnson' },
    { id: 'TCH002', name: 'Michael Chen' },
    { id: 'TCH003', name: 'Emily Rodriguez' },
    { id: 'TCH004', name: 'David Thompson' }
  ];

  const countries = [...new Set(droppedStudentsData.map(s => s.country))];

  // Calculate KPIs
  const totalDropped = droppedStudentsData.length;
  const totalLessons = droppedStudentsData.reduce((sum, s) => sum + s.completedLessonsCount, 0);
  const avgLessons = totalDropped > 0 ? (totalLessons / totalDropped).toFixed(1) : '0';
  const totalPaid = droppedStudentsData.reduce((sum, s) => sum + s.totalPaidAmount, 0);
  const avgDuration = totalDropped > 0 
    ? Math.round(droppedStudentsData.reduce((sum, s) => sum + s.durationDays, 0) / totalDropped)
    : 0;
  
  // Calculate most common drop reason
  const reasonCounts: Record<string, number> = {};
  droppedStudentsData.forEach(student => {
    if (student.dropReason) {
      reasonCounts[student.dropReason] = (reasonCounts[student.dropReason] || 0) + 1;
    }
  });
  const mostCommonReason = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1])[0];

  // Filter logic
  const filteredStudents = droppedStudentsData.filter(student => {
    const matchesSearch = 
      searchQuery === '' ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = !countryFilter || student.country === countryFilter;
    const matchesStageLevel = !stageLevelFilter || student.stageLevel === stageLevelFilter;
    const matchesTeacher = !teacherFilter || student.teacherNames.includes(teacherFilter);
    
    const matchesDropDateRange = (!dropDateFrom || !student.dateOfDrop || student.dateOfDrop >= dropDateFrom) &&
                                  (!dropDateTo || !student.dateOfDrop || student.dateOfDrop <= dropDateTo);
    
    const matchesPaidRange = (!paidAmountMin || student.totalPaidAmount >= parseFloat(paidAmountMin)) &&
                             (!paidAmountMax || student.totalPaidAmount <= parseFloat(paidAmountMax));
    
    return matchesSearch && matchesCountry && matchesStageLevel && matchesTeacher && 
           matchesDropDateRange && matchesPaidRange;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number, currency: string): string => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <UserX className="size-6 text-red-600" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Dropped Students Report
            </h1>
          </div>
          <p className="text-gray-600">
            Comprehensive retention analysis and financial metrics for dropped students
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {/* Total Dropped Students */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-red-100 rounded-lg flex items-center justify-center">
                <UserX className="size-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalDropped}</h3>
            <p className="text-sm text-gray-600">Total Dropped Students</p>
            <p className="text-xs text-gray-500 mt-2">Status: Drop</p>
          </div>

          {/* Avg Lessons Before Drop */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen className="size-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{avgLessons}</h3>
            <p className="text-sm text-gray-600">Avg Lessons Before Drop</p>
            <p className="text-xs text-gray-500 mt-2">Average engagement</p>
          </div>

          {/* Total Paid Amount */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="size-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">${totalPaid.toLocaleString()}</h3>
            <p className="text-sm text-gray-600">Total Paid Amount</p>
            <p className="text-xs text-gray-500 mt-2">Revenue from dropped students</p>
          </div>

          {/* Avg Duration */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="size-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{avgDuration}</h3>
            <p className="text-sm text-gray-600">Avg Duration (days)</p>
            <p className="text-xs text-gray-500 mt-2">Time in academy</p>
          </div>

          {/* Most Common Drop Reason */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="size-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 min-h-[56px]">
              {mostCommonReason?.[0] || 'Not specified'}
            </h3>
            <p className="text-sm text-gray-600">Most Common Reason</p>
            <p className="text-xs text-gray-500 mt-2">{mostCommonReason?.[1] || 0} occurrences</p>
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
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Student ID, Name, Parent ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Country Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Country
                </label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Stage Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stage Level
                </label>
                <select
                  value={stageLevelFilter}
                  onChange={(e) => setStageLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Stages</option>
                  <option value="Elementary">Elementary</option>
                  <option value="Middle">Middle</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Teacher Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Teacher
                </label>
                <select
                  value={teacherFilter}
                  onChange={(e) => setTeacherFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Teachers</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Drop Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Drop Date From
                </label>
                <input
                  type="date"
                  value={dropDateFrom}
                  onChange={(e) => setDropDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Drop Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Drop Date To
                </label>
                <input
                  type="date"
                  value={dropDateTo}
                  onChange={(e) => setDropDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Paid Amount Min */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Min Paid Amount
                </label>
                <input
                  type="number"
                  value={paidAmountMin}
                  onChange={(e) => setPaidAmountMin(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Paid Amount Max */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Max Paid Amount
                </label>
                <input
                  type="number"
                  value={paidAmountMax}
                  onChange={(e) => setPaidAmountMax(e.target.value)}
                  placeholder="10000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredStudents.length)}</span> of{' '}
            <span className="font-semibold text-gray-900">{filteredStudents.length}</span> dropped students
          </p>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  {/* Frozen Columns */}
                  <th className="sticky left-0 bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r border-gray-200 min-w-[120px]">
                    Student ID
                  </th>
                  <th className="sticky left-[120px] bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300 min-w-[150px]">
                    Student Name
                  </th>

                  {/* Scrollable Columns */}
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[100px]">Stage</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Country</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">City</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[90px]">Timezone</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Parent ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Date of Active</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 bg-red-50 min-w-[130px]">Date of Drop</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 bg-blue-50 min-w-[110px]">Duration (Days)</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 bg-orange-50 min-w-[120px]">Lessons Count</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-700 bg-green-50 min-w-[150px]">Total Paid</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[80px]">Currency</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[140px]">Last Payment</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[200px]">Teachers</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[180px]">Drop Reason</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[200px]">Notes</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 min-w-[80px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedStudents.map(student => {
                  const missingDropDate = !student.dateOfDrop;
                  
                  return (
                    <tr 
                      key={student.studentId}
                      className={`transition-colors ${
                        missingDropDate ? 'bg-orange-50 hover:bg-orange-100' : 'hover:bg-gray-50'
                      }`}
                    >
                      {/* Student ID - Frozen */}
                      <td className="sticky left-0 bg-white px-4 py-3 text-sm font-mono text-gray-900 border-r border-gray-200">
                        {student.studentId}
                      </td>

                      {/* Student Name - Frozen */}
                      <td className="sticky left-[120px] bg-white px-4 py-3 text-sm font-medium text-gray-900 border-r-2 border-gray-300">
                        <div className="flex items-center gap-2">
                          <UserCircle className="size-4 text-gray-400" />
                          {student.studentName}
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Drop
                          </span>
                        </div>
                      </td>

                      {/* Stage */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <GraduationCap className="size-4 text-gray-400" />
                          {student.stage}
                        </div>
                      </td>

                      {/* Country */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <MapPin className="size-4 text-gray-400" />
                          {student.country}
                        </div>
                      </td>

                      {/* City */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {student.city}
                      </td>

                      {/* Timezone */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <Globe className="size-4 text-gray-400" />
                          <span className="font-mono text-xs">{student.timezone}</span>
                        </div>
                      </td>

                      {/* Parent ID */}
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">
                        {student.parentId}
                      </td>

                      {/* Date of Active */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-4 text-green-500" />
                          {formatDate(student.dateOfActive)}
                        </div>
                      </td>

                      {/* Date of Drop - Highlighted */}
                      <td className="px-4 py-3 text-sm bg-red-50">
                        {missingDropDate ? (
                          <div className="flex items-center gap-1 text-orange-700">
                            <AlertTriangle className="size-4" />
                            <span className="font-semibold">Missing</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-red-700">
                            <Calendar className="size-4" />
                            {formatDate(student.dateOfDrop)}
                          </div>
                        )}
                      </td>

                      {/* Duration Days */}
                      <td className="px-4 py-3 text-sm bg-blue-50 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Clock className="size-4 text-blue-600" />
                          <span className="font-semibold text-blue-900">{student.durationDays}</span>
                        </div>
                      </td>

                      {/* Completed Lessons Count */}
                      <td className="px-4 py-3 text-sm bg-orange-50 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <BookOpen className="size-4 text-orange-600" />
                          <span className="font-semibold text-orange-900">{student.completedLessonsCount}</span>
                        </div>
                      </td>

                      {/* Total Paid Amount */}
                      <td className="px-4 py-3 text-sm bg-green-50 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign className="size-4 text-green-600" />
                          <span className="font-semibold text-green-900">
                            {student.totalPaidAmount.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      {/* Currency */}
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">
                        {student.currency}
                      </td>

                      {/* Last Payment Date */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <CreditCard className="size-4 text-gray-400" />
                          {formatDate(student.lastPaymentDate)}
                        </div>
                      </td>

                      {/* Teachers */}
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {student.teacherNames.slice(0, 3).map((teacher, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                            >
                              {teacher}
                            </span>
                          ))}
                          {student.teacherNames.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                              +{student.teacherNames.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Drop Reason */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {student.dropReason ? (
                          <div className="flex items-center gap-1">
                            <FileText className="size-4 text-gray-400 flex-shrink-0" />
                            <span className="line-clamp-2">{student.dropReason}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">No reason specified</span>
                        )}
                      </td>

                      {/* Notes */}
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div className="line-clamp-2">
                          {student.notes || <span className="text-gray-400 italic">No notes</span>}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-sm text-center">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="size-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-12 bg-gray-50">
                <UserX className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No dropped students found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex flex-wrap items-center gap-6 text-xs">
              <p className="font-medium text-gray-700 mr-2">Visual Indicators:</p>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-red-50 border border-red-200 rounded"></div>
                <span className="text-gray-600">Drop Date Column</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-orange-50 border border-orange-200 rounded"></div>
                <span className="text-gray-600">Missing Drop Date (Warning)</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-orange-600" />
                <span className="text-gray-600">Data Missing Alert</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 shadow-sm px-6 py-4">
            <div className="text-sm text-gray-600">
              Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
              <span className="font-semibold text-gray-900">{totalPages}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return <span key={pageNum} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-600 to-red-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Dropped Student Details</h2>
                  <p className="text-sm text-red-100">Read-Only View - Retention Analysis</p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="size-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <UserCircle className="size-5 text-blue-600" />
                  Student Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Student ID</p>
                    <p className="font-mono font-semibold text-gray-900">{selectedStudent.studentId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Student Name</p>
                    <p className="font-semibold text-gray-900">{selectedStudent.studentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Stage</p>
                    <p className="text-gray-900">{selectedStudent.stage} ({selectedStudent.stageLevel})</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Drop
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Parent ID</p>
                    <p className="font-mono text-gray-900">{selectedStudent.parentId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Country / City</p>
                    <p className="text-gray-900">{selectedStudent.country} / {selectedStudent.city}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="size-5 text-blue-600" />
                  Timeline & Duration
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Date of Active</p>
                    <p className="font-semibold text-green-700">{formatDate(selectedStudent.dateOfActive)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Date of Drop</p>
                    {selectedStudent.dateOfDrop ? (
                      <p className="font-semibold text-red-700">{formatDate(selectedStudent.dateOfDrop)}</p>
                    ) : (
                      <p className="text-orange-600 font-semibold flex items-center gap-1">
                        <AlertTriangle className="size-3" />
                        Missing
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Duration</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedStudent.durationDays} days</p>
                  </div>
                </div>
              </div>

              {/* Financial & Lessons */}
              <div className="grid grid-cols-2 gap-4">
                {/* Lessons */}
                <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="size-5 text-orange-600" />
                    Lesson Activity
                  </h3>
                  <div className="text-sm space-y-2">
                    <div>
                      <p className="text-gray-600 mb-1">Completed Lessons</p>
                      <p className="text-3xl font-bold text-orange-600">{selectedStudent.completedLessonsCount}</p>
                    </div>
                  </div>
                </div>

                {/* Financial */}
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <DollarSign className="size-5 text-green-600" />
                    Financial Summary
                  </h3>
                  <div className="text-sm space-y-2">
                    <div>
                      <p className="text-gray-600 mb-1">Total Paid</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(selectedStudent.totalPaidAmount, selectedStudent.currency)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Last Payment</p>
                      <p className="text-gray-900">{formatDate(selectedStudent.lastPaymentDate)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Teachers */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="size-5 text-blue-600" />
                  Assigned Teachers ({selectedStudent.teacherNames.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.teacherNames.map((teacher, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200"
                    >
                      {teacher}
                    </span>
                  ))}
                </div>
              </div>

              {/* Drop Reason */}
              {selectedStudent.dropReason && (
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="size-5 text-red-600" />
                    Drop Reason
                  </h3>
                  <p className="text-sm text-gray-800">{selectedStudent.dropReason}</p>
                </div>
              )}

              {/* Notes */}
              {selectedStudent.notes && (
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="size-5 text-blue-600" />
                    Notes
                  </h3>
                  <p className="text-sm text-gray-800">{selectedStudent.notes}</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
