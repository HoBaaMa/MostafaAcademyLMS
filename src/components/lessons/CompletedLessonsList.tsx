import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen,
  Edit3,
  Save,
  X,
  AlertCircle,
  Check,
  UserCog,
  GraduationCap,
  CheckCircle
} from 'lucide-react';

type CompletedLesson = {
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
  actualDate: string;
  studentDate: string;
  teacherDate: string;
  dayIndex: number;
  startTimeStudent: string;
  endTimeStudent: string;
  startTimeTeacher: string;
  endTimeTeacher: string;
  status: string;
  price: number;
  finalPrice: number;
  offerNumber: string;
  appliedOfferId: string;
  currency: string;
  note: string;
  parentNo: string;
};

const CURRENCIES = ['CAD', 'USD', 'EUR', 'EGP'];
const SUBJECTS = ['Mathematics', 'Science', 'English', 'Arabic', 'Physics', 'Chemistry', 'Biology'];
const STAGES = ['Elementary', 'Mid', 'High School'];

export function CompletedLessonsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [studentFilter, setStudentFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [priceMinFilter, setPriceMinFilter] = useState('');
  const [priceMaxFilter, setPriceMaxFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRows, setEditingRows] = useState<Set<string>>(new Set());
  const [editedData, setEditedData] = useState<Record<string, Partial<CompletedLesson>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const itemsPerPage = 10;

  // Mock data - 12 completed lessons
  const [lessons, setLessons] = useState<CompletedLesson[]>([
    {
      id: 'LSN001234',
      studentId: 'MID102938',
      studentName: 'Ahmad Hassan',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'High School',
      dayName: 'Monday',
      actualDate: '2026-02-03',
      studentDate: '2026-02-03',
      teacherDate: '2026-02-03',
      dayIndex: 1,
      startTimeStudent: '16:00',
      endTimeStudent: '17:00',
      startTimeTeacher: '16:00',
      endTimeTeacher: '17:00',
      status: 'Completed',
      price: 50.00,
      finalPrice: 45.00,
      offerNumber: 'OFF-2026-001',
      appliedOfferId: 'OFFER123',
      currency: 'CAD',
      note: 'Student showed great improvement in calculus',
      parentNo: 'PARENT102938'
    },
    {
      id: 'LSN001235',
      studentId: 'MID103456',
      studentName: 'Layla Ahmed',
      studentTimeZone: 'Asia/Dubai (UTC+4)',
      teacherId: 'TCHR002',
      teacherName: 'Prof. Michael Chen',
      teacherTimeZone: 'America/Los_Angeles (UTC-8)',
      subject: 'Physics',
      stage: 'High School',
      dayName: 'Tuesday',
      actualDate: '2026-02-04',
      studentDate: '2026-02-05',
      teacherDate: '2026-02-04',
      dayIndex: 2,
      startTimeStudent: '20:00',
      endTimeStudent: '21:00',
      startTimeTeacher: '08:00',
      endTimeTeacher: '09:00',
      status: 'Completed',
      price: 60.00,
      finalPrice: 60.00,
      offerNumber: '',
      appliedOfferId: '',
      currency: 'USD',
      note: 'Covered Newton\'s laws of motion',
      parentNo: 'PARENT103456'
    },
    {
      id: 'LSN001236',
      studentId: 'MID104567',
      studentName: 'Omar Ibrahim',
      studentTimeZone: 'Africa/Cairo (UTC+2)',
      teacherId: 'TCHR003',
      teacherName: 'Mrs. Fatima Al-Sayed',
      teacherTimeZone: 'Africa/Cairo (UTC+2)',
      subject: 'Arabic',
      stage: 'Mid',
      dayName: 'Wednesday',
      actualDate: '2026-02-05',
      studentDate: '2026-02-05',
      teacherDate: '2026-02-05',
      dayIndex: 3,
      startTimeStudent: '15:00',
      endTimeStudent: '16:00',
      startTimeTeacher: '15:00',
      endTimeTeacher: '16:00',
      status: 'Completed',
      price: 1200.00,
      finalPrice: 1020.00,
      offerNumber: 'SPRING-15',
      appliedOfferId: 'OFFER456',
      currency: 'EGP',
      note: 'Grammar and composition practice',
      parentNo: 'PARENT104567'
    },
    {
      id: 'LSN001237',
      studentId: 'MID105678',
      studentName: 'Maryam Khalil',
      studentTimeZone: 'Europe/London (UTC+0)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'Elementary',
      dayName: 'Thursday',
      actualDate: '2026-02-06',
      studentDate: '2026-02-06',
      teacherDate: '2026-02-06',
      dayIndex: 4,
      startTimeStudent: '18:00',
      endTimeStudent: '19:00',
      startTimeTeacher: '13:00',
      endTimeTeacher: '14:00',
      status: 'Completed',
      price: 40.00,
      finalPrice: 40.00,
      offerNumber: '',
      appliedOfferId: '',
      currency: 'EUR',
      note: 'Fractions and decimals',
      parentNo: 'PARENT105678'
    },
    {
      id: 'LSN001238',
      studentId: 'MID106789',
      studentName: 'Youssef Ali',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR004',
      teacherName: 'Dr. James Williams',
      teacherTimeZone: 'America/Toronto (UTC-5)',
      subject: 'Chemistry',
      stage: 'High School',
      dayName: 'Friday',
      actualDate: '2026-02-07',
      studentDate: '2026-02-07',
      teacherDate: '2026-02-07',
      dayIndex: 5,
      startTimeStudent: '14:00',
      endTimeStudent: '15:00',
      startTimeTeacher: '14:00',
      endTimeTeacher: '15:00',
      status: 'Completed',
      price: 55.00,
      finalPrice: 55.00,
      offerNumber: '',
      appliedOfferId: '',
      currency: 'CAD',
      note: 'Organic chemistry basics',
      parentNo: 'PARENT106789'
    },
    {
      id: 'LSN001239',
      studentId: 'MID107890',
      studentName: 'Sara Mohammed',
      studentTimeZone: 'Asia/Riyadh (UTC+3)',
      teacherId: 'TCHR005',
      teacherName: 'Ms. Emily Davis',
      teacherTimeZone: 'Europe/London (UTC+0)',
      subject: 'English',
      stage: 'Mid',
      dayName: 'Saturday',
      actualDate: '2026-02-08',
      studentDate: '2026-02-08',
      teacherDate: '2026-02-08',
      dayIndex: 6,
      startTimeStudent: '19:00',
      endTimeStudent: '20:00',
      startTimeTeacher: '16:00',
      endTimeTeacher: '17:00',
      status: 'Completed',
      price: 45.00,
      finalPrice: 38.25,
      offerNumber: 'FAMILY-15',
      appliedOfferId: 'OFFER789',
      currency: 'USD',
      note: 'Reading comprehension and vocabulary',
      parentNo: 'PARENT107890'
    },
    {
      id: 'LSN001240',
      studentId: 'MID108901',
      studentName: 'Khaled Ahmed',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR002',
      teacherName: 'Prof. Michael Chen',
      teacherTimeZone: 'America/Los_Angeles (UTC-8)',
      subject: 'Physics',
      stage: 'High School',
      dayName: 'Sunday',
      actualDate: '2026-02-09',
      studentDate: '2026-02-09',
      teacherDate: '2026-02-09',
      dayIndex: 0,
      startTimeStudent: '12:00',
      endTimeStudent: '13:00',
      startTimeTeacher: '09:00',
      endTimeTeacher: '10:00',
      status: 'Completed',
      price: 60.00,
      finalPrice: 0.00,
      offerNumber: 'TRIAL',
      appliedOfferId: 'TRIAL001',
      currency: 'CAD',
      note: 'Free trial lesson - Kinematics introduction',
      parentNo: 'PARENT108901'
    },
    {
      id: 'LSN001241',
      studentId: 'MID102938',
      studentName: 'Ahmad Hassan',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'High School',
      dayName: 'Monday',
      actualDate: '2026-01-27',
      studentDate: '2026-01-27',
      teacherDate: '2026-01-27',
      dayIndex: 1,
      startTimeStudent: '16:00',
      endTimeStudent: '17:00',
      startTimeTeacher: '16:00',
      endTimeTeacher: '17:00',
      status: 'Completed',
      price: 50.00,
      finalPrice: 45.00,
      offerNumber: 'OFF-2026-001',
      appliedOfferId: 'OFFER123',
      currency: 'CAD',
      note: 'Trigonometry review',
      parentNo: 'PARENT102938'
    },
    {
      id: 'LSN001242',
      studentId: 'MID109012',
      studentName: 'Noor Hassan',
      studentTimeZone: 'Asia/Dubai (UTC+4)',
      teacherId: 'TCHR006',
      teacherName: 'Dr. Ahmed Mansour',
      teacherTimeZone: 'Asia/Dubai (UTC+4)',
      subject: 'Biology',
      stage: 'High School',
      dayName: 'Tuesday',
      actualDate: '2026-01-28',
      studentDate: '2026-01-28',
      teacherDate: '2026-01-28',
      dayIndex: 2,
      startTimeStudent: '17:00',
      endTimeStudent: '18:00',
      startTimeTeacher: '17:00',
      endTimeTeacher: '18:00',
      status: 'Completed',
      price: 50.00,
      finalPrice: 50.00,
      offerNumber: '',
      appliedOfferId: '',
      currency: 'USD',
      note: 'Cell structure and function',
      parentNo: 'PARENT109012'
    },
    {
      id: 'LSN001243',
      studentId: 'MID110123',
      studentName: 'Fatima Ali',
      studentTimeZone: 'Africa/Cairo (UTC+2)',
      teacherId: 'TCHR003',
      teacherName: 'Mrs. Fatima Al-Sayed',
      teacherTimeZone: 'Africa/Cairo (UTC+2)',
      subject: 'Arabic',
      stage: 'Elementary',
      dayName: 'Wednesday',
      actualDate: '2026-01-29',
      studentDate: '2026-01-29',
      teacherDate: '2026-01-29',
      dayIndex: 3,
      startTimeStudent: '16:00',
      endTimeStudent: '17:00',
      startTimeTeacher: '16:00',
      endTimeTeacher: '17:00',
      status: 'Completed',
      price: 1000.00,
      finalPrice: 800.00,
      offerNumber: 'NEW20',
      appliedOfferId: 'OFFER999',
      currency: 'EGP',
      note: 'Reading and writing practice',
      parentNo: 'PARENT110123'
    },
    {
      id: 'LSN001244',
      studentId: 'MID103456',
      studentName: 'Layla Ahmed',
      studentTimeZone: 'Asia/Dubai (UTC+4)',
      teacherId: 'TCHR005',
      teacherName: 'Ms. Emily Davis',
      teacherTimeZone: 'Europe/London (UTC+0)',
      subject: 'English',
      stage: 'High School',
      dayName: 'Thursday',
      actualDate: '2026-01-30',
      studentDate: '2026-01-31',
      teacherDate: '2026-01-30',
      dayIndex: 4,
      startTimeStudent: '21:00',
      endTimeStudent: '22:00',
      startTimeTeacher: '17:00',
      endTimeTeacher: '18:00',
      status: 'Completed',
      price: 48.00,
      finalPrice: 48.00,
      offerNumber: '',
      appliedOfferId: '',
      currency: 'USD',
      note: 'Essay writing techniques',
      parentNo: 'PARENT103456'
    },
    {
      id: 'LSN001245',
      studentId: 'MID104567',
      studentName: 'Omar Ibrahim',
      studentTimeZone: 'Africa/Cairo (UTC+2)',
      teacherId: 'TCHR004',
      teacherName: 'Dr. James Williams',
      teacherTimeZone: 'America/Toronto (UTC-5)',
      subject: 'Science',
      stage: 'Mid',
      dayName: 'Friday',
      actualDate: '2026-01-31',
      studentDate: '2026-01-31',
      teacherDate: '2026-01-31',
      dayIndex: 5,
      startTimeStudent: '19:00',
      endTimeStudent: '20:00',
      startTimeTeacher: '12:00',
      endTimeTeacher: '13:00',
      status: 'Completed',
      price: 1100.00,
      finalPrice: 935.00,
      offerNumber: 'WINTER-15',
      appliedOfferId: 'OFFER555',
      currency: 'EGP',
      note: 'Scientific method and experiments',
      parentNo: 'PARENT104567'
    },
  ]);

  // Filter logic
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStudent = !studentFilter || 
      lesson.studentId.toLowerCase().includes(studentFilter.toLowerCase()) ||
      lesson.studentName.toLowerCase().includes(studentFilter.toLowerCase());
    
    const matchesTeacher = !teacherFilter || 
      lesson.teacherId.toLowerCase().includes(teacherFilter.toLowerCase()) ||
      lesson.teacherName.toLowerCase().includes(teacherFilter.toLowerCase());
    
    const matchesSubject = !subjectFilter || lesson.subject === subjectFilter;
    const matchesStage = !stageFilter || lesson.stage === stageFilter;
    const matchesCurrency = !currencyFilter || lesson.currency === currencyFilter;
    
    const lessonDate = new Date(lesson.actualDate);
    const matchesDateFrom = !dateFromFilter || lessonDate >= new Date(dateFromFilter);
    const matchesDateTo = !dateToFilter || lessonDate <= new Date(dateToFilter);
    
    const minPrice = priceMinFilter ? parseFloat(priceMinFilter) : 0;
    const maxPrice = priceMaxFilter ? parseFloat(priceMaxFilter) : Infinity;
    const matchesPrice = lesson.finalPrice >= minPrice && lesson.finalPrice <= maxPrice;
    
    return matchesSearch && matchesStudent && matchesTeacher && matchesSubject && 
           matchesStage && matchesCurrency && matchesDateFrom && matchesDateTo && matchesPrice;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLessons = filteredLessons.slice(startIndex, startIndex + itemsPerPage);

  const toggleEditMode = (lessonId: string) => {
    const newEditingRows = new Set(editingRows);
    if (newEditingRows.has(lessonId)) {
      newEditingRows.delete(lessonId);
      const newEditedData = { ...editedData };
      delete newEditedData[lessonId];
      setEditedData(newEditedData);
      
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(lessonId)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    } else {
      newEditingRows.add(lessonId);
    }
    setEditingRows(newEditingRows);
  };

  const handleCellChange = (lessonId: string, field: keyof CompletedLesson, value: any) => {
    setEditedData({
      ...editedData,
      [lessonId]: {
        ...editedData[lessonId],
        [field]: value,
      }
    });

    const errorKey = `${lessonId}-${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const getCellValue = (lesson: CompletedLesson, field: keyof CompletedLesson) => {
    if (editedData[lesson.id] && field in editedData[lesson.id]) {
      return editedData[lesson.id][field];
    }
    return lesson[field];
  };

  const validateChanges = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(editedData).forEach(([lessonId, data]) => {
      if ('finalPrice' in data) {
        const finalPrice = data.finalPrice as number;
        if (finalPrice < 0) {
          newErrors[`${lessonId}-finalPrice`] = 'Price cannot be negative';
        }
        if (isNaN(finalPrice)) {
          newErrors[`${lessonId}-finalPrice`] = 'Must be a valid number';
        }
      }

      if ('currency' in data) {
        const currency = data.currency as string;
        if (!CURRENCIES.includes(currency)) {
          newErrors[`${lessonId}-currency`] = 'Invalid currency';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = () => {
    if (!validateChanges()) {
      return;
    }

    const updatedLessons = lessons.map(lesson => {
      if (editedData[lesson.id]) {
        return { ...lesson, ...editedData[lesson.id] };
      }
      return lesson;
    });

    setLessons(updatedLessons);
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

  // Calculate stats
  const totalRevenue = lessons.reduce((sum, l) => sum + l.finalPrice, 0);
  const totalDiscounts = lessons.reduce((sum, l) => sum + (l.price - l.finalPrice), 0);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="size-6 text-green-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Completed Lessons</h1>
            </div>
            <p className="text-gray-600">View and manage completed lesson records with financial data</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Completed</p>
            <p className="text-2xl font-semibold text-gray-900">{lessons.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-semibold text-green-700">
              ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Discounts</p>
            <p className="text-2xl font-semibold text-orange-700">
              ${totalDiscounts.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Search Lesson ID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="LSN001234..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Student ID / Name
                </label>
                <input
                  type="text"
                  value={studentFilter}
                  onChange={(e) => setStudentFilter(e.target.value)}
                  placeholder="Search student..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Teacher ID / Name
                </label>
                <input
                  type="text"
                  value={teacherFilter}
                  onChange={(e) => setTeacherFilter(e.target.value)}
                  placeholder="Search teacher..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

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
                  {SUBJECTS.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Stage
                </label>
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  <option value="">All Stages</option>
                  {STAGES.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date From
                </label>
                <input
                  type="date"
                  value={dateFromFilter}
                  onChange={(e) => setDateFromFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date To
                </label>
                <input
                  type="date"
                  value={dateToFilter}
                  onChange={(e) => setDateToFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Currency
                </label>
                <select
                  value={currencyFilter}
                  onChange={(e) => setCurrencyFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                >
                  <option value="">All</option>
                  {CURRENCIES.map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={priceMinFilter}
                    onChange={(e) => setPriceMinFilter(e.target.value)}
                    placeholder="Min"
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={priceMaxFilter}
                    onChange={(e) => setPriceMaxFilter(e.target.value)}
                    placeholder="Max"
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    {/* Frozen columns */}
                    <th className="sticky left-0 z-20 bg-gray-50 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300">
                      Lesson ID
                    </th>
                    <th className="sticky left-[120px] z-20 bg-gray-50 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300">
                      Student Name
                    </th>
                    
                    {/* Scrollable columns - Student Info */}
                    <th className="bg-gray-100 text-left px-4 py-3 text-xs font-medium text-gray-700">Student ID</th>
                    <th className="bg-gray-100 text-left px-4 py-3 text-xs font-medium text-gray-700">Student TZ</th>
                    
                    {/* Teacher Info */}
                    <th className="bg-purple-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Teacher ID</th>
                    <th className="bg-purple-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Teacher Name</th>
                    <th className="bg-purple-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Teacher TZ</th>
                    
                    {/* Lesson Details */}
                    <th className="bg-blue-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Subject</th>
                    <th className="bg-blue-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Stage</th>
                    <th className="bg-blue-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Day</th>
                    <th className="bg-blue-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Actual Date</th>
                    <th className="bg-blue-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Student Date</th>
                    <th className="bg-blue-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Teacher Date</th>
                    <th className="bg-blue-50 text-right px-4 py-3 text-xs font-medium text-gray-700">Day Index</th>
                    
                    {/* Timing */}
                    <th className="bg-orange-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Start (Student)</th>
                    <th className="bg-orange-50 text-left px-4 py-3 text-xs font-medium text-gray-700">End (Student)</th>
                    <th className="bg-orange-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Start (Teacher)</th>
                    <th className="bg-orange-50 text-left px-4 py-3 text-xs font-medium text-gray-700">End (Teacher)</th>
                    
                    {/* Status & Financial */}
                    <th className="bg-green-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Status</th>
                    <th className="bg-yellow-50 text-right px-4 py-3 text-xs font-medium text-gray-700">Price</th>
                    <th className="bg-yellow-50 text-right px-4 py-3 text-xs font-medium text-gray-700">Final Price ✏️</th>
                    <th className="bg-yellow-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Offer # ✏️</th>
                    <th className="bg-yellow-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Offer ID ✏️</th>
                    <th className="bg-yellow-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Currency ✏️</th>
                    <th className="bg-yellow-50 text-left px-4 py-3 text-xs font-medium text-gray-700">Note ✏️</th>
                    <th className="bg-gray-100 text-left px-4 py-3 text-xs font-medium text-gray-700">Parent No</th>
                    
                    {/* Actions */}
                    <th className="sticky right-0 z-20 bg-gray-50 text-left px-4 py-3 text-xs font-medium text-gray-700 border-l-2 border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedLessons.map(lesson => {
                    const isEditing = editingRows.has(lesson.id);
                    const hasEdits = !!editedData[lesson.id];
                    
                    return (
                      <tr 
                        key={lesson.id} 
                        className={`hover:bg-gray-50 transition-colors ${hasEdits ? 'bg-green-50' : ''}`}
                      >
                        {/* Frozen: Lesson ID */}
                        <td className="sticky left-0 z-10 bg-white px-4 py-3 border-r-2 border-gray-200 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-gray-900">{lesson.id}</span>
                            {isEditing && <Edit3 className="size-3 text-green-600" />}
                          </div>
                        </td>
                        
                        {/* Frozen: Student Name */}
                        <td className="sticky left-[120px] z-10 bg-white px-4 py-3 border-r-2 border-gray-200 whitespace-nowrap">
                          <span className="font-medium text-sm text-gray-900">{lesson.studentName}</span>
                        </td>
                        
                        {/* Student Info */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-mono text-xs text-gray-700">{lesson.studentId}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-600">{lesson.studentTimeZone}</span>
                        </td>
                        
                        {/* Teacher Info */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-mono text-xs text-gray-700">{lesson.teacherId}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{lesson.teacherName}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-600">{lesson.teacherTimeZone}</span>
                        </td>
                        
                        {/* Lesson Details */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{lesson.subject}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{lesson.stage}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{lesson.dayName}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-900 font-mono">{lesson.actualDate}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-700 font-mono">{lesson.studentDate}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-700 font-mono">{lesson.teacherDate}</span>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span className="text-xs text-gray-700">{lesson.dayIndex}</span>
                        </td>
                        
                        {/* Timing */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{lesson.startTimeStudent}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{lesson.endTimeStudent}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{lesson.startTimeTeacher}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{lesson.endTimeTeacher}</span>
                        </td>
                        
                        {/* Status */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="size-3 mr-1" />
                            {lesson.status}
                          </span>
                        </td>
                        
                        {/* Financial - Price (read-only) */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <span className="text-sm font-mono text-gray-700">
                            {lesson.price.toFixed(2)}
                          </span>
                        </td>
                        
                        {/* Financial - Final Price (editable) */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          {isEditing ? (
                            <div className="w-24">
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={getCellValue(lesson, 'finalPrice')}
                                onChange={(e) => handleCellChange(lesson.id, 'finalPrice', parseFloat(e.target.value) || 0)}
                                className={`w-full px-2 py-1 border rounded text-sm text-right font-mono ${
                                  errors[`${lesson.id}-finalPrice`] ? 'border-red-500' : 'border-green-300'
                                }`}
                              />
                              {errors[`${lesson.id}-finalPrice`] && (
                                <p className="text-xs text-red-600 mt-1">{errors[`${lesson.id}-finalPrice`]}</p>
                              )}
                            </div>
                          ) : (
                            <span className={`text-sm font-mono font-semibold ${
                              lesson.finalPrice === 0 ? 'text-orange-600' : 'text-gray-900'
                            }`}>
                              {lesson.finalPrice.toFixed(2)}
                            </span>
                          )}
                        </td>
                        
                        {/* Offer Number (editable) */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="text"
                              value={getCellValue(lesson, 'offerNumber')}
                              onChange={(e) => handleCellChange(lesson.id, 'offerNumber', e.target.value)}
                              className="w-32 px-2 py-1 border border-green-300 rounded text-xs"
                              placeholder="Offer #..."
                            />
                          ) : (
                            <span className="text-xs text-gray-700">{lesson.offerNumber || '—'}</span>
                          )}
                        </td>
                        
                        {/* Applied Offer ID (editable) */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="text"
                              value={getCellValue(lesson, 'appliedOfferId')}
                              onChange={(e) => handleCellChange(lesson.id, 'appliedOfferId', e.target.value)}
                              className="w-32 px-2 py-1 border border-green-300 rounded text-xs font-mono"
                              placeholder="OFFER..."
                            />
                          ) : (
                            <span className="text-xs font-mono text-gray-700">{lesson.appliedOfferId || '—'}</span>
                          )}
                        </td>
                        
                        {/* Currency (editable) */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <select
                              value={getCellValue(lesson, 'currency')}
                              onChange={(e) => handleCellChange(lesson.id, 'currency', e.target.value)}
                              className="w-20 px-2 py-1 border border-green-300 rounded text-xs font-mono"
                            >
                              {CURRENCIES.map(curr => (
                                <option key={curr} value={curr}>{curr}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                              {lesson.currency}
                            </span>
                          )}
                        </td>
                        
                        {/* Note (editable) */}
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={getCellValue(lesson, 'note')}
                              onChange={(e) => handleCellChange(lesson.id, 'note', e.target.value)}
                              className="w-48 px-2 py-1 border border-green-300 rounded text-xs"
                              placeholder="Add note..."
                            />
                          ) : (
                            <span className="text-xs text-gray-600 line-clamp-1">{lesson.note}</span>
                          )}
                        </td>
                        
                        {/* Parent No */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{lesson.parentNo}</span>
                        </td>
                        
                        {/* Actions */}
                        <td className="sticky right-0 z-10 bg-white px-4 py-3 border-l-2 border-gray-200 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleEditMode(lesson.id)}
                              className={`px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                                isEditing 
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {isEditing ? (
                                <>
                                  <Check className="size-3" />
                                  Done
                                </>
                              ) : (
                                <>
                                  <Edit3 className="size-3" />
                                  Edit
                                </>
                              )}
                            </button>
                            <Link
                              to={`/lessons/completed/${lesson.id}`}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-xs font-medium flex items-center gap-1"
                            >
                              <Eye className="size-3" />
                              View
                            </Link>
                            <Link
                              to={`/students/${lesson.studentId}`}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-xs flex items-center"
                              title="View Student"
                            >
                              <GraduationCap className="size-3" />
                            </Link>
                            <Link
                              to={`/parents/${lesson.parentNo}`}
                              className="px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors text-xs flex items-center"
                              title="View Parent"
                            >
                              <UserCog className="size-3" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Empty State */}
              {paginatedLessons.length === 0 && (
                <div className="text-center py-12 bg-gray-50">
                  <BookOpen className="size-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-1">No completed lessons found</h3>
                  <p className="text-gray-600 text-sm">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {paginatedLessons.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredLessons.length)} of {filteredLessons.length} lessons
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
          <div className="max-w-[1800px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-green-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="size-5 text-green-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Unsaved Changes</p>
                  <p className="text-sm text-gray-600">
                    {Object.keys(editedData).length} lesson{Object.keys(editedData).length > 1 ? 's' : ''} modified
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
