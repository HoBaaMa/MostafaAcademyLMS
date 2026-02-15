import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  XCircle,
  AlertTriangle,
  Calendar,
  Download,
  Info
} from 'lucide-react';

type CanceledLesson = {
  lessonId: string;
  studentId: string;
  studentName: string;
  studentTimeZone: string;
  teacherId: string;
  teacherName: string;
  teacherTimeZone: string;
  subject: string;
  stage: string;
  dayName: string;
  actualDate: string;
  studentDate: string;
  teacherDate: string;
  dayIndex: number;
  startTimeStudent: string;
  endTimeStudent: string;
  startTimeTeacher: string;
  endTimeTeacher: string;
  status: 'Cancelled';
  reason: string;
  note: string;
  comment: string;
  canceledBy: 'Student' | 'Teacher';
  lessonType: 'Trial' | 'Paid';
};

export function CanceledLessons() {
  const [searchQuery, setSearchQuery] = useState('');
  const [studentFilter, setStudentFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [reasonFilter, setReasonFilter] = useState('');
  const [timezoneView, setTimezoneView] = useState<'PH' | 'CA'>('PH');
  const [dateRangeFrom, setDateRangeFrom] = useState('');
  const [dateRangeTo, setDateRangeTo] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'student' | 'teacher' | 'trial' | 'paid'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState<CanceledLesson | null>(null);
  
  const itemsPerPage = 10;

  // Mock data
  const canceledLessons: CanceledLesson[] = [
    {
      lessonId: 'LSN789012',
      studentId: 'MID123456',
      studentName: 'Ahmed Al-Saud',
      studentTimeZone: 'UTC+3 (AST)',
      teacherId: 'TCH001',
      teacherName: 'Sarah Johnson',
      teacherTimeZone: 'UTC+8 (PHT)',
      subject: 'Mathematics',
      stage: 'Grade 10',
      dayName: 'Monday',
      actualDate: '2024-02-10',
      studentDate: '2024-02-10',
      teacherDate: '2024-02-10',
      dayIndex: 41,
      startTimeStudent: '16:00',
      endTimeStudent: '17:00',
      startTimeTeacher: '21:00',
      endTimeTeacher: '22:00',
      status: 'Cancelled',
      reason: 'Student sick',
      note: 'Requested reschedule for next week',
      comment: 'Student has flu, will resume next Monday',
      canceledBy: 'Student',
      lessonType: 'Paid'
    },
    {
      lessonId: 'LSN789013',
      studentId: 'MID234567',
      studentName: 'Fatima Hassan',
      studentTimeZone: 'UTC+4 (GST)',
      teacherId: 'TCH002',
      teacherName: 'Michael Chen',
      teacherTimeZone: 'UTC+8 (PHT)',
      subject: 'English',
      stage: 'Grade 8',
      dayName: 'Wednesday',
      actualDate: '2024-02-12',
      studentDate: '2024-02-12',
      teacherDate: '2024-02-12',
      dayIndex: 43,
      startTimeStudent: '18:00',
      endTimeStudent: '18:45',
      startTimeTeacher: '22:00',
      endTimeTeacher: '22:45',
      status: 'Cancelled',
      reason: 'Teacher emergency',
      note: 'Power outage in teacher area',
      comment: 'Will be rescheduled automatically',
      canceledBy: 'Teacher',
      lessonType: 'Paid'
    },
    {
      lessonId: 'LSN789014',
      studentId: 'MID345678',
      studentName: 'Mohammed Ali',
      studentTimeZone: 'UTC+2 (EET)',
      teacherId: 'TCH003',
      teacherName: 'Emily Rodriguez',
      teacherTimeZone: 'UTC-5 (EST)',
      subject: 'Physics',
      stage: 'Grade 12',
      dayName: 'Friday',
      actualDate: '2024-02-14',
      studentDate: '2024-02-14',
      teacherDate: '2024-02-14',
      dayIndex: 45,
      startTimeStudent: '15:00',
      endTimeStudent: '16:00',
      startTimeTeacher: '08:00',
      endTimeTeacher: '09:00',
      status: 'Cancelled',
      reason: '',
      note: 'No show',
      comment: 'Student did not attend without notice',
      canceledBy: 'Student',
      lessonType: 'Trial'
    },
    {
      lessonId: 'LSN789015',
      studentId: 'MID456789',
      studentName: 'Layla Mahmoud',
      studentTimeZone: 'UTC+3 (AST)',
      teacherId: 'TCH001',
      teacherName: 'Sarah Johnson',
      teacherTimeZone: 'UTC+8 (PHT)',
      subject: 'Chemistry',
      stage: 'Grade 11',
      dayName: 'Tuesday',
      actualDate: '2024-02-13',
      studentDate: '2024-02-13',
      teacherDate: '2024-02-13',
      dayIndex: 44,
      startTimeStudent: '17:00',
      endTimeStudent: '17:45',
      startTimeTeacher: '22:00',
      endTimeTeacher: '22:45',
      status: 'Cancelled',
      reason: 'Family emergency',
      note: 'Student traveling abroad',
      comment: 'Will resume lessons in 2 weeks',
      canceledBy: 'Student',
      lessonType: 'Paid'
    },
    {
      lessonId: 'LSN789016',
      studentId: 'MID567890',
      studentName: 'Omar Khalid',
      studentTimeZone: 'UTC+4 (GST)',
      teacherId: 'TCH004',
      teacherName: 'David Thompson',
      teacherTimeZone: 'UTC+8 (PHT)',
      subject: 'Computer Science',
      stage: 'Grade 9',
      dayName: 'Thursday',
      actualDate: '2024-02-15',
      studentDate: '2024-02-15',
      teacherDate: '2024-02-15',
      dayIndex: 46,
      startTimeStudent: '19:00',
      endTimeStudent: '20:00',
      startTimeTeacher: '23:00',
      endTimeTeacher: '00:00',
      status: 'Cancelled',
      reason: 'Technical issues',
      note: 'Internet connection problems',
      comment: 'Student unable to connect to video call',
      canceledBy: 'Student',
      lessonType: 'Paid'
    },
  ];

  const students = Array.from(new Set(canceledLessons.map(l => ({ id: l.studentId, name: l.studentName }))));
  const teachers = Array.from(new Set(canceledLessons.map(l => ({ id: l.teacherId, name: l.teacherName }))));
  const subjects = Array.from(new Set(canceledLessons.map(l => l.subject)));
  const reasons = Array.from(new Set(canceledLessons.map(l => l.reason).filter(r => r)));

  // Filter logic
  const filteredLessons = canceledLessons.filter(lesson => {
    const matchesSearch = 
      lesson.lessonId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStudent = !studentFilter || 
      lesson.studentId === studentFilter || 
      lesson.studentName.toLowerCase().includes(studentFilter.toLowerCase());
    
    const matchesTeacher = !teacherFilter || 
      lesson.teacherId === teacherFilter || 
      lesson.teacherName.toLowerCase().includes(teacherFilter.toLowerCase());
    
    const matchesSubject = !subjectFilter || lesson.subject === subjectFilter;
    const matchesStage = !stageFilter || getStageLevel(lesson.stage) === stageFilter;
    const matchesReason = !reasonFilter || lesson.reason === reasonFilter;
    
    const matchesDateRange = (!dateRangeFrom || lesson.actualDate >= dateRangeFrom) &&
                              (!dateRangeTo || lesson.actualDate <= dateRangeTo);
    
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'student' && lesson.canceledBy === 'Student') ||
      (activeTab === 'teacher' && lesson.canceledBy === 'Teacher') ||
      (activeTab === 'trial' && lesson.lessonType === 'Trial') ||
      (activeTab === 'paid' && lesson.lessonType === 'Paid');
    
    return matchesSearch && matchesStudent && matchesTeacher && matchesSubject && 
           matchesStage && matchesReason && matchesDateRange && matchesTab;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLessons = filteredLessons.slice(startIndex, startIndex + itemsPerPage);

  const getStageLevel = (stage: string): string => {
    const grade = parseInt(stage.replace('Grade ', ''));
    if (grade <= 6) return 'Elementary';
    if (grade <= 9) return 'Mid';
    return 'High School';
  };

  const tabs = [
    { id: 'all', label: 'All Cancelled', count: canceledLessons.length },
    { id: 'student', label: 'Cancelled by Student', count: canceledLessons.filter(l => l.canceledBy === 'Student').length },
    { id: 'teacher', label: 'Cancelled by Teacher', count: canceledLessons.filter(l => l.canceledBy === 'Teacher').length },
    { id: 'trial', label: 'Trial Cancelled', count: canceledLessons.filter(l => l.lessonType === 'Trial').length },
    { id: 'paid', label: 'Paid Cancelled', count: canceledLessons.filter(l => l.lessonType === 'Paid').length },
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="size-6 text-red-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Canceled Lessons</h1>
            </div>
            <p className="text-gray-600">Monitor and audit all canceled lessons</p>
          </div>
          
          <button className="px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2">
            <Download className="size-4" />
            Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Canceled</p>
            <p className="text-2xl font-semibold text-red-700">{canceledLessons.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">By Student</p>
            <p className="text-2xl font-semibold text-orange-700">
              {canceledLessons.filter(l => l.canceledBy === 'Student').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">By Teacher</p>
            <p className="text-2xl font-semibold text-purple-700">
              {canceledLessons.filter(l => l.canceledBy === 'Teacher').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Trial Lessons</p>
            <p className="text-2xl font-semibold text-blue-700">
              {canceledLessons.filter(l => l.lessonType === 'Trial').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Missing Reason</p>
            <p className="text-2xl font-semibold text-red-700">
              {canceledLessons.filter(l => !l.reason).length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-lg border-t border-l border-r border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-700 bg-red-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === tab.id
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-l border-r border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-600" />
              <h2 className="font-medium text-gray-900">Filters</h2>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Search Lesson ID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="LSN..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Student Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Student
                </label>
                <input
                  type="text"
                  value={studentFilter}
                  onChange={(e) => setStudentFilter(e.target.value)}
                  placeholder="ID or Name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              {/* Teacher Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Teacher
                </label>
                <input
                  type="text"
                  value={teacherFilter}
                  onChange={(e) => setTeacherFilter(e.target.value)}
                  placeholder="ID or Name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Stage Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stage Level
                </label>
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                >
                  <option value="">All Levels</option>
                  <option value="Elementary">Elementary</option>
                  <option value="Mid">Mid</option>
                  <option value="High School">High School</option>
                </select>
              </div>

              {/* Reason Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Reason
                </label>
                <select
                  value={reasonFilter}
                  onChange={(e) => setReasonFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                >
                  <option value="">All Reasons</option>
                  {reasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              {/* Date Range From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date From
                </label>
                <input
                  type="date"
                  value={dateRangeFrom}
                  onChange={(e) => setDateRangeFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              {/* Date Range To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date To
                </label>
                <input
                  type="date"
                  value={dateRangeTo}
                  onChange={(e) => setDateRangeTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              {/* Timezone Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Timezone View
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTimezoneView('PH')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timezoneView === 'PH'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    PH
                  </button>
                  <button
                    onClick={() => setTimezoneView('CA')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timezoneView === 'CA'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    CA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="sticky left-0 bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r border-gray-200 min-w-[120px]">
                    Lesson ID
                  </th>
                  <th className="sticky left-[120px] bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r border-gray-200 min-w-[150px]">
                    Student Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[110px]">Student ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Student TZ</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[110px]">Teacher ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[150px]">Teacher Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Teacher TZ</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[140px]">Subject</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[100px]">Stage</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[100px]">Day</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Actual Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Student Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Teacher Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[80px]">Day Index</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px] bg-blue-50">Start (Student)</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px] bg-blue-50">End (Student)</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px] bg-purple-50">Start (Teacher)</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px] bg-purple-50">End (Teacher)</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[110px]">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[150px]">Reason</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[200px]">Note</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[200px]">Comment</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedLessons.map(lesson => (
                  <tr 
                    key={lesson.lessonId} 
                    className="hover:bg-red-50 transition-colors bg-red-25"
                  >
                    {/* Lesson ID - Sticky */}
                    <td className="sticky left-0 bg-white px-4 py-3 text-sm font-mono text-gray-900 border-r border-gray-200">
                      {lesson.lessonId}
                    </td>

                    {/* Student Name - Sticky */}
                    <td className="sticky left-[120px] bg-white px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                      {lesson.studentName}
                    </td>

                    {/* Student ID */}
                    <td className="px-4 py-3 text-sm font-mono text-gray-700">
                      {lesson.studentId}
                    </td>

                    {/* Student Timezone */}
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {lesson.studentTimeZone}
                    </td>

                    {/* Teacher ID */}
                    <td className="px-4 py-3 text-sm font-mono text-gray-700">
                      {lesson.teacherId}
                    </td>

                    {/* Teacher Name */}
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {lesson.teacherName}
                    </td>

                    {/* Teacher Timezone */}
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {lesson.teacherTimeZone}
                    </td>

                    {/* Subject */}
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {lesson.subject}
                    </td>

                    {/* Stage */}
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {lesson.stage}
                    </td>

                    {/* Day Name */}
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {lesson.dayName}
                    </td>

                    {/* Actual Date */}
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {lesson.actualDate}
                    </td>

                    {/* Student Date */}
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {lesson.studentDate}
                    </td>

                    {/* Teacher Date */}
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {lesson.teacherDate}
                    </td>

                    {/* Day Index */}
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {lesson.dayIndex}
                    </td>

                    {/* Start Time Student */}
                    <td className="px-4 py-3 text-sm font-mono text-gray-900 bg-blue-50">
                      {lesson.startTimeStudent}
                    </td>

                    {/* End Time Student */}
                    <td className="px-4 py-3 text-sm font-mono text-gray-900 bg-blue-50">
                      {lesson.endTimeStudent}
                    </td>

                    {/* Start Time Teacher */}
                    <td className="px-4 py-3 text-sm font-mono text-gray-900 bg-purple-50">
                      {lesson.startTimeTeacher}
                    </td>

                    {/* End Time Teacher */}
                    <td className="px-4 py-3 text-sm font-mono text-gray-900 bg-purple-50">
                      {lesson.endTimeTeacher}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        <XCircle className="size-3 mr-1" />
                        Cancelled
                      </span>
                    </td>

                    {/* Reason */}
                    <td className="px-4 py-3 text-sm">
                      {lesson.reason ? (
                        <span className="text-gray-900">{lesson.reason}</span>
                      ) : (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertTriangle className="size-4" />
                          <span className="font-medium">Missing</span>
                        </div>
                      )}
                    </td>

                    {/* Note */}
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[180px]" title={lesson.note}>
                          {lesson.note}
                        </span>
                        {lesson.note.length > 30 && (
                          <Info className="size-4 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                    </td>

                    {/* Comment */}
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[180px]" title={lesson.comment}>
                          {lesson.comment}
                        </span>
                        {lesson.comment.length > 30 && (
                          <Info className="size-4 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => setSelectedLesson(lesson)}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-1.5"
                      >
                        <Eye className="size-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLessons.length)} of {filteredLessons.length} canceled lessons
            </p>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="size-4" />
              </button>
              
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <XCircle className="size-5" />
                  <h2 className="text-xl font-bold">Canceled Lesson Details</h2>
                </div>
                <p className="text-red-100 text-sm">Lesson ID: {selectedLesson.lessonId}</p>
              </div>
              <button
                onClick={() => setSelectedLesson(null)}
                className="size-8 flex items-center justify-center rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="size-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Status Banner */}
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <XCircle className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900 mb-1">Lesson Cancelled</h3>
                    <p className="text-sm text-red-700">
                      Canceled by <span className="font-semibold">{selectedLesson.canceledBy}</span> • 
                      Type: <span className="font-semibold">{selectedLesson.lessonType}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Information */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Student Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Student ID</p>
                    <p className="font-mono text-sm text-gray-900">{selectedLesson.studentId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Student Name</p>
                    <p className="font-semibold text-sm text-gray-900">{selectedLesson.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Timezone</p>
                    <p className="text-sm text-gray-900">{selectedLesson.studentTimeZone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Stage</p>
                    <p className="text-sm text-gray-900">{selectedLesson.stage}</p>
                  </div>
                </div>
              </div>

              {/* Teacher Information */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Teacher Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Teacher ID</p>
                    <p className="font-mono text-sm text-gray-900">{selectedLesson.teacherId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Teacher Name</p>
                    <p className="font-semibold text-sm text-gray-900">{selectedLesson.teacherName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Timezone</p>
                    <p className="text-sm text-gray-900">{selectedLesson.teacherTimeZone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Subject</p>
                    <p className="text-sm text-gray-900">{selectedLesson.subject}</p>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Schedule Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Day</p>
                      <p className="text-sm text-gray-900">{selectedLesson.dayName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Actual Date</p>
                      <p className="text-sm text-gray-900">{selectedLesson.actualDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Day Index</p>
                      <p className="text-sm text-gray-900">{selectedLesson.dayIndex}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-blue-700 mb-2">Student Times</p>
                      <p className="text-xs text-gray-600 mb-1">Date</p>
                      <p className="text-sm text-gray-900 mb-2">{selectedLesson.studentDate}</p>
                      <p className="text-xs text-gray-600 mb-1">Time</p>
                      <p className="font-mono text-sm text-gray-900">
                        {selectedLesson.startTimeStudent} - {selectedLesson.endTimeStudent}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-purple-700 mb-2">Teacher Times</p>
                      <p className="text-xs text-gray-600 mb-1">Date</p>
                      <p className="text-sm text-gray-900 mb-2">{selectedLesson.teacherDate}</p>
                      <p className="text-xs text-gray-600 mb-1">Time</p>
                      <p className="font-mono text-sm text-gray-900">
                        {selectedLesson.startTimeTeacher} - {selectedLesson.endTimeTeacher}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cancellation Details */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Cancellation Details</h3>
                <div className="bg-red-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Reason</p>
                    {selectedLesson.reason ? (
                      <p className="text-sm text-gray-900 font-medium">{selectedLesson.reason}</p>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="size-4" />
                        <span className="text-sm font-semibold">No reason provided</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Note</p>
                    <p className="text-sm text-gray-900">{selectedLesson.note}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Comment</p>
                    <p className="text-sm text-gray-900">{selectedLesson.comment}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedLesson(null)}
                className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
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
