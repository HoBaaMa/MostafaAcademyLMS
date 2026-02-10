import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Ban,
  Lock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

type LessonStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Trial_Done' | 'Trial_Canceled' | 'Paid_Cancelled';

type Lesson = {
  id: string;
  studentId: string;
  studentName: string;
  studentTimeZone: string;
  teacherId: string;
  teacherName: string;
  teacherTimeZone: string;
  subject: string;
  stage: string;
  dayName: string;
  date: string;
  studentDate: string;
  teacherDate: string;
  dayIndex: number;
  startTimeStudent: string;
  endTimeStudent: string;
  startTimeTeacher: string;
  endTimeTeacher: string;
  status: LessonStatus;
  reason: string;
};

const SUBJECTS = ['Mathematics', 'Science', 'English', 'Arabic', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

const STAGES = [
  { group: 'Elementary', options: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'] },
  { group: 'Mid', options: ['Grade 7', 'Grade 8', 'Grade 9'] },
  { group: 'High School', options: ['Grade 10', 'Grade 11', 'Grade 12'] },
];

const STATUSES: LessonStatus[] = ['Scheduled', 'Completed', 'Cancelled', 'Trial_Done', 'Trial_Canceled', 'Paid_Cancelled'];

export function LessonSchedule() {
  const [searchQuery, setSearchQuery] = useState('');
  const [studentFilter, setStudentFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [dayNameFilter, setDayNameFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | LessonStatus>('All');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  // Mock data - 15 lessons
  const lessons: Lesson[] = [
    {
      id: 'LSN001234',
      studentId: 'MID102938',
      studentName: 'Ahmad Hassan',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'Grade 10',
      dayName: 'Monday',
      date: '2026-02-17',
      studentDate: '2026-02-17',
      teacherDate: '2026-02-17',
      dayIndex: 1,
      startTimeStudent: '16:00',
      endTimeStudent: '17:00',
      startTimeTeacher: '16:00',
      endTimeTeacher: '17:00',
      status: 'Scheduled',
      reason: ''
    },
    {
      id: 'LSN001235',
      studentId: 'MID103456',
      studentName: 'Layla Ahmed',
      studentTimeZone: 'Asia/Dubai (UTC+4)',
      teacherId: 'TCHR002',
      teacherName: 'Prof. Michael Chen',
      teacherTimeZone: 'America/Los_Angeles (UTC-8)',
      subject: 'Physics',
      stage: 'Grade 11',
      dayName: 'Tuesday',
      date: '2026-02-18',
      studentDate: '2026-02-19',
      teacherDate: '2026-02-18',
      dayIndex: 2,
      startTimeStudent: '20:00',
      endTimeStudent: '21:00',
      startTimeTeacher: '08:00',
      endTimeTeacher: '09:00',
      status: 'Scheduled',
      reason: ''
    },
    {
      id: 'LSN001236',
      studentId: 'MID104567',
      studentName: 'Omar Ibrahim',
      studentTimeZone: 'Africa/Cairo (UTC+2)',
      teacherId: 'TCHR003',
      teacherName: 'Mrs. Fatima Al-Sayed',
      teacherTimeZone: 'Africa/Cairo (UTC+2)',
      subject: 'Arabic',
      stage: 'Grade 8',
      dayName: 'Wednesday',
      date: '2026-02-19',
      studentDate: '2026-02-19',
      teacherDate: '2026-02-19',
      dayIndex: 3,
      startTimeStudent: '15:00',
      endTimeStudent: '16:00',
      startTimeTeacher: '15:00',
      endTimeTeacher: '16:00',
      status: 'Scheduled',
      reason: ''
    },
    {
      id: 'LSN001237',
      studentId: 'MID105678',
      studentName: 'Maryam Khalil',
      studentTimeZone: 'Europe/London (UTC+0)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'Grade 4',
      dayName: 'Thursday',
      date: '2026-02-20',
      studentDate: '2026-02-20',
      teacherDate: '2026-02-20',
      dayIndex: 4,
      startTimeStudent: '18:00',
      endTimeStudent: '19:00',
      startTimeTeacher: '13:00',
      endTimeTeacher: '14:00',
      status: 'Scheduled',
      reason: ''
    },
    {
      id: 'LSN001238',
      studentId: 'MID106789',
      studentName: 'Youssef Ali',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR004',
      teacherName: 'Dr. James Williams',
      teacherTimeZone: 'America/Toronto (UTC-5)',
      subject: 'Chemistry',
      stage: 'Grade 12',
      dayName: 'Friday',
      date: '2026-02-21',
      studentDate: '2026-02-21',
      teacherDate: '2026-02-21',
      dayIndex: 5,
      startTimeStudent: '14:00',
      endTimeStudent: '15:00',
      startTimeTeacher: '14:00',
      endTimeTeacher: '15:00',
      status: 'Scheduled',
      reason: ''
    },
    {
      id: 'LSN001239',
      studentId: 'MID102938',
      studentName: 'Ahmad Hassan',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'Grade 10',
      dayName: 'Monday',
      date: '2026-02-10',
      studentDate: '2026-02-10',
      teacherDate: '2026-02-10',
      dayIndex: 1,
      startTimeStudent: '16:00',
      endTimeStudent: '17:00',
      startTimeTeacher: '16:00',
      endTimeTeacher: '17:00',
      status: 'Completed',
      reason: ''
    },
    {
      id: 'LSN001240',
      studentId: 'MID103456',
      studentName: 'Layla Ahmed',
      studentTimeZone: 'Asia/Dubai (UTC+4)',
      teacherId: 'TCHR002',
      teacherName: 'Prof. Michael Chen',
      teacherTimeZone: 'America/Los_Angeles (UTC-8)',
      subject: 'Physics',
      stage: 'Grade 11',
      dayName: 'Tuesday',
      date: '2026-02-11',
      studentDate: '2026-02-12',
      teacherDate: '2026-02-11',
      dayIndex: 2,
      startTimeStudent: '20:00',
      endTimeStudent: '21:00',
      startTimeTeacher: '08:00',
      endTimeTeacher: '09:00',
      status: 'Completed',
      reason: ''
    },
    {
      id: 'LSN001241',
      studentId: 'MID104567',
      studentName: 'Omar Ibrahim',
      studentTimeZone: 'Africa/Cairo (UTC+2)',
      teacherId: 'TCHR003',
      teacherName: 'Mrs. Fatima Al-Sayed',
      teacherTimeZone: 'Africa/Cairo (UTC+2)',
      subject: 'Arabic',
      stage: 'Grade 8',
      dayName: 'Sunday',
      date: '2026-02-09',
      studentDate: '2026-02-09',
      teacherDate: '2026-02-09',
      dayIndex: 0,
      startTimeStudent: '15:00',
      endTimeStudent: '16:00',
      startTimeTeacher: '15:00',
      endTimeTeacher: '16:00',
      status: 'Cancelled',
      reason: 'Student was sick'
    },
    {
      id: 'LSN001242',
      studentId: 'MID105678',
      studentName: 'Maryam Khalil',
      studentTimeZone: 'Europe/London (UTC+0)',
      teacherId: 'TCHR005',
      teacherName: 'Ms. Emily Davis',
      teacherTimeZone: 'Europe/London (UTC+0)',
      subject: 'English',
      stage: 'Grade 4',
      dayName: 'Saturday',
      date: '2026-02-22',
      studentDate: '2026-02-22',
      teacherDate: '2026-02-22',
      dayIndex: 6,
      startTimeStudent: '10:00',
      endTimeStudent: '11:00',
      startTimeTeacher: '10:00',
      endTimeTeacher: '11:00',
      status: 'Scheduled',
      reason: ''
    },
    {
      id: 'LSN001243',
      studentId: 'MID106789',
      studentName: 'Youssef Ali',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR004',
      teacherName: 'Dr. James Williams',
      teacherTimeZone: 'America/Toronto (UTC-5)',
      subject: 'Chemistry',
      stage: 'Grade 12',
      dayName: 'Friday',
      date: '2026-02-14',
      studentDate: '2026-02-14',
      teacherDate: '2026-02-14',
      dayIndex: 5,
      startTimeStudent: '14:00',
      endTimeStudent: '15:00',
      startTimeTeacher: '14:00',
      endTimeTeacher: '15:00',
      status: 'Completed',
      reason: ''
    },
    {
      id: 'LSN001244',
      studentId: 'MID102938',
      studentName: 'Ahmad Hassan',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'Grade 10',
      dayName: 'Wednesday',
      date: '2026-02-05',
      studentDate: '2026-02-05',
      teacherDate: '2026-02-05',
      dayIndex: 3,
      startTimeStudent: '16:00',
      endTimeStudent: '17:00',
      startTimeTeacher: '16:00',
      endTimeTeacher: '17:00',
      status: 'Trial_Done',
      reason: ''
    },
    {
      id: 'LSN001245',
      studentId: 'MID103456',
      studentName: 'Layla Ahmed',
      studentTimeZone: 'Asia/Dubai (UTC+4)',
      teacherId: 'TCHR005',
      teacherName: 'Ms. Emily Davis',
      teacherTimeZone: 'Europe/London (UTC+0)',
      subject: 'English',
      stage: 'Grade 11',
      dayName: 'Thursday',
      date: '2026-02-06',
      studentDate: '2026-02-07',
      teacherDate: '2026-02-06',
      dayIndex: 4,
      startTimeStudent: '21:00',
      endTimeStudent: '22:00',
      startTimeTeacher: '17:00',
      endTimeTeacher: '18:00',
      status: 'Trial_Canceled',
      reason: 'Student did not show up'
    },
    {
      id: 'LSN001246',
      studentId: 'MID104567',
      studentName: 'Omar Ibrahim',
      studentTimeZone: 'Africa/Cairo (UTC+2)',
      teacherId: 'TCHR003',
      teacherName: 'Mrs. Fatima Al-Sayed',
      teacherTimeZone: 'Africa/Cairo (UTC+2)',
      subject: 'Arabic',
      stage: 'Grade 8',
      dayName: 'Monday',
      date: '2026-02-03',
      studentDate: '2026-02-03',
      teacherDate: '2026-02-03',
      dayIndex: 1,
      startTimeStudent: '15:00',
      endTimeStudent: '16:00',
      startTimeTeacher: '15:00',
      endTimeTeacher: '16:00',
      status: 'Paid_Cancelled',
      reason: 'Family emergency - refund processed'
    },
    {
      id: 'LSN001247',
      studentId: 'MID105678',
      studentName: 'Maryam Khalil',
      studentTimeZone: 'Europe/London (UTC+0)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'Grade 4',
      dayName: 'Tuesday',
      date: '2026-02-25',
      studentDate: '2026-02-25',
      teacherDate: '2026-02-25',
      dayIndex: 2,
      startTimeStudent: '18:00',
      endTimeStudent: '19:00',
      startTimeTeacher: '13:00',
      endTimeTeacher: '14:00',
      status: 'Scheduled',
      reason: ''
    },
    {
      id: 'LSN001248',
      studentId: 'MID106789',
      studentName: 'Youssef Ali',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR004',
      teacherName: 'Dr. James Williams',
      teacherTimeZone: 'America/Toronto (UTC-5)',
      subject: 'Chemistry',
      stage: 'Grade 12',
      dayName: 'Monday',
      date: '2026-02-24',
      studentDate: '2026-02-24',
      teacherDate: '2026-02-24',
      dayIndex: 1,
      startTimeStudent: '14:00',
      endTimeStudent: '15:00',
      startTimeTeacher: '14:00',
      endTimeTeacher: '15:00',
      status: 'Scheduled',
      reason: ''
    },
  ];

  // Filter logic
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStudent = !studentFilter || 
      lesson.studentId.toLowerCase().includes(studentFilter.toLowerCase()) ||
      lesson.studentName.toLowerCase().includes(studentFilter.toLowerCase());
    
    const matchesTeacher = !teacherFilter || 
      lesson.teacherId.toLowerCase().includes(teacherFilter.toLowerCase()) ||
      lesson.teacherName.toLowerCase().includes(teacherFilter.toLowerCase());
    
    const matchesSubject = !subjectFilter || lesson.subject === subjectFilter;
    
    const matchesStage = !stageFilter || lesson.stage === stageFilter;
    
    const matchesStatus = !statusFilter || lesson.status === statusFilter;
    
    const matchesDayName = !dayNameFilter || lesson.dayName === dayNameFilter;
    
    const lessonDate = new Date(lesson.date);
    const matchesDateFrom = !dateFromFilter || lessonDate >= new Date(dateFromFilter);
    const matchesDateTo = !dateToFilter || lessonDate <= new Date(dateToFilter);
    
    const matchesTab = activeTab === 'All' || lesson.status === activeTab;
    
    return matchesSearch && matchesStudent && matchesTeacher && matchesSubject && 
           matchesStage && matchesStatus && matchesDateFrom && matchesDateTo && 
           matchesDayName && matchesTab;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLessons = filteredLessons.slice(startIndex, startIndex + itemsPerPage);

  // Calculate stats
  const statusCounts = {
    All: lessons.length,
    Scheduled: lessons.filter(l => l.status === 'Scheduled').length,
    Completed: lessons.filter(l => l.status === 'Completed').length,
    Cancelled: lessons.filter(l => l.status === 'Cancelled').length,
  };

  const getStatusColor = (status: LessonStatus): string => {
    const colors = {
      Scheduled: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-gray-100 text-gray-800',
      Trial_Done: 'bg-purple-100 text-purple-800',
      Trial_Canceled: 'bg-orange-100 text-orange-800',
      Paid_Cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: LessonStatus) => {
    const icons = {
      Scheduled: Clock,
      Completed: CheckCircle,
      Cancelled: XCircle,
      Trial_Done: CheckCircle,
      Trial_Canceled: XCircle,
      Paid_Cancelled: Ban,
    };
    return icons[status] || Clock;
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Lesson Schedule</h1>
            </div>
            <p className="text-gray-600">View and monitor all lesson schedule records</p>
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
                <h3 className="font-semibold text-blue-900">Read-Only Report</h3>
              </div>
              <p className="text-sm text-blue-800">
                This is a read-only view for monitoring and auditing purposes. Lessons cannot be edited, modified, or deleted from this screen.
                Use this page to review schedule records and view detailed information.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Lessons</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{lessons.length}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">Scheduled</p>
            <p className="text-2xl font-semibold text-blue-900 mt-1">{statusCounts.Scheduled}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700">Completed</p>
            <p className="text-2xl font-semibold text-green-900 mt-1">{statusCounts.Completed}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">Cancelled</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{statusCounts.Cancelled}</p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'All'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All ({statusCounts.All})
          </button>
          <button
            onClick={() => setActiveTab('Scheduled')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'Scheduled'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Scheduled ({statusCounts.Scheduled})
          </button>
          <button
            onClick={() => setActiveTab('Completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'Completed'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Completed ({statusCounts.Completed})
          </button>
          <button
            onClick={() => setActiveTab('Cancelled')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'Cancelled'
                ? 'bg-gray-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Cancelled ({statusCounts.Cancelled})
          </button>
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
                    placeholder="LSN001234..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Student ID / Name
                </label>
                <input
                  type="text"
                  value={studentFilter}
                  onChange={(e) => setStudentFilter(e.target.value)}
                  placeholder="Search student..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Teacher ID / Name
                </label>
                <input
                  type="text"
                  value={teacherFilter}
                  onChange={(e) => setTeacherFilter(e.target.value)}
                  placeholder="Search teacher..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

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
                  {SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stage
                </label>
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Stages</option>
                  {STAGES.map(group => (
                    <optgroup key={group.group} label={group.group}>
                      {group.options.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </optgroup>
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
                    <option key={status} value={status}>{status.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Day Name
                </label>
                <select
                  value={dayNameFilter}
                  onChange={(e) => setDayNameFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Days</option>
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date From
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
                  Date To
                </label>
                <input
                  type="date"
                  value={dateToFilter}
                  onChange={(e) => setDateToFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    {/* Frozen columns */}
                    <th className="sticky left-0 z-20 bg-gray-50 text-left px-3 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300">
                      <div className="flex items-center gap-1">
                        Lesson ID
                        <Lock className="size-3 text-gray-400" />
                      </div>
                    </th>
                    <th className="sticky left-[110px] z-20 bg-gray-50 text-left px-3 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300">
                      Student Name
                    </th>
                    
                    {/* Student Info */}
                    <th className="bg-blue-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Student ID</th>
                    <th className="bg-blue-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Student TZ</th>
                    
                    {/* Teacher Info */}
                    <th className="bg-purple-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Teacher ID</th>
                    <th className="bg-purple-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Teacher Name</th>
                    <th className="bg-purple-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Teacher TZ</th>
                    
                    {/* Lesson info */}
                    <th className="bg-green-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Subject</th>
                    <th className="bg-green-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Stage</th>
                    
                    {/* Date/Time */}
                    <th className="bg-orange-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Day Name</th>
                    <th className="bg-orange-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Date</th>
                    <th className="bg-orange-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Student Date</th>
                    <th className="bg-orange-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Teacher Date</th>
                    <th className="bg-orange-50 text-right px-3 py-3 text-xs font-medium text-gray-700">Day Index</th>
                    
                    {/* Time slots */}
                    <th className="bg-yellow-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Start (Student)</th>
                    <th className="bg-yellow-50 text-left px-3 py-3 text-xs font-medium text-gray-700">End (Student)</th>
                    <th className="bg-yellow-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Start (Teacher)</th>
                    <th className="bg-yellow-50 text-left px-3 py-3 text-xs font-medium text-gray-700">End (Teacher)</th>
                    
                    {/* Status */}
                    <th className="bg-pink-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Status</th>
                    <th className="bg-pink-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Reason</th>
                    
                    {/* Actions */}
                    <th className="sticky right-0 z-20 bg-gray-50 text-left px-3 py-3 text-xs font-medium text-gray-700 border-l-2 border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedLessons.map(lesson => {
                    const StatusIcon = getStatusIcon(lesson.status);
                    
                    return (
                      <tr key={lesson.id} className="hover:bg-gray-50 transition-colors">
                        {/* Frozen: Lesson ID */}
                        <td className="sticky left-0 z-10 bg-white px-3 py-3 border-r-2 border-gray-200 whitespace-nowrap">
                          <span className="font-mono text-xs text-gray-900">{lesson.id}</span>
                        </td>
                        
                        {/* Frozen: Student Name */}
                        <td className="sticky left-[110px] z-10 bg-white px-3 py-3 border-r-2 border-gray-200 whitespace-nowrap">
                          <span className="font-medium text-sm text-gray-900">{lesson.studentName}</span>
                        </td>
                        
                        {/* Student ID */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="font-mono text-xs text-gray-700">{lesson.studentId}</span>
                        </td>
                        
                        {/* Student TimeZone */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-600">{lesson.studentTimeZone}</span>
                        </td>
                        
                        {/* Teacher ID */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="font-mono text-xs text-gray-700">{lesson.teacherId}</span>
                        </td>
                        
                        {/* Teacher Name */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{lesson.teacherName}</span>
                        </td>
                        
                        {/* Teacher TimeZone */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-600">{lesson.teacherTimeZone}</span>
                        </td>
                        
                        {/* Subject */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{lesson.subject}</span>
                        </td>
                        
                        {/* Stage */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{lesson.stage}</span>
                        </td>
                        
                        {/* Day Name */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{lesson.dayName}</span>
                        </td>
                        
                        {/* Date */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-900 font-mono">{lesson.date}</span>
                        </td>
                        
                        {/* Student Date */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-700 font-mono">{lesson.studentDate}</span>
                        </td>
                        
                        {/* Teacher Date */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-700 font-mono">{lesson.teacherDate}</span>
                        </td>
                        
                        {/* Day Index */}
                        <td className="px-3 py-3 text-right whitespace-nowrap">
                          <span className="text-xs text-gray-700">{lesson.dayIndex}</span>
                        </td>
                        
                        {/* Start Time Student */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{lesson.startTimeStudent}</span>
                        </td>
                        
                        {/* End Time Student */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{lesson.endTimeStudent}</span>
                        </td>
                        
                        {/* Start Time Teacher */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{lesson.startTimeTeacher}</span>
                        </td>
                        
                        {/* End Time Teacher */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{lesson.endTimeTeacher}</span>
                        </td>
                        
                        {/* Status */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lesson.status)}`}>
                            <StatusIcon className="size-3 mr-1" />
                            {lesson.status.replace('_', ' ')}
                          </span>
                        </td>
                        
                        {/* Reason */}
                        <td className="px-3 py-3">
                          <span className="text-xs text-gray-600 line-clamp-1">{lesson.reason || '—'}</span>
                        </td>
                        
                        {/* Actions */}
                        <td className="sticky right-0 z-10 bg-white px-3 py-3 border-l-2 border-gray-200 whitespace-nowrap">
                          <Link
                            to={`/lessons/${lesson.id}`}
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-xs font-medium flex items-center gap-1 w-fit"
                          >
                            <Eye className="size-3" />
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Empty State */}
              {paginatedLessons.length === 0 && (
                <div className="text-center py-12 bg-gray-50">
                  <Calendar className="size-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-1">No lessons found</h3>
                  <p className="text-gray-600 text-sm">Try adjusting your filters or view tab</p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {paginatedLessons.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLessons.length)} of {filteredLessons.length} lessons
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

        {/* Read-Only Footer Note */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Audit & Reporting Mode</p>
              <p>
                This page is designed for viewing and auditing lesson schedules only. 
                All modification, editing, and deletion capabilities are disabled to ensure data integrity. 
                To make changes to lesson data, please use the appropriate management tools with proper permissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
