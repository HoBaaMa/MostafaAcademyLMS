import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Edit3,
  Save,
  X,
  AlertCircle,
  Check,
  Copy,
  Ban,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

type LessonStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Trial_Done' | 'Trial_Canceled' | 'Paid_Cancelled';

type Lesson = {
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
  date: string;
  studentDate: string;
  teacherDate: string;
  dayIndex: number;
  startTimeStudent: string;
  endTimeStudent: string;
  startTimeTeacher: string;
  endTimeTeacher: string;
  status: LessonStatus;
  reason: string;
};

type Student = {
  id: string;
  name: string;
  timeZone: string;
};

type Teacher = {
  id: string;
  name: string;
  timeZone: string;
};

const SUBJECTS = ['Mathematics', 'Science', 'English', 'Arabic', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

const STAGES = [
  { group: 'Elementary', options: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'] },
  { group: 'Mid', options: ['Grade 7', 'Grade 8', 'Grade 9'] },
  { group: 'High School', options: ['Grade 10', 'Grade 11', 'Grade 12'] },
];

const STATUSES: LessonStatus[] = ['Scheduled', 'Completed', 'Cancelled', 'Trial_Done', 'Trial_Canceled', 'Paid_Cancelled'];

const MOCK_STUDENTS: Student[] = [
  { id: 'MID102938', name: 'Ahmad Hassan', timeZone: 'America/Toronto (UTC-5)' },
  { id: 'MID103456', name: 'Layla Ahmed', timeZone: 'Asia/Dubai (UTC+4)' },
  { id: 'MID104567', name: 'Omar Ibrahim', timeZone: 'Africa/Cairo (UTC+2)' },
  { id: 'MID105678', name: 'Maryam Khalil', timeZone: 'Europe/London (UTC+0)' },
  { id: 'MID106789', name: 'Youssef Ali', timeZone: 'America/Toronto (UTC-5)' },
];

const MOCK_TEACHERS: Teacher[] = [
  { id: 'TCHR001', name: 'Dr. Sarah Johnson', timeZone: 'America/New_York (UTC-5)' },
  { id: 'TCHR002', name: 'Prof. Michael Chen', timeZone: 'America/Los_Angeles (UTC-8)' },
  { id: 'TCHR003', name: 'Mrs. Fatima Al-Sayed', timeZone: 'Africa/Cairo (UTC+2)' },
  { id: 'TCHR004', name: 'Dr. James Williams', timeZone: 'America/Toronto (UTC-5)' },
  { id: 'TCHR005', name: 'Ms. Emily Davis', timeZone: 'Europe/London (UTC+0)' },
];

export function LessonSchedule() {
  const [searchQuery, setSearchQuery] = useState('');
  const [studentFilter, setStudentFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [dayNameFilter, setDayNameFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | LessonStatus>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRows, setEditingRows] = useState<Set<string>>(new Set());
  const [editedData, setEditedData] = useState<Record<string, Partial<Lesson>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [conflicts, setConflicts] = useState<Record<string, string>>({});
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictLesson, setConflictLesson] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLessonId, setCancelLessonId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  
  const itemsPerPage = 10;

  // Mock data - 15 lessons
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 'LSN001234',
      studentId: 'MID102938',
      studentName: 'Ahmad Hassan',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'Grade 10',
      dayName: 'Monday',
      date: '2026-02-17',
      studentDate: '2026-02-17',
      teacherDate: '2026-02-17',
      dayIndex: 1,
      startTimeStudent: '16:00',
      endTimeStudent: '17:00',
      startTimeTeacher: '16:00',
      endTimeTeacher: '17:00',
      status: 'Scheduled',
      reason: ''
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
      stage: 'Grade 11',
      dayName: 'Tuesday',
      date: '2026-02-18',
      studentDate: '2026-02-19',
      teacherDate: '2026-02-18',
      dayIndex: 2,
      startTimeStudent: '20:00',
      endTimeStudent: '21:00',
      startTimeTeacher: '08:00',
      endTimeTeacher: '09:00',
      status: 'Scheduled',
      reason: ''
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
      stage: 'Grade 8',
      dayName: 'Wednesday',
      date: '2026-02-19',
      studentDate: '2026-02-19',
      teacherDate: '2026-02-19',
      dayIndex: 3,
      startTimeStudent: '15:00',
      endTimeStudent: '16:00',
      startTimeTeacher: '15:00',
      endTimeTeacher: '16:00',
      status: 'Scheduled',
      reason: ''
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
      stage: 'Grade 4',
      dayName: 'Thursday',
      date: '2026-02-20',
      studentDate: '2026-02-20',
      teacherDate: '2026-02-20',
      dayIndex: 4,
      startTimeStudent: '18:00',
      endTimeStudent: '19:00',
      startTimeTeacher: '13:00',
      endTimeTeacher: '14:00',
      status: 'Scheduled',
      reason: ''
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
      stage: 'Grade 12',
      dayName: 'Friday',
      date: '2026-02-21',
      studentDate: '2026-02-21',
      teacherDate: '2026-02-21',
      dayIndex: 5,
      startTimeStudent: '14:00',
      endTimeStudent: '15:00',
      startTimeTeacher: '14:00',
      endTimeTeacher: '15:00',
      status: 'Scheduled',
      reason: ''
    },
    {
      id: 'LSN001239',
      studentId: 'MID102938',
      studentName: 'Ahmad Hassan',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'Grade 10',
      dayName: 'Monday',
      date: '2026-02-10',
      studentDate: '2026-02-10',
      teacherDate: '2026-02-10',
      dayIndex: 1,
      startTimeStudent: '16:00',
      endTimeStudent: '17:00',
      startTimeTeacher: '16:00',
      endTimeTeacher: '17:00',
      status: 'Completed',
      reason: ''
    },
    {
      id: 'LSN001240',
      studentId: 'MID103456',
      studentName: 'Layla Ahmed',
      studentTimeZone: 'Asia/Dubai (UTC+4)',
      teacherId: 'TCHR002',
      teacherName: 'Prof. Michael Chen',
      teacherTimeZone: 'America/Los_Angeles (UTC-8)',
      subject: 'Physics',
      stage: 'Grade 11',
      dayName: 'Tuesday',
      date: '2026-02-11',
      studentDate: '2026-02-12',
      teacherDate: '2026-02-11',
      dayIndex: 2,
      startTimeStudent: '20:00',
      endTimeStudent: '21:00',
      startTimeTeacher: '08:00',
      endTimeTeacher: '09:00',
      status: 'Completed',
      reason: ''
    },
    {
      id: 'LSN001241',
      studentId: 'MID104567',
      studentName: 'Omar Ibrahim',
      studentTimeZone: 'Africa/Cairo (UTC+2)',
      teacherId: 'TCHR003',
      teacherName: 'Mrs. Fatima Al-Sayed',
      teacherTimeZone: 'Africa/Cairo (UTC+2)',
      subject: 'Arabic',
      stage: 'Grade 8',
      dayName: 'Sunday',
      date: '2026-02-09',
      studentDate: '2026-02-09',
      teacherDate: '2026-02-09',
      dayIndex: 0,
      startTimeStudent: '15:00',
      endTimeStudent: '16:00',
      startTimeTeacher: '15:00',
      endTimeTeacher: '16:00',
      status: 'Cancelled',
      reason: 'Student was sick'
    },
    {
      id: 'LSN001242',
      studentId: 'MID105678',
      studentName: 'Maryam Khalil',
      studentTimeZone: 'Europe/London (UTC+0)',
      teacherId: 'TCHR005',
      teacherName: 'Ms. Emily Davis',
      teacherTimeZone: 'Europe/London (UTC+0)',
      subject: 'English',
      stage: 'Grade 4',
      dayName: 'Saturday',
      date: '2026-02-22',
      studentDate: '2026-02-22',
      teacherDate: '2026-02-22',
      dayIndex: 6,
      startTimeStudent: '10:00',
      endTimeStudent: '11:00',
      startTimeTeacher: '10:00',
      endTimeTeacher: '11:00',
      status: 'Scheduled',
      reason: ''
    },
    {
      id: 'LSN001243',
      studentId: 'MID106789',
      studentName: 'Youssef Ali',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR004',
      teacherName: 'Dr. James Williams',
      teacherTimeZone: 'America/Toronto (UTC-5)',
      subject: 'Chemistry',
      stage: 'Grade 12',
      dayName: 'Friday',
      date: '2026-02-14',
      studentDate: '2026-02-14',
      teacherDate: '2026-02-14',
      dayIndex: 5,
      startTimeStudent: '14:00',
      endTimeStudent: '15:00',
      startTimeTeacher: '14:00',
      endTimeTeacher: '15:00',
      status: 'Completed',
      reason: ''
    },
    {
      id: 'LSN001244',
      studentId: 'MID102938',
      studentName: 'Ahmad Hassan',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'Grade 10',
      dayName: 'Wednesday',
      date: '2026-02-05',
      studentDate: '2026-02-05',
      teacherDate: '2026-02-05',
      dayIndex: 3,
      startTimeStudent: '16:00',
      endTimeStudent: '17:00',
      startTimeTeacher: '16:00',
      endTimeTeacher: '17:00',
      status: 'Trial_Done',
      reason: ''
    },
    {
      id: 'LSN001245',
      studentId: 'MID103456',
      studentName: 'Layla Ahmed',
      studentTimeZone: 'Asia/Dubai (UTC+4)',
      teacherId: 'TCHR005',
      teacherName: 'Ms. Emily Davis',
      teacherTimeZone: 'Europe/London (UTC+0)',
      subject: 'English',
      stage: 'Grade 11',
      dayName: 'Thursday',
      date: '2026-02-06',
      studentDate: '2026-02-07',
      teacherDate: '2026-02-06',
      dayIndex: 4,
      startTimeStudent: '21:00',
      endTimeStudent: '22:00',
      startTimeTeacher: '17:00',
      endTimeTeacher: '18:00',
      status: 'Trial_Canceled',
      reason: 'Student did not show up'
    },
    {
      id: 'LSN001246',
      studentId: 'MID104567',
      studentName: 'Omar Ibrahim',
      studentTimeZone: 'Africa/Cairo (UTC+2)',
      teacherId: 'TCHR003',
      teacherName: 'Mrs. Fatima Al-Sayed',
      teacherTimeZone: 'Africa/Cairo (UTC+2)',
      subject: 'Arabic',
      stage: 'Grade 8',
      dayName: 'Monday',
      date: '2026-02-03',
      studentDate: '2026-02-03',
      teacherDate: '2026-02-03',
      dayIndex: 1,
      startTimeStudent: '15:00',
      endTimeStudent: '16:00',
      startTimeTeacher: '15:00',
      endTimeTeacher: '16:00',
      status: 'Paid_Cancelled',
      reason: 'Family emergency - refund processed'
    },
    {
      id: 'LSN001247',
      studentId: 'MID105678',
      studentName: 'Maryam Khalil',
      studentTimeZone: 'Europe/London (UTC+0)',
      teacherId: 'TCHR001',
      teacherName: 'Dr. Sarah Johnson',
      teacherTimeZone: 'America/New_York (UTC-5)',
      subject: 'Mathematics',
      stage: 'Grade 4',
      dayName: 'Tuesday',
      date: '2026-02-25',
      studentDate: '2026-02-25',
      teacherDate: '2026-02-25',
      dayIndex: 2,
      startTimeStudent: '18:00',
      endTimeStudent: '19:00',
      startTimeTeacher: '13:00',
      endTimeTeacher: '14:00',
      status: 'Scheduled',
      reason: ''
    },
    {
      id: 'LSN001248',
      studentId: 'MID106789',
      studentName: 'Youssef Ali',
      studentTimeZone: 'America/Toronto (UTC-5)',
      teacherId: 'TCHR004',
      teacherName: 'Dr. James Williams',
      teacherTimeZone: 'America/Toronto (UTC-5)',
      subject: 'Chemistry',
      stage: 'Grade 12',
      dayName: 'Monday',
      date: '2026-02-24',
      studentDate: '2026-02-24',
      teacherDate: '2026-02-24',
      dayIndex: 1,
      startTimeStudent: '14:00',
      endTimeStudent: '15:00',
      startTimeTeacher: '14:00',
      endTimeTeacher: '15:00',
      status: 'Scheduled',
      reason: ''
    },
  ]);

  // Helper: Calculate day name from date
  const getDayName = (dateStr: string): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(dateStr).getDay()];
  };

  // Helper: Calculate day index from date
  const getDayIndex = (dateStr: string): number => {
    return new Date(dateStr).getDay();
  };

  // Helper: Find student by ID
  const findStudent = (id: string): Student | undefined => {
    return MOCK_STUDENTS.find(s => s.id === id);
  };

  // Helper: Find teacher by ID
  const findTeacher = (id: string): Teacher | undefined => {
    return MOCK_TEACHERS.find(t => t.id === id);
  };

  // Helper: Check for time conflicts
  const checkConflicts = (lessonId: string, data: Partial<Lesson>): string | null => {
    const currentLesson = lessons.find(l => l.id === lessonId);
    if (!currentLesson) return null;

    const checkDate = data.date || currentLesson.date;
    const checkStudentId = data.studentId || currentLesson.studentId;
    const checkTeacherId = data.teacherId || currentLesson.teacherId;
    const checkStartStudent = data.startTimeStudent || currentLesson.startTimeStudent;
    const checkEndStudent = data.endTimeStudent || currentLesson.endTimeStudent;
    const checkStartTeacher = data.startTimeTeacher || currentLesson.startTimeTeacher;
    const checkEndTeacher = data.endTimeTeacher || currentLesson.endTimeTeacher;

    // Check student conflicts
    const studentConflicts = lessons.filter(l => 
      l.id !== lessonId &&
      l.studentId === checkStudentId &&
      l.date === checkDate &&
      l.status === 'Scheduled' &&
      ((checkStartStudent >= l.startTimeStudent && checkStartStudent < l.endTimeStudent) ||
       (checkEndStudent > l.startTimeStudent && checkEndStudent <= l.endTimeStudent) ||
       (checkStartStudent <= l.startTimeStudent && checkEndStudent >= l.endTimeStudent))
    );

    if (studentConflicts.length > 0) {
      return `Time conflict: Student ${checkStudentId} has another lesson at this time`;
    }

    // Check teacher conflicts
    const teacherConflicts = lessons.filter(l => 
      l.id !== lessonId &&
      l.teacherId === checkTeacherId &&
      l.date === checkDate &&
      l.status === 'Scheduled' &&
      ((checkStartTeacher >= l.startTimeTeacher && checkStartTeacher < l.endTimeTeacher) ||
       (checkEndTeacher > l.startTimeTeacher && checkEndTeacher <= l.endTimeTeacher) ||
       (checkStartTeacher <= l.startTimeTeacher && checkEndTeacher >= l.endTimeTeacher))
    );

    if (teacherConflicts.length > 0) {
      return `Time conflict: Teacher ${checkTeacherId} has another lesson at this time`;
    }

    return null;
  };

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
    
    const matchesStatus = !statusFilter || lesson.status === statusFilter;
    
    const matchesDayName = !dayNameFilter || lesson.dayName === dayNameFilter;
    
    const lessonDate = new Date(lesson.date);
    const matchesDateFrom = !dateFromFilter || lessonDate >= new Date(dateFromFilter);
    const matchesDateTo = !dateToFilter || lessonDate <= new Date(dateToFilter);
    
    const matchesTab = activeTab === 'All' || lesson.status === activeTab;
    
    return matchesSearch && matchesStudent && matchesTeacher && matchesSubject && 
           matchesStage && matchesStatus && matchesDateFrom && matchesDateTo && 
           matchesDayName && matchesTab;
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
      const newConflicts = { ...conflicts };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(lessonId)) {
          delete newErrors[key];
        }
      });
      Object.keys(newConflicts).forEach(key => {
        if (key.startsWith(lessonId)) {
          delete newConflicts[key];
        }
      });
      setErrors(newErrors);
      setConflicts(newConflicts);
    } else {
      newEditingRows.add(lessonId);
    }
    setEditingRows(newEditingRows);
  };

  const handleCellChange = (lessonId: string, field: keyof Lesson, value: any) => {
    const currentLesson = lessons.find(l => l.id === lessonId);
    if (!currentLesson) return;

    let updates: Partial<Lesson> = { [field]: value };

    // Auto-fill logic for Student_ID change
    if (field === 'studentId') {
      const student = findStudent(value);
      if (student) {
        updates = {
          ...updates,
          studentName: student.name,
          studentTimeZone: student.timeZone,
        };
      }
    }

    // Auto-fill logic for Teacher_ID change
    if (field === 'teacherId') {
      const teacher = findTeacher(value);
      if (teacher) {
        updates = {
          ...updates,
          teacherName: teacher.name,
          teacherTimeZone: teacher.timeZone,
        };
      }
    }

    // Auto-calculate day info when date changes
    if (field === 'date') {
      updates = {
        ...updates,
        dayName: getDayName(value),
        dayIndex: getDayIndex(value),
        studentDate: value, // Simplified - in real app would calculate based on timezone
        teacherDate: value,
      };
    }

    // Auto-calculate end time (simplified - 1 hour duration)
    if (field === 'startTimeStudent') {
      const [hours, minutes] = value.split(':');
      const endHour = (parseInt(hours) + 1).toString().padStart(2, '0');
      updates = {
        ...updates,
        endTimeStudent: `${endHour}:${minutes}`,
      };
    }

    if (field === 'startTimeTeacher') {
      const [hours, minutes] = value.split(':');
      const endHour = (parseInt(hours) + 1).toString().padStart(2, '0');
      updates = {
        ...updates,
        endTimeTeacher: `${endHour}:${minutes}`,
      };
    }

    setEditedData({
      ...editedData,
      [lessonId]: {
        ...editedData[lessonId],
        ...updates,
      }
    });

    // Clear errors for updated fields
    Object.keys(updates).forEach(key => {
      const errorKey = `${lessonId}-${key}`;
      if (errors[errorKey]) {
        const newErrors = { ...errors };
        delete newErrors[errorKey];
        setErrors(newErrors);
      }
    });

    // Check for conflicts
    const mergedData = { ...currentLesson, ...editedData[lessonId], ...updates };
    const conflict = checkConflicts(lessonId, mergedData);
    const newConflicts = { ...conflicts };
    if (conflict) {
      newConflicts[lessonId] = conflict;
    } else {
      delete newConflicts[lessonId];
    }
    setConflicts(newConflicts);
  };

  const getCellValue = (lesson: Lesson, field: keyof Lesson) => {
    if (editedData[lesson.id] && field in editedData[lesson.id]) {
      return editedData[lesson.id][field];
    }
    return lesson[field];
  };

  const validateChanges = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(editedData).forEach(([lessonId, data]) => {
      const currentLesson = lessons.find(l => l.id === lessonId);
      if (!currentLesson) return;

      // Validate time ordering
      if ('startTimeStudent' in data || 'endTimeStudent' in data) {
        const start = data.startTimeStudent || currentLesson.startTimeStudent;
        const end = data.endTimeStudent || currentLesson.endTimeStudent;
        if (start >= end) {
          newErrors[`${lessonId}-endTimeStudent`] = 'End time must be after start time';
        }
      }

      if ('startTimeTeacher' in data || 'endTimeTeacher' in data) {
        const start = data.startTimeTeacher || currentLesson.startTimeTeacher;
        const end = data.endTimeTeacher || currentLesson.endTimeTeacher;
        if (start >= end) {
          newErrors[`${lessonId}-endTimeTeacher`] = 'End time must be after start time';
        }
      }

      // Validate required reason for cancellation statuses
      const status = data.status || currentLesson.status;
      const reason = data.reason || currentLesson.reason;
      if (['Cancelled', 'Paid_Cancelled', 'Trial_Canceled'].includes(status) && !reason.trim()) {
        newErrors[`${lessonId}-reason`] = 'Reason required for cancellation';
      }

      // Validate student and teacher exist
      if (data.studentId) {
        const student = findStudent(data.studentId);
        if (!student) {
          newErrors[`${lessonId}-studentId`] = 'Invalid student ID';
        }
      }

      if (data.teacherId) {
        const teacher = findTeacher(data.teacherId);
        if (!teacher) {
          newErrors[`${lessonId}-teacherId`] = 'Invalid teacher ID';
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

    // Check if there are conflicts
    const conflictedLessons = Object.keys(conflicts);
    if (conflictedLessons.length > 0) {
      setConflictLesson(conflictedLessons[0]);
      setShowConflictModal(true);
      return;
    }

    proceedWithSave();
  };

  const proceedWithSave = () => {
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
    setConflicts({});
    setShowConflictModal(false);
    setConflictLesson(null);
  };

  const handleDiscardChanges = () => {
    setEditedData({});
    setEditingRows(new Set());
    setErrors({});
    setConflicts({});
  };

  const handleDuplicate = (lesson: Lesson) => {
    const newId = `LSN${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
    const duplicated: Lesson = {
      ...lesson,
      id: newId,
      status: 'Scheduled',
      reason: '',
    };
    setLessons([duplicated, ...lessons]);
  };

  const handleCancelLesson = (lessonId: string) => {
    setCancelLessonId(lessonId);
    setCancelReason('');
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (!cancelLessonId || !cancelReason.trim()) return;

    const updatedLessons = lessons.map(lesson => {
      if (lesson.id === cancelLessonId) {
        return { ...lesson, status: 'Cancelled' as LessonStatus, reason: cancelReason };
      }
      return lesson;
    });

    setLessons(updatedLessons);
    setShowCancelModal(false);
    setCancelLessonId(null);
    setCancelReason('');
  };

  const hasChanges = Object.keys(editedData).length > 0;

  // Calculate stats
  const statusCounts = {
    All: lessons.length,
    Scheduled: lessons.filter(l => l.status === 'Scheduled').length,
    Completed: lessons.filter(l => l.status === 'Completed').length,
    Cancelled: lessons.filter(l => l.status === 'Cancelled').length,
  };

  const getStatusColor = (status: LessonStatus): string => {
    const colors = {
      Scheduled: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-gray-100 text-gray-800',
      Trial_Done: 'bg-purple-100 text-purple-800',
      Trial_Canceled: 'bg-orange-100 text-orange-800',
      Paid_Cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: LessonStatus) => {
    const icons = {
      Scheduled: Clock,
      Completed: CheckCircle,
      Cancelled: XCircle,
      Trial_Done: CheckCircle,
      Trial_Canceled: XCircle,
      Paid_Cancelled: Ban,
    };
    return icons[status] || Clock;
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Lesson Schedule</h1>
            </div>
            <p className="text-gray-600">Single source of truth for all lessons - View, edit, and manage all lesson data</p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'All'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All ({statusCounts.All})
          </button>
          <button
            onClick={() => setActiveTab('Scheduled')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'Scheduled'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Scheduled ({statusCounts.Scheduled})
          </button>
          <button
            onClick={() => setActiveTab('Completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'Completed'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Completed ({statusCounts.Completed})
          </button>
          <button
            onClick={() => setActiveTab('Cancelled')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeTab === 'Cancelled'
                ? 'bg-gray-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Cancelled ({statusCounts.Cancelled})
          </button>
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Stages</option>
                  {STAGES.map(group => (
                    <optgroup key={group.group} label={group.group}>
                      {group.options.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Statuses</option>
                  {STATUSES.map(status => (
                    <option key={status} value={status}>{status.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Day Name
                </label>
                <select
                  value={dayNameFilter}
                  onChange={(e) => setDayNameFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Days</option>
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <option key={day} value={day}>{day}</option>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
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
                    <th className="sticky left-0 z-20 bg-gray-50 text-left px-3 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300">
                      Lesson ID
                    </th>
                    <th className="sticky left-[100px] z-20 bg-gray-50 text-left px-3 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300">
                      Student Name
                    </th>
                    
                    {/* Identity fields */}
                    <th className="bg-blue-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Student ID ✏️</th>
                    <th className="bg-blue-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Student TZ</th>
                    <th className="bg-purple-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Teacher ID ✏️</th>
                    <th className="bg-purple-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Teacher Name</th>
                    <th className="bg-purple-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Teacher TZ</th>
                    
                    {/* Lesson info */}
                    <th className="bg-green-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Subject ✏️</th>
                    <th className="bg-green-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Stage ✏️</th>
                    
                    {/* Date/Time fields */}
                    <th className="bg-orange-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Day Name</th>
                    <th className="bg-orange-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Date ✏️</th>
                    <th className="bg-orange-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Student Date</th>
                    <th className="bg-orange-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Teacher Date</th>
                    <th className="bg-orange-50 text-right px-3 py-3 text-xs font-medium text-gray-700">Day Index</th>
                    
                    {/* Time slots */}
                    <th className="bg-yellow-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Start (Student) ✏️</th>
                    <th className="bg-yellow-50 text-left px-3 py-3 text-xs font-medium text-gray-700">End (Student)</th>
                    <th className="bg-yellow-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Start (Teacher) ✏️</th>
                    <th className="bg-yellow-50 text-left px-3 py-3 text-xs font-medium text-gray-700">End (Teacher)</th>
                    
                    {/* Status */}
                    <th className="bg-pink-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Status ✏️</th>
                    <th className="bg-pink-50 text-left px-3 py-3 text-xs font-medium text-gray-700">Reason ✏️</th>
                    
                    {/* Actions */}
                    <th className="sticky right-0 z-20 bg-gray-50 text-left px-3 py-3 text-xs font-medium text-gray-700 border-l-2 border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedLessons.map(lesson => {
                    const isEditing = editingRows.has(lesson.id);
                    const hasEdits = !!editedData[lesson.id];
                    const hasConflict = !!conflicts[lesson.id];
                    const StatusIcon = getStatusIcon(lesson.status);
                    
                    return (
                      <tr 
                        key={lesson.id} 
                        className={`hover:bg-gray-50 transition-colors ${hasEdits ? 'bg-blue-50' : ''} ${hasConflict ? 'bg-orange-50' : ''}`}
                      >
                        {/* Frozen: Lesson ID */}
                        <td className="sticky left-0 z-10 bg-white px-3 py-3 border-r-2 border-gray-200 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-gray-900">{lesson.id}</span>
                            {isEditing && <Edit3 className="size-3 text-blue-600" />}
                            {hasConflict && <AlertTriangle className="size-3 text-orange-600" />}
                          </div>
                        </td>
                        
                        {/* Frozen: Student Name */}
                        <td className="sticky left-[100px] z-10 bg-white px-3 py-3 border-r-2 border-gray-200 whitespace-nowrap">
                          <span className="font-medium text-sm text-gray-900">{getCellValue(lesson, 'studentName')}</span>
                        </td>
                        
                        {/* Student ID (editable) */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <select
                              value={getCellValue(lesson, 'studentId')}
                              onChange={(e) => handleCellChange(lesson.id, 'studentId', e.target.value)}
                              className={`w-32 px-2 py-1 border rounded text-xs font-mono ${
                                errors[`${lesson.id}-studentId`] ? 'border-red-500' : 'border-blue-300'
                              }`}
                            >
                              {MOCK_STUDENTS.map(s => (
                                <option key={s.id} value={s.id}>{s.id}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="font-mono text-xs text-gray-700">{lesson.studentId}</span>
                          )}
                        </td>
                        
                        {/* Student TimeZone */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-600">{getCellValue(lesson, 'studentTimeZone')}</span>
                        </td>
                        
                        {/* Teacher ID (editable) */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <select
                              value={getCellValue(lesson, 'teacherId')}
                              onChange={(e) => handleCellChange(lesson.id, 'teacherId', e.target.value)}
                              className={`w-28 px-2 py-1 border rounded text-xs font-mono ${
                                errors[`${lesson.id}-teacherId`] ? 'border-red-500' : 'border-purple-300'
                              }`}
                            >
                              {MOCK_TEACHERS.map(t => (
                                <option key={t.id} value={t.id}>{t.id}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="font-mono text-xs text-gray-700">{lesson.teacherId}</span>
                          )}
                        </td>
                        
                        {/* Teacher Name */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{getCellValue(lesson, 'teacherName')}</span>
                        </td>
                        
                        {/* Teacher TimeZone */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-600">{getCellValue(lesson, 'teacherTimeZone')}</span>
                        </td>
                        
                        {/* Subject (editable) */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <select
                              value={getCellValue(lesson, 'subject')}
                              onChange={(e) => handleCellChange(lesson.id, 'subject', e.target.value)}
                              className="w-32 px-2 py-1 border border-green-300 rounded text-xs"
                            >
                              {SUBJECTS.map(subject => (
                                <option key={subject} value={subject}>{subject}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-sm text-gray-900">{lesson.subject}</span>
                          )}
                        </td>
                        
                        {/* Stage (editable) */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <select
                              value={getCellValue(lesson, 'stage')}
                              onChange={(e) => handleCellChange(lesson.id, 'stage', e.target.value)}
                              className="w-28 px-2 py-1 border border-green-300 rounded text-xs"
                            >
                              {STAGES.map(group => (
                                <optgroup key={group.group} label={group.group}>
                                  {group.options.map(stage => (
                                    <option key={stage} value={stage}>{stage}</option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                          ) : (
                            <span className="text-sm text-gray-700">{lesson.stage}</span>
                          )}
                        </td>
                        
                        {/* Day Name (auto-calculated) */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{getCellValue(lesson, 'dayName')}</span>
                        </td>
                        
                        {/* Date (editable) */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="date"
                              value={getCellValue(lesson, 'date')}
                              onChange={(e) => handleCellChange(lesson.id, 'date', e.target.value)}
                              className="w-36 px-2 py-1 border border-orange-300 rounded text-xs font-mono"
                            />
                          ) : (
                            <span className="text-xs text-gray-900 font-mono">{lesson.date}</span>
                          )}
                        </td>
                        
                        {/* Student Date */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-700 font-mono">{getCellValue(lesson, 'studentDate')}</span>
                        </td>
                        
                        {/* Teacher Date */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs text-gray-700 font-mono">{getCellValue(lesson, 'teacherDate')}</span>
                        </td>
                        
                        {/* Day Index */}
                        <td className="px-3 py-3 text-right whitespace-nowrap">
                          <span className="text-xs text-gray-700">{getCellValue(lesson, 'dayIndex')}</span>
                        </td>
                        
                        {/* Start Time Student (editable) */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="time"
                              value={getCellValue(lesson, 'startTimeStudent')}
                              onChange={(e) => handleCellChange(lesson.id, 'startTimeStudent', e.target.value)}
                              className="w-24 px-2 py-1 border border-yellow-300 rounded text-xs font-mono"
                            />
                          ) : (
                            <span className="text-xs font-mono text-gray-700">{lesson.startTimeStudent}</span>
                          )}
                        </td>
                        
                        {/* End Time Student */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{getCellValue(lesson, 'endTimeStudent')}</span>
                          {errors[`${lesson.id}-endTimeStudent`] && (
                            <p className="text-xs text-red-600 mt-1">{errors[`${lesson.id}-endTimeStudent`]}</p>
                          )}
                        </td>
                        
                        {/* Start Time Teacher (editable) */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="time"
                              value={getCellValue(lesson, 'startTimeTeacher')}
                              onChange={(e) => handleCellChange(lesson.id, 'startTimeTeacher', e.target.value)}
                              className="w-24 px-2 py-1 border border-yellow-300 rounded text-xs font-mono"
                            />
                          ) : (
                            <span className="text-xs font-mono text-gray-700">{lesson.startTimeTeacher}</span>
                          )}
                        </td>
                        
                        {/* End Time Teacher */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="text-xs font-mono text-gray-700">{getCellValue(lesson, 'endTimeTeacher')}</span>
                          {errors[`${lesson.id}-endTimeTeacher`] && (
                            <p className="text-xs text-red-600 mt-1">{errors[`${lesson.id}-endTimeTeacher`]}</p>
                          )}
                        </td>
                        
                        {/* Status (editable) */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <select
                              value={getCellValue(lesson, 'status')}
                              onChange={(e) => handleCellChange(lesson.id, 'status', e.target.value as LessonStatus)}
                              className="w-32 px-2 py-1 border border-pink-300 rounded text-xs"
                            >
                              {STATUSES.map(status => (
                                <option key={status} value={status}>{status.replace('_', ' ')}</option>
                              ))}
                            </select>
                          ) : (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lesson.status)}`}>
                              <StatusIcon className="size-3 mr-1" />
                              {lesson.status.replace('_', ' ')}
                            </span>
                          )}
                        </td>
                        
                        {/* Reason (editable) */}
                        <td className="px-3 py-3">
                          {isEditing ? (
                            <div>
                              <input
                                type="text"
                                value={getCellValue(lesson, 'reason')}
                                onChange={(e) => handleCellChange(lesson.id, 'reason', e.target.value)}
                                className={`w-48 px-2 py-1 border rounded text-xs ${
                                  errors[`${lesson.id}-reason`] ? 'border-red-500' : 'border-pink-300'
                                }`}
                                placeholder="Required for cancellations..."
                              />
                              {errors[`${lesson.id}-reason`] && (
                                <p className="text-xs text-red-600 mt-1">{errors[`${lesson.id}-reason`]}</p>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-600 line-clamp-1">{lesson.reason || '—'}</span>
                          )}
                        </td>
                        
                        {/* Actions */}
                        <td className="sticky right-0 z-10 bg-white px-3 py-3 border-l-2 border-gray-200 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleEditMode(lesson.id)}
                              className={`px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
                                isEditing 
                                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              }`}
                              title={isEditing ? "Done Editing" : "Edit Lesson"}
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
                              to={`/lessons/${lesson.id}`}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-xs font-medium flex items-center gap-1"
                              title="View Details"
                            >
                              <Eye className="size-3" />
                            </Link>
                            <button
                              onClick={() => handleDuplicate(lesson)}
                              className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors text-xs flex items-center"
                              title="Duplicate Lesson"
                            >
                              <Copy className="size-3" />
                            </button>
                            {lesson.status === 'Scheduled' && (
                              <button
                                onClick={() => handleCancelLesson(lesson.id)}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-xs flex items-center"
                                title="Cancel Lesson"
                              >
                                <Ban className="size-3" />
                              </button>
                            )}
                          </div>
                          {hasConflict && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-orange-700">
                              <AlertTriangle className="size-3" />
                              <span>Conflict</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Empty State */}
              {paginatedLessons.length === 0 && (
                <div className="text-center py-12 bg-gray-50">
                  <Calendar className="size-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-900 mb-1">No lessons found</h3>
                  <p className="text-gray-600 text-sm">Try adjusting your filters or view tab</p>
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
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-2xl z-50">
          <div className="max-w-[1800px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="size-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Unsaved Changes</p>
                  <p className="text-sm text-gray-600">
                    {Object.keys(editedData).length} lesson{Object.keys(editedData).length > 1 ? 's' : ''} modified
                    {Object.keys(conflicts).length > 0 && (
                      <span className="text-orange-600 ml-2">
                        • {Object.keys(conflicts).length} conflict{Object.keys(conflicts).length > 1 ? 's' : ''} detected
                      </span>
                    )}
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

              {Object.values(editedData).some(data => data.status === 'Completed') && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                  <Info className="size-4 text-green-700" />
                  <span className="text-sm text-green-700">
                    Completed lessons will be counted in finance
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
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  disabled={Object.keys(errors).length > 0}
                >
                  <Save className="size-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conflict Override Modal */}
      {showConflictModal && conflictLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="size-5 text-orange-700" />
                </div>
                <h3 className="font-semibold text-gray-900">Time Conflict Detected</h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                {conflicts[conflictLesson]}
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-orange-900 font-medium mb-2">
                  Warning: Scheduling Conflict
                </p>
                <p className="text-sm text-orange-800">
                  Saving this lesson will create a time conflict. This may cause issues with scheduling and lesson delivery.
                  Are you sure you want to proceed?
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowConflictModal(false);
                  setConflictLesson(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Go Back & Edit
              </button>
              <button
                onClick={proceedWithSave}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 font-medium"
              >
                <AlertTriangle className="size-4" />
                Override & Save Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Lesson Modal */}
      {showCancelModal && cancelLessonId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Ban className="size-5 text-red-700" />
                </div>
                <h3 className="font-semibold text-gray-900">Cancel Lesson</h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Please provide a reason for cancelling this lesson:
              </p>

              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter cancellation reason..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm min-h-[100px]"
              />

              {cancelReason.trim() === '' && (
                <p className="text-xs text-red-600 mt-2">Reason is required for cancellation</p>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelLessonId(null);
                  setCancelReason('');
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={confirmCancel}
                disabled={!cancelReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Ban className="size-4" />
                Cancel Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
