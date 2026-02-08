import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Plus, Filter, Eye, ChevronLeft, ChevronRight, Presentation } from 'lucide-react';

type Teacher = {
  id: string;
  name: string;
  subjects: string[];
  stages: string[];
  timezone: string;
  status: 'Active' | 'Inactive';
};

export function TeachersList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data
  const teachers: Teacher[] = [
    { id: 'T001', name: 'Dr. Sarah Johnson', subjects: ['Mathematics', 'Physics'], stages: ['Grade 10', 'Grade 11', 'Grade 12'], timezone: 'UTC-5 (EST)', status: 'Active' },
    { id: 'T002', name: 'Prof. Ahmed Hassan', subjects: ['Arabic Language', 'Islamic Studies'], stages: ['Grade 6', 'Grade 7', 'Grade 8'], timezone: 'UTC+3 (AST)', status: 'Active' },
    { id: 'T003', name: 'Ms. Emily Chen', subjects: ['English Language'], stages: ['Grade 9', 'Grade 10', 'Grade 11'], timezone: 'UTC+8 (SGT)', status: 'Active' },
    { id: 'T004', name: 'Mr. David Miller', subjects: ['Chemistry', 'Biology'], stages: ['Grade 11', 'Grade 12'], timezone: 'UTC+0 (GMT)', status: 'Active' },
    { id: 'T005', name: 'Dr. Fatima Al-Rashid', subjects: ['Mathematics', 'Computer Science'], stages: ['Grade 7', 'Grade 8', 'Grade 9'], timezone: 'UTC+3 (AST)', status: 'Active' },
    { id: 'T006', name: 'Prof. Mohammed Ali', subjects: ['History', 'Geography'], stages: ['Grade 10', 'Grade 11', 'Grade 12'], timezone: 'UTC+3 (AST)', status: 'Inactive' },
    { id: 'T007', name: 'Ms. Laura Smith', subjects: ['English Language', 'Social Studies'], stages: ['Grade 6', 'Grade 7'], timezone: 'UTC-5 (EST)', status: 'Active' },
    { id: 'T008', name: 'Dr. Omar Khalil', subjects: ['Physics', 'Chemistry'], stages: ['Grade 10', 'Grade 11'], timezone: 'UTC+2 (EET)', status: 'Active' },
    { id: 'T009', name: 'Ms. Aisha Ibrahim', subjects: ['Arabic Language'], stages: ['Grade 8', 'Grade 9', 'Grade 10'], timezone: 'UTC+3 (AST)', status: 'Active' },
    { id: 'T010', name: 'Mr. James Wilson', subjects: ['Mathematics'], stages: ['Grade 6', 'Grade 7', 'Grade 8'], timezone: 'UTC+0 (GMT)', status: 'Active' },
  ];

  const allSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Language', 'Arabic Language', 'Islamic Studies', 'Computer Science', 'History', 'Geography', 'Social Studies'];
  const allStages = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  // Filter logic
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = !subjectFilter || teacher.subjects.includes(subjectFilter);
    const matchesStage = !stageFilter || teacher.stages.includes(stageFilter);
    
    return matchesSearch && matchesSubject && matchesStage;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Presentation className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Teachers</h1>
            </div>
            <p className="text-gray-600">Manage teacher profiles and capabilities</p>
          </div>
          
          <Link
            to="/teachers/new"
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <Plus className="size-4" />
            Add Teacher
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Teachers</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{teachers.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Active Teachers</p>
            <p className="text-2xl font-semibold text-green-700 mt-1">
              {teachers.filter(t => t.status === 'Active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Available Now</p>
            <p className="text-2xl font-semibold text-blue-700 mt-1">5</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">This Week</p>
            <p className="text-2xl font-semibold text-purple-700 mt-1">+2</p>
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

              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Subjects</option>
                  {allSubjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
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
                  {allStages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
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
                    Teacher ID
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Teacher Name
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Subjects
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Stages
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Timezone
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedTeachers.map(teacher => (
                  <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-900">{teacher.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{teacher.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjects.slice(0, 2).map(subject => (
                          <span
                            key={subject}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700"
                          >
                            {subject}
                          </span>
                        ))}
                        {teacher.subjects.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{teacher.subjects.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {teacher.stages.slice(0, 2).map(stage => (
                          <span
                            key={stage}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700"
                          >
                            {stage}
                          </span>
                        ))}
                        {teacher.stages.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{teacher.stages.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{teacher.timezone}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        teacher.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/teachers/${teacher.id}`}
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTeachers.length)} of {filteredTeachers.length} teachers
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
