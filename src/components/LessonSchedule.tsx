import { useState } from 'react';
import { Search, Filter, Calendar, CheckCircle2, XCircle, Clock, DollarSign, Info } from 'lucide-react';

type LessonStatus = 'Scheduled' | 'Completed' | 'Cancelled';

type Lesson = {
  id: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  date: string;
  time: string;
  status: LessonStatus;
};

export function LessonSchedule() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<LessonStatus | 'All'>('All');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Mock lessons data
  const lessons: Lesson[] = [
    {
      id: 'LSN-001',
      studentId: 'STU-001',
      studentName: 'John Smith',
      teacherId: 'TCH-001',
      teacherName: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      date: '2026-02-10',
      time: '09:00 - 10:00',
      status: 'Scheduled',
    },
    {
      id: 'LSN-002',
      studentId: 'STU-002',
      studentName: 'Emma Davis',
      teacherId: 'TCH-002',
      teacherName: 'Prof. Ahmed Hassan',
      subject: 'Chemistry',
      date: '2026-02-10',
      time: '14:00 - 15:00',
      status: 'Scheduled',
    },
    {
      id: 'LSN-003',
      studentId: 'STU-003',
      studentName: 'Michael Chen',
      teacherId: 'TCH-004',
      teacherName: 'Mr. David Miller',
      subject: 'Computer Science',
      date: '2026-02-11',
      time: '16:00 - 17:00',
      status: 'Completed',
    },
    {
      id: 'LSN-004',
      studentId: 'STU-001',
      studentName: 'John Smith',
      teacherId: 'TCH-001',
      teacherName: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      date: '2026-02-05',
      time: '09:00 - 10:00',
      status: 'Completed',
    },
    {
      id: 'LSN-005',
      studentId: 'STU-002',
      studentName: 'Emma Davis',
      teacherId: 'TCH-002',
      teacherName: 'Prof. Ahmed Hassan',
      subject: 'Chemistry',
      date: '2026-02-06',
      time: '14:00 - 15:00',
      status: 'Cancelled',
    },
    {
      id: 'LSN-006',
      studentId: 'STU-004',
      studentName: 'Sophia Brown',
      teacherId: 'TCH-003',
      teacherName: 'Ms. Emily Chen',
      subject: 'English',
      date: '2026-02-12',
      time: '10:00 - 11:00',
      status: 'Scheduled',
    },
  ];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lesson.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    Scheduled: lessons.filter((l) => l.status === 'Scheduled').length,
    Completed: lessons.filter((l) => l.status === 'Completed').length,
    Cancelled: lessons.filter((l) => l.status === 'Cancelled').length,
  };

  const handleMarkComplete = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowCompletionModal(true);
  };

  const confirmCompletion = () => {
    // In a real app, update backend and trigger financial calculation
    setShowCompletionModal(false);
    setSelectedLesson(null);
  };

  const getStatusBadge = (status: LessonStatus) => {
    const styles = {
      Scheduled: 'bg-blue-100 text-blue-700 border-blue-200',
      Completed: 'bg-green-100 text-green-700 border-green-200',
      Cancelled: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    const icons = {
      Scheduled: Clock,
      Completed: CheckCircle2,
      Cancelled: XCircle,
    };

    const Icon = icons[status];

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        <Icon className="size-3" />
        {status}
      </span>
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Workflow Step 5 of 5</span>
            <span className="text-gray-400">•</span>
            <span className="font-medium text-blue-600">Core System Screen</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">Lesson Schedule</h1>
          <p className="text-gray-600 mt-1">
            Single source of truth for all lessons - Track execution and trigger financial calculations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
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

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student, teacher, subject, or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as LessonStatus | 'All')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lessons Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Lesson ID</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Student</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Teacher</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Subject</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Date</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Time</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLessons.map((lesson) => (
                  <tr key={lesson.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{lesson.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{lesson.studentName}</p>
                        <p className="text-xs text-gray-500">{lesson.studentId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{lesson.teacherName}</p>
                        <p className="text-xs text-gray-500">{lesson.teacherId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{lesson.subject}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {new Date(lesson.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{lesson.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(lesson.status)}
                        {lesson.status === 'Completed' && (
                          <FinancialIndicator />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {lesson.status === 'Scheduled' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleMarkComplete(lesson)}
                            className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Mark Complete
                          </button>
                          <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="size-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No lessons found matching your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Mark Lesson as Completed</h3>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to mark this lesson as completed?
              </p>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Lesson ID:</span>
                  <span className="font-medium text-gray-900">{selectedLesson.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Student:</span>
                  <span className="font-medium text-gray-900">{selectedLesson.studentName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Teacher:</span>
                  <span className="font-medium text-gray-900">{selectedLesson.teacherName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(selectedLesson.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Info className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      System Behavior
                    </p>
                    <p className="text-sm text-blue-700">
                      This will automatically trigger financial calculation and move the lesson to completed records.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCompletionModal(false);
                  setSelectedLesson(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmCompletion}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="size-4" />
                Confirm Completion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FinancialIndicator() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded text-xs font-medium text-emerald-700 cursor-help"
      >
        <DollarSign className="size-3" />
        Counted
      </div>

      {showTooltip && (
        <div className="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-10">
          <p className="font-medium mb-1">Financial Impact</p>
          <p className="text-gray-300">
            This lesson is automatically counted in financial calculations. The payment has been calculated based on lesson completion.
          </p>
          <div className="absolute left-4 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}
