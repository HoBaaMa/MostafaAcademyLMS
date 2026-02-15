import { useState } from 'react';
import { 
  Calendar,
  Clock,
  Filter,
  Search,
  Globe,
  AlertCircle,
  Save,
  X as XIcon,
  Bell
} from 'lucide-react';

type LessonStatus = 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';

type MasterLesson = {
  date: string;
  day: string;
  studentId: string;
  studentName: string;
  grade: string;
  subject: string;
  startStudent: string;
  endStudent: string;
  startTeacher: string;
  endTeacher: string;
  studentTZ: string;
  teacherTZ: string;
  actualStudentTime: string;
  adminAlertCairo: 'ok' | 'warning';
  cairoTime: string;
  status: LessonStatus;
  lessonId: string;
  teacherId: string;
  teacherName: string;
  teacherCountry: string;
};

export function MasterSchedule() {
  const [timeView, setTimeView] = useState<'student' | 'teacher' | 'cairo'>('student');
  const [searchQuery, setSearchQuery] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [studentFilter, setStudentFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [editedData, setEditedData] = useState<Record<string, Partial<MasterLesson>>>({});
  
  const today = '2024-02-15';
  
  // Mock data
  const [lessons, setLessons] = useState<MasterLesson[]>([
    {
      date: '2024-02-15',
      day: 'Thursday',
      studentId: 'MID123456',
      studentName: 'Ahmed Al-Saud',
      grade: 'Grade 10',
      subject: 'Mathematics',
      startStudent: '16:00',
      endStudent: '17:00',
      startTeacher: '21:00',
      endTeacher: '22:00',
      studentTZ: 'UTC+3',
      teacherTZ: 'UTC+8',
      actualStudentTime: '16:00 - 17:00',
      adminAlertCairo: 'ok',
      cairoTime: '15:00',
      status: 'Confirmed',
      lessonId: 'LSN789012',
      teacherId: 'TCH001',
      teacherName: 'Sarah Johnson',
      teacherCountry: 'Philippines'
    },
    {
      date: '2024-02-15',
      day: 'Thursday',
      studentId: 'MID234567',
      studentName: 'Fatima Hassan',
      grade: 'Grade 8',
      subject: 'English',
      startStudent: '18:00',
      endStudent: '18:45',
      startTeacher: '22:00',
      endTeacher: '22:45',
      studentTZ: 'UTC+4',
      teacherTZ: 'UTC+8',
      actualStudentTime: '18:00 - 18:45',
      adminAlertCairo: 'ok',
      cairoTime: '16:00',
      status: 'Confirmed',
      lessonId: 'LSN789013',
      teacherId: 'TCH002',
      teacherName: 'Michael Chen',
      teacherCountry: 'Philippines'
    },
    {
      date: '2024-02-15',
      day: 'Thursday',
      studentId: 'MID345678',
      studentName: 'Mohammed Ali',
      grade: 'Grade 12',
      subject: 'Physics',
      startStudent: '23:00',
      endStudent: '00:00',
      startTeacher: '08:00',
      endTeacher: '09:00',
      studentTZ: 'UTC+2',
      teacherTZ: 'UTC-5',
      actualStudentTime: '23:00 - 00:00',
      adminAlertCairo: 'warning',
      cairoTime: '23:00',
      status: 'Scheduled',
      lessonId: 'LSN789014',
      teacherId: 'TCH003',
      teacherName: 'Emily Rodriguez',
      teacherCountry: 'Canada'
    },
    {
      date: '2024-02-16',
      day: 'Friday',
      studentId: 'MID456789',
      studentName: 'Layla Mahmoud',
      grade: 'Grade 11',
      subject: 'Chemistry',
      startStudent: '17:00',
      endStudent: '17:45',
      startTeacher: '22:00',
      endTeacher: '22:45',
      studentTZ: 'UTC+3',
      teacherTZ: 'UTC+8',
      actualStudentTime: '17:00 - 17:45',
      adminAlertCairo: 'ok',
      cairoTime: '16:00',
      status: 'Confirmed',
      lessonId: 'LSN789015',
      teacherId: 'TCH001',
      teacherName: 'Sarah Johnson',
      teacherCountry: 'Philippines'
    },
    {
      date: '2024-02-16',
      day: 'Friday',
      studentId: 'MID567890',
      studentName: 'Omar Khalid',
      grade: 'Grade 9',
      subject: 'Computer Science',
      startStudent: '19:00',
      endStudent: '20:00',
      startTeacher: '23:00',
      endTeacher: '00:00',
      studentTZ: 'UTC+4',
      teacherTZ: 'UTC+8',
      actualStudentTime: '19:00 - 20:00',
      adminAlertCairo: 'ok',
      cairoTime: '17:00',
      status: 'Completed',
      lessonId: 'LSN789016',
      teacherId: 'TCH004',
      teacherName: 'David Thompson',
      teacherCountry: 'Philippines'
    },
  ]);

  const teachers = [
    { id: 'TCH001', name: 'Sarah Johnson' },
    { id: 'TCH002', name: 'Michael Chen' },
    { id: 'TCH003', name: 'Emily Rodriguez' },
    { id: 'TCH004', name: 'David Thompson' }
  ];

  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 
                  'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  
  const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

  // Check if lesson is happening today
  const isToday = (date: string) => date === today;

  // Check if lesson is within next hour (simplified for demo)
  const isUpcoming = (date: string, time: string) => {
    return isToday(date); // Simplified - would normally check actual time
  };

  // Filter logic
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = 
      searchQuery === '' ||
      lesson.lessonId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTeacher = !teacherFilter || lesson.teacherId === teacherFilter;
    const matchesStudent = !studentFilter || 
      lesson.studentId.includes(studentFilter) || 
      lesson.studentName.toLowerCase().includes(studentFilter.toLowerCase());
    const matchesGrade = !gradeFilter || lesson.grade === gradeFilter;
    const matchesSubject = !subjectFilter || lesson.subject === subjectFilter;
    const matchesStatus = !statusFilter || lesson.status === statusFilter;
    const matchesDateRange = (!dateFrom || lesson.date >= dateFrom) &&
                             (!dateTo || lesson.date <= dateTo);
    
    return matchesSearch && matchesTeacher && matchesStudent && matchesGrade && 
           matchesSubject && matchesStatus && matchesDateRange;
  });

  const getStatusColor = (status: LessonStatus): string => {
    switch (status) {
      case 'Scheduled': return 'bg-gray-100 text-gray-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const handleStatusChange = (lessonId: string, newStatus: LessonStatus) => {
    setEditedData({
      ...editedData,
      [lessonId]: {
        ...editedData[lessonId],
        status: newStatus,
      }
    });
  };

  const handleAlertChange = (lessonId: string, newAlert: 'ok' | 'warning') => {
    setEditedData({
      ...editedData,
      [lessonId]: {
        ...editedData[lessonId],
        adminAlertCairo: newAlert,
      }
    });
  };

  const getCellValue = (lesson: MasterLesson, field: keyof MasterLesson) => {
    if (editedData[lesson.lessonId] && field in editedData[lesson.lessonId]) {
      return editedData[lesson.lessonId][field];
    }
    return lesson[field];
  };

  const hasChanges = Object.keys(editedData).length > 0;

  const handleSave = () => {
    setLessons(prev => prev.map(lesson => {
      if (editedData[lesson.lessonId]) {
        return { ...lesson, ...editedData[lesson.lessonId] };
      }
      return lesson;
    }));
    setEditedData({});
  };

  const handleDiscard = () => {
    setEditedData({});
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Master Schedule</h1>
            </div>
            <p className="text-gray-600">Primary working table for teachers and administrators</p>
          </div>

          {/* Time View Toggle */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
            <Globe className="size-5 text-gray-600" />
            <div className="flex rounded-md overflow-hidden border border-gray-300">
              <button
                onClick={() => setTimeView('student')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeView === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Student Time
              </button>
              <button
                onClick={() => setTimeView('teacher')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                  timeView === 'teacher'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Teacher Time
              </button>
              <button
                onClick={() => setTimeView('cairo')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                  timeView === 'cairo'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cairo Time
              </button>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Operational Table - Limited Editing</p>
              <p>
                Only <span className="font-semibold">Status</span> and <span className="font-semibold">Admin Alert (Cairo)</span> fields are editable. 
                All time fields are auto-calculated based on timezones. Lessons happening today are highlighted in yellow.
              </p>
            </div>
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
                    placeholder="Lesson ID, Student..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
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
                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                  ))}
                </select>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Grade Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Grade
                </label>
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Grades</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
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
                  <option value="Scheduled">Scheduled</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date From
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date To
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredLessons.length}</span> lessons
          </p>
          <div className="text-sm text-gray-600">
            Viewing: <span className="font-semibold text-blue-600">
              {timeView === 'student' ? 'Student Time' : timeView === 'teacher' ? 'Teacher Time' : 'Cairo Time'}
            </span>
          </div>
        </div>

        {/* Master Schedule Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-20">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  {/* Frozen Columns */}
                  <th className="sticky left-0 bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r border-gray-200 min-w-[110px]">
                    <div>Date</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">التاريخ</div>
                  </th>
                  <th className="sticky left-[110px] bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r border-gray-200 min-w-[100px]">
                    <div>Day</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">اليوم</div>
                  </th>
                  <th className="sticky left-[210px] bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r border-gray-200 min-w-[120px]">
                    <div>Student ID</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">رقم الطالب</div>
                  </th>
                  <th className="sticky left-[330px] bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300 min-w-[150px]">
                    <div>Student Name</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">اسم الطالب</div>
                  </th>

                  {/* Scrollable Columns */}
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[100px]">
                    <div>Grade</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">المرحلة</div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[140px]">
                    <div>Subject</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">المادة</div>
                  </th>

                  {/* Student Time Group */}
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-700 bg-blue-50 min-w-[100px]">
                    <div>Start Student</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">بداية الطالب</div>
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-700 bg-blue-50 min-w-[100px]">
                    <div>End Student</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">نهاية الطالب</div>
                  </th>

                  {/* Teacher Time Group */}
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-700 bg-purple-50 min-w-[100px]">
                    <div>Start Teacher</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">بداية المعلم</div>
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-700 bg-purple-50 min-w-[100px]">
                    <div>End Teacher</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">نهاية المعلم</div>
                  </th>

                  {/* Timezone Info */}
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[90px]">
                    <div>Student TZ</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">فرق الطالب</div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[90px]">
                    <div>Teacher TZ</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">فرق المعلم</div>
                  </th>

                  {/* Actual Time */}
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-700 bg-green-50 min-w-[150px]">
                    <div>Actual Student Time</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">وقت الطالب الفعلي</div>
                  </th>

                  {/* Cairo Monitoring Group */}
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 bg-orange-50 min-w-[130px]">
                    <div>Admin Alert Cairo</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">تنبيه القاهرة</div>
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-700 bg-orange-50 min-w-[110px]">
                    <div>Cairo Time</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">توقيت القاهرة</div>
                  </th>

                  {/* Status & IDs */}
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">
                    <div>Status</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">الحالة</div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">
                    <div>Lesson ID</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">معرف الحصة</div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[110px]">
                    <div>Teacher ID</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">رقم المعلم</div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[150px]">
                    <div>Teacher Name</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">اسم المعلم</div>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">
                    <div>Teacher Country</div>
                    <div className="text-[10px] text-gray-500 font-normal mt-0.5">دولة المعلم</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLessons.map(lesson => {
                  const isTodayLesson = isToday(lesson.date);
                  const isUpcomingLesson = isUpcoming(lesson.date, lesson.startStudent);
                  const hasEdits = !!editedData[lesson.lessonId];
                  
                  return (
                    <tr 
                      key={lesson.lessonId} 
                      className={`transition-colors ${
                        hasEdits ? 'bg-blue-50 ring-2 ring-blue-400' :
                        isTodayLesson ? 'bg-yellow-50' :
                        'hover:bg-gray-50'
                      }`}
                    >
                      {/* Date - Frozen */}
                      <td className="sticky left-0 bg-white px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        {lesson.date}
                      </td>

                      {/* Day - Frozen */}
                      <td className="sticky left-[110px] bg-white px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                        {lesson.day}
                      </td>

                      {/* Student ID - Frozen */}
                      <td className="sticky left-[210px] bg-white px-4 py-3 text-sm font-mono text-gray-900 border-r border-gray-200">
                        {lesson.studentId}
                      </td>

                      {/* Student Name - Frozen */}
                      <td className="sticky left-[330px] bg-white px-4 py-3 text-sm font-medium text-gray-900 border-r-2 border-gray-300">
                        {lesson.studentName}
                        {isTodayLesson && (
                          <span className="ml-2 px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs rounded-full font-semibold">TODAY</span>
                        )}
                      </td>

                      {/* Grade */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {lesson.grade}
                      </td>

                      {/* Subject */}
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {lesson.subject}
                      </td>

                      {/* Start Student */}
                      <td className="px-4 py-3 text-sm font-mono text-gray-900 bg-blue-50 text-right">
                        {lesson.startStudent}
                      </td>

                      {/* End Student */}
                      <td className="px-4 py-3 text-sm font-mono text-gray-900 bg-blue-50 text-right">
                        {lesson.endStudent}
                      </td>

                      {/* Start Teacher */}
                      <td className="px-4 py-3 text-sm font-mono text-gray-900 bg-purple-50 text-right">
                        {lesson.startTeacher}
                      </td>

                      {/* End Teacher */}
                      <td className="px-4 py-3 text-sm font-mono text-gray-900 bg-purple-50 text-right">
                        {lesson.endTeacher}
                      </td>

                      {/* Student TZ */}
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {lesson.studentTZ}
                      </td>

                      {/* Teacher TZ */}
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {lesson.teacherTZ}
                      </td>

                      {/* Actual Student Time */}
                      <td className="px-4 py-3 text-sm font-mono text-gray-900 bg-green-50 text-right">
                        {lesson.actualStudentTime}
                      </td>

                      {/* Admin Alert Cairo - EDITABLE */}
                      <td className="px-4 py-3 text-sm bg-orange-50 text-center">
                        <button
                          onClick={() => handleAlertChange(
                            lesson.lessonId, 
                            getCellValue(lesson, 'adminAlertCairo') === 'ok' ? 'warning' : 'ok'
                          )}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            getCellValue(lesson, 'adminAlertCairo') === 'ok'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-200 text-orange-900'
                          }`}
                        >
                          {getCellValue(lesson, 'adminAlertCairo') === 'ok' ? (
                            <>
                              <Clock className="size-3" />
                              OK
                            </>
                          ) : (
                            <>
                              <Bell className="size-3" />
                              Alert
                            </>
                          )}
                        </button>
                      </td>

                      {/* Cairo Time */}
                      <td className="px-4 py-3 text-sm font-mono text-gray-900 bg-orange-50 text-right">
                        {lesson.cairoTime}
                      </td>

                      {/* Status - EDITABLE */}
                      <td className="px-4 py-3 text-sm">
                        <select
                          value={getCellValue(lesson, 'status') as LessonStatus}
                          onChange={(e) => handleStatusChange(lesson.lessonId, e.target.value as LessonStatus)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${
                            getStatusColor(getCellValue(lesson, 'status') as LessonStatus)
                          }`}
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Lesson ID */}
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">
                        {lesson.lessonId}
                      </td>

                      {/* Teacher ID */}
                      <td className="px-4 py-3 text-sm font-mono text-gray-700">
                        {lesson.teacherId}
                      </td>

                      {/* Teacher Name */}
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {lesson.teacherName}
                      </td>

                      {/* Teacher Country */}
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {lesson.teacherCountry}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredLessons.length === 0 && (
              <div className="text-center py-12 bg-gray-50">
                <Calendar className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No lessons found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex flex-wrap items-center gap-6 text-xs">
              <p className="font-medium text-gray-700 mr-2">Visual Groups:</p>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-blue-50 border border-blue-200 rounded"></div>
                <span className="text-gray-600">Student Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-purple-50 border border-purple-200 rounded"></div>
                <span className="text-gray-600">Teacher Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-green-50 border border-green-200 rounded"></div>
                <span className="text-gray-600">Actual Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-orange-50 border border-orange-200 rounded"></div>
                <span className="text-gray-600">Cairo Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-yellow-50 border border-yellow-200 rounded"></div>
                <span className="text-gray-600">Today's Lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-400 shadow-lg z-50">
          <div className="max-w-full mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="size-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Unsaved Changes</p>
                  <p className="text-sm text-gray-600">
                    You have modified {Object.keys(editedData).length} lesson{Object.keys(editedData).length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDiscard}
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                >
                  <XIcon className="size-4" />
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-sm"
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
