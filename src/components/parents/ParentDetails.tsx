import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { 
  ArrowLeft, 
  User, 
  Phone,
  Mail,
  MapPin,
  Users,
  Percent,
  Edit,
  Trash2,
  AlertCircle,
  UserCog,
  ChevronRight
} from 'lucide-react';

export function ParentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock data - in real app, fetch based on ID
  const parent = {
    id: 'PARENT102938',
    name: 'Abdullah Al-Saud',
    email: 'abdullah.alsaud@email.com',
    phone: '+966 555 123 4567',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    discount: 10,
    students: [
      { id: 'MID123456', name: 'Ahmed Al-Saud', stage: 'Grade 10', status: 'Active' },
      { id: 'MID789012', name: 'Sara Al-Saud', stage: 'Grade 8', status: 'Active' },
    ],
  };

  const handleDelete = () => {
    console.log('Deleting parent:', id);
    setShowDeleteModal(false);
    navigate('/students'); // Redirect to students list
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="size-16 bg-purple-100 rounded-full flex items-center justify-center">
                <UserCog className="size-8 text-purple-700" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{parent.name}</h1>
                <p className="text-gray-600 mt-1">Parent ID: <span className="font-mono">{parent.id}</span></p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-600">{parent.students.length} student{parent.students.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            <Link
              to={`/parents/${id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Edit className="size-4" />
              Edit Parent
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Parent Information */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <User className="size-5 text-blue-600" />
                  Parent Information
                </h2>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-600 mb-1">Full Name</dt>
                    <dd className="text-sm font-medium text-gray-900">{parent.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1">Parent ID</dt>
                    <dd className="text-sm font-mono font-medium text-gray-900">{parent.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Mail className="size-3.5" />
                      Email
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{parent.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Phone className="size-3.5" />
                      Phone
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{parent.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      Country
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{parent.country}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <MapPin className="size-3.5" />
                      City
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{parent.city}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Percent className="size-3.5" />
                      Discount
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">{parent.discount}%</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Associated Students */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="size-5 text-blue-600" />
                  Associated Students ({parent.students.length})
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {parent.students.map(student => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="size-5 text-blue-700" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-600">{student.id}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-600">{student.stage}</span>
                            <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              student.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {student.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/students/${student.id}`}
                        className="px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                      >
                        View
                        <ChevronRight className="size-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>

                {parent.students.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Users className="size-10 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-medium text-gray-900 mb-1">No Students</h3>
                    <p className="text-gray-600 text-sm">No students associated with this parent</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="font-semibold text-gray-900">{parent.students.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Active Students</span>
                  <span className="font-semibold text-gray-900">
                    {parent.students.filter(s => s.status === 'Active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Discount Rate</span>
                  <span className="font-semibold text-gray-900">{parent.discount}%</span>
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
                  to={`/parents/${id}/edit`}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Edit className="size-4" />
                  Edit Parent
                </Link>

                <Link
                  to="/students/new"
                  className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Users className="size-4" />
                  Add Student
                </Link>

                <div className="pt-3 border-t border-gray-200">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Trash2 className="size-4" />
                    Delete Parent
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
                <h3 className="font-semibold text-gray-900">Delete Parent</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete <span className="font-medium">{parent.name}</span>? 
              This will remove all parent data. Associated students will need to be reassigned to another parent.
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
