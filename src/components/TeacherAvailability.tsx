import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Save, 
  X, 
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  Eye,
  Trash2,
  AlertTriangle,
  Check
} from 'lucide-react';

type Availability = {
  id: string;
  teacherId: string;
  teacherName: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

type EditedAvailability = Availability & { hasChanges?: boolean; hasConflict?: boolean };

export function TeacherAvailability() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  // Mock data
  const initialAvailability: Availability[] = [
    {
      id: 'TA001',
      teacherId: 'TCH001',
      teacherName: 'Dr. Ahmed Hassan',
      day: 'Monday',
      startTime: '08:00',
      endTime: '16:00',
      isAvailable: true
    },
    {
      id: 'TA002',
      teacherId: 'TCH001',
      teacherName: 'Dr. Ahmed Hassan',
      day: 'Wednesday',
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: true
    },
    {
      id: 'TA003',
      teacherId: 'TCH002',
      teacherName: 'Prof. Fatima Al-Sayed',
      day: 'Tuesday',
      startTime: '10:00',
      endTime: '18:00',
      isAvailable: true
    },
    {
      id: 'TA004',
      teacherId: 'TCH002',
      teacherName: 'Prof. Fatima Al-Sayed',
      day: 'Thursday',
      startTime: '',
      endTime: '',
      isAvailable: false
    },
    {
      id: 'TA005',
      teacherId: 'TCH003',
      teacherName: 'Mr. John Smith',
      day: 'Monday',
      startTime: '14:00',
      endTime: '20:00',
      isAvailable: true
    },
    {
      id: 'TA006',
      teacherId: 'TCH003',
      teacherName: 'Mr. John Smith',
      day: 'Friday',
      startTime: '08:00',
      endTime: '14:00',
      isAvailable: true
    },
    {
      id: 'TA007',
      teacherId: 'TCH004',
      teacherName: 'Ms. Maria Garcia',
      day: 'Sunday',
      startTime: '10:00',
      endTime: '16:00',
      isAvailable: true
    },
    {
      id: 'TA008',
      teacherId: 'TCH001',
      teacherName: 'Dr. Ahmed Hassan',
      day: 'Friday',
      startTime: '08:00',
      endTime: '12:00',
      isAvailable: true
    },
    {
      id: 'TA009',
      teacherId: 'TCH004',
      teacherName: 'Ms. Maria Garcia',
      day: 'Wednesday',
      startTime: '',
      endTime: '',
      isAvailable: false
    },
    {
      id: 'TA010',
      teacherId: 'TCH002',
      teacherName: 'Prof. Fatima Al-Sayed',
      day: 'Saturday',
      startTime: '09:00',
      endTime: '15:00',
      isAvailable: true
    }
  ];

  const teachers = [
    { id: 'TCH001', name: 'Dr. Ahmed Hassan', subject: 'Mathematics' },
    { id: 'TCH002', name: 'Prof. Fatima Al-Sayed', subject: 'Physics' },
    { id: 'TCH003', name: 'Mr. John Smith', subject: 'English' },
    { id: 'TCH004', name: 'Ms. Maria Garcia', subject: 'Chemistry' },
    { id: 'TCH005', name: 'Dr. Omar Khalil', subject: 'Arabic' }
  ];

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Arabic', 'Biology'];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [availability, setAvailability] = useState<EditedAvailability[]>(
    initialAvailability.map(a => ({ ...a, hasConflict: false }))
  );
  const [newAvailability, setNewAvailability] = useState<Availability>({
    id: '',
    teacherId: '',
    teacherName: '',
    day: '',
    startTime: '',
    endTime: '',
    isAvailable: true
  });
  const [newAvailabilityErrors, setNewAvailabilityErrors] = useState<Record<string, string>>({});

  const hasChanges = availability.some(a => a.hasChanges);

  // Detect conflicts
  const detectConflicts = (avails: EditedAvailability[]) => {
    return avails.map(avail => {
      if (!avail.isAvailable) return { ...avail, hasConflict: false };

      const conflicts = avails.filter(other => 
        other.id !== avail.id &&
        other.teacherId === avail.teacherId &&
        other.day === avail.day &&
        other.isAvailable &&
        other.startTime &&
        other.endTime &&
        avail.startTime &&
        avail.endTime &&
        (
          (avail.startTime >= other.startTime && avail.startTime < other.endTime) ||
          (avail.endTime > other.startTime && avail.endTime <= other.endTime) ||
          (avail.startTime <= other.startTime && avail.endTime >= other.endTime)
        )
      );

      return { ...avail, hasConflict: conflicts.length > 0 };
    });
  };

  // Filter
  const filteredAvailability = availability.filter(avail => {
    const matchesSearch = 
      avail.teacherId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avail.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (selectedDay && avail.day !== selectedDay) return false;
    
    if (selectedStatus === 'available' && !avail.isAvailable) return false;
    if (selectedStatus === 'unavailable' && avail.isAvailable) return false;
    
    if (selectedSubject) {
      const teacher = teachers.find(t => t.id === avail.teacherId);
      if (teacher && teacher.subject !== selectedSubject) return false;
    }

    return true;
  });

  const formatTime = (time: string): string => {
    if (!time) return '—';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleFieldChange = (availId: string, field: keyof Availability, value: any) => {
    setAvailability(prev => {
      const updated = prev.map(avail => {
        if (avail.id === availId) {
          const newAvail = { ...avail, [field]: value, hasChanges: true };
          
          // Auto-fill teacher name
          if (field === 'teacherId') {
            const teacher = teachers.find(t => t.id === value);
            newAvail.teacherName = teacher?.name || '';
          }
          
          // Clear time inputs when setting to unavailable
          if (field === 'isAvailable' && !value) {
            newAvail.startTime = '';
            newAvail.endTime = '';
          }
          
          return newAvail;
        }
        return avail;
      });

      return detectConflicts(updated);
    });

    // Clear error when user makes changes
    if (errors[availId]?.[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        if (newErrors[availId]) {
          delete newErrors[availId][field];
          if (Object.keys(newErrors[availId]).length === 0) {
            delete newErrors[availId];
          }
        }
        return newErrors;
      });
    }
  };

  const handleRemoveRow = (availId: string) => {
    setAvailability(prev => detectConflicts(prev.filter(a => a.id !== availId)));
  };

  const validateAvailability = (): boolean => {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;

    availability.forEach(avail => {
      if (!avail.hasChanges) return;

      const availErrors: Record<string, string> = {};

      if (!avail.teacherId) {
        availErrors.teacherId = 'Teacher ID required';
        isValid = false;
      }

      if (!avail.day) {
        availErrors.day = 'Day required';
        isValid = false;
      }

      // Validate time inputs when available
      if (avail.isAvailable) {
        if (!avail.startTime) {
          availErrors.startTime = 'Start time required';
          isValid = false;
        }
        if (!avail.endTime) {
          availErrors.endTime = 'End time required';
          isValid = false;
        }
        if (avail.startTime && avail.endTime && avail.startTime >= avail.endTime) {
          availErrors.time = 'End time must be after start time';
          isValid = false;
        }
      }

      // Check for conflicts
      if (avail.hasConflict) {
        availErrors.conflict = 'Time overlap detected';
        isValid = false;
      }

      if (Object.keys(availErrors).length > 0) {
        newErrors[avail.id] = availErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateAvailability()) {
      return;
    }
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    console.log('Saving availability:', availability.filter(a => a.hasChanges));
    setAvailability(prev => prev.map(a => ({ ...a, hasChanges: false })));
    setShowSaveModal(false);
    setErrors({});
  };

  const handleDiscard = () => {
    setAvailability(detectConflicts(initialAvailability.map(a => ({ ...a, hasConflict: false }))));
    setErrors({});
  };

  const generateAvailabilityId = (): string => {
    const existingIds = availability.map(a => parseInt(a.id.replace('TA', '')));
    const maxId = Math.max(...existingIds, 0);
    return `TA${String(maxId + 1).padStart(3, '0')}`;
  };

  const handleNewAvailabilityFieldChange = (field: keyof Availability, value: any) => {
    setNewAvailability(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-fill teacher name
      if (field === 'teacherId') {
        const teacher = teachers.find(t => t.id === value);
        updated.teacherName = teacher?.name || '';
      }
      
      // Clear time inputs when setting to unavailable
      if (field === 'isAvailable' && !value) {
        updated.startTime = '';
        updated.endTime = '';
      }
      
      return updated;
    });

    // Clear error
    if (newAvailabilityErrors[field]) {
      setNewAvailabilityErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateNewAvailability = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    if (!newAvailability.teacherId) {
      errors.teacherId = 'Teacher ID required';
      isValid = false;
    }

    if (!newAvailability.day) {
      errors.day = 'Day required';
      isValid = false;
    }

    if (newAvailability.isAvailable) {
      if (!newAvailability.startTime) {
        errors.startTime = 'Start time required when available';
        isValid = false;
      }
      if (!newAvailability.endTime) {
        errors.endTime = 'End time required when available';
        isValid = false;
      }
      if (newAvailability.startTime && newAvailability.endTime && 
          newAvailability.startTime >= newAvailability.endTime) {
        errors.time = 'End time must be after start time';
        isValid = false;
      }
    }

    // Check for conflicts with existing availability
    if (newAvailability.isAvailable && newAvailability.startTime && newAvailability.endTime) {
      const conflicts = availability.filter(avail => 
        avail.teacherId === newAvailability.teacherId &&
        avail.day === newAvailability.day &&
        avail.isAvailable &&
        avail.startTime &&
        avail.endTime &&
        (
          (newAvailability.startTime >= avail.startTime && newAvailability.startTime < avail.endTime) ||
          (newAvailability.endTime > avail.startTime && newAvailability.endTime <= avail.endTime) ||
          (newAvailability.startTime <= avail.startTime && newAvailability.endTime >= avail.endTime)
        )
      );

      if (conflicts.length > 0) {
        errors.conflict = 'Time overlap with existing availability';
        isValid = false;
      }
    }

    setNewAvailabilityErrors(errors);
    return isValid;
  };

  const handleAddAvailability = () => {
    if (!validateNewAvailability()) {
      return;
    }

    const newId = generateAvailabilityId();
    const availToAdd: EditedAvailability = { 
      ...newAvailability, 
      id: newId, 
      hasChanges: true,
      hasConflict: false 
    };
    setAvailability(prev => detectConflicts([...prev, availToAdd]));
    
    // Reset modal
    setShowAddModal(false);
    setNewAvailability({
      id: '',
      teacherId: '',
      teacherName: '',
      day: '',
      startTime: '',
      endTime: '',
      isAvailable: true
    });
    setNewAvailabilityErrors({});
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
    setNewAvailability({
      id: '',
      teacherId: '',
      teacherName: '',
      day: '',
      startTime: '',
      endTime: '',
      isAvailable: true
    });
    setNewAvailabilityErrors({});
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Teacher Availability</h1>
            </div>
            <p className="text-gray-600">Manage teacher working hours and availability status</p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-sm"
          >
            <Plus className="size-5" />
            Add Availability
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Availability Management</p>
              <p>
                Define teacher working hours and availability status. Time inputs are required when status is "Available". 
                The system automatically detects time conflicts for the same teacher on the same day.
              </p>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Search Teacher ID / Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="TCH001 or Dr. Ahmed Hassan..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Filter by Day
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Days</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Filter by Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Status</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Not Available</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Filter by Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Teacher ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Teacher Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Day</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Start Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">End Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAvailability.map(avail => (
                  <tr 
                    key={avail.id} 
                    className={`transition-colors ${
                      avail.hasChanges 
                        ? 'bg-yellow-50' 
                        : avail.hasConflict
                          ? 'bg-red-50'
                          : avail.isAvailable 
                            ? 'bg-green-50' 
                            : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {/* Teacher ID - Read-only */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-mono text-sm text-gray-900">{avail.teacherId}</span>
                      {errors[avail.id]?.teacherId && (
                        <p className="text-xs text-red-600 mt-0.5">{errors[avail.id].teacherId}</p>
                      )}
                    </td>

                    {/* Teacher Name - Auto-filled */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-900 font-medium">{avail.teacherName}</span>
                    </td>

                    {/* Day - Editable */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select
                        value={avail.day}
                        onChange={(e) => handleFieldChange(avail.id, 'day', e.target.value)}
                        className={`px-3 py-1.5 border rounded text-sm ${
                          errors[avail.id]?.day
                            ? 'border-red-300 bg-red-50'
                            : avail.hasChanges
                              ? 'border-yellow-300 bg-yellow-50'
                              : 'border-gray-300 bg-white'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      >
                        <option value="">Select Day</option>
                        {days.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                      {errors[avail.id]?.day && (
                        <p className="text-xs text-red-600 mt-0.5">{errors[avail.id].day}</p>
                      )}
                    </td>

                    {/* Start Time - Editable */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="time"
                        value={avail.startTime}
                        onChange={(e) => handleFieldChange(avail.id, 'startTime', e.target.value)}
                        disabled={!avail.isAvailable}
                        className={`px-3 py-1.5 border rounded text-sm ${
                          !avail.isAvailable
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : errors[avail.id]?.startTime
                              ? 'border-red-300 bg-red-50'
                              : avail.hasChanges
                                ? 'border-yellow-300 bg-yellow-50'
                                : 'border-gray-300 bg-white'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors[avail.id]?.startTime && (
                        <p className="text-xs text-red-600 mt-0.5">{errors[avail.id].startTime}</p>
                      )}
                    </td>

                    {/* End Time - Editable */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="time"
                        value={avail.endTime}
                        onChange={(e) => handleFieldChange(avail.id, 'endTime', e.target.value)}
                        disabled={!avail.isAvailable}
                        className={`px-3 py-1.5 border rounded text-sm ${
                          !avail.isAvailable
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : errors[avail.id]?.endTime || errors[avail.id]?.time
                              ? 'border-red-300 bg-red-50'
                              : avail.hasChanges
                                ? 'border-yellow-300 bg-yellow-50'
                                : 'border-gray-300 bg-white'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                      {(errors[avail.id]?.endTime || errors[avail.id]?.time) && (
                        <p className="text-xs text-red-600 mt-0.5">
                          {errors[avail.id].endTime || errors[avail.id].time}
                        </p>
                      )}
                    </td>

                    {/* Is Available - Toggle */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        onClick={() => handleFieldChange(avail.id, 'isAvailable', !avail.isAvailable)}
                        className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                          avail.isAvailable ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                            avail.isAvailable ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <span className={`ml-2 text-xs font-medium ${
                        avail.isAvailable ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {avail.isAvailable ? 'Available' : 'Not Available'}
                      </span>
                      {avail.hasConflict && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertTriangle className="size-3 text-red-600" />
                          <span className="text-xs text-red-600">Conflict</span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="size-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveRow(avail.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredAvailability.length === 0 && (
              <div className="text-center py-12 bg-gray-50">
                <Clock className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No availability found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your filters or add new availability</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="size-4 bg-green-50 border border-green-200 rounded"></div>
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-gray-50 border border-gray-200 rounded"></div>
                <span className="text-gray-600">Not Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-red-50 border border-red-200 rounded"></div>
                <span className="text-gray-600">Time Conflict</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 bg-yellow-50 border border-yellow-200 rounded"></div>
                <span className="text-gray-600">Unsaved changes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        {hasChanges && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-yellow-400 shadow-lg z-50">
            <div className="max-w-[1600px] mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="size-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Unsaved Changes</p>
                    <p className="text-sm text-gray-600">
                      You have modified {availability.filter(a => a.hasChanges).length} availability record{availability.filter(a => a.hasChanges).length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDiscard}
                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
                  >
                    <X className="size-4" />
                    Discard
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Save className="size-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Confirmation Modal */}
        {showSaveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="size-6 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Confirm Save Changes</h3>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Saving availability changes will update teacher working hours and schedules. 
                  Are you sure you want to proceed?
                </p>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-6">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{availability.filter(a => a.hasChanges).length}</span> record{availability.filter(a => a.hasChanges).length !== 1 ? 's' : ''} will be updated
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSave}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="size-4" />
                    Confirm Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Availability Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Plus className="size-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Add Teacher Availability</h3>
                    <p className="text-sm text-gray-600">Define working hours and availability status</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Teacher Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Teacher ID *
                      </label>
                      <select
                        value={newAvailability.teacherId}
                        onChange={(e) => handleNewAvailabilityFieldChange('teacherId', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          newAvailabilityErrors.teacherId
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300 bg-white'
                        } focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map(teacher => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.id} - {teacher.name}
                          </option>
                        ))}
                      </select>
                      {newAvailabilityErrors.teacherId && (
                        <p className="text-xs text-red-600 mt-1">{newAvailabilityErrors.teacherId}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Teacher Name
                      </label>
                      <input
                        type="text"
                        value={newAvailability.teacherName}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Day */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Day *
                    </label>
                    <select
                      value={newAvailability.day}
                      onChange={(e) => handleNewAvailabilityFieldChange('day', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${
                        newAvailabilityErrors.day
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300 bg-white'
                      } focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select Day</option>
                      {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    {newAvailabilityErrors.day && (
                      <p className="text-xs text-red-600 mt-1">{newAvailabilityErrors.day}</p>
                    )}
                  </div>

                  {/* Availability Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Availability Status
                    </label>
                    <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                      <button
                        onClick={() => handleNewAvailabilityFieldChange('isAvailable', !newAvailability.isAvailable)}
                        className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors ${
                          newAvailability.isAvailable ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block size-5 transform rounded-full bg-white transition-transform ${
                            newAvailability.isAvailable ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <div>
                        <p className={`text-sm font-medium ${
                          newAvailability.isAvailable ? 'text-green-700' : 'text-gray-600'
                        }`}>
                          {newAvailability.isAvailable ? 'Available' : 'Not Available'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {newAvailability.isAvailable 
                            ? 'Time inputs required' 
                            : 'Time inputs disabled'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Time Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Start Time {newAvailability.isAvailable && '*'}
                      </label>
                      <input
                        type="time"
                        value={newAvailability.startTime}
                        onChange={(e) => handleNewAvailabilityFieldChange('startTime', e.target.value)}
                        disabled={!newAvailability.isAvailable}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          !newAvailability.isAvailable
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : newAvailabilityErrors.startTime
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-300 bg-white'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                      {newAvailabilityErrors.startTime && (
                        <p className="text-xs text-red-600 mt-1">{newAvailabilityErrors.startTime}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        End Time {newAvailability.isAvailable && '*'}
                      </label>
                      <input
                        type="time"
                        value={newAvailability.endTime}
                        onChange={(e) => handleNewAvailabilityFieldChange('endTime', e.target.value)}
                        disabled={!newAvailability.isAvailable}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          !newAvailability.isAvailable
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : newAvailabilityErrors.endTime || newAvailabilityErrors.time
                              ? 'border-red-300 bg-red-50'
                              : 'border-gray-300 bg-white'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                      {(newAvailabilityErrors.endTime || newAvailabilityErrors.time) && (
                        <p className="text-xs text-red-600 mt-1">
                          {newAvailabilityErrors.endTime || newAvailabilityErrors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Conflict Message */}
                  {newAvailabilityErrors.conflict && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                      <AlertTriangle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-700">Time Conflict Detected</p>
                        <p className="text-sm text-red-600 mt-0.5">{newAvailabilityErrors.conflict}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCancelAdd}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAvailability}
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="size-4" />
                    Add Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
