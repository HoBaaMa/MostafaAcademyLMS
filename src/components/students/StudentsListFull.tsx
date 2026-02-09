import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  UsersRound,
  Edit3,
  Save,
  X,
  AlertCircle,
  Check,
  Plus
} from 'lucide-react';

type Student = {
  id: string;
  name: string;
  stage: string;
  country: string;
  city: string;
  timezone: string;
  maxLessonsDay: number;
  maxLessonsWeek: number;
  maxLessonsMonth: number;
  subject1: string;
  lessonDuration1: number;
  subject2: string;
  lessonDuration2: number;
  subject3: string;
  lessonDuration3: number;
  subject4: string;
  lessonDuration4: number;
  subject5: string;
  lessonDuration5: number;
  parentId: string;
  status: 'Active' | 'Drop';
  dateOfActive: string;
  dateOfDrop: string;
};

export function StudentsListFull() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [parentFilter, setParentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [stageLevelFilter, setStageLevelFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRows, setEditingRows] = useState<Set<string>>(new Set());
  const [editedData, setEditedData] = useState<Record<string, Partial<Student>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const itemsPerPage = 10;

  // Mock data
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'MID123456',
      name: 'Ahmed Al-Saud',
      stage: 'Grade 10',
      country: 'Saudi Arabia',
      city: 'Riyadh',
      timezone: 'UTC+3 (AST)',
      maxLessonsDay: 2,
      maxLessonsWeek: 8,
      maxLessonsMonth: 32,
      subject1: 'Mathematics',
      lessonDuration1: 60,
      subject2: 'Physics',
      lessonDuration2: 60,
      subject3: 'Chemistry',
      lessonDuration3: 45,
      subject4: '',
      lessonDuration4: 0,
      subject5: '',
      lessonDuration5: 0,
      parentId: 'PARENT102938',
      status: 'Active',
      dateOfActive: '2024-01-15',
      dateOfDrop: '',
    },
    {
      id: 'MID234567',
      name: 'Fatima Hassan',
      stage: 'Grade 8',
      country: 'UAE',
      city: 'Dubai',
      timezone: 'UTC+4 (GST)',
      maxLessonsDay: 1,
      maxLessonsWeek: 5,
      maxLessonsMonth: 20,
      subject1: 'English',
      lessonDuration1: 45,
      subject2: 'Arabic',
      lessonDuration2: 45,
      subject3: '',
      lessonDuration3: 0,
      subject4: '',
      lessonDuration4: 0,
      subject5: '',
      lessonDuration5: 0,
      parentId: 'PARENT103456',
      status: 'Active',
      dateOfActive: '2024-02-01',
      dateOfDrop: '',
    },
    {
      id: 'MID345678',
      name: 'Mohammed Ali',
      stage: 'Grade 12',
      country: 'Egypt',
      city: 'Cairo',
      timezone: 'UTC+2 (EET)',
      maxLessonsDay: 3,
      maxLessonsWeek: 10,
      maxLessonsMonth: 40,
      subject1: 'Math',
      lessonDuration1: 60,
      subject2: 'Computer Science',
      lessonDuration2: 60,
      subject3: '',
      lessonDuration3: 0,
      subject4: '',
      lessonDuration4: 0,
      subject5: '',
      lessonDuration5: 0,
      parentId: 'PARENT104567',
      status: 'Active',
      dateOfActive: '2024-01-10',
      dateOfDrop: '',
    },
  ]);

  const countries = [
    'Saudi Arabia', 'UAE', 'Egypt', 'Jordan', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'United States', 'United Kingdom'
  ];

  const timezones = [
    'UTC-5 (EST)', 'UTC-4 (AST)', 'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+2 (EET)', 
    'UTC+3 (AST)', 'UTC+4 (GST)', 'UTC+5 (PKT)', 'UTC+8 (SGT)'
  ];

  const stageGroups = {
    'Elementary': ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'],
    'Mid': ['Grade 7', 'Grade 8', 'Grade 9'],
    'High School': ['Grade 10', 'Grade 11', 'Grade 12'],
  };

  const subjects = [
    '', 'Mathematics', 'English Language', 'Arabic Language', 'Science', 'Physics', 
    'Chemistry', 'Biology', 'History', 'Geography', 'Computer Science', 'Islamic Studies'
  ];

  const durations = [0, 30, 45, 60, 90];

  const parentIds = ['PARENT102938', 'PARENT103456', 'PARENT104567', 'PARENT105678'];

  // Get stage level from grade
  const getStageLevel = (stage: string): string => {
    for (const [level, grades] of Object.entries(stageGroups)) {
      if (grades.includes(stage)) return level;
    }
    return '';
  };

  // Filter logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = !countryFilter || student.country === countryFilter;
    const matchesParent = !parentFilter || student.parentId === parentFilter;
    const matchesStatus = !statusFilter || student.status === statusFilter;
    const matchesStageLevel = !stageLevelFilter || getStageLevel(student.stage) === stageLevelFilter;
    
    return matchesSearch && matchesCountry && matchesParent && matchesStatus && matchesStageLevel;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const toggleEditMode = (studentId: string) => {
    const newEditingRows = new Set(editingRows);
    if (newEditingRows.has(studentId)) {
      newEditingRows.delete(studentId);
      // Clear edited data for this row
      const newEditedData = { ...editedData };
      delete newEditedData[studentId];
      setEditedData(newEditedData);
    } else {
      newEditingRows.add(studentId);
    }
    setEditingRows(newEditingRows);
  };

  const handleCellChange = (studentId: string, field: keyof Student, value: any) => {
    setEditedData({
      ...editedData,
      [studentId]: {
        ...editedData[studentId],
        [field]: value,
      }
    });
  };

  const getCellValue = (student: Student, field: keyof Student) => {
    if (editedData[student.id] && field in editedData[student.id]) {
      return editedData[student.id][field];
    }
    return student[field];
  };

  const validateChanges = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(editedData).forEach(([studentId, data]) => {
      // Check if status is Drop and dateOfDrop is empty
      if (data.status === 'Drop' && !data.dateOfDrop) {
        newErrors[`${studentId}-dateOfDrop`] = 'Date of drop is required when status is Drop';
      }

      // Validate numeric fields
      const numericFields: (keyof Student)[] = ['maxLessonsDay', 'maxLessonsWeek', 'maxLessonsMonth'];
      numericFields.forEach(field => {
        if (field in data && (data[field] as number) < 0) {
          newErrors[`${studentId}-${field}`] = 'Must be non-negative';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = () => {
    if (!validateChanges()) {
      return;
    }

    // Apply changes to students
    const updatedStudents = students.map(student => {
      if (editedData[student.id]) {
        return { ...student, ...editedData[student.id] };
      }
      return student;
    });

    setStudents(updatedStudents);
    setEditedData({});
    setEditingRows(new Set());
    setErrors({});
  };

  const handleDiscardChanges = () => {
    setEditedData({});
    setEditingRows(new Set());
    setErrors({});
  };

  const hasChanges = Object.keys(editedData).length > 0;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <UsersRound className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Students</h1>
            </div>
            <p className="text-gray-600">View and edit all student information inline</p>
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
            <p className="text-2xl font-semibold text-gray-900">{students.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-semibold text-green-700">
              {students.filter(s => s.status === 'Active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Dropped</p>
            <p className="text-2xl font-semibold text-red-700">
              {students.filter(s => s.status === 'Drop').length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Editing</p>
            <p className="text-2xl font-semibold text-blue-700">{editingRows.size}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                    placeholder="Name or ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Country Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Country
                </label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Parent Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Parent ID
                </label>
                <select
                  value={parentFilter}
                  onChange={(e) => setParentFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Parents</option>
                  {parentIds.map(parent => (
                    <option key={parent} value={parent}>{parent}</option>
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
                  <option value="Active">Active</option>
                  <option value="Drop">Drop</option>
                </select>
              </div>

              {/* Stage Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stage Level
                </label>
                <select
                  value={stageLevelFilter}
                  onChange={(e) => setStageLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Levels</option>
                  <option value="Elementary">Elementary</option>
                  <option value="Mid">Mid</option>
                  <option value="High School">High School</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="sticky left-0 bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r border-gray-200">
                    Student ID
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[150px]">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Stage</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Country</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[100px]">City</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Timezone</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[80px]">Max/Day</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[90px]">Max/Week</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[100px]">Max/Month</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Subject 1</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[90px]">Duration 1</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Subject 2</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[90px]">Duration 2</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Subject 3</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[90px]">Duration 3</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Subject 4</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[90px]">Duration 4</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Subject 5</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[90px]">Duration 5</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[130px]">Parent ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[100px]">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Date Active</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Date Drop</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedStudents.map(student => {
                  const isEditing = editingRows.has(student.id);
                  const hasEdits = !!editedData[student.id];
                  
                  return (
                    <tr 
                      key={student.id} 
                      className={`hover:bg-gray-50 transition-colors ${hasEdits ? 'bg-blue-50' : ''}`}
                    >
                      {/* Student ID - Sticky + Read-only */}
                      <td className="sticky left-0 bg-white px-4 py-3 text-sm font-mono text-gray-900 border-r border-gray-200">
                        {student.id}
                        {isEditing && (
                          <Edit3 className="inline-block ml-2 size-3 text-blue-600" />
                        )}
                      </td>

                      {/* Name */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            value={getCellValue(student, 'name')}
                            onChange={(e) => handleCellChange(student.id, 'name', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        ) : (
                          <span className="text-gray-900">{student.name}</span>
                        )}
                      </td>

                      {/* Stage */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'stage')}
                            onChange={(e) => handleCellChange(student.id, 'stage', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {Object.entries(stageGroups).map(([level, grades]) => (
                              <optgroup key={level} label={level}>
                                {grades.map(grade => (
                                  <option key={grade} value={grade}>{grade}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.stage}</span>
                        )}
                      </td>

                      {/* Country */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'country')}
                            onChange={(e) => handleCellChange(student.id, 'country', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {countries.map(country => (
                              <option key={country} value={country}>{country}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.country}</span>
                        )}
                      </td>

                      {/* City */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            value={getCellValue(student, 'city')}
                            onChange={(e) => handleCellChange(student.id, 'city', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        ) : (
                          <span className="text-gray-900">{student.city}</span>
                        )}
                      </td>

                      {/* Timezone */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'timezone')}
                            onChange={(e) => handleCellChange(student.id, 'timezone', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {timezones.map(tz => (
                              <option key={tz} value={tz}>{tz}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.timezone}</span>
                        )}
                      </td>

                      {/* Max Lessons Day */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            value={getCellValue(student, 'maxLessonsDay')}
                            onChange={(e) => handleCellChange(student.id, 'maxLessonsDay', parseInt(e.target.value))}
                            className={`w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 text-sm ${
                              errors[`${student.id}-maxLessonsDay`] ? 'border-red-500' : 'border-blue-300'
                            }`}
                          />
                        ) : (
                          <span className="text-gray-900">{student.maxLessonsDay}</span>
                        )}
                      </td>

                      {/* Max Lessons Week */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            value={getCellValue(student, 'maxLessonsWeek')}
                            onChange={(e) => handleCellChange(student.id, 'maxLessonsWeek', parseInt(e.target.value))}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        ) : (
                          <span className="text-gray-900">{student.maxLessonsWeek}</span>
                        )}
                      </td>

                      {/* Max Lessons Month */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            value={getCellValue(student, 'maxLessonsMonth')}
                            onChange={(e) => handleCellChange(student.id, 'maxLessonsMonth', parseInt(e.target.value))}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        ) : (
                          <span className="text-gray-900">{student.maxLessonsMonth}</span>
                        )}
                      </td>

                      {/* Subject 1 */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'subject1')}
                            onChange={(e) => handleCellChange(student.id, 'subject1', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {subjects.map(subj => (
                              <option key={subj} value={subj}>{subj || '(None)'}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.subject1 || '-'}</span>
                        )}
                      </td>

                      {/* Duration 1 */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'lessonDuration1')}
                            onChange={(e) => handleCellChange(student.id, 'lessonDuration1', parseInt(e.target.value))}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {durations.map(dur => (
                              <option key={dur} value={dur}>{dur} min</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.lessonDuration1 || 0} min</span>
                        )}
                      </td>

                      {/* Subject 2 */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'subject2')}
                            onChange={(e) => handleCellChange(student.id, 'subject2', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {subjects.map(subj => (
                              <option key={subj} value={subj}>{subj || '(None)'}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.subject2 || '-'}</span>
                        )}
                      </td>

                      {/* Duration 2 */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'lessonDuration2')}
                            onChange={(e) => handleCellChange(student.id, 'lessonDuration2', parseInt(e.target.value))}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {durations.map(dur => (
                              <option key={dur} value={dur}>{dur} min</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.lessonDuration2 || 0} min</span>
                        )}
                      </td>

                      {/* Subject 3 */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'subject3')}
                            onChange={(e) => handleCellChange(student.id, 'subject3', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {subjects.map(subj => (
                              <option key={subj} value={subj}>{subj || '(None)'}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.subject3 || '-'}</span>
                        )}
                      </td>

                      {/* Duration 3 */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'lessonDuration3')}
                            onChange={(e) => handleCellChange(student.id, 'lessonDuration3', parseInt(e.target.value))}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {durations.map(dur => (
                              <option key={dur} value={dur}>{dur} min</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.lessonDuration3 || 0} min</span>
                        )}
                      </td>

                      {/* Subject 4 */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'subject4')}
                            onChange={(e) => handleCellChange(student.id, 'subject4', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {subjects.map(subj => (
                              <option key={subj} value={subj}>{subj || '(None)'}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.subject4 || '-'}</span>
                        )}
                      </td>

                      {/* Duration 4 */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'lessonDuration4')}
                            onChange={(e) => handleCellChange(student.id, 'lessonDuration4', parseInt(e.target.value))}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {durations.map(dur => (
                              <option key={dur} value={dur}>{dur} min</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.lessonDuration4 || 0} min</span>
                        )}
                      </td>

                      {/* Subject 5 */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'subject5')}
                            onChange={(e) => handleCellChange(student.id, 'subject5', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {subjects.map(subj => (
                              <option key={subj} value={subj}>{subj || '(None)'}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.subject5 || '-'}</span>
                        )}
                      </td>

                      {/* Duration 5 */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'lessonDuration5')}
                            onChange={(e) => handleCellChange(student.id, 'lessonDuration5', parseInt(e.target.value))}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            {durations.map(dur => (
                              <option key={dur} value={dur}>{dur} min</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{student.lessonDuration5 || 0} min</span>
                        )}
                      </td>

                      {/* Parent ID */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'parentId')}
                            onChange={(e) => handleCellChange(student.id, 'parentId', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                          >
                            {parentIds.map(parent => (
                              <option key={parent} value={parent}>{parent}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900 font-mono">{student.parentId}</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(student, 'status')}
                            onChange={(e) => handleCellChange(student.id, 'status', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          >
                            <option value="Active">Active</option>
                            <option value="Drop">Drop</option>
                          </select>
                        ) : (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            student.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {student.status}
                          </span>
                        )}
                      </td>

                      {/* Date of Active */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <input
                            type="date"
                            value={getCellValue(student, 'dateOfActive')}
                            onChange={(e) => handleCellChange(student.id, 'dateOfActive', e.target.value)}
                            className="w-full px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        ) : (
                          <span className="text-gray-900">{student.dateOfActive || '-'}</span>
                        )}
                      </td>

                      {/* Date of Drop */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <div>
                            <input
                              type="date"
                              value={getCellValue(student, 'dateOfDrop')}
                              onChange={(e) => handleCellChange(student.id, 'dateOfDrop', e.target.value)}
                              className={`w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 text-sm ${
                                errors[`${student.id}-dateOfDrop`] ? 'border-red-500' : 'border-blue-300'
                              }`}
                            />
                            {errors[`${student.id}-dateOfDrop`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`${student.id}-dateOfDrop`]}</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-900">{student.dateOfDrop || '-'}</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleEditMode(student.id)}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                              isEditing 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                          >
                            {isEditing ? <Check className="size-3.5" /> : <Edit3 className="size-3.5" />}
                          </button>
                          <Link
                            to={`/students/${student.id}`}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                          >
                            <Eye className="size-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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

      {/* Sticky Save/Discard Bar */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="size-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Unsaved Changes</p>
                  <p className="text-sm text-gray-600">
                    {Object.keys(editedData).length} student{Object.keys(editedData).length > 1 ? 's' : ''} modified
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDiscardChanges}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                >
                  <X className="size-4" />
                  Discard
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
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