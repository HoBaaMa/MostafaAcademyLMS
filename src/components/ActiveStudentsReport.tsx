import { useState } from 'react';
import { 
  TrendingUp,
  Users,
  BookOpen,
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
  GraduationCap
} from 'lucide-react';

type StageLevel = 'Elementary' | 'Middle' | 'High';

type StudentReport = {
  studentId: string;
  studentName: string;
  stage: string;
  stageLevel: StageLevel;
  country: string;
  city: string;
  timezone: string;
  parentId: string;
  status: string;
  dateOfActive: string;
  lessonsLastMonth: number;
  firstLessonDate: string;
  lastLessonDate: string;
  teacherNames: string[];
};

export function ActiveStudentsReport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [stageLevelFilter, setStageLevelFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<StudentReport | null>(null);
  const itemsPerPage = 10;

  // Mock data
  const studentsData: StudentReport[] = [
    {
      studentId: 'MID123456',
      studentName: 'Ahmed Al-Saud',
      stage: 'Grade 10',
      stageLevel: 'High',
      country: 'Saudi Arabia',
      city: 'Riyadh',
      timezone: 'UTC+3',
      parentId: 'PAR78901',
      status: 'Active',
      dateOfActive: '2023-09-15',
      lessonsLastMonth: 4,
      firstLessonDate: '2024-01-05',
      lastLessonDate: '2024-01-28',
      teacherNames: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez']
    },
    {
      studentId: 'MID234567',
      studentName: 'Fatima Hassan',
      stage: 'Grade 8',
      stageLevel: 'Middle',
      country: 'UAE',
      city: 'Dubai',
      timezone: 'UTC+4',
      parentId: 'PAR78902',
      status: 'Active',
      dateOfActive: '2023-08-20',
      lessonsLastMonth: 3,
      firstLessonDate: '2024-01-10',
      lastLessonDate: '2024-01-25',
      teacherNames: ['Sarah Johnson', 'David Thompson']
    },
    {
      studentId: 'MID345678',
      studentName: 'Mohammed Ali',
      stage: 'Grade 12',
      stageLevel: 'High',
      country: 'Egypt',
      city: 'Cairo',
      timezone: 'UTC+2',
      parentId: 'PAR78903',
      status: 'Active',
      dateOfActive: '2024-01-01',
      lessonsLastMonth: 4,
      firstLessonDate: '2024-01-03',
      lastLessonDate: '2024-01-30',
      teacherNames: ['Emily Rodriguez', 'Michael Chen', 'Sarah Johnson', 'David Thompson']
    },
    {
      studentId: 'MID456789',
      studentName: 'Layla Mahmoud',
      stage: 'Grade 11',
      stageLevel: 'High',
      country: 'Saudi Arabia',
      city: 'Jeddah',
      timezone: 'UTC+3',
      parentId: 'PAR78904',
      status: 'Active',
      dateOfActive: '2023-10-12',
      lessonsLastMonth: 3,
      firstLessonDate: '2024-01-08',
      lastLessonDate: '2024-01-22',
      teacherNames: ['David Thompson']
    },
    {
      studentId: 'MID567890',
      studentName: 'Omar Khalid',
      stage: 'Grade 6',
      stageLevel: 'Middle',
      country: 'Kuwait',
      city: 'Kuwait City',
      timezone: 'UTC+3',
      parentId: 'PAR78905',
      status: 'Active',
      dateOfActive: '2023-11-05',
      lessonsLastMonth: 4,
      firstLessonDate: '2024-01-02',
      lastLessonDate: '2024-01-29',
      teacherNames: ['Sarah Johnson', 'Michael Chen']
    },
    {
      studentId: 'MID678901',
      studentName: 'Nour Abdullah',
      stage: 'Grade 9',
      stageLevel: 'Middle',
      country: 'UAE',
      city: 'Abu Dhabi',
      timezone: 'UTC+4',
      parentId: 'PAR78906',
      status: 'Active',
      dateOfActive: '2023-09-28',
      lessonsLastMonth: 3,
      firstLessonDate: '2024-01-12',
      lastLessonDate: '2024-01-26',
      teacherNames: ['Emily Rodriguez', 'David Thompson']
    },
    {
      studentId: 'MID789012',
      studentName: 'Youssef Ibrahim',
      stage: 'Grade 7',
      stageLevel: 'Middle',
      country: 'Egypt',
      city: 'Alexandria',
      timezone: 'UTC+2',
      parentId: 'PAR78907',
      status: 'Active',
      dateOfActive: '2023-10-20',
      lessonsLastMonth: 4,
      firstLessonDate: '2024-01-04',
      lastLessonDate: '2024-01-27',
      teacherNames: ['Michael Chen', 'Sarah Johnson', 'Emily Rodriguez']
    },
    {
      studentId: 'MID890123',
      studentName: 'Maryam Ahmed',
      stage: 'Grade 10',
      stageLevel: 'High',
      country: 'Bahrain',
      city: 'Manama',
      timezone: 'UTC+3',
      parentId: 'PAR78908',
      status: 'Active',
      dateOfActive: '2023-08-15',
      lessonsLastMonth: 3,
      firstLessonDate: '2024-01-07',
      lastLessonDate: '2024-01-24',
      teacherNames: ['David Thompson', 'Sarah Johnson']
    },
    {
      studentId: 'MID901234',
      studentName: 'Khaled Hassan',
      stage: 'Grade 11',
      stageLevel: 'High',
      country: 'Saudi Arabia',
      city: 'Dammam',
      timezone: 'UTC+3',
      parentId: 'PAR78909',
      status: 'Active',
      dateOfActive: '2023-09-10',
      lessonsLastMonth: 4,
      firstLessonDate: '2024-01-06',
      lastLessonDate: '2024-01-31',
      teacherNames: ['Emily Rodriguez', 'Michael Chen']
    },
    {
      studentId: 'MID012345',
      studentName: 'Huda Salem',
      stage: 'Grade 8',
      stageLevel: 'Middle',
      country: 'Qatar',
      city: 'Doha',
      timezone: 'UTC+3',
      parentId: 'PAR78910',
      status: 'Active',
      dateOfActive: '2023-11-18',
      lessonsLastMonth: 3,
      firstLessonDate: '2024-01-09',
      lastLessonDate: '2024-01-23',
      teacherNames: ['Sarah Johnson', 'David Thompson', 'Michael Chen']
    },
  ];

  const teachers = [
    { id: 'TCH001', name: 'Sarah Johnson' },
    { id: 'TCH002', name: 'Michael Chen' },
    { id: 'TCH003', name: 'Emily Rodriguez' },
    { id: 'TCH004', name: 'David Thompson' }
  ];

  const countries = [...new Set(studentsData.map(s => s.country))];

  // Calculate KPIs
  const totalStudents = studentsData.length;
  const totalLessons = studentsData.reduce((sum, s) => sum + s.lessonsLastMonth, 0);
  const avgLessons = totalStudents > 0 ? (totalLessons / totalStudents).toFixed(1) : '0';
  
  // Calculate top teacher
  const teacherCounts: Record<string, number> = {};
  studentsData.forEach(student => {
    student.teacherNames.forEach(teacher => {
      teacherCounts[teacher] = (teacherCounts[teacher] || 0) + 1;
    });
  });
  const topTeacher = Object.entries(teacherCounts).sort((a, b) => b[1] - a[1])[0];

  // Filter logic
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = 
      searchQuery === '' ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parentId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = !countryFilter || student.country === countryFilter;
    const matchesStageLevel = !stageLevelFilter || student.stageLevel === stageLevelFilter;
    const matchesTeacher = !teacherFilter || student.teacherNames.includes(teacherFilter);
    
    return matchesSearch && matchesCountry && matchesStageLevel && matchesTeacher;
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

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-6 text-green-600" />
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Active Students (3–4 Lessons Last Month)
            </h1>
          </div>
          <p className="text-gray-600">
            Students who completed between 3 and 4 lessons in January 2024
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Active Students */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="size-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalStudents}</h3>
            <p className="text-sm text-gray-600">Total Active Students</p>
            <p className="text-xs text-gray-500 mt-2">In target range (3-4 lessons)</p>
          </div>

          {/* Total Lessons */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="size-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalLessons}</h3>
            <p className="text-sm text-gray-600">Total Lessons Count</p>
            <p className="text-xs text-gray-500 mt-2">Completed last month</p>
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
            <p className="text-xs text-gray-500 mt-2">Average engagement rate</p>
          </div>

          {/* Top Teacher */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="size-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Award className="size-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{topTeacher?.[0] || '—'}</h3>
            <p className="text-sm text-gray-600">Top Teacher by Count</p>
            <p className="text-xs text-gray-500 mt-2">{topTeacher?.[1] || 0} lesson assignments</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-600" />
              <h2 className="font-medium text-gray-900">Filters</h2>
              <span className="ml-auto text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded-full font-semibold">
                Date Range: Last Month (January 2024)
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to{' '}
            <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredStudents.length)}</span> of{' '}
            <span className="font-semibold text-gray-900">{filteredStudents.length}</span> students
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
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[80px]">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Date of Active</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 bg-blue-50 min-w-[110px]">Lessons Count</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[140px]">First Lesson</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[140px]">Last Lesson</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[200px]">Teachers</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 min-w-[80px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedStudents.map(student => {
                  const isExactly3 = student.lessonsLastMonth === 3;
                  const isExactly4 = student.lessonsLastMonth === 4;
                  
                  return (
                    <tr 
                      key={student.studentId}
                      className={`transition-colors ${
                        isExactly3 ? 'bg-amber-50 hover:bg-amber-100' :
                        isExactly4 ? 'bg-green-50 hover:bg-green-100' :
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
                          {student.studentName}
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

                      {/* Status */}
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {student.status}
                        </span>
                      </td>

                      {/* Date of Active */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-4 text-gray-400" />
                          {formatDate(student.dateOfActive)}
                        </div>
                      </td>

                      {/* Lessons Count - Highlighted */}
                      <td className="px-4 py-3 text-sm bg-blue-50 text-center">
                        <span className={`inline-flex items-center justify-center size-8 rounded-full font-bold text-sm ${
                          isExactly3 ? 'bg-amber-200 text-amber-900' :
                          isExactly4 ? 'bg-green-200 text-green-900' :
                          'bg-gray-200 text-gray-900'
                        }`}>
                          {student.lessonsLastMonth}
                        </span>
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
                              +{student.teacherNames.length - 3} more
                            </span>
                          )}
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
                <Users className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No students found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex flex-wrap items-center gap-6 text-xs">
              <p className="font-medium text-gray-700 mr-2">Row Highlighting:</p>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-amber-50 border border-amber-200 rounded"></div>
                <span className="text-gray-600">Exactly 3 Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-green-50 border border-green-200 rounded"></div>
                <span className="text-gray-600">Exactly 4 Lessons</span>
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
              
              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  // Show first, last, current, and adjacent pages
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
                  <h2 className="text-2xl font-bold text-white mb-1">Student Details</h2>
                  <p className="text-sm text-blue-100">Read-Only View</p>
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
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {selectedStudent.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Parent ID</p>
                    <p className="font-mono text-gray-900">{selectedStudent.parentId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Date of Active</p>
                    <p className="text-gray-900">{formatDate(selectedStudent.dateOfActive)}</p>
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

              {/* Lesson Activity */}
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="size-5 text-blue-600" />
                  Lesson Activity (Last Month)
                </h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Total Lessons</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedStudent.lessonsLastMonth}</p>
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
