import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Clock,
  BookOpen,
  Calendar,
  UserCog,
  Edit,
  Trash2,
  Check,
  X,
  AlertCircle,
  Info,
  Phone,
  GraduationCap,
  ChevronRight
} from 'lucide-react';

export function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock data - in real app, fetch based on ID
  const student = {
    id: 'MID123456',
    name: 'Ahmed Al-Saud',
    stage: 'Grade 10',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    timezone: 'UTC+3 (AST - Arabia Standard)',
    status: 'Active' as 'Active' | 'Drop',
    subjects: [
      { name: 'Mathematics', duration: 60, maxPerDay: 1, maxPerWeek: 3, maxPerMonth: 12 },
      { name: 'Physics', duration: 60, maxPerDay: 1, maxPerWeek: 2, maxPerMonth: 8 },
      { name: 'Chemistry', duration: 45, maxPerDay: 1, maxPerWeek: 2, maxPerMonth: 8 },
    ],
    parent: {
      id: 'PARENT102938',
      name: 'Abdullah Al-Saud',
      phone: '+966 555 123 4567',
    },
    availability: {
      summary: '5 days configured, 18 time slots',
    },
    lessons: {
      upcoming: 12,
      completed: 45,
      cancelled: 2,
    },
  };

  const handleDelete = () => {
    console.log('Deleting student:', id);
    setShowDeleteModal(false);
    navigate('/students');
  };

  const handleStatusChange = (newStatus: 'Active' | 'Drop') => {
    console.log('Changing status to:', newStatus);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Students
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="size-8 text-blue-700" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{student.name}</h1>
                <p className="text-gray-600 mt-1">Student ID: <span className="font-mono">{student.id}</span></p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    student.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {student.status}
                  </span>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">{student.stage}</span>
                </div>
              </div>
            </div>

            <Link
              to={`/students/${id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Edit className="size-4" />
              Edit Student
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Information */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <User className="size-5 text-blue-600" />
                  Student Information
                </h2>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-600 mb-1">Full Name</dt>
                    <dd className="text-sm font-medium text-gray-900">{student.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1">Stage</dt>
                    <dd className="text-sm font-medium text-gray-900">{student.stage}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      Country
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{student.country}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      City
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{student.city}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Clock className="size-3.5" />
                      Timezone
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{student.timezone}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Subjects & Lesson Rules */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <BookOpen className="size-5 text-blue-600" />
                    Subjects & Lesson Rules
                  </h2>
                  <button className="text-sm text-blue-700 hover:text-blue-800 flex items-center gap-1">
                    <Edit className="size-3.5" />
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {student.subjects.map((subject, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="size-4 text-blue-600" />
                        <h3 className="font-medium text-gray-900">{subject.name}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="ml-2 font-medium text-gray-900">{subject.duration} min</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Max/Day:</span>
                          <span className="ml-2 font-medium text-gray-900">{subject.maxPerDay}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Max/Week:</span>
                          <span className="ml-2 font-medium text-gray-900">{subject.maxPerWeek}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Max/Month:</span>
                          <span className="ml-2 font-medium text-gray-900">{subject.maxPerMonth}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability Summary */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="size-5 text-blue-600" />
                    Availability Summary
                  </h2>
                  <Link
                    to={`/students/${id}/availability`}
                    className="text-sm text-blue-700 hover:text-blue-800 flex items-center gap-1"
                  >
                    Edit Availability
                    <ChevronRight className="size-3.5" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-700">{student.availability.summary}</p>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-700 flex items-start gap-2">
                    <Info className="size-3.5 mt-0.5 flex-shrink-0" />
                    Click "Edit Availability" to view and modify the weekly schedule
                  </p>
                </div>
              </div>
            </div>

            {/* Lesson Summary */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <BookOpen className="size-5 text-blue-600" />
                    Lesson Summary
                  </h2>
                  <Link
                    to={`/schedule?student=${id}`}
                    className="text-sm text-blue-700 hover:text-blue-800 flex items-center gap-1"
                  >
                    View Full Schedule
                    <ChevronRight className="size-3.5" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-blue-700">{student.lessons.upcoming}</p>
                    <p className="text-sm text-gray-600 mt-1">Upcoming</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-green-700">{student.lessons.completed}</p>
                    <p className="text-sm text-gray-600 mt-1">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-red-700">{student.lessons.cancelled}</p>
                    <p className="text-sm text-gray-600 mt-1">Cancelled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Parent Information */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <UserCog className="size-5 text-blue-600" />
                  Parent Information
                </h2>
              </div>
              <div className="p-6">
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-gray-600 mb-1">Parent ID</dt>
                    <dd className="text-sm font-mono font-medium text-gray-900">{student.parent.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1">Name</dt>
                    <dd className="text-sm font-medium text-gray-900">{student.parent.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Phone className="size-3.5" />
                      Phone
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{student.parent.phone}</dd>
                  </div>
                </dl>
                <Link
                  to={`/parents/${student.parent.id}`}
                  className="mt-4 block w-full px-4 py-2 text-center text-sm text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View Parent Profile
                </Link>
              </div>
            </div>

            {/* Admin Operations */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="size-5 text-blue-600" />
                  Admin Operations
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  to={`/students/${id}/edit`}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Edit className="size-4" />
                  Edit Student
                </Link>

                <Link
                  to={`/students/${id}/availability`}
                  className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Calendar className="size-4" />
                  Manage Availability
                </Link>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-2">Change Status</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange('Active')}
                      disabled={student.status === 'Active'}
                      className="flex-1 px-3 py-1.5 text-sm bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                    >
                      <Check className="size-3.5" />
                      Active
                    </button>
                    <button
                      onClick={() => handleStatusChange('Drop')}
                      disabled={student.status === 'Drop'}
                      className="flex-1 px-3 py-1.5 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
                    >
                      <X className="size-3.5" />
                      Drop
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Trash2 className="size-4" />
                    Delete Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="size-6 text-red-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Delete Student</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete <span className="font-medium">{student.name}</span>? 
              This will remove all associated data including availability, lessons, and records.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
