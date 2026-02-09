import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  UserCog,
  Edit3,
  Save,
  X,
  AlertCircle,
  Check,
  Plus,
  Percent
} from 'lucide-react';

type Parent = {
  id: string;
  name: string;
  phone: string;
  discount: number;
  studentsCount: number;
};

export function ParentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [discountMinFilter, setDiscountMinFilter] = useState('');
  const [discountMaxFilter, setDiscountMaxFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRows, setEditingRows] = useState<Set<string>>(new Set());
  const [editedData, setEditedData] = useState<Record<string, Partial<Parent>>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const itemsPerPage = 10;

  // Mock data
  const [parents, setParents] = useState<Parent[]>([
    { id: 'PARENT102938', name: 'Abdullah Al-Saud', phone: '+966 555 123 4567', discount: 10, studentsCount: 2 },
    { id: 'PARENT103456', name: 'Fatima Hassan', phone: '+971 50 234 5678', discount: 0, studentsCount: 1 },
    { id: 'PARENT104567', name: 'Mohammed Ali', phone: '+20 100 345 6789', discount: 15, studentsCount: 1 },
    { id: 'PARENT105678', name: 'Sara Ibrahim', phone: '+966 555 456 7890', discount: 5, studentsCount: 2 },
    { id: 'PARENT106789', name: 'Omar Abdullah', phone: '+971 50 567 8901', discount: 20, studentsCount: 1 },
    { id: 'PARENT107890', name: 'Layla Mohammed', phone: '+966 555 678 9012', discount: 0, studentsCount: 3 },
    { id: 'PARENT108901', name: 'Yousef Ahmad', phone: '+974 3345 0123', discount: 10, studentsCount: 1 },
    { id: 'PARENT109012', name: 'Maryam Khalid', phone: '+965 9012 3456', discount: 25, studentsCount: 2 },
    { id: 'PARENT110123', name: 'Ali Hassan', phone: '+966 555 123 4568', discount: 5, studentsCount: 1 },
    { id: 'PARENT111234', name: 'Nora Salem', phone: '+971 50 234 5679', discount: 0, studentsCount: 1 },
    { id: 'PARENT112345', name: 'Khaled Ibrahim', phone: '+20 100 345 6780', discount: 15, studentsCount: 2 },
    { id: 'PARENT113456', name: 'Aisha Mohammed', phone: '+966 555 456 7891', discount: 10, studentsCount: 1 },
  ]);

  // Filter logic
  const filteredParents = parents.filter(parent => {
    const matchesSearch = 
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPhone = !phoneFilter || parent.phone.includes(phoneFilter);
    
    const minDiscount = discountMinFilter ? parseFloat(discountMinFilter) : 0;
    const maxDiscount = discountMaxFilter ? parseFloat(discountMaxFilter) : 100;
    const matchesDiscount = parent.discount >= minDiscount && parent.discount <= maxDiscount;
    
    return matchesSearch && matchesPhone && matchesDiscount;
  });

  // Pagination
  const totalPages = Math.ceil(filteredParents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedParents = filteredParents.slice(startIndex, startIndex + itemsPerPage);

  const toggleEditMode = (parentId: string) => {
    const newEditingRows = new Set(editingRows);
    if (newEditingRows.has(parentId)) {
      newEditingRows.delete(parentId);
      // Clear edited data for this row
      const newEditedData = { ...editedData };
      delete newEditedData[parentId];
      setEditedData(newEditedData);
      
      // Clear errors for this row
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(parentId)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    } else {
      newEditingRows.add(parentId);
    }
    setEditingRows(newEditingRows);
  };

  const handleCellChange = (parentId: string, field: keyof Parent, value: any) => {
    setEditedData({
      ...editedData,
      [parentId]: {
        ...editedData[parentId],
        [field]: value,
      }
    });

    // Clear error for this field when user starts editing
    const errorKey = `${parentId}-${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const getCellValue = (parent: Parent, field: keyof Parent) => {
    if (editedData[parent.id] && field in editedData[parent.id]) {
      return editedData[parent.id][field];
    }
    return parent[field];
  };

  const validateChanges = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(editedData).forEach(([parentId, data]) => {
      // Validate discount percentage
      if ('discount' in data) {
        const discount = data.discount as number;
        if (discount < 0 || discount > 100) {
          newErrors[`${parentId}-discount`] = 'Discount must be between 0-100%';
        }
        if (isNaN(discount)) {
          newErrors[`${parentId}-discount`] = 'Must be a valid number';
        }
      }

      // Validate phone uniqueness
      if ('phone' in data) {
        const phone = data.phone as string;
        const isDuplicate = parents.some(p => 
          p.id !== parentId && p.phone === phone
        );
        if (isDuplicate) {
          newErrors[`${parentId}-phone`] = 'Phone number already exists';
        }
        if (!phone || phone.trim().length === 0) {
          newErrors[`${parentId}-phone`] = 'Phone number is required';
        }
      }

      // Validate name
      if ('name' in data) {
        const name = data.name as string;
        if (!name || name.trim().length === 0) {
          newErrors[`${parentId}-name`] = 'Name is required';
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

    // Apply changes to parents
    const updatedParents = parents.map(parent => {
      if (editedData[parent.id]) {
        return { ...parent, ...editedData[parent.id] };
      }
      return parent;
    });

    setParents(updatedParents);
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <UserCog className="size-6 text-purple-600" />
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Parents</h1>
            </div>
            <p className="text-gray-600">Manage parent accounts and discount settings</p>
          </div>
          
          <Link
            to="/parents/new"
            className="px-4 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
          >
            <Plus className="size-4" />
            Add Parent
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Parents</p>
            <p className="text-2xl font-semibold text-gray-900">{parents.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">With Discounts</p>
            <p className="text-2xl font-semibold text-purple-700">
              {parents.filter(p => p.discount > 0).length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Avg Discount</p>
            <p className="text-2xl font-semibold text-blue-700">
              {Math.round(parents.reduce((sum, p) => sum + p.discount, 0) / parents.length)}%
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                </div>
              </div>

              {/* Discount Min */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Min Discount %
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discountMinFilter}
                    onChange={(e) => setDiscountMinFilter(e.target.value)}
                    placeholder="0"
                    className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                </div>
              </div>

              {/* Discount Max */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Max Discount %
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discountMaxFilter}
                    onChange={(e) => setDiscountMaxFilter(e.target.value)}
                    placeholder="100"
                    className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                </div>
              </div>

              {/* Phone Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Search
                </label>
                <input
                  type="text"
                  value={phoneFilter}
                  onChange={(e) => setPhoneFilter(e.target.value)}
                  placeholder="Search phone..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Parent ID
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Parent Name
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Phone Number
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Discount %
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Students
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedParents.map(parent => {
                  const isEditing = editingRows.has(parent.id);
                  const hasEdits = !!editedData[parent.id];
                  
                  return (
                    <tr 
                      key={parent.id} 
                      className={`hover:bg-gray-50 transition-colors ${hasEdits ? 'bg-purple-50' : ''}`}
                    >
                      {/* Parent ID - Read-only */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-gray-900">{parent.id}</span>
                          {isEditing && (
                            <Edit3 className="size-3 text-purple-600" />
                          )}
                        </div>
                      </td>

                      {/* Parent Name */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div>
                            <input
                              type="text"
                              value={getCellValue(parent, 'name')}
                              onChange={(e) => handleCellChange(parent.id, 'name', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm ${
                                errors[`${parent.id}-name`] ? 'border-red-500' : 'border-purple-300'
                              }`}
                            />
                            {errors[`${parent.id}-name`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`${parent.id}-name`]}</p>
                            )}
                          </div>
                        ) : (
                          <span className="font-medium text-gray-900">{parent.name}</span>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div>
                            <input
                              type="tel"
                              value={getCellValue(parent, 'phone')}
                              onChange={(e) => handleCellChange(parent.id, 'phone', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm font-mono ${
                                errors[`${parent.id}-phone`] ? 'border-red-500' : 'border-purple-300'
                              }`}
                              placeholder="+xxx xxx xxx xxxx"
                            />
                            {errors[`${parent.id}-phone`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`${parent.id}-phone`]}</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-900 font-mono">{parent.phone}</span>
                        )}
                      </td>

                      {/* Discount % */}
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div>
                            <div className="relative">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                value={getCellValue(parent, 'discount')}
                                onChange={(e) => handleCellChange(parent.id, 'discount', parseFloat(e.target.value) || 0)}
                                className={`w-full px-3 py-2 pr-8 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm ${
                                  errors[`${parent.id}-discount`] ? 'border-red-500' : 'border-purple-300'
                                }`}
                              />
                              <Percent className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            </div>
                            {errors[`${parent.id}-discount`] && (
                              <p className="text-xs text-red-600 mt-1">{errors[`${parent.id}-discount`]}</p>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {parent.discount > 0 ? (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                {parent.discount}%
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                                0%
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Students Count */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {parent.studentsCount} {parent.studentsCount === 1 ? 'student' : 'students'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleEditMode(parent.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                              isEditing 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                            }`}
                          >
                            {isEditing ? (
                              <>
                                <Check className="size-4" />
                                Done
                              </>
                            ) : (
                              <>
                                <Edit3 className="size-4" />
                                Edit
                              </>
                            )}
                          </button>
                          <Link
                            to={`/parents/${parent.id}`}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-1"
                          >
                            <Eye className="size-4" />
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Empty State */}
            {paginatedParents.length === 0 && (
              <div className="text-center py-12 bg-gray-50">
                <UserCog className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900 mb-1">No parents found</h3>
                <p className="text-gray-600 text-sm">Try adjusting your filters or add a new parent</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {paginatedParents.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredParents.length)} of {filteredParents.length} parents
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
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-500 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="size-5 text-purple-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Unsaved Changes</p>
                  <p className="text-sm text-gray-600">
                    {Object.keys(editedData).length} parent{Object.keys(editedData).length > 1 ? 's' : ''} modified
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
                  className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
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
