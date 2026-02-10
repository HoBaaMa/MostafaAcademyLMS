import { Link, useParams } from 'react-router';
import { 
  ArrowLeft, 
  Calendar, 
  Clock,
  GraduationCap,
  Award,
  Globe,
  CheckCircle,
  XCircle,
  Ban,
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

export function LessonDetails() {
  const { id } = useParams();

  // Mock lesson data
  const lesson: Lesson = {
    id: id || 'LSN001234',
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
  };

  const getStatusColor = (status: LessonStatus): string => {
    const colors = {
      Scheduled: 'bg-blue-100 text-blue-800 border-blue-300',
      Completed: 'bg-green-100 text-green-800 border-green-300',
      Cancelled: 'bg-gray-100 text-gray-800 border-gray-300',
      Trial_Done: 'bg-purple-100 text-purple-800 border-purple-300',
      Trial_Canceled: 'bg-orange-100 text-orange-800 border-orange-300',
      Paid_Cancelled: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
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
    const Icon = icons[status] || Clock;
    return <Icon className="size-4" />;
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/schedule"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Lesson Schedule
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="size-6 text-blue-700" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Lesson Details</h1>
                <p className="text-sm text-gray-600 font-mono mt-1">{lesson.id}</p>
              </div>
            </div>
            
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(lesson.status)}`}>
              {getStatusIcon(lesson.status)}
              <span className="ml-1.5">{lesson.status.replace('_', ' ')}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="size-5 text-blue-600" />
                <p className="text-sm font-medium text-gray-600">Lesson Date</p>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {new Date(lesson.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <p className="text-sm text-gray-600 mt-1">{lesson.dayName}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="size-5 text-purple-600" />
                <p className="text-sm font-medium text-gray-600">Subject</p>
              </div>
              <p className="text-xl font-semibold text-gray-900">{lesson.subject}</p>
              <p className="text-sm text-gray-600 mt-1">{lesson.stage}</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="size-5 text-orange-600" />
                <p className="text-sm font-medium text-gray-600">Duration</p>
              </div>
              <p className="text-xl font-semibold text-gray-900">1 Hour</p>
              <p className="text-sm text-gray-600 mt-1">{lesson.startTimeStudent} - {lesson.endTimeStudent}</p>
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap className="size-5 text-blue-600" />
            Student Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Student ID</label>
              <p className="text-sm text-gray-900 font-mono mt-1">{lesson.studentId}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Student Name</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-900 font-medium">{lesson.studentName}</p>
                <Link
                  to={`/students/${lesson.studentId}`}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
                >
                  <GraduationCap className="size-3" />
                  View Profile
                </Link>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Globe className="size-3.5" />
                Student Time Zone
              </label>
              <p className="text-sm text-gray-900 mt-1">{lesson.studentTimeZone}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Student Date</label>
              <p className="text-sm text-gray-900 font-mono mt-1">{lesson.studentDate}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Start Time (Student)</label>
              <p className="text-sm text-gray-900 font-mono mt-1">{lesson.startTimeStudent}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">End Time (Student)</label>
              <p className="text-sm text-gray-900 font-mono mt-1">{lesson.endTimeStudent}</p>
            </div>
          </div>
        </div>

        {/* Teacher Information */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="size-5 text-purple-600" />
            Teacher Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Teacher ID</label>
              <p className="text-sm text-gray-900 font-mono mt-1">{lesson.teacherId}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Teacher Name</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-900 font-medium">{lesson.teacherName}</p>
                <Link
                  to={`/teachers/${lesson.teacherId}`}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium hover:bg-purple-200 transition-colors"
                >
                  <Award className="size-3" />
                  View Profile
                </Link>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Globe className="size-3.5" />
                Teacher Time Zone
              </label>
              <p className="text-sm text-gray-900 mt-1">{lesson.teacherTimeZone}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Teacher Date</label>
              <p className="text-sm text-gray-900 font-mono mt-1">{lesson.teacherDate}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Start Time (Teacher)</label>
              <p className="text-sm text-gray-900 font-mono mt-1">{lesson.startTimeTeacher}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">End Time (Teacher)</label>
              <p className="text-sm text-gray-900 font-mono mt-1">{lesson.endTimeTeacher}</p>
            </div>
          </div>
        </div>

        {/* Lesson Details */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="size-5 text-orange-600" />
            Lesson Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Subject</label>
              <p className="text-sm text-gray-900 mt-1">{lesson.subject}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Stage</label>
              <p className="text-sm text-gray-900 mt-1">{lesson.stage}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Day Name</label>
              <p className="text-sm text-gray-900 mt-1">{lesson.dayName}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Day Index</label>
              <p className="text-sm text-gray-900 mt-1">{lesson.dayIndex}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Date</label>
              <p className="text-sm text-gray-900 font-mono mt-1">
                {new Date(lesson.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <div className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium border ${getStatusColor(lesson.status)}`}>
                  {getStatusIcon(lesson.status)}
                  <span className="ml-1.5">{lesson.status.replace('_', ' ')}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reason (if applicable) */}
        {lesson.reason && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="size-5 text-gray-600" />
              Reason
            </h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-900">{lesson.reason}</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/schedule"
            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Schedule
          </Link>
          <Link
            to={`/students/${lesson.studentId}`}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <GraduationCap className="size-4" />
            View Student Profile
          </Link>
          <Link
            to={`/teachers/${lesson.teacherId}`}
            className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
          >
            <Award className="size-4" />
            View Teacher Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
