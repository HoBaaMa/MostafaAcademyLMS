import { useState } from 'react';
import { 
  Calendar,
  Clock,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Globe,
  AlertCircle,
  BookOpen,
  User,
  Save,
  X as XIcon,
  Eye
} from 'lucide-react';

type LessonStatus = 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled';

type Lesson = {
  id: string;
  studentName: string;
  teacherName: string;
  teacherId: string;
  subject: string;
  datePH: string;
  dateCA: string;
  startTime: string;
  status: LessonStatus;
  isConfirmed: boolean;
  confirmedBy: string;
  confirmedDate: string;
};

type EditedLesson = Lesson & { hasChanges?: boolean };

export function MasterSchedule() {
  const [viewTimezone, setViewTimezone] = useState<'PH' | 'CA'>('PH');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedConfirmed, setSelectedConfirmed] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  // Mock data
  const initialLessons: Lesson[] = [
    {
      id: 'LSN001',
      studentName: 'Sarah Johnson',
      teacherName: 'Dr. Ahmed Hassan',
      teacherId: 'TCH001',
      subject: 'Mathematics',
      datePH: '2026-02-15',
      dateCA: '2026-02-14',
      startTime: '14:00',
      status: 'Confirmed',
      isConfirmed: true,
      confirmedBy: 'Admin User',
      confirmedDate: '2026-02-10'
    },
    {
      id: 'LSN002',
      studentName: 'Michael Chen',
      teacherName: 'Prof. Fatima Al-Sayed',
      teacherId: 'TCH002',
      subject: 'Physics',
      datePH: '2026-02-15',
      dateCA: '2026-02-15',
      startTime: '16:00',
      status: 'Scheduled',
      isConfirmed: false,
      confirmedBy: '',
      confirmedDate: ''
    },
    {
      id: 'LSN003',
      studentName: 'Emily Rodriguez',
      teacherName: 'Dr. Ahmed Hassan',
      teacherId: 'TCH001',
      subject: 'Algebra',
      datePH: '2026-02-16',
      dateCA: '2026-02-15',
      startTime: '10:00',
      status: 'Completed',
      isConfirmed: true,
      confirmedBy: 'Admin User',
      confirmedDate: '2026-02-12'
    },
    {
      id: 'LSN004',
      studentName: 'Omar Abdullah',
      teacherName: 'Mr. John Smith',
      teacherId: 'TCH003',
      subject: 'English',
      datePH: '2026-02-16',
      dateCA: '2026-02-16',
      startTime: '15:00',
      status: 'Cancelled',
      isConfirmed: true,
      confirmedBy: 'Teacher Portal',
      confirmedDate: '2026-02-11'
    },
    {
      id: 'LSN005',
      studentName: 'Layla Hassan',
      teacherName: 'Ms. Maria Garcia',
      teacherId: 'TCH004',
      subject: 'Chemistry',
      datePH: '2026-02-17',
      dateCA: '2026-02-16',
      startTime: '09:00',
      status: 'Scheduled',
      isConfirmed: false,
      confirmedBy: '',
      confirmedDate: ''
    },
    {
      id: 'LSN006',
      studentName: 'Ahmed Al-Mansoori',
      teacherName: 'Prof. Fatima Al-Sayed',
      teacherId: 'TCH002',
      subject: 'Physics',
      datePH: '2026-02-17',
      dateCA: '2026-02-17',
      startTime: '13:00',
      status: 'Confirmed',
      isConfirmed: true,
      confirmedBy: 'Admin User',
      confirmedDate: '2026-02-13'
    },
    {
      id: 'LSN007',
      studentName: 'Sarah Johnson',
      teacherName: 'Dr. Ahmed Hassan',
      teacherId: 'TCH001',
      subject: 'Calculus',
      datePH: '2026-02-18',
      dateCA: '2026-02-17',
      startTime: '14:00',
      status: 'Scheduled',
      isConfirmed: false,
      confirmedBy: '',
      confirmedDate: ''
    },
    {
      id: 'LSN008',
      studentName: 'Michael Chen',
      teacherName: 'Mr. John Smith',
      teacherId: 'TCH003',
      subject: 'Literature',
      datePH: '2026-02-18',
      dateCA: '2026-02-18',
      startTime: '11:00',
      status: 'Confirmed',
      isConfirmed: true,
      confirmedBy: 'Teacher Portal',
      confirmedDate: '2026-02-14'
    },
    {
      id: 'LSN009',
      studentName: 'Emily Rodriguez',
      teacherName: 'Ms. Maria Garcia',
      teacherId: 'TCH004',
      subject: 'Organic Chemistry',
      datePH: '2026-02-19',
      dateCA: '2026-02-18',
      startTime: '10:00',
      status: 'Completed',
      isConfirmed: true,
      confirmedBy: 'Admin User',
      confirmedDate: '2026-02-15'
    },
    {
      id: 'LSN010',
      studentName: 'Omar Abdullah',
      teacherName: 'Prof. Fatima Al-Sayed',
      teacherId: 'TCH002',
      subject: 'Mechanics',
      datePH: '2026-02-19',
      dateCA: '2026-02-19',
      startTime: '16:00',
      status: 'Scheduled',
      isConfirmed: false,
      confirmedBy: '',
      confirmedDate: ''
    }
  ];

  const teachers = [
    { id: 'TCH001', name: 'Dr. Ahmed Hassan' },
    { id: 'TCH002', name: 'Prof. Fatima Al-Sayed' },
    { id: 'TCH003', name: 'Mr. John Smith' },
    { id: 'TCH004', name: 'Ms. Maria Garcia' }
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [lessons, setLessons] = useState<EditedLesson[]>(initialLessons);

  const hasChanges = lessons.some(l => l.hasChanges);

  const getDayOfWeek = (dateStr: string): string => {
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (time: string): string => {
    if (!time) return '—';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: LessonStatus, isConfirmed: boolean): string => {
    if (!isConfirmed && status === 'Scheduled') {
      return 'bg-orange-50 border-l-4 border-orange-400';
    }
    
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-50 border-l-4 border-blue-400';
      case 'Scheduled':
        return 'bg-gray-50 border-l-4 border-gray-400';
      case 'Completed':
        return 'bg-green-50 border-l-4 border-green-400';
      case 'Cancelled':
        return 'bg-red-50 border-l-4 border-red-400';
      default:
        return 'bg-white';
    }
  };

  const getStatusBadgeColor = (status: LessonStatus): string => {
    switch (status) {
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-gray-100 text-gray-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter lessons
  const filteredLessons = lessons.filter(lesson => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      lesson.id.toLowerCase().includes(searchLower) ||
      lesson.studentName.toLowerCase().includes(searchLower) ||
      lesson.teacherName.toLowerCase().includes(searchLower) ||
      lesson.subject.toLowerCase().includes(searchLower);
    
    if (!matchesSearch) return false;

    // Teacher filter
    if (selectedTeacher && lesson.teacherId !== selectedTeacher) return false;

    // Status filter
    if (selectedStatus && lesson.status !== selectedStatus) return false;

    // Confirmed filter
    if (selectedConfirmed === 'confirmed' && !lesson.isConfirmed) return false;
    if (selectedConfirmed === 'unconfirmed' && lesson.isConfirmed) return false;

    // Date range filter
    const lessonDate = viewTimezone === 'PH' ? lesson.datePH : lesson.dateCA;
    if (dateFrom && lessonDate < dateFrom) return false;
    if (dateTo && lessonDate > dateTo) return false;

    // Day filter
    if (selectedDay) {
      const lessonDay = getDayOfWeek(lessonDate);
      if (lessonDay !== selectedDay) return false;
    }

    return true;
  });

  const handleConfirmationToggle = (lessonId: string) => {
    setLessons(prev => prev.map(lesson => {
      if (lesson.id === lessonId) {
        const newIsConfirmed = !lesson.isConfirmed;
        return {
          ...lesson,
          isConfirmed: newIsConfirmed,
          confirmedBy: newIsConfirmed ? 'Admin User' : '',
          confirmedDate: newIsConfirmed ? new Date().toISOString().split('T')[0] : '',
          hasChanges: true
        };
      }
      return lesson;
    }));
  };

  const handleSave = () => {
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    console.log('Saving changes:', lessons.filter(l => l.hasChanges));
    setLessons(prev => prev.map(l => ({ ...l, hasChanges: false })));
    setShowSaveModal(false);
  };

  const handleDiscard = () => {
    setLessons(initialLessons);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Master Schedule</h1>
            </div>
            <p className="text-gray-600">Main working table for teachers and administrators</p>
          </div>

          {/* Timezone Toggle */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-2 shadow-sm">
            <Globe className="size-5 text-gray-600" />
            <div className="flex rounded-md overflow-hidden border border-gray-300">
              <button
                onClick={() => setViewTimezone('PH')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  viewTimezone === 'PH'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Philippines Time
              </button>
              <button
                onClick={() => setViewTimezone('CA')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                  viewTimezone === 'CA'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Canada Time
              </button>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Editable Field: Confirmation Status</p>
              <p>
                Only the "Confirmed" status can be edited. Toggle confirmations to mark lessons as confirmed. 
                All other fields are read-only and managed through their respective management screens.
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
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Lesson ID, Student, Teacher, Subject..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Filter by Teacher
                </label>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Teachers</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Filter by Day
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Days</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Filter by Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Filter by Confirmed
                </label>
                <select
                  value={selectedConfirmed}
                  onChange={(e) => setSelectedConfirmed(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All</option>
                  <option value="confirmed">Confirmed Only</option>
                  <option value="unconfirmed">Unconfirmed Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredLessons.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{lessons.length}</span> lessons
          </p>
          <div className="text-sm text-gray-600">
            Viewing in <span className="font-semibold text-blue-600">
              {viewTimezone === 'PH' ? 'Philippines Time' : 'Canada Time'}
            </span>
          </div>
        </div>

        {/* Master Schedule Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Lesson ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Student Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Teacher Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                    {viewTimezone === 'PH' ? 'Date (PH)' : 'Date (CA)'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Start Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Confirmed</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Confirmed By</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Confirmed Date</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLessons.map(lesson => (
                  <tr 
                    key={lesson.id} 
                    className={`transition-colors ${getStatusColor(lesson.status, lesson.isConfirmed)} ${
                      lesson.hasChanges ? 'ring-2 ring-yellow-400' : ''
                    }`}
                  >
                    {/* Lesson ID */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-mono text-sm text-gray-900 font-medium">{lesson.id}</span>
                    </td>

                    {/* Student Name */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="size-4 text-gray-400" />
                        <span className="text-sm text-gray-900 font-medium">{lesson.studentName}</span>
                      </div>
                    </td>

                    {/* Teacher Name */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{lesson.teacherName}</span>
                    </td>

                    {/* Subject */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <BookOpen className="size-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{lesson.subject}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900 font-medium">
                          {formatDate(viewTimezone === 'PH' ? lesson.datePH : lesson.dateCA)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getDayOfWeek(viewTimezone === 'PH' ? lesson.datePH : lesson.dateCA)}
                        </span>
                      </div>
                    </td>

                    {/* Start Time */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-900 font-medium">
                        <Clock className="size-4 text-gray-400" />
                        {formatTime(lesson.startTime)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(lesson.status)}`}>
                        {lesson.status}
                      </span>
                    </td>

                    {/* Is Confirmed - EDITABLE */}
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleConfirmationToggle(lesson.id)}
                        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                          lesson.isConfirmed ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        title="Toggle confirmation"
                      >
                        <span
                          className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                            lesson.isConfirmed ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Confirmed By */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{lesson.confirmedBy || '—'}</span>
                    </td>

                    {/* Confirmed Date */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {lesson.confirmedDate ? formatDate(lesson.confirmedDate) : '—'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <button
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
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
              <p className="font-medium text-gray-700 mr-2">Visual Indicators:</p>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-blue-50 border-l-4 border-blue-400 rounded"></div>
                <span className="text-gray-600">Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-gray-50 border-l-4 border-gray-400 rounded"></div>
                <span className="text-gray-600">Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-green-50 border-l-4 border-green-400 rounded"></div>
                <span className="text-gray-600">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-red-50 border-l-4 border-red-400 rounded"></div>
                <span className="text-gray-600">Cancelled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-orange-50 border-l-4 border-orange-400 rounded"></div>
                <span className="text-gray-600">Unconfirmed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        {hasChanges && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-yellow-400 shadow-lg z-50">
            <div className="max-w-[1800px] mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="size-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Unsaved Changes</p>
                    <p className="text-sm text-gray-600">
                      You have modified {lessons.filter(l => l.hasChanges).length} lesson{lessons.filter(l => l.hasChanges).length !== 1 ? 's' : ''}
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
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Save className="size-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Confirmation Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="size-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Confirm Save Changes</h3>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Save confirmation status changes? This will update the master schedule records.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-6">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{lessons.filter(l => l.hasChanges).length}</span> lesson{lessons.filter(l => l.hasChanges).length !== 1 ? 's' : ''} will be updated
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSave}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="size-4" />
                    Confirm Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
