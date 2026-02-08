import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowRight, 
  User, 
  Phone, 
  Percent,
  AlertCircle,
  Info,
  CheckCircle2,
  UserPlus
} from 'lucide-react';

export function ParentRegistration() {
  const navigate = useNavigate();
  
  // Auto-generate parent ID
  const parentId = `PARENT${Math.floor(100000 + Math.random() * 900000)}`;
  
  const [formData, setFormData] = useState({
    parentName: '',
    parentPhone: '',
    discountPercent: '0',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phoneValidation, setPhoneValidation] = useState<{
    status: 'idle' | 'checking' | 'valid' | 'invalid';
    message: string;
  }>({ status: 'idle', message: '' });

  const countryCodes = [
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+962', country: 'Jordan', flag: '🇯🇴' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
  ];

  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validate discount percent
    if (name === 'discountPercent') {
      const numValue = parseFloat(value);
      if (value !== '' && (isNaN(numValue) || numValue < 0 || numValue > 100)) {
        return; // Don't update if invalid
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePhoneBlur = () => {
    if (!formData.parentPhone) return;

    // Simulate phone uniqueness check
    setPhoneValidation({ status: 'checking', message: 'Checking phone number...' });
    
    setTimeout(() => {
      // Mock validation - in real app, check against backend
      const isUnique = Math.random() > 0.3; // 70% chance of being unique
      
      if (isUnique) {
        setPhoneValidation({ 
          status: 'valid', 
          message: 'Phone number is available' 
        });
      } else {
        setPhoneValidation({ 
          status: 'invalid', 
          message: 'This phone number is already registered' 
        });
      }
    }, 800);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent name is required';
    }
    
    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = 'Parent phone is required';
    } else if (phoneValidation.status === 'invalid') {
      newErrors.parentPhone = 'Phone number must be unique';
    }

    // Discount validation
    const discount = parseFloat(formData.discountPercent);
    if (formData.discountPercent && (isNaN(discount) || discount < 0 || discount > 100)) {
      newErrors.discountPercent = 'Discount must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent, redirectToStudent: boolean = false) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // In a real app, save to backend
    console.log('Parent Data:', {
      parentId,
      ...formData,
      fullPhone: `${selectedCountryCode}${formData.parentPhone}`,
    });

    if (redirectToStudent) {
      // Navigate to student registration with parent ID pre-filled
      navigate(`/students/new?parentId=${parentId}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <span>Parent Management</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Parent Registration | تسجيل ولي أمر
          </h1>
          <p className="text-gray-600 mt-1">
            Register a parent (payer) to link with students and manage payments
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
              {/* Parent ID (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent ID | رقم ولي الأمر
                </label>
                <input
                  type="text"
                  value={parentId}
                  readOnly
                  placeholder="PARENT102938"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed font-mono"
                />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <p className="text-xs text-blue-700 flex items-start gap-2">
                    <Info className="size-3.5 mt-0.5 flex-shrink-0" />
                    <span>
                      This unique ID is auto-generated and will be used for linking students and tracking payments. 
                      You'll need this ID when registering students under this parent.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Parent Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <User className="size-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">
                  Parent Information | معلومات ولي الأمر
                </h2>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-5">
              {/* Parent Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Name | اسم ولي الأمر *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.parentName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter parent full name"
                  />
                </div>
                {errors.parentName && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.parentName}
                  </p>
                )}
              </div>

              {/* Parent Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Phone | رقم الهاتف *
                </label>
                <div className="flex gap-2">
                  {/* Country Code Selector */}
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    className="w-32 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none text-sm"
                  >
                    {countryCodes.map((cc) => (
                      <option key={cc.code} value={cc.code}>
                        {cc.flag} {cc.code}
                      </option>
                    ))}
                  </select>

                  {/* Phone Number Input */}
                  <div className="flex-1 relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      onBlur={handlePhoneBlur}
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.parentPhone 
                          ? 'border-red-500' 
                          : phoneValidation.status === 'valid'
                          ? 'border-green-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="555 123 4567"
                    />
                    {phoneValidation.status === 'valid' && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-green-600" />
                    )}
                  </div>
                </div>
                
                {/* Phone Validation Messages */}
                {phoneValidation.status === 'checking' && (
                  <p className="text-xs text-blue-600 mt-1.5 flex items-center gap-1">
                    <div className="size-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    {phoneValidation.message}
                  </p>
                )}
                {phoneValidation.status === 'valid' && (
                  <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    {phoneValidation.message}
                  </p>
                )}
                {errors.parentPhone && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.parentPhone}
                  </p>
                )}
                {phoneValidation.status === 'invalid' && !errors.parentPhone && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {phoneValidation.message}
                  </p>
                )}
                
                <p className="text-xs text-gray-500 mt-1.5">
                  Phone number must be unique in the system
                </p>
              </div>

              {/* Discount Percent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Percent | نسبة الخصم
                </label>
                <div className="relative max-w-xs">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="number"
                    name="discountPercent"
                    value={formData.discountPercent}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.1"
                    className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.discountPercent ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    %
                  </div>
                </div>
                {errors.discountPercent && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="size-3" />
                    {errors.discountPercent}
                  </p>
                )}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                  <p className="text-xs text-amber-700 flex items-start gap-2">
                    <Info className="size-3.5 mt-0.5 flex-shrink-0" />
                    <span>
                      This discount will automatically apply to all lesson payments for students linked to this parent. 
                      Valid range: 0-100%. Default is 0% (no discount).
                    </span>
                  </p>
                </div>
              </div>
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
                <span className="text-gray-600">Parent ID:</span>
                <span className="font-mono font-medium text-gray-900">{parentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">
                  {formData.parentName || <span className="text-gray-400 italic">Not set</span>}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium text-gray-900">
                  {formData.parentPhone ? (
                    `${selectedCountryCode} ${formData.parentPhone}`
                  ) : (
                    <span className="text-gray-400 italic">Not set</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="font-medium text-gray-900">
                  {formData.discountPercent || '0'}%
                </span>
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
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <User className="size-4" />
                  Save Parent
                </button>
                
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <UserPlus className="size-4" />
                  Save & Add Student
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                After saving, you can use the Parent ID <span className="font-mono font-medium">{parentId}</span> to link students
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
