import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Plus, Filter, Eye, ChevronLeft, ChevronRight, UsersRound } from 'lucide-react';

type Student = {
  id: string;
  name: string;
  stage: string;
  subjects: string[];
  status: 'Active' | 'Drop';
  parent: string;
};

export function StudentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const students: Student[] = [
    { id: 'MID123456', name: 'Ahmed Al-Saud', stage: 'Grade 10', subjects: ['Math', 'Physics', 'Chemistry'], status: 'Active', parent: 'PARENT102938' },
    { id: 'MID234567', name: 'Fatima Hassan', stage: 'Grade 8', subjects: ['English', 'Arabic'], status: 'Active', parent: 'PARENT103456' },
    { id: 'MID345678', name: 'Mohammed Ali', stage: 'Grade 12', subjects: ['Math', 'Computer Science'], status: 'Active', parent: 'PARENT104567' },
    { id: 'MID456789', name: 'Sara Ibrahim', stage: 'Grade 9', subjects: ['Science', 'English'], status: 'Drop', parent: 'PARENT105678' },
    { id: 'MID567890', name: 'Omar Abdullah', stage: 'Grade 11', subjects: ['Physics', 'Chemistry', 'Biology'], status: 'Active', parent: 'PARENT106789' },
    { id: 'MID678901', name: 'Layla Mohammed', stage: 'Grade 7', subjects: ['Math', 'Science'], status: 'Active', parent: 'PARENT107890' },
    { id: 'MID789012', name: 'Yousef Ahmad', stage: 'Grade 10', subjects: ['English', 'History'], status: 'Active', parent: 'PARENT108901' },
    { id: 'MID890123', name: 'Maryam Khalid', stage: 'Grade 12', subjects: ['Math', 'Physics'], status: 'Active', parent: 'PARENT109012' },
    { id: 'MID901234', name: 'Ali Hassan', stage: 'Grade 6', subjects: ['Arabic', 'Islamic Studies'], status: 'Active', parent: 'PARENT110123' },
    { id: 'MID012345', name: 'Nora Salem', stage: 'Grade 9', subjects: ['Science', 'Geography'], status: 'Drop', parent: 'PARENT111234' },
  ];

  const stages = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  // Filter logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStage = !stageFilter || student.stage === stageFilter;
    const matchesStatus = !statusFilter || student.status === statusFilter;
    
    return matchesSearch && matchesStage && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <UsersRound className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Students</h1>
            </div>
            <p className="text-gray-600">Manage student records and profiles</p>
          </div>
          
          <Link
            to="/students/new"
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <Plus className="size-4" />
            Add Student
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{students.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Active Students</p>
            <p className="text-2xl font-semibold text-green-700 mt-1">
              {students.filter(s => s.status === 'Active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Dropped</p>
            <p className="text-2xl font-semibold text-red-700 mt-1">
              {students.filter(s => s.status === 'Drop').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">This Week</p>
            <p className="text-2xl font-semibold text-blue-700 mt-1">+3</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-gray-600" />
              <h2 className="font-medium text-gray-900">Filters & Search</h2>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
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
                    placeholder="Search by name or ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Stage Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stage
                </label>
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Stages</option>
                  {stages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Drop">Drop</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Student ID
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Student Name
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Stage
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Subjects
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Parent
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-900">{student.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{student.stage}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {student.subjects.slice(0, 2).map(subject => (
                          <span
                            key={subject}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                          >
                            {subject}
                          </span>
                        ))}
                        {student.subjects.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{student.subjects.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-600">{student.parent}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/students/${student.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="size-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
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
        </div>
      </div>
    </div>
  );
}
