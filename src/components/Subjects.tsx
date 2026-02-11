import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Save, 
  X, 
  BookOpen,
  AlertCircle,
  CheckCircle,
  DollarSign
} from 'lucide-react';

type Subject = {
  id: string;
  name: string;
  priceG1: number;
  priceG2: number;
  priceG3: number;
  priceG4: number;
  priceG5: number;
  priceG6: number;
  priceG7: number;
  priceG8: number;
  priceG9: number;
  priceG10: number;
  priceG11: number;
  priceG12: number;
  priceG34: number;
  priceG55: number;
};

type EditedSubject = Subject & { hasChanges?: boolean };

export function Subjects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'id'>('name');
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Mock data
  const initialSubjects: Subject[] = [
    {
      id: 'SUB001',
      name: 'Mathematics',
      priceG1: 35.00,
      priceG2: 35.00,
      priceG3: 38.00,
      priceG4: 38.00,
      priceG5: 40.00,
      priceG6: 40.00,
      priceG7: 45.00,
      priceG8: 45.00,
      priceG9: 48.00,
      priceG10: 50.00,
      priceG11: 55.00,
      priceG12: 55.00,
      priceG34: 37.00,
      priceG55: 40.00
    },
    {
      id: 'SUB002',
      name: 'English',
      priceG1: 32.00,
      priceG2: 32.00,
      priceG3: 35.00,
      priceG4: 35.00,
      priceG5: 38.00,
      priceG6: 38.00,
      priceG7: 42.00,
      priceG8: 42.00,
      priceG9: 45.00,
      priceG10: 48.00,
      priceG11: 50.00,
      priceG12: 50.00,
      priceG34: 34.00,
      priceG55: 38.00
    },
    {
      id: 'SUB003',
      name: 'Arabic',
      priceG1: 30.00,
      priceG2: 30.00,
      priceG3: 32.00,
      priceG4: 32.00,
      priceG5: 35.00,
      priceG6: 35.00,
      priceG7: 38.00,
      priceG8: 38.00,
      priceG9: 40.00,
      priceG10: 45.00,
      priceG11: 48.00,
      priceG12: 48.00,
      priceG34: 31.00,
      priceG55: 35.00
    },
    {
      id: 'SUB004',
      name: 'Physics',
      priceG1: 0.00,
      priceG2: 0.00,
      priceG3: 0.00,
      priceG4: 0.00,
      priceG5: 0.00,
      priceG6: 0.00,
      priceG7: 0.00,
      priceG8: 48.00,
      priceG9: 50.00,
      priceG10: 55.00,
      priceG11: 60.00,
      priceG12: 60.00,
      priceG34: 0.00,
      priceG55: 0.00
    },
    {
      id: 'SUB005',
      name: 'Chemistry',
      priceG1: 0.00,
      priceG2: 0.00,
      priceG3: 0.00,
      priceG4: 0.00,
      priceG5: 0.00,
      priceG6: 0.00,
      priceG7: 0.00,
      priceG8: 48.00,
      priceG9: 50.00,
      priceG10: 55.00,
      priceG11: 60.00,
      priceG12: 60.00,
      priceG34: 0.00,
      priceG55: 0.00
    },
    {
      id: 'SUB006',
      name: 'Biology',
      priceG1: 0.00,
      priceG2: 0.00,
      priceG3: 0.00,
      priceG4: 0.00,
      priceG5: 0.00,
      priceG6: 0.00,
      priceG7: 42.00,
      priceG8: 45.00,
      priceG9: 48.00,
      priceG10: 52.00,
      priceG11: 55.00,
      priceG12: 55.00,
      priceG34: 0.00,
      priceG55: 0.00
    },
    {
      id: 'SUB007',
      name: 'Science',
      priceG1: 32.00,
      priceG2: 32.00,
      priceG3: 35.00,
      priceG4: 35.00,
      priceG5: 38.00,
      priceG6: 38.00,
      priceG7: 42.00,
      priceG8: 42.00,
      priceG9: 45.00,
      priceG10: 0.00,
      priceG11: 0.00,
      priceG12: 0.00,
      priceG34: 34.00,
      priceG55: 38.00
    },
    {
      id: 'SUB008',
      name: 'Computer Science',
      priceG1: 0.00,
      priceG2: 0.00,
      priceG3: 0.00,
      priceG4: 38.00,
      priceG5: 40.00,
      priceG6: 40.00,
      priceG7: 45.00,
      priceG8: 48.00,
      priceG9: 50.00,
      priceG10: 55.00,
      priceG11: 58.00,
      priceG12: 58.00,
      priceG34: 0.00,
      priceG55: 40.00
    }
  ];

  const [subjects, setSubjects] = useState<EditedSubject[]>(initialSubjects);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  const hasChanges = subjects.some(s => s.hasChanges);

  // Filter and sort
  const filteredSubjects = subjects
    .filter(subject => {
      const matchesSearch = 
        subject.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      // Price range filter
      if (selectedGrade && (priceMin || priceMax)) {
        const gradeKey = `price${selectedGrade}` as keyof Subject;
        const price = subject[gradeKey] as number;
        const min = priceMin ? parseFloat(priceMin) : 0;
        const max = priceMax ? parseFloat(priceMax) : Infinity;
        if (price < min || price > max) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.id.localeCompare(b.id);
    });

  const handleFieldChange = (subjectId: string, field: keyof Subject, value: string | number) => {
    setSubjects(prev => prev.map(subject => {
      if (subject.id === subjectId) {
        return { ...subject, [field]: value, hasChanges: true };
      }
      return subject;
    }));

    // Clear error when user starts typing
    if (errors[subjectId]?.[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        if (newErrors[subjectId]) {
          delete newErrors[subjectId][field];
          if (Object.keys(newErrors[subjectId]).length === 0) {
            delete newErrors[subjectId];
          }
        }
        return newErrors;
      });
    }
  };

  const validateSubjects = (): boolean => {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;

    subjects.forEach(subject => {
      if (!subject.hasChanges) return;

      const subjectErrors: Record<string, string> = {};

      // Validate name
      if (!subject.name.trim()) {
        subjectErrors.name = 'Subject name is required';
        isValid = false;
      }

      // Check for duplicate names
      const duplicates = subjects.filter(s => 
        s.name.trim().toLowerCase() === subject.name.trim().toLowerCase() && s.id !== subject.id
      );
      if (duplicates.length > 0) {
        subjectErrors.name = 'Subject name must be unique';
        isValid = false;
      }

      // Validate prices (all must be non-negative)
      const priceFields: (keyof Subject)[] = [
        'priceG1', 'priceG2', 'priceG3', 'priceG4', 'priceG5', 'priceG6',
        'priceG7', 'priceG8', 'priceG9', 'priceG10', 'priceG11', 'priceG12',
        'priceG34', 'priceG55'
      ];

      priceFields.forEach(field => {
        const value = subject[field] as number;
        if (value < 0) {
          subjectErrors[field] = 'Price cannot be negative';
          isValid = false;
        }
      });

      if (Object.keys(subjectErrors).length > 0) {
        newErrors[subject.id] = subjectErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateSubjects()) {
      return;
    }
    setShowSaveModal(true);
  };

  const confirmSave = () => {
    // In real app, this would make an API call
    console.log('Saving subjects:', subjects.filter(s => s.hasChanges));
    
    // Clear hasChanges flags
    setSubjects(prev => prev.map(s => ({ ...s, hasChanges: false })));
    setShowSaveModal(false);
    setErrors({});
  };

  const handleDiscard = () => {
    setSubjects(initialSubjects);
    setErrors({});
  };

  const grades = [
    { value: 'G1', label: 'Grade 1' },
    { value: 'G2', label: 'Grade 2' },
    { value: 'G3', label: 'Grade 3' },
    { value: 'G4', label: 'Grade 4' },
    { value: 'G5', label: 'Grade 5' },
    { value: 'G6', label: 'Grade 6' },
    { value: 'G7', label: 'Grade 7' },
    { value: 'G8', label: 'Grade 8' },
    { value: 'G9', label: 'Grade 9' },
    { value: 'G10', label: 'Grade 10' },
    { value: 'G11', label: 'Grade 11' },
    { value: 'G12', label: 'Grade 12' },
    { value: 'G34', label: 'G3-G4 Special' },
    { value: 'G55', label: 'G5+ Special' }
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="size-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Subjects</h1>
            </div>
            <p className="text-gray-600">Manage subjects and grade-based pricing</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Subject Master Data</p>
              <p>
                Update subject names and grade-based pricing. Changes will affect lesson scheduling, financial calculations, and reports. 
                All edits must be saved explicitly using the Save Changes button.
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Search Subject ID / Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SUB001 or Mathematics..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Select Grade (for price filter)
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">All Grades</option>
                  {grades.map(grade => (
                    <option key={grade.value} value={grade.value}>{grade.label}</option>
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
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    placeholder="Min"
                    disabled={!selectedGrade}
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    placeholder="Max"
                    disabled={!selectedGrade}
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'id')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="name">Subject Name</option>
                  <option value="id">Subject ID</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {/* Frozen columns */}
                  <th className="sticky left-0 z-20 bg-gray-50 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300">
                    Subject ID
                  </th>
                  <th className="sticky left-[120px] z-20 bg-gray-50 text-left px-4 py-3 text-xs font-medium text-gray-700 border-r-2 border-gray-300">
                    Subject Name
                  </th>
                  
                  {/* Elementary Pricing */}
                  <th colSpan={6} className="bg-green-100 text-center px-4 py-2 text-xs font-semibold text-gray-900 border-b border-gray-300">
                    Elementary (G1-G6)
                  </th>
                  
                  {/* Mid Pricing */}
                  <th colSpan={3} className="bg-blue-100 text-center px-4 py-2 text-xs font-semibold text-gray-900 border-b border-gray-300">
                    Mid (G7-G9)
                  </th>
                  
                  {/* High School Pricing */}
                  <th colSpan={3} className="bg-purple-100 text-center px-4 py-2 text-xs font-semibold text-gray-900 border-b border-gray-300">
                    High School (G10-G12)
                  </th>
                  
                  {/* Special Pricing */}
                  <th colSpan={2} className="bg-orange-100 text-center px-4 py-2 text-xs font-semibold text-gray-900 border-b border-gray-300">
                    Special Pricing
                  </th>
                </tr>
                <tr>
                  {/* Frozen columns - spacing */}
                  <th className="sticky left-0 z-20 bg-gray-50 border-r-2 border-gray-300"></th>
                  <th className="sticky left-[120px] z-20 bg-gray-50 border-r-2 border-gray-300"></th>
                  
                  {/* Elementary columns */}
                  <th className="bg-green-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G1</th>
                  <th className="bg-green-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G2</th>
                  <th className="bg-green-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G3</th>
                  <th className="bg-green-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G4</th>
                  <th className="bg-green-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G5</th>
                  <th className="bg-green-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G6</th>
                  
                  {/* Mid columns */}
                  <th className="bg-blue-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G7</th>
                  <th className="bg-blue-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G8</th>
                  <th className="bg-blue-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G9</th>
                  
                  {/* High School columns */}
                  <th className="bg-purple-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G10</th>
                  <th className="bg-purple-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G11</th>
                  <th className="bg-purple-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G12</th>
                  
                  {/* Special columns */}
                  <th className="bg-orange-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G3-4</th>
                  <th className="bg-orange-50 text-right px-4 py-3 text-xs font-medium text-gray-700">G5+</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubjects.map(subject => (
                  <tr key={subject.id} className={`transition-colors ${subject.hasChanges ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>
                    {/* Subject ID - Read-only */}
                    <td className="sticky left-0 z-10 bg-white px-4 py-3 border-r-2 border-gray-200 whitespace-nowrap">
                      <span className="font-mono text-xs text-gray-900">{subject.id}</span>
                    </td>
                    
                    {/* Subject Name - Editable */}
                    <td className="sticky left-[120px] z-10 bg-white px-4 py-3 border-r-2 border-gray-200 whitespace-nowrap">
                      <div>
                        <input
                          type="text"
                          value={subject.name}
                          onChange={(e) => handleFieldChange(subject.id, 'name', e.target.value)}
                          className={`w-full px-2 py-1 border rounded text-sm font-medium ${
                            errors[subject.id]?.name 
                              ? 'border-red-300 bg-red-50' 
                              : subject.hasChanges 
                                ? 'border-yellow-300 bg-yellow-50' 
                                : 'border-gray-300 bg-white'
                          } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        />
                        {errors[subject.id]?.name && (
                          <p className="text-xs text-red-600 mt-1">{errors[subject.id].name}</p>
                        )}
                      </div>
                    </td>
                    
                    {/* Grade prices - All editable */}
                    {(['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G34', 'G55'] as const).map((grade, idx) => {
                      const field = `price${grade}` as keyof Subject;
                      const bgClass = idx < 6 ? 'bg-green-50' : idx < 9 ? 'bg-blue-50' : idx < 12 ? 'bg-purple-50' : 'bg-orange-50';
                      
                      return (
                        <td key={grade} className="px-4 py-3 text-right whitespace-nowrap">
                          <div>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={subject[field]}
                              onChange={(e) => handleFieldChange(subject.id, field, parseFloat(e.target.value) || 0)}
                              className={`w-20 px-2 py-1 border rounded text-sm font-mono text-right ${
                                errors[subject.id]?.[field]
                                  ? 'border-red-300 bg-red-50'
                                  : subject.hasChanges
                                    ? 'border-yellow-300 bg-yellow-50'
                                    : `border-gray-300 ${bgClass}`
                              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors[subject.id]?.[field] && (
                              <p className="text-xs text-red-600 mt-1">{errors[subject.id][field]}</p>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredSubjects.length === 0 && (
              <div className="text-center py-12 bg-gray-50">
                <BookOpen className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No subjects found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Action Bar */}
        {hasChanges && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-yellow-400 shadow-lg z-50">
            <div className="max-w-[1800px] mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="size-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Unsaved Changes</p>
                    <p className="text-sm text-gray-600">
                      You have modified {subjects.filter(s => s.hasChanges).length} subject{subjects.filter(s => s.hasChanges).length !== 1 ? 's' : ''}
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
                  Updating subject prices will affect financial calculations and reports. 
                  Are you sure you want to save these changes?
                </p>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-6">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{subjects.filter(s => s.hasChanges).length}</span> subject{subjects.filter(s => s.hasChanges).length !== 1 ? 's' : ''} will be updated
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
      </div>
    </div>
  );
}
