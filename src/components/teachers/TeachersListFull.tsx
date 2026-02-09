import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Presentation,
  Edit3,
  Save,
  X,
  AlertCircle,
  Check,
  Plus,
  Calendar
} from 'lucide-react';

type StageSubjectPair = {
  stage: string;
  subject: string;
};

type Teacher = {
  id: string;
  name: string;
  country: string;
  city: string;
  timezone: string;
  googleMeetLink: string;
  assignments: StageSubjectPair[];
};

export function TeachersListFull() {
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [timezoneFilter, setTimezoneFilter] = useState('');
  const [stageLevelFilter, setStageLevelFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRows, setEditingRows] = useState<Set<string>>(new Set());
  const [editedData, setEditedData] = useState<Record<string, Partial<Teacher>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const itemsPerPage = 10;

  // Mock data
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 'T001',
      name: 'Dr. Sarah Johnson',
      country: 'United States',
      city: 'New York',
      timezone: 'UTC-5 (EST)',
      googleMeetLink: 'https://meet.google.com/abc123',
      assignments: [
        { stage: 'Grade 10', subject: 'Mathematics' },
        { stage: 'Grade 11', subject: 'Mathematics' },
        { stage: 'Grade 12', subject: 'Mathematics' },
        { stage: 'Grade 10', subject: 'Physics' },
        { stage: 'Grade 11', subject: 'Physics' },
        { stage: 'Grade 12', subject: 'Physics' },
      ],
    },
    {
      id: 'T002',
      name: 'Prof. Ahmed Hassan',
      country: 'Saudi Arabia',
      city: 'Riyadh',
      timezone: 'UTC+3 (AST)',
      googleMeetLink: 'https://meet.google.com/def456',
      assignments: [
        { stage: 'Grade 6', subject: 'Arabic Language' },
        { stage: 'Grade 7', subject: 'Arabic Language' },
        { stage: 'Grade 8', subject: 'Arabic Language' },
        { stage: 'Grade 6', subject: 'Islamic Studies' },
        { stage: 'Grade 7', subject: 'Islamic Studies' },
      ],
    },
    {
      id: 'T003',
      name: 'Ms. Emily Chen',
      country: 'Singapore',
      city: 'Singapore',
      timezone: 'UTC+8 (SGT)',
      googleMeetLink: 'https://meet.google.com/ghi789',
      assignments: [
        { stage: 'Grade 9', subject: 'English Language' },
        { stage: 'Grade 10', subject: 'English Language' },
        { stage: 'Grade 11', subject: 'English Language' },
      ],
    },
  ]);

  const countries = [
    'Saudi Arabia', 'UAE', 'Egypt', 'Jordan', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 
    'United States', 'United Kingdom', 'Singapore', 'Malaysia', 'Pakistan', 'India'
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

  const allStages = [...stageGroups.Elementary, ...stageGroups.Mid, ...stageGroups['High School']];

  const subjects = [
    '', 'Mathematics', 'English Language', 'Arabic Language', 'Science', 'Physics', 
    'Chemistry', 'Biology', 'History', 'Geography', 'Computer Science', 'Islamic Studies',
    'Social Studies', 'Art', 'Music', 'Physical Education'
  ];

  // Get stage level from grade
  const getStageLevel = (stage: string): string => {
    for (const [level, grades] of Object.entries(stageGroups)) {
      if (grades.includes(stage)) return level;
    }
    return '';
  };

  // Check if teacher has assignment matching filters
  const teacherMatchesFilters = (teacher: Teacher): boolean => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = !countryFilter || teacher.country === countryFilter;
    const matchesTimezone = !timezoneFilter || teacher.timezone === timezoneFilter;
    
    // Check if teacher has any assignment matching stage level filter
    const matchesStageLevel = !stageLevelFilter || 
      teacher.assignments.some(a => a.stage && getStageLevel(a.stage) === stageLevelFilter);
    
    // Check if teacher has any assignment matching subject filter
    const matchesSubject = !subjectFilter || 
      teacher.assignments.some(a => a.subject === subjectFilter);
    
    return matchesSearch && matchesCountry && matchesTimezone && matchesStageLevel && matchesSubject;
  };

  const filteredTeachers = teachers.filter(teacherMatchesFilters);

  // Pagination
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = filteredTeachers.slice(startIndex, startIndex + itemsPerPage);

  const toggleEditMode = (teacherId: string) => {
    const newEditingRows = new Set(editingRows);
    if (newEditingRows.has(teacherId)) {
      newEditingRows.delete(teacherId);
      const newEditedData = { ...editedData };
      delete newEditedData[teacherId];
      setEditedData(newEditedData);
      
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(teacherId)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    } else {
      newEditingRows.add(teacherId);
    }
    setEditingRows(newEditingRows);
  };

  const handleCellChange = (teacherId: string, field: keyof Teacher, value: any) => {
    setEditedData({
      ...editedData,
      [teacherId]: {
        ...editedData[teacherId],
        [field]: value,
      }
    });

    const errorKey = `${teacherId}-${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const handleAssignmentChange = (teacherId: string, index: number, field: 'stage' | 'subject', value: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    const currentAssignments = editedData[teacherId]?.assignments || [...teacher.assignments];
    
    // Ensure we have enough slots
    while (currentAssignments.length <= index) {
      currentAssignments.push({ stage: '', subject: '' });
    }

    currentAssignments[index] = {
      ...currentAssignments[index],
      [field]: value,
    };

    handleCellChange(teacherId, 'assignments', currentAssignments);
  };

  const getCellValue = (teacher: Teacher, field: keyof Teacher) => {
    if (editedData[teacher.id] && field in editedData[teacher.id]) {
      return editedData[teacher.id][field];
    }
    return teacher[field];
  };

  const getAssignmentValue = (teacher: Teacher, index: number, field: 'stage' | 'subject'): string => {
    const assignments = getCellValue(teacher, 'assignments') as StageSubjectPair[];
    if (assignments && assignments[index]) {
      return assignments[index][field] || '';
    }
    return '';
  };

  const validateChanges = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(editedData).forEach(([teacherId, data]) => {
      // Validate name
      if ('name' in data) {
        const name = data.name as string;
        if (!name || name.trim().length === 0) {
          newErrors[`${teacherId}-name`] = 'Name is required';
        }
      }

      // Validate assignments for duplicates
      if ('assignments' in data) {
        const assignments = data.assignments as StageSubjectPair[];
        const nonEmptyAssignments = assignments.filter(a => a.stage && a.subject);
        
        // Check for duplicates
        const seen = new Set<string>();
        nonEmptyAssignments.forEach((assignment, idx) => {
          const key = `${assignment.stage}|${assignment.subject}`;
          if (seen.has(key)) {
            newErrors[`${teacherId}-assignment-${idx}`] = 'Duplicate stage+subject combination';
          }
          seen.add(key);
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = () => {
    if (!validateChanges()) {
      return;
    }

    const updatedTeachers = teachers.map(teacher => {
      if (editedData[teacher.id]) {
        // Clean up empty assignments
        let updatedTeacher = { ...teacher, ...editedData[teacher.id] };
        if (updatedTeacher.assignments) {
          updatedTeacher.assignments = updatedTeacher.assignments.filter(
            a => a.stage && a.subject
          );
        }
        return updatedTeacher;
      }
      return teacher;
    });

    setTeachers(updatedTeachers);
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

  // Create array of 24 slots for assignments
  const assignmentSlots = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Presentation className="size-6 text-green-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Teachers - Full Data Grid</h1>
            </div>
            <p className="text-gray-600">View and edit all teacher information and teaching assignments</p>
          </div>
          
          <Link
            to="/teachers/new"
            className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            <Plus className="size-4" />
            Add Teacher
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Teachers</p>
            <p className="text-2xl font-semibold text-gray-900">{teachers.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Assignments</p>
            <p className="text-2xl font-semibold text-green-700">
              {teachers.reduce((sum, t) => sum + t.assignments.length, 0)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Avg per Teacher</p>
            <p className="text-2xl font-semibold text-blue-700">
              {Math.round(teachers.reduce((sum, t) => sum + t.assignments.length, 0) / teachers.length)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Editing</p>
            <p className="text-2xl font-semibold text-orange-700">{editingRows.size}</p>
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Timezone Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Timezone
                </label>
                <select
                  value={timezoneFilter}
                  onChange={(e) => setTimezoneFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  <option value="">All Timezones</option>
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  <option value="">All Levels</option>
                  <option value="Elementary">Elementary</option>
                  <option value="Mid">Mid</option>
                  <option value="High School">High School</option>
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  <option value="">All Subjects</option>
                  {subjects.filter(s => s).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
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
                  {/* Frozen columns */}
                  <th className="sticky left-0 bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r border-gray-300 min-w-[100px]">
                    Teacher ID
                  </th>
                  <th className="sticky left-[100px] bg-gray-50 z-20 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r border-gray-300 min-w-[180px]">
                    Teacher Name
                  </th>
                  
                  {/* Regular columns */}
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[140px]">Country</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[120px]">City</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[140px]">Timezone</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[200px]">Google Meet Link</th>
                  
                  {/* Assignment columns */}
                  {assignmentSlots.map(i => (
                    <th key={i} colSpan={2} className="text-left px-4 py-3 text-xs font-medium text-gray-700 border-l border-gray-300 bg-green-50">
                      <div className="flex gap-2">
                        <span className="min-w-[120px]">Stage {i + 1}</span>
                        <span className="min-w-[140px]">Subject {i + 1}</span>
                      </div>
                    </th>
                  ))}
                  
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 min-w-[140px] border-l border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedTeachers.map(teacher => {
                  const isEditing = editingRows.has(teacher.id);
                  const hasEdits = !!editedData[teacher.id];
                  
                  return (
                    <tr 
                      key={teacher.id} 
                      className={`hover:bg-gray-50 transition-colors ${hasEdits ? 'bg-green-50' : ''}`}
                    >
                      {/* Teacher ID - Frozen */}
                      <td className="sticky left-0 bg-white px-4 py-3 text-sm font-mono text-gray-900 border-r border-gray-200">
                        {teacher.id}
                        {isEditing && (
                          <Edit3 className="inline-block ml-2 size-3 text-green-600" />
                        )}
                      </td>

                      {/* Teacher Name - Frozen */}
                      <td className="sticky left-[100px] bg-white px-4 py-3 text-sm border-r border-gray-200">
                        {isEditing ? (
                          <div>
                            <input
                              type="text"
                              value={getCellValue(teacher, 'name')}
                              onChange={(e) => handleCellChange(teacher.id, 'name', e.target.value)}
                              className={`w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-500 text-sm ${
                                errors[`${teacher.id}-name`] ? 'border-red-500' : 'border-green-300'
                              }`}
                            />
                            {errors[`${teacher.id}-name`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`${teacher.id}-name`]}</p>
                            )}
                          </div>
                        ) : (
                          <span className="font-medium text-gray-900">{teacher.name}</span>
                        )}
                      </td>

                      {/* Country */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(teacher, 'country')}
                            onChange={(e) => handleCellChange(teacher.id, 'country', e.target.value)}
                            className="w-full px-2 py-1 border border-green-300 rounded focus:ring-2 focus:ring-green-500 text-sm"
                          >
                            {countries.map(country => (
                              <option key={country} value={country}>{country}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{teacher.country}</span>
                        )}
                      </td>

                      {/* City */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            value={getCellValue(teacher, 'city')}
                            onChange={(e) => handleCellChange(teacher.id, 'city', e.target.value)}
                            className="w-full px-2 py-1 border border-green-300 rounded focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        ) : (
                          <span className="text-gray-900">{teacher.city}</span>
                        )}
                      </td>

                      {/* Timezone */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={getCellValue(teacher, 'timezone')}
                            onChange={(e) => handleCellChange(teacher.id, 'timezone', e.target.value)}
                            className="w-full px-2 py-1 border border-green-300 rounded focus:ring-2 focus:ring-green-500 text-sm"
                          >
                            {timezones.map(tz => (
                              <option key={tz} value={tz}>{tz}</option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-900">{teacher.timezone}</span>
                        )}
                      </td>

                      {/* Google Meet Link */}
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            value={getCellValue(teacher, 'googleMeetLink')}
                            onChange={(e) => handleCellChange(teacher.id, 'googleMeetLink', e.target.value)}
                            className="w-full px-2 py-1 border border-green-300 rounded focus:ring-2 focus:ring-green-500 text-sm"
                          />
                        ) : (
                          <span className="text-gray-900">{teacher.googleMeetLink}</span>
                        )}
                      </td>

                      {/* Assignment columns (24 stage+subject pairs) */}
                      {assignmentSlots.map(i => {
                        const stage = getAssignmentValue(teacher, i, 'stage');
                        const subject = getAssignmentValue(teacher, i, 'subject');
                        const hasError = errors[`${teacher.id}-assignment-${i}`];
                        
                        return (
                          <td key={i} colSpan={2} className="px-4 py-3 border-l border-gray-200 bg-gray-50">
                            <div className="flex gap-2">
                              {/* Stage */}
                              <div className="min-w-[120px]">
                                {isEditing ? (
                                  <select
                                    value={stage}
                                    onChange={(e) => handleAssignmentChange(teacher.id, i, 'stage', e.target.value)}
                                    className={`w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-500 text-xs ${
                                      hasError ? 'border-red-500' : 'border-green-300'
                                    }`}
                                  >
                                    <option value="">(None)</option>
                                    {Object.entries(stageGroups).map(([level, grades]) => (
                                      <optgroup key={level} label={level}>
                                        {grades.map(grade => (
                                          <option key={grade} value={grade}>{grade}</option>
                                        ))}
                                      </optgroup>
                                    ))}
                                  </select>
                                ) : (
                                  <span className="text-gray-900 text-xs">{stage || '-'}</span>
                                )}
                              </div>

                              {/* Subject */}
                              <div className="min-w-[140px]">
                                {isEditing ? (
                                  <div>
                                    <select
                                      value={subject}
                                      onChange={(e) => handleAssignmentChange(teacher.id, i, 'subject', e.target.value)}
                                      className={`w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-500 text-xs ${
                                        hasError ? 'border-red-500' : 'border-green-300'
                                      }`}
                                    >
                                      {subjects.map(subj => (
                                        <option key={subj} value={subj}>{subj || '(None)'}</option>
                                      ))}
                                    </select>
                                    {hasError && (
                                      <p className="text-xs text-red-600 mt-1">{hasError}</p>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-gray-900 text-xs">{subject || '-'}</span>
                                )}
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      {/* Actions */}
                      <td className="px-4 py-3 text-sm border-l border-gray-200">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleEditMode(teacher.id)}
                            className={`px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap ${
                              isEditing 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                          >
                            {isEditing ? (
                              <>
                                <Check className="size-3.5" />
                                Done
                              </>
                            ) : (
                              <>
                                <Edit3 className="size-3.5" />
                                Edit
                              </>
                            )}
                          </button>
                          <Link
                            to={`/teachers/${teacher.id}`}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                          >
                            <Eye className="size-3.5" />
                          </Link>
                          <Link
                            to={`/availability?teacherId=${teacher.id}`}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center gap-1"
                            title="Edit Availability"
                          >
                            <Calendar className="size-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Empty State */}
            {paginatedTeachers.length === 0 && (
              <div className="text-center py-12">
                <Presentation className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No teachers found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your filters or add a new teacher</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {paginatedTeachers.length > 0 && (
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
          )}
        </div>
      </div>

      {/* Sticky Save/Discard Bar */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-500 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-green-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="size-5 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Unsaved Changes</p>
                  <p className="text-sm text-gray-600">
                    {Object.keys(editedData).length} teacher{Object.keys(editedData).length > 1 ? 's' : ''} modified
                  </p>
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="size-4 text-red-700" />
                  <span className="text-sm text-red-700 font-medium">
                    Please fix validation errors before saving
                  </span>
                </div>
              )}

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
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
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