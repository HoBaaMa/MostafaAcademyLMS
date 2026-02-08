import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowRight, 
  User, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Clock, 
  Calendar,
  Plus,
  X,
  AlertCircle,
  Info
} from 'lucide-react';

type SubjectEntry = {
  id: string;
  subjectName: string;
  lessonDuration: string;
};

type StudentStatus = 'Active' | 'Drop';

export function StudentRegistration() {
  const navigate = useNavigate();
  
  // Auto-generate student ID in MID format
  const studentId = `MID${Math.floor(100000 + Math.random() * 900000)}`;
  
  const [formData, setFormData] = useState({
    studentName: '',
    stage: '',
    country: '',
    city: '',
    timezone: '',
    maxLessonsDay: '',
    maxLessonsWeek: '',
    maxLessonsMonth: '',
    parentId: '',
    status: 'Active' as StudentStatus,
    dateOfActive: new Date().toISOString().split('T')[0],
    dateOfDrop: '',
  });

  const [subjects, setSubjects] = useState<SubjectEntry[]>([
    { id: '1', subjectName: '', lessonDuration: '' }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Data options
  const availableSubjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Arabic',
    'Computer Science',
    'History',
    'Geography',
    'French',
    'Spanish',
    'Economics',
    'Business Studies',
  ];

  const stages = [
    'KG1', 'KG2',
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
    'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
  ];

  const countries = [
    'Saudi Arabia', 'United Arab Emirates', 'Egypt', 'Jordan', 
    'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Lebanon', 'Palestine',
  ];

  const timezones = [
    'UTC+3 (Arabia Standard Time)',
    'UTC+4 (Gulf Standard Time)',
    'UTC+2 (Egypt Standard Time)',
  ];

  const lessonDurations = [
    '30', '45', '60', '90', '120'
  ];

  // Subject management
  const addSubject = () => {
    setSubjects([
      ...subjects,
      { id: Date.now().toString(), subjectName: '', lessonDuration: '' }
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const updateSubject = (id: string, field: keyof SubjectEntry, value: string) => {
    setSubjects(subjects.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    // Auto-set Date_Of_Active when status changes to Active
    if (name === 'status' && value === 'Active') {
      setFormData(prev => ({
        ...prev,
        dateOfActive: new Date().toISOString().split('T')[0],
        dateOfDrop: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }
    if (!formData.stage) {
      newErrors.stage = 'Stage is required';
    }
    if (!formData.timezone) {
      newErrors.timezone = 'Timezone is required';
    }
    if (!formData.parentId.trim()) {
      newErrors.parentId = 'Parent ID is required';
    }

    // Subjects validation
    const filledSubjects = subjects.filter(s => s.subjectName || s.lessonDuration);
    if (filledSubjects.length === 0) {
      newErrors.subjects = 'At least one subject is required';
    } else {
      // Check if all filled subjects have both name and duration
      filledSubjects.forEach((subject, index) => {
        if (subject.subjectName && !subject.lessonDuration) {
          newErrors[`subject_${subject.id}_duration`] = 'Duration required';
        }
        if (!subject.subjectName && subject.lessonDuration) {
          newErrors[`subject_${subject.id}_name`] = 'Subject name required';
        }
      });
    }

    // Status validation
    if (formData.status === 'Drop' && !formData.dateOfDrop) {
      newErrors.dateOfDrop = 'Drop date is required when status is Drop';
    }

    // Numeric validation
    if (formData.maxLessonsDay && parseFloat(formData.maxLessonsDay) < 0) {
      newErrors.maxLessonsDay = 'Must be non-negative';
    }
    if (formData.maxLessonsWeek && parseFloat(formData.maxLessonsWeek) < 0) {
      newErrors.maxLessonsWeek = 'Must be non-negative';
    }
    if (formData.maxLessonsMonth && parseFloat(formData.maxLessonsMonth) < 0) {
      newErrors.maxLessonsMonth = 'Must be non-negative';
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
    console.log('Form Data:', formData);
    console.log('Subjects:', subjects);

    if (redirectToAvailability) {
      navigate(`/students/${studentId}/availability`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Workflow Step 1 of 5</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Student Registration | تسجيل طالب
          </h1>
          <p className="text-gray-600 mt-1">
            Enter student data into the system
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          
          {/* Section 1: Student Info */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <User className="size-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">
                  Student Information | معلومات الطالب
                </h2>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-5">
              {/* Student ID (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID | رقم الطالب
                </label>
                <input
                  type="text"
                  value={studentId}
                  readOnly
                  placeholder="MID123456"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed font-mono"
                />
                <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5">
                  <Info className="size-3" />
                  Auto-generated format: MID followed by 6 random digits
                </p>
              </div>

              {/* Student Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name | اسم الطالب *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.studentName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter full name"
                />
                {errors.studentName && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.studentName}
                  </p>
                )}
              </div>

              {/* Stage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stage | المرحلة *
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <select
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                      errors.stage ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select stage</option>
                    {stages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.stage && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.stage}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Location & Timezone */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">
                  Location & Timezone | الموقع والمنطقة الزمنية
                </h2>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country | الدولة
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City | المدينة
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter city"
                  />
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
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none ${
                      errors.timezone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select timezone</option>
                    {timezones.map((tz) => (
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

          {/* Section 3: Lesson Limits */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">
                  Lesson Limits | حدود الحصص
                </h2>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Maximum number of lessons per period
              </p>
            </div>

            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Max Lessons Per Day */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Per Day | يومياً
                  </label>
                  <input
                    type="number"
                    name="maxLessonsDay"
                    value={formData.maxLessonsDay}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.maxLessonsDay ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. 2"
                  />
                  {errors.maxLessonsDay && (
                    <p className="text-xs text-red-600 mt-1">{errors.maxLessonsDay}</p>
                  )}
                </div>

                {/* Max Lessons Per Week */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Per Week | أسبوعياً
                  </label>
                  <input
                    type="number"
                    name="maxLessonsWeek"
                    value={formData.maxLessonsWeek}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.maxLessonsWeek ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. 10"
                  />
                  {errors.maxLessonsWeek && (
                    <p className="text-xs text-red-600 mt-1">{errors.maxLessonsWeek}</p>
                  )}
                </div>

                {/* Max Lessons Per Month */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Per Month | شهرياً
                  </label>
                  <input
                    type="number"
                    name="maxLessonsMonth"
                    value={formData.maxLessonsMonth}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.maxLessonsMonth ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. 40"
                  />
                  {errors.maxLessonsMonth && (
                    <p className="text-xs text-red-600 mt-1">{errors.maxLessonsMonth}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Subjects & Durations (Dynamic) */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-5 text-blue-600" />
                  <h2 className="font-semibold text-gray-900">
                    Subjects & Durations | المواد والمدة
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={addSubject}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1.5"
                >
                  <Plus className="size-4" />
                  Add Subject
                </button>
              </div>
              {errors.subjects && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="size-3" />
                  {errors.subjects}
                </p>
              )}
            </div>

            <div className="p-4 md:p-6 space-y-3">
              {subjects.map((subject, index) => (
                <div
                  key={subject.id}
                  className="flex flex-col md:flex-row gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Subject Name | المادة
                    </label>
                    <select
                      value={subject.subjectName}
                      onChange={(e) => updateSubject(subject.id, 'subjectName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none ${
                        errors[`subject_${subject.id}_name`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select subject</option>
                      {availableSubjects.map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                    {errors[`subject_${subject.id}_name`] && (
                      <p className="text-xs text-red-600 mt-1">{errors[`subject_${subject.id}_name`]}</p>
                    )}
                  </div>

                  <div className="w-full md:w-48">
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                      Duration (min) | المدة
                    </label>
                    <select
                      value={subject.lessonDuration}
                      onChange={(e) => updateSubject(subject.id, 'lessonDuration', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none ${
                        errors[`subject_${subject.id}_duration`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select</option>
                      {lessonDurations.map((duration) => (
                        <option key={duration} value={duration}>
                          {duration} minutes
                        </option>
                      ))}
                    </select>
                    {errors[`subject_${subject.id}_duration`] && (
                      <p className="text-xs text-red-600 mt-1">{errors[`subject_${subject.id}_duration`]}</p>
                    )}
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeSubject(subject.id)}
                      disabled={subjects.length === 1}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Remove subject"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                <Info className="size-4 inline mr-1.5" />
                Click "+ Add Subject" to add multiple subjects with different durations
              </div>
            </div>
          </div>

          {/* Section 5: Parent & Status */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="font-semibold text-gray-900">
                Parent & Status | ولي الأمر والحالة
              </h2>
            </div>

            <div className="p-4 md:p-6 space-y-5">
              {/* Parent ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent ID | رقم ولي الأمر *
                </label>
                <input
                  type="text"
                  name="parentId"
                  value={formData.parentId}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.parentId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter Parent ID"
                />
                {errors.parentId && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.parentId}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1.5">
                  Link this student to an existing parent record
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status | الحالة *
                </label>
                <div className="flex gap-3">
                  <label className="flex-1 relative cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="px-4 py-3 border-2 rounded-lg transition-all peer-checked:border-green-500 peer-checked:bg-green-50 border-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">Active</span>
                        <div className="size-5 rounded-full border-2 border-gray-300 peer-checked:border-green-500 peer-checked:bg-green-500 flex items-center justify-center">
                          {formData.status === 'Active' && (
                            <div className="size-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="flex-1 relative cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="Drop"
                      checked={formData.status === 'Drop'}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="px-4 py-3 border-2 rounded-lg transition-all peer-checked:border-red-500 peer-checked:bg-red-50 border-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">Drop</span>
                        <div className="size-5 rounded-full border-2 border-gray-300 peer-checked:border-red-500 peer-checked:bg-red-500 flex items-center justify-center">
                          {formData.status === 'Drop' && (
                            <div className="size-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date of Active */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Active | تاريخ التفعيل
                  </label>
                  <input
                    type="date"
                    name="dateOfActive"
                    value={formData.dateOfActive}
                    onChange={handleChange}
                    disabled={formData.status === 'Drop'}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    Auto-set when status is Active
                  </p>
                </div>

                {/* Date of Drop */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Drop | تاريخ التوقف
                    {formData.status === 'Drop' && <span className="text-red-600"> *</span>}
                  </label>
                  <input
                    type="date"
                    name="dateOfDrop"
                    value={formData.dateOfDrop}
                    onChange={handleChange}
                    disabled={formData.status === 'Active'}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.dateOfDrop ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfDrop && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      {errors.dateOfDrop}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-3 justify-between">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium order-3 md:order-1"
              >
                Cancel
              </button>
              
              <div className="flex flex-col md:flex-row gap-3 order-1 md:order-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Student
                </button>
                
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Save & Add Availability
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
