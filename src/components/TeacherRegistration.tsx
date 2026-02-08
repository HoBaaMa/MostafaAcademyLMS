import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  User, 
  MapPin, 
  Globe, 
  Clock,
  BookOpen,
  Plus,
  Trash2,
  Save,
  Calendar,
  Info,
  AlertCircle,
  GraduationCap,
  X
} from 'lucide-react';

type TeachingAssignment = {
  id: string;
  stage: string;
  subject: string;
};

export function TeacherRegistration() {
  const navigate = useNavigate();
  
  // Auto-generate teacher ID
  const teacherId = `T${String(Math.floor(1 + Math.random() * 999)).padStart(3, '0')}`;
  
  const [formData, setFormData] = useState({
    teacherName: '',
    country: '',
    city: '',
    timezone: '',
  });

  const [teachingAssignments, setTeachingAssignments] = useState<TeachingAssignment[]>([]);
  const [currentAssignment, setCurrentAssignment] = useState({ stage: '', subject: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data
  const countries = [
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
    { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
    { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
    { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
    { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
    { code: 'OM', name: 'Oman', flag: '🇴🇲' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  ];

  const timezones = [
    'UTC-5 (EST - Eastern)',
    'UTC-4 (AST - Atlantic)', 
    'UTC+0 (GMT - Greenwich)',
    'UTC+1 (CET - Central European)',
    'UTC+2 (EET - Eastern European)',
    'UTC+3 (AST - Arabia Standard)',
    'UTC+4 (GST - Gulf Standard)',
    'UTC+5 (PKT - Pakistan)',
    'UTC+8 (SGT - Singapore)',
  ];

  const stages = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
    'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
  ];

  const subjects = [
    'Mathematics',
    'English Language',
    'Arabic Language',
    'Science',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
    'Computer Science',
    'Islamic Studies',
    'Social Studies',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCurrentAssignmentChange = (field: 'stage' | 'subject', value: string) => {
    setCurrentAssignment({ ...currentAssignment, [field]: value });
  };

  const checkDuplicateAssignment = (stage: string, subject: string): boolean => {
    return teachingAssignments.some(
      assignment => assignment.stage === stage && assignment.subject === subject
    );
  };

  const addTeachingAssignment = () => {
    // Validate that both stage and subject are selected
    if (!currentAssignment.stage || !currentAssignment.subject) {
      setErrors({ 
        ...errors, 
        teachingAssignments: 'Please select both stage and subject before adding' 
      });
      return;
    }

    // Check for duplicates
    if (checkDuplicateAssignment(currentAssignment.stage, currentAssignment.subject)) {
      setErrors({ 
        ...errors, 
        teachingAssignments: 'This stage and subject combination already exists' 
      });
      return;
    }

    // Add the assignment
    const newAssignment: TeachingAssignment = {
      id: Math.random().toString(36).substr(2, 9),
      stage: currentAssignment.stage,
      subject: currentAssignment.subject,
    };

    setTeachingAssignments([...teachingAssignments, newAssignment]);
    setCurrentAssignment({ stage: '', subject: '' });
    
    // Clear error
    if (errors.teachingAssignments) {
      setErrors({ ...errors, teachingAssignments: '' });
    }
  };

  const removeTeachingAssignment = (id: string) => {
    setTeachingAssignments(teachingAssignments.filter(assignment => assignment.id !== id));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.teacherName.trim()) {
      newErrors.teacherName = 'Teacher name is required';
    }
    
    if (!formData.timezone) {
      newErrors.timezone = 'Timezone is required';
    }

    // Teaching assignments validation
    if (teachingAssignments.length === 0) {
      newErrors.teachingAssignments = 'At least one stage and subject assignment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent, redirectToAvailability: boolean = false) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // In a real app, save to backend
    console.log('Teacher Data:', {
      teacherId,
      ...formData,
      teachingAssignments,
    });

    if (redirectToAvailability) {
      navigate(`/availability?teacherId=${teacherId}`);
    } else {
      navigate('/teachers');
    }
  };

  const getAssignmentsByStage = () => {
    const grouped: Record<string, string[]> = {};
    teachingAssignments.forEach(assignment => {
      if (!grouped[assignment.stage]) {
        grouped[assignment.stage] = [];
      }
      grouped[assignment.stage].push(assignment.subject);
    });
    return grouped;
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Teacher Management</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Teacher Registration | تسجيل معلم
          </h1>
          <p className="text-gray-600 mt-1">
            Register a teacher and define their teaching capabilities
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          
          {/* Section 1: System Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Info className="size-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">
                  System Information | معلومات النظام
                </h2>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {/* Teacher ID (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teacher ID | رقم المعلم
                </label>
                <input
                  type="text"
                  value={teacherId}
                  readOnly
                  placeholder="T001"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed font-mono"
                />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <p className="text-xs text-blue-700 flex items-start gap-2">
                    <Info className="size-3.5 mt-0.5 flex-shrink-0" />
                    <span>
                      This unique ID is auto-generated sequentially (T001, T002, T003...). 
                      It will be used for scheduling, availability management, and student assignments.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Teacher Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <User className="size-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">
                  Teacher Information | معلومات المعلم
                </h2>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-5">
              {/* Teacher Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teacher Name | اسم المعلم *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.teacherName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter teacher full name"
                  />
                </div>
                {errors.teacherName && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.teacherName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country | الدولة
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                      <option value="">Select country</option>
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City | المدينة
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter city"
                    />
                  </div>
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone | المنطقة الزمنية *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${
                      errors.timezone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select timezone</option>
                    {timezones.map(tz => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.timezone && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.timezone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Teaching Capabilities */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">
                  Teaching Capabilities | المواد والمراحل
                </h2>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Define which stages and subjects this teacher can teach
              </p>
            </div>

            <div className="p-4 md:p-6 space-y-5">
              {/* Add Assignment Form */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Plus className="size-4 text-blue-600" />
                  Add Stage & Subject
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {/* Stage Selector */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Stage
                    </label>
                    <select
                      value={currentAssignment.stage}
                      onChange={(e) => handleCurrentAssignmentChange('stage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Select stage</option>
                      {stages.map(stage => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject Selector */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={currentAssignment.subject}
                      onChange={(e) => handleCurrentAssignmentChange('subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Select subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addTeachingAssignment}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Plus className="size-4" />
                  Add to Teaching List
                </button>

                {errors.teachingAssignments && teachingAssignments.length === 0 && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.teachingAssignments}
                  </p>
                )}
              </div>

              {/* Current Assignments */}
              {teachingAssignments.length > 0 ? (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Added Assignments ({teachingAssignments.length})
                  </h3>
                  
                  {/* Grouped by Stage */}
                  <div className="space-y-4">
                    {Object.entries(getAssignmentsByStage()).map(([stage, subjects]) => (
                      <div key={stage} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap className="size-4 text-blue-600" />
                          <h4 className="font-medium text-gray-900">{stage}</h4>
                          <span className="text-xs text-gray-500">
                            ({subjects.length} subject{subjects.length > 1 ? 's' : ''})
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {teachingAssignments
                            .filter(a => a.stage === stage)
                            .map(assignment => (
                              <div
                                key={assignment.id}
                                className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-sm"
                              >
                                <BookOpen className="size-3.5 text-green-700" />
                                <span className="text-green-900 font-medium">
                                  {assignment.subject}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeTeachingAssignment(assignment.id)}
                                  className="text-red-600 hover:text-red-700 transition-colors"
                                >
                                  <X className="size-3.5" />
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary List */}
                  <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">All Assignments</h4>
                    <div className="flex flex-wrap gap-2">
                      {teachingAssignments.map(assignment => (
                        <span
                          key={assignment.id}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-md text-xs"
                        >
                          <span className="text-gray-600">{assignment.stage}</span>
                          <span className="text-gray-400">•</span>
                          <span className="font-medium text-gray-900">{assignment.subject}</span>
                          <button
                            type="button"
                            onClick={() => removeTeachingAssignment(assignment.id)}
                            className="ml-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="size-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <BookOpen className="size-10 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-1">No Teaching Assignments</h3>
                  <p className="text-gray-600 text-sm">
                    Add at least one stage and subject combination above
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Info className="size-5 text-blue-600" />
              Registration Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Teacher ID:</span>
                <span className="font-mono font-medium text-gray-900">{teacherId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">
                  {formData.teacherName || <span className="text-gray-400 italic">Not set</span>}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Timezone:</span>
                <span className="font-medium text-gray-900">
                  {formData.timezone || <span className="text-gray-400 italic">Not set</span>}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Teaching Assignments:</span>
                <span className="font-medium text-gray-900">
                  {teachingAssignments.length} combination{teachingAssignments.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-3 justify-between">
              <button
                type="button"
                onClick={() => navigate('/teachers')}
                className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium order-3 md:order-1"
              >
                Cancel
              </button>
              
              <div className="flex flex-col md:flex-row gap-3 order-1 md:order-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Save className="size-4" />
                  Save Teacher
                </button>
                
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Calendar className="size-4" />
                  Save & Add Availability
                </button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                After saving, you can define the teacher's weekly availability schedule
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
