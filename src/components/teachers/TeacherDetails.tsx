import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Clock,
  BookOpen,
  Calendar,
  Edit,
  Trash2,
  AlertCircle,
  Info,
  GraduationCap,
  ChevronRight,
  Presentation,
  BarChart3
} from 'lucide-react';

export function TeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  // Mock data - in real app, fetch based on ID
  const teacher = {
    id: 'T001',
    name: 'Dr. Sarah Johnson',
    country: 'United States',
    city: 'New York',
    timezone: 'UTC-5 (EST - Eastern)',
    status: 'Active' as 'Active' | 'Inactive',
    teachingCapabilities: [
      { stage: 'Grade 10', subject: 'Mathematics' },
      { stage: 'Grade 11', subject: 'Mathematics' },
      { stage: 'Grade 12', subject: 'Mathematics' },
      { stage: 'Grade 10', subject: 'Physics' },
      { stage: 'Grade 11', subject: 'Physics' },
      { stage: 'Grade 12', subject: 'Physics' },
    ],
    availability: {
      summary: '5 days available, 35 hours/week',
      daysConfigured: 5,
    },
    lessons: {
      total: 247,
      completed: 231,
      cancelled: 16,
      upcomingThisWeek: 8,
    },
  };

  // Group capabilities by stage
  const capabilitiesByStage = teacher.teachingCapabilities.reduce((acc, cap) => {
    if (!acc[cap.stage]) {
      acc[cap.stage] = [];
    }
    acc[cap.stage].push(cap.subject);
    return acc;
  }, {} as Record<string, string[]>);

  const handleDelete = () => {
    console.log('Deleting teacher:', id);
    setShowDeleteModal(false);
    navigate('/teachers');
  };

  const handleDeactivate = () => {
    console.log('Deactivating teacher:', id);
    setShowDeactivateModal(false);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/teachers"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Teachers
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="size-16 bg-green-100 rounded-full flex items-center justify-center">
                <Presentation className="size-8 text-green-700" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{teacher.name}</h1>
                <p className="text-gray-600 mt-1">Teacher ID: <span className="font-mono">{teacher.id}</span></p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    teacher.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {teacher.status}
                  </span>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">{teacher.teachingCapabilities.length} teaching assignments</span>
                </div>
              </div>
            </div>

            <Link
              to={`/teachers/${id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Edit className="size-4" />
              Edit Teacher
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Teacher Information */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <User className="size-5 text-blue-600" />
                  Teacher Information
                </h2>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-600 mb-1">Full Name</dt>
                    <dd className="text-sm font-medium text-gray-900">{teacher.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1">Teacher ID</dt>
                    <dd className="text-sm font-mono font-medium text-gray-900">{teacher.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      Country
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{teacher.country}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      City
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{teacher.city}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Clock className="size-3.5" />
                      Timezone
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{teacher.timezone}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Teaching Capabilities */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <BookOpen className="size-5 text-blue-600" />
                    Teaching Capabilities
                  </h2>
                  <Link
                    to={`/teachers/${id}/edit`}
                    className="text-sm text-blue-700 hover:text-blue-800 flex items-center gap-1"
                  >
                    <Edit className="size-3.5" />
                    Edit
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Object.entries(capabilitiesByStage).map(([stage, subjects]) => (
                    <div key={stage} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="size-4 text-blue-600" />
                        <h3 className="font-medium text-gray-900">{stage}</h3>
                        <span className="text-xs text-gray-500">
                          ({subjects.length} subject{subjects.length > 1 ? 's' : ''})
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {subjects.map(subject => (
                          <span
                            key={subject}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-sm"
                          >
                            <BookOpen className="size-3.5 text-green-700" />
                            <span className="text-green-900 font-medium">{subject}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-700 flex items-start gap-2">
                    <Info className="size-3.5 mt-0.5 flex-shrink-0" />
                    Total of {teacher.teachingCapabilities.length} stage and subject combinations
                  </p>
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
                    to={`/availability?teacherId=${id}`}
                    className="text-sm text-blue-700 hover:text-blue-800 flex items-center gap-1"
                  >
                    Edit Availability
                    <ChevronRight className="size-3.5" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-700">Days Available</p>
                    <p className="text-2xl font-semibold text-green-900 mt-1">
                      {teacher.availability.daysConfigured}/7
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-700">Hours/Week</p>
                    <p className="text-2xl font-semibold text-blue-900 mt-1">35</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{teacher.availability.summary}</p>
              </div>
            </div>

            {/* Lesson Statistics */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="size-5 text-blue-600" />
                  Lesson Statistics
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-purple-700">Total Lessons</p>
                    <p className="text-2xl font-semibold text-purple-900 mt-1">{teacher.lessons.total}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-700">Completed</p>
                    <p className="text-2xl font-semibold text-green-900 mt-1">{teacher.lessons.completed}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-700">Cancelled</p>
                    <p className="text-2xl font-semibold text-red-900 mt-1">{teacher.lessons.cancelled}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">This Week</p>
                    <p className="text-2xl font-semibold text-blue-900 mt-1">{teacher.lessons.upcomingThisWeek}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="font-semibold text-gray-900">
                    {Math.round((teacher.lessons.completed / teacher.lessons.total) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subjects</span>
                  <span className="font-semibold text-gray-900">
                    {new Set(teacher.teachingCapabilities.map(c => c.subject)).size}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Stages</span>
                  <span className="font-semibold text-gray-900">
                    {new Set(teacher.teachingCapabilities.map(c => c.stage)).size}
                  </span>
                </div>
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
                  to={`/teachers/${id}/edit`}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Edit className="size-4" />
                  Edit Teacher
                </Link>

                <Link
                  to={`/availability?teacherId=${id}`}
                  className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Calendar className="size-4" />
                  Update Availability
                </Link>

                <div className="pt-3 border-t border-gray-200">
                  <button
                    onClick={() => setShowDeactivateModal(true)}
                    className="w-full px-4 py-2 bg-orange-50 border border-orange-200 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="size-4" />
                    Deactivate Teacher
                  </button>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Trash2 className="size-4" />
                    Delete Teacher
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deactivate Confirmation Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="size-6 text-orange-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Deactivate Teacher</h3>
                <p className="text-sm text-gray-600">Temporarily suspend access</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to deactivate <span className="font-medium">{teacher.name}</span>? 
              They will no longer appear in scheduling but their data will be preserved.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactivate}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="size-6 text-red-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Delete Teacher</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete <span className="font-medium">{teacher.name}</span>? 
              This will remove all associated data including availability, lesson history, and records.
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
