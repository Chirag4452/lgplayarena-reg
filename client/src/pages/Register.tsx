/**
 * Register Page
 * Main registration form for the skating championship event.
 * Uses extracted components for better organization.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ============================================================================
// API & Utilities
// ============================================================================
import { registerUser } from '../services/api';
import type {
  UserRegistrationData,
  RegistrationRequest,
  PaymentVerificationResponse,
} from '../services/api';
import { handlePayUPayment, checkPaymentCompletion } from '../utils/payment';

// ============================================================================
// Components
// ============================================================================
import { Header, EventInfo, TermsSection, FormField } from '../components';

// ============================================================================
// Constants
// ============================================================================
const GRADE_OPTIONS = ['Mont', 'L-KG', 'U-KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const GENDER_OPTIONS = [
  { value: '', label: 'Select Gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const GRADE_SELECT_OPTIONS = [
  { value: '', label: 'Select Grade' },
  ...GRADE_OPTIONS.map((grade) => ({ value: grade, label: `Grade ${grade}` })),
];

// ============================================================================
// Component
// ============================================================================
const Register: React.FC = () => {
  const navigate = useNavigate();

  // --------------------------------------------------------------------------
  // State: Form Data
  // --------------------------------------------------------------------------
  const [formData, setFormData] = useState<UserRegistrationData>({
    name: '',
    coach_name: '',
    parent_name: '',
    parent_phone: '',
    grade: '',
    gender: '',
    address: '',
  });

  // --------------------------------------------------------------------------
  // State: UI & Validation
  // --------------------------------------------------------------------------
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<UserRegistrationData>>({});
  const [termsError, setTermsError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');

  // --------------------------------------------------------------------------
  // Effects: Session Restoration & Payment Completion
  // --------------------------------------------------------------------------

  // Restore form data from session storage on mount
  useEffect(() => {
    const storedData = sessionStorage.getItem('pendingRegistration');
    if (storedData) {
      try {
        const restoredData = JSON.parse(storedData);
        setFormData(restoredData);
      } catch (error) {
        console.error('❌ Error restoring form data:', error);
        checkPaymentCompletion(handlePaymentSuccess, handlePaymentError);
      }
    } else {
      checkPaymentCompletion(handlePaymentSuccess, handlePaymentError);
    }
  }, []);

  // Check payment completion after form data is restored
  useEffect(() => {
    const isFormComplete =
      formData.name &&
      formData.parent_name &&
      formData.parent_phone &&
      formData.grade &&
      formData.gender &&
      formData.address;

    if (isFormComplete) {
      checkPaymentCompletion(handlePaymentSuccess, handlePaymentError);
    }
  }, [formData]);

  // --------------------------------------------------------------------------
  // Handlers: Input Changes
  // --------------------------------------------------------------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof UserRegistrationData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };



  // --------------------------------------------------------------------------
  // Validation
  // --------------------------------------------------------------------------
  const validateForm = (): boolean => {
    const newErrors: Partial<UserRegistrationData> = {};

    // Name validation
    if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }


    // Coach name validation
    if (formData.coach_name.length < 3) {
      newErrors.coach_name = 'Coach name must be at least 3 characters long';
    } else if (formData.coach_name.length > 50) {
      newErrors.coach_name = 'Coach name cannot exceed 50 characters';
    }

    // Parent name validation
    if (formData.parent_name.length < 3) {
      newErrors.parent_name = 'Parent name must be at least 3 characters long';
    } else if (formData.parent_name.length > 50) {
      newErrors.parent_name = 'Parent name cannot exceed 50 characters';
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.parent_phone)) {
      newErrors.parent_phone = 'Phone number must be exactly 10 digits';
    }

    // Grade validation
    if (!GRADE_OPTIONS.includes(formData.grade)) {
      newErrors.grade = 'Please select a valid grade';
    }



    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    // Address validation
    if (formData.address.length < 10) {
      newErrors.address = 'Address must be at least 10 characters long';
    } else if (formData.address.length > 200) {
      newErrors.address = 'Address cannot exceed 200 characters';
    }

    // Terms validation
    if (!termsAccepted) {
      setTermsError('Please accept the terms and conditions to continue.');
      setErrors(newErrors);
      return false;
    } else {
      setTermsError('');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --------------------------------------------------------------------------
  // Payment Handlers
  // --------------------------------------------------------------------------
  const handlePaymentSuccess = async (paymentData: PaymentVerificationResponse): Promise<void> => {
    try {
      const registrationData: RegistrationRequest = {
        user: formData,
        payment: {
          payment_id: paymentData.payment_id,
          order_id: paymentData.order_id,
          amount_paid: paymentData.amount_paid,
          currency: paymentData.currency,
          payment_status: 'completed',
          payment_method: paymentData.method,
          verified_at: paymentData.verified_at,
        },
      };

      const response = await registerUser(registrationData);

      if (response.data.success) {
        setSubmitMessage('Registration and payment completed successfully!');
        setTimeout(() => navigate('/success'), 1500);
      } else {
        setSubmitMessage(response.data.message || 'Registration failed after payment. Please contact support.');
      }
    } catch (error: unknown) {
      console.error('❌ Registration error after payment:', error);
      let errorMessage = 'Registration failed after payment. Please contact support with your payment ID.';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentError = (error: string): void => {
    console.error('❌ Payment error:', error);
    setSubmitMessage(`Payment failed: ${error}`);
    setIsSubmitting(false);
    setIsProcessingPayment(false);
  };

  // --------------------------------------------------------------------------
  // Form Submission
  // --------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setIsProcessingPayment(true);
    setSubmitMessage('Initializing payment...');

    try {
      // Store form data before redirect
      sessionStorage.setItem('pendingRegistration', JSON.stringify(formData));

      // Initiate payment
      handlePayUPayment(formData, handlePaymentSuccess, handlePaymentError);
    } catch (error: unknown) {
      console.error('❌ Payment initiation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to initiate payment. Please try again.';
      handlePaymentError(errorMessage);
    }
  };

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* ================================================================ */}
        {/* Header Section */}
        {/* ================================================================ */}
        <Header />

        {/* ================================================================ */}
        {/* Event Information Section */}
        {/* ================================================================ */}
        <EventInfo />

        {/* ================================================================ */}
        {/* Registration Form */}
        {/* ================================================================ */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8" id="registration">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Participant Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Parent Name */}
            <FormField
              id="parent_name"
              name="parent_name"
              label="Parent/Guardian Name"
              value={formData.parent_name}
              onChange={handleInputChange}
              error={errors.parent_name}
              placeholder="Enter parent's full name"
            />

            {/* Parent Phone */}
            <FormField
              id="parent_phone"
              name="parent_phone"
              label="Phone Number"
              type="tel"
              value={formData.parent_phone}
              onChange={handleInputChange}
              error={errors.parent_phone}
              placeholder="10-digit phone number"
              maxLength={10}
            />

            {/* Participant Name */}
            <FormField
              id="name"
              name="name"
              label="Participant Name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              placeholder="Enter participant's full name"
            />

            {/* Coach Name */}
            <FormField
              id="coach_name"
              name="coach_name"
              label="Coach Name"
              value={formData.coach_name}
              onChange={handleInputChange}
              error={errors.coach_name}
              placeholder="Enter coach's name"
            />

            {/* Grade Selection */}
            <FormField
              id="grade"
              name="grade"
              label="Grade/Class"
              type="select"
              value={formData.grade}
              onChange={handleInputChange}
              error={errors.grade}
              options={GRADE_SELECT_OPTIONS}
            />

            {/* Gender Selection */}
            <FormField
              id="gender"
              name="gender"
              label="Gender"
              type="select"
              value={formData.gender}
              onChange={handleInputChange}
              error={errors.gender}
              options={GENDER_OPTIONS}
            />

            {/* Address */}
            <FormField
              id="address"
              name="address"
              label="Apartment/Society Name"
              value={formData.address}
              onChange={handleInputChange}
              error={errors.address}
              placeholder="Enter your apartment or society name"
            />



            {/* Terms and Conditions */}
            <TermsSection
              termsAccepted={termsAccepted}
              onTermsChange={setTermsAccepted}
              error={termsError}
            />

            {/* ============================================================ */}
            {/* Payment Section */}
            {/* ============================================================ */}
            <div className="pt-4 max-w-xs sm:max-w-sm mx-auto">
              {/* Payment Instructions */}
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Important Payment Instructions:</p>
                    <p>Please wait until you see the "Registration Successful" page after completing your payment. Do not close this browser tab or navigate away during the payment process.</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-medium text-white text-sm transition-all duration-200 ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-95'
                  }`}
              >
                {isProcessingPayment
                  ? 'Processing Payment...'
                  : isSubmitting
                    ? 'Completing Registration...'
                    : 'Pay ₹500 & Register'}
              </button>

              {/* Security Badge */}
              <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-gray-500">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure payment via PayU</span>
              </div>
            </div>

            {/* Status Message */}
            {submitMessage && (
              <div
                className={`mt-4 p-3 rounded-lg text-center text-sm ${submitMessage.includes('successful') || submitMessage.includes('completed')
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : submitMessage.includes('Processing') || submitMessage.includes('Initializing')
                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
