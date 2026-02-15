import { useState } from 'react';
import { 
  UserPlus,
  Sparkles,
  BookOpen,
  TrendingUp,
  Users,
  Award,
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
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

type StageLevel = 'Elementary' | 'Middle' | 'High';
type StudentStatus = 'Active' | 'Trial' | 'Drop';

type NewStudent = {
  studentId: string;
  studentName: string;
  stage: string;
  stageLevel: StageLevel;
  country: string;
  city: string;
  timezone: string;
  parentId: string;
  dateOfActive: string;
  lessonsThisMonth: number;
  firstLessonDate: string;
  lastLessonDate: string;
  teacherNames: string[];
  status: StudentStatus;
  isTrial: boolean;
};

export function NewStudentsReport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [stageLevelFilter, setStageLevelFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<NewStudent | null>(null);
  const itemsPerPage = 10;

  // Current month info
  const currentMonth = 'February 2024';
  const today = new Date('2024-02-15');
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  // Mock data - students registered this month
  const newStudentsData: NewStudent[] = [
    {
      studentId: 'MID456001',
      studentName: 'Zainab Mohammed',
      stage: 'Grade 9',
      stageLevel: 'Middle',
      country: 'Saudi Arabia',
      city: 'Riyadh',
      timezone: 'UTC+3',
      parentId: 'PAR95001',
      dateOfActive: '2024-02-12',
      lessonsThisMonth: 2,
      firstLessonDate: '2024-02-13',
      lastLessonDate: '2024-02-14',
      teacherNames: ['Sarah Johnson'],
      status: 'Active',
      isTrial: false
    },
    {
      studentId: 'MID456002',
      studentName: 'Ali Hassan',
      stage: 'Grade 11',
      stageLevel: 'High',
      country: 'UAE',
      city: 'Dubai',
      timezone: 'UTC+4',
      parentId: 'PAR95002',
      dateOfActive: '2024-02-10',
      lessonsThisMonth: 3,
      firstLessonDate: '2024-02-11',
      lastLessonDate: '2024-02-14',
      teacherNames: ['Michael Chen', 'Emily Rodriguez'],
      status: 'Active',
      isTrial: false
    },
    {
      studentId: 'MID456003',
      studentName: 'Yasmin Abdullah',
      stage: 'Grade 7',
      stageLevel: 'Middle',
      country: 'Egypt',
      city: 'Cairo',
      timezone: 'UTC+2',
      parentId: 'PAR95003',
      dateOfActive: '2024-02-14',
      lessonsThisMonth: 1,
      firstLessonDate: '2024-02-15',
      lastLessonDate: '2024-02-15',
      teacherNames: ['David Thompson'],
      status: 'Trial',
      isTrial: true
    },
    {
      studentId: 'MID456004',
      studentName: 'Ibrahim Salem',
      stage: 'Grade 10',
      stageLevel: 'High',
      country: 'Kuwait',
      city: 'Kuwait City',
      timezone: 'UTC+3',
      parentId: 'PAR95004',
      dateOfActive: '2024-02-08',
      lessonsThisMonth: 4,
      firstLessonDate: '2024-02-09',
      lastLessonDate: '2024-02-15',
      teacherNames: ['Sarah Johnson', 'Michael Chen'],
      status: 'Active',
      isTrial: false
    },
    {
      studentId: 'MID456005',
      studentName: 'Mariam Khalid',
      stage: 'Grade 8',
      stageLevel: 'Middle',
      country: 'Qatar',
      city: 'Doha',
      timezone: 'UTC+3',
      parentId: 'PAR95005',
      dateOfActive: '2024-02-13',
      lessonsThisMonth: 1,
      firstLessonDate: '2024-02-14',
      lastLessonDate: '2024-02-14',
      teacherNames: ['Emily Rodriguez'],
      status: 'Trial',
      isTrial: true
    },
    {
      studentId: 'MID456006',
      studentName: 'Omar Youssef',
      stage: 'Grade 12',
      stageLevel: 'High',
      country: 'Saudi Arabia',
      city: 'Jeddah',
      timezone: 'UTC+3',
      parentId: 'PAR95006',
      dateOfActive: '2024-02-05',
      lessonsThisMonth: 5,
      firstLessonDate: '2024-02-06',
      lastLessonDate: '2024-02-14',
      teacherNames: ['Michael Chen', 'Sarah Johnson', 'Emily Rodriguez'],
      status: 'Active',
      isTrial: false
    },
    {
      studentId: 'MID456007',
      studentName: 'Nour Ahmed',
      stage: 'Grade 6',
      stageLevel: 'Middle',
      country: 'Bahrain',
      city: 'Manama',
      timezone: 'UTC+3',
      parentId: 'PAR95007',
      dateOfActive: '2024-02-11',
      lessonsThisMonth: 2,
      firstLessonDate: '2024-02-12',
      lastLessonDate: '2024-02-15',
      teacherNames: ['David Thompson'],
      status: 'Active',
      isTrial: false
    },
    {
      studentId: 'MID456008',
      studentName: 'Layla Ibrahim',
      stage: 'Grade 10',
      stageLevel: 'High',
      country: 'UAE',
      city: 'Abu Dhabi',
      timezone: 'UTC+4',
      parentId: 'PAR95008',
      dateOfActive: '2024-02-14',
      lessonsThisMonth: 0,
      firstLessonDate: '',
      lastLessonDate: '',
      teacherNames: [],
      status: 'Trial',
      isTrial: true
    },
    {
      studentId: 'MID456009',
      studentName: 'Khaled Mansour',
      stage: 'Grade 9',
      stageLevel: 'Middle',
      country: 'Egypt',
      city: 'Alexandria',
      timezone: 'UTC+2',
      parentId: 'PAR95009',
      dateOfActive: '2024-02-07',
      lessonsThisMonth: 3,
      firstLessonDate: '2024-02-08',
      lastLessonDate: '2024-02-13',
      teacherNames: ['Emily Rodriguez', 'David Thompson'],
      status: 'Active',
      isTrial: false
    },
    {
      studentId: 'MID456010',
      studentName: 'Huda Khalil',
      stage: 'Grade 11',
      stageLevel: 'High',
      country: 'Saudi Arabia',
      city: 'Dammam',
      timezone: 'UTC+3',
      parentId: 'PAR95010',
      dateOfActive: '2024-02-03',
      lessonsThisMonth: 6,
      firstLessonDate: '2024-02-04',
      lastLessonDate: '2024-02-15',
      teacherNames: ['Sarah Johnson', 'Michael Chen', 'David Thompson'],
      status: 'Active',
      isTrial: false
    },
    {
      studentId: 'MID456011',
      studentName: 'Ahmed Fahd',
      stage: 'Grade 8',
      stageLevel: 'Middle',
      country: 'Kuwait',
      city: 'Kuwait City',
      timezone: 'UTC+3',
      parentId: 'PAR95011',
      dateOfActive: '2024-02-15',
      lessonsThisMonth: 0,
      firstLessonDate: '',
      lastLessonDate: '',
      teacherNames: [],
      status: 'Trial',
      isTrial: true
    },
    {
      studentId: 'MID456012',
      studentName: 'Fatima Nasser',
      stage: 'Grade 7',
      stageLevel: 'Middle',
      country: 'Qatar',
      city: 'Doha',
      timezone: 'UTC+3',
      parentId: 'PAR95012',
      dateOfActive: '2024-02-06',
      lessonsThisMonth: 4,
      firstLessonDate: '2024-02-07',
      lastLessonDate: '2024-02-14',
      teacherNames: ['Michael Chen', 'Emily Rodriguez'],
      status: 'Active',
      isTrial: false
    },
  ];

  const teachers = [
    { id: 'TCH001', name: 'Sarah Johnson' },
    { id: 'TCH002', name: 'Michael Chen' },
    { id: 'TCH003', name: 'Emily Rodriguez' },
    { id: 'TCH004', name: 'David Thompson' }
  ];

  const countries = [...new Set(newStudentsData.map(s => s.country))];

  // Calculate KPIs
  const totalNewStudents = newStudentsData.length;
  const trialStudents = newStudentsData.filter(s => s.isTrial).length;
  const activeStudents = newStudentsData.filter(s => s.status === 'Active').length;
  const totalLessons = newStudentsData.reduce((sum, s) => sum + s.lessonsThisMonth, 0);
  const avgLessons = totalNewStudents > 0 ? (totalLessons / totalNewStudents).toFixed(1) : '0';
  const conversionRate = trialStudents > 0 
    ? ((activeStudents / (totalNewStudents)) * 100).toFixed(0)
    : '0';

  // Check if student is within last 7 days
  const isWithinLast7Days = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    return date >= sevenDaysAgo && date <= today;
  };

  // Filter logic
  const filteredStudents = newStudentsData.filter(student => {
    const matchesSearch = 
      searchQuery === '' ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = !countryFilter || student.country === countryFilter;
    const matchesStageLevel = !stageLevelFilter || student.stageLevel === stageLevelFilter;
    const matchesTeacher = !teacherFilter || student.teacherNames.includes(teacherFilter);
    const matchesStatus = !statusFilter || student.status === statusFilter;
    
    return matchesSearch && matchesCountry && matchesStageLevel && matchesTeacher && matchesStatus;
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

  const getStatusColor = (status: StudentStatus): string => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Trial': return 'bg-blue-100 text-blue-800';
      case 'Drop': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusIcon = (status: StudentStatus) => {
    switch (status) {
      case 'Active': return <CheckCircle className="size-3" />;
      case 'Trial': return <Clock className="size-3" />;
      case 'Drop': return <XCircle className="size-3" />;
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <UserPlus className="size-6 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              New Students (This Month)
            </h1>
          </div>
          <p className="text-gray-600">
            Track new student registrations and onboarding progress for {currentMonth}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {/* Total New Students */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserPlus className="size-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalNewStudents}</h3>
            <p className="text-sm text-gray-600">Total New Students</p>
            <p className="text-xs text-gray-500 mt-2">Registered this month</p>
          </div>

          {/* Total Lessons */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="size-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalLessons}</h3>
            <p className="text-sm text-gray-600">Total Lessons This Month</p>
            <p className="text-xs text-gray-500 mt-2">New student lessons</p>
          </div>

          {/* Avg Lessons per Student */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{avgLessons}</h3>
            <p className="text-sm text-gray-600">Avg Lessons per Student</p>
            <p className="text-xs text-gray-500 mt-2">Onboarding engagement</p>
          </div>

          {/* Trial Students */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="size-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{trialStudents}</h3>
            <p className="text-sm text-gray-600">Trial Students</p>
            <p className="text-xs text-gray-500 mt-2">Evaluation period</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Award className="size-6 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{conversionRate}%</h3>
            <p className="text-sm text-gray-600">Active Conversion Rate</p>
            <p className="text-xs text-gray-500 mt-2">{activeStudents} active students</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-600" />
              <h2 className="font-medium text-gray-900">Filters</h2>
              <span className="ml-auto text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded-full font-semibold">
                Date Range: {currentMonth}
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Trial">Trial</option>
                  <option value="Drop">Drop</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredStudents.length)}</span> of{' '}
            <span className="font-semibold text-gray-900">{filteredStudents.length}</span> new students
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
                  <th className="sticky left-[120px] bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300 min-w-[180px]">
                    Student Name
                  </th>

                  {/* Scrollable Columns */}
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[100px]">Stage</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Country</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">City</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[90px]">Timezone</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Parent ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 bg-blue-50 min-w-[140px]">Date of Active</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 bg-green-50 min-w-[120px]">Lessons Count</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[140px]">First Lesson</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[140px]">Last Lesson</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[200px]">Teachers</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[100px]">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 min-w-[80px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedStudents.map(student => {
                  const isNewBadge = isWithinLast7Days(student.dateOfActive);
                  const noLessonsYet = student.lessonsThisMonth === 0;
                  
                  return (
                    <tr 
                      key={student.studentId}
                      className={`transition-colors ${
                        isNewBadge ? 'bg-blue-50 hover:bg-blue-100' :
                        noLessonsYet ? 'bg-orange-50 hover:bg-orange-100' :
                        'hover:bg-gray-50'
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
                          <span>{student.studentName}</span>
                          {isNewBadge && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-200 text-blue-900">
                              <Sparkles className="size-3" />
                              NEW
                            </span>
                          )}
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

                      {/* Date of Active - Highlighted */}
                      <td className="px-4 py-3 text-sm bg-blue-50">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-4 text-blue-600" />
                          <span className="font-medium text-blue-900">{formatDate(student.dateOfActive)}</span>
                        </div>
                      </td>

                      {/* Lessons Count - Highlighted */}
                      <td className="px-4 py-3 text-sm bg-green-50 text-center">
                        {noLessonsYet ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-orange-200 text-orange-900">
                            <Clock className="size-3" />
                            No lessons yet
                          </span>
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <BookOpen className="size-4 text-green-600" />
                            <span className="font-semibold text-green-900">{student.lessonsThisMonth}</span>
                          </div>
                        )}
                      </td>

                      {/* First Lesson Date */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatDate(student.firstLessonDate)}
                      </td>

                      {/* Last Lesson Date */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatDate(student.lastLessonDate)}
                      </td>

                      {/* Teachers */}
                      <td className="px-4 py-3 text-sm">
                        {student.teacherNames.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {student.teacherNames.slice(0, 2).map((teacher, idx) => (
                              <span 
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                              >
                                {teacher}
                              </span>
                            ))}
                            {student.teacherNames.length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                                +{student.teacherNames.length - 2}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-xs">Not assigned</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {getStatusIcon(student.status)}
                          {student.status}
                        </span>
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
                <UserPlus className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No new students found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex flex-wrap items-center gap-6 text-xs">
              <p className="font-medium text-gray-700 mr-2">Visual Indicators:</p>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-blue-50 border border-blue-200 rounded"></div>
                <span className="text-gray-600">Registered within last 7 days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-orange-50 border border-orange-200 rounded"></div>
                <span className="text-gray-600">No lessons scheduled yet</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-blue-600" />
                <span className="text-gray-600">NEW badge (last 7 days)</span>
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
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">New Student Details</h2>
                  <p className="text-sm text-blue-100">Onboarding Progress - Read-Only View</p>
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
                  {isWithinLast7Days(selectedStudent.dateOfActive) && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-200 text-blue-900">
                      <Sparkles className="size-3" />
                      NEW
                    </span>
                  )}
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
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedStudent.status)}`}>
                      {getStatusIcon(selectedStudent.status)}
                      {selectedStudent.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Parent ID</p>
                    <p className="font-mono text-gray-900">{selectedStudent.parentId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Registration Date</p>
                    <p className="text-gray-900 font-medium">{formatDate(selectedStudent.dateOfActive)}</p>
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="size-5 text-blue-600" />
                  Location & Timezone
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Country</p>
                    <p className="text-gray-900">{selectedStudent.country}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">City</p>
                    <p className="text-gray-900">{selectedStudent.city}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Timezone</p>
                    <p className="font-mono text-gray-900">{selectedStudent.timezone}</p>
                  </div>
                </div>
              </div>

              {/* Onboarding Progress */}
              <div className={`rounded-lg p-4 border-l-4 ${
                selectedStudent.lessonsThisMonth === 0 
                  ? 'bg-orange-50 border-orange-500'
                  : 'bg-green-50 border-green-500'
              }`}>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="size-5 text-blue-600" />
                  Onboarding Progress (This Month)
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Total Lessons</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedStudent.lessonsThisMonth}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">First Lesson</p>
                    <p className="text-gray-900">{formatDate(selectedStudent.firstLessonDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Last Lesson</p>
                    <p className="text-gray-900">{formatDate(selectedStudent.lastLessonDate)}</p>
                  </div>
                </div>
              </div>

              {/* Teachers */}
              {selectedStudent.teacherNames.length > 0 ? (
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
              ) : (
                <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="size-5 text-orange-600" />
                    No Teachers Assigned Yet
                  </h3>
                  <p className="text-sm text-gray-700">Student has not started lessons. Teachers will be assigned once lessons begin.</p>
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
