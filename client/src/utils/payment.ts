// Payment utility functions for PayU integration
import type {
  UserRegistrationData,
  PaymentVerificationResponse
} from '../services/api';

/**
 * Get registration fee display for a category
 * @param {string} category - Category name
 * @returns {string} Fee display string
 */
export const getRegistrationFeeDisplay = (category: string): string => {
  const fees: Record<string, string> = {
    'Level 1': '₹500',
    'Level 2': '₹500',
    'Level 3': '₹500',
  };
  return fees[category] || '₹5';
};

/**
 * Format amount for display
 * @param {number} amountInPaise - Amount in paise
 * @returns {string} Formatted amount string
 */
export const formatAmount = (amountInPaise: number): string => {
  return `₹${(amountInPaise / 100).toFixed(0)}`;
};

/**
 * Handle PayU payment redirect
 * In development mode, bypasses PayU and simulates successful payment
 * @param {UserRegistrationData} userData - User registration data
 * @param {Function} onSuccess - Success callback function
 * @param {Function} onError - Error callback function
 */
export const handlePayUPayment = (
  userData: UserRegistrationData,
  onSuccess: (paymentData: PaymentVerificationResponse) => void,
  onError: (error: string) => void
): void => {
  try {
    const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development';

    // DEV MODE: Skip PayU and simulate successful payment
    if (isDevelopment) {
      console.log('🧪 DEV MODE: Bypassing PayU, simulating successful payment...');

      // Generate a mock transaction ID
      const mockTxnId = `DEV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create simulated payment response
      const mockPaymentData: PaymentVerificationResponse = {
        payment_id: mockTxnId,
        order_id: `DEV_ORDER_${Date.now()}`,
        amount_paid: 500, // ₹500
        amount_display: '₹500',
        currency: 'INR',
        status: 'completed',
        method: 'DEV_MODE_BYPASS',
        verified_at: new Date().toISOString(),
      };

      console.log('✅ DEV MODE: Simulated payment data:', mockPaymentData);

      // Call success callback directly (this will save to DB)
      setTimeout(() => {
        onSuccess(mockPaymentData);
      }, 500); // Small delay to simulate payment processing

      return;
    }

    // PRODUCTION MODE: Redirect to PayU
    // Note: Form data is already stored in sessionStorage in handleSubmit
    const payuUrl = import.meta.env.VITE_PAYU_PAYMENT_URL || 'https://u.payu.in/HIVMYbY1Ko3O';
    console.log('🔄 Redirecting to PayU:', payuUrl);
    window.location.href = payuUrl;

  } catch (error) {
    console.error('❌ PayU payment error:', error);
    onError('Failed to redirect to payment gateway. Please try again.');
  }
};

/**
 * Check for payment completion and handle success
 * This function should be called when the page loads to check if user returned from PayU
 * @param {Function} onSuccess - Success callback function
 * @param {Function} onError - Error callback function
 */
export const checkPaymentCompletion = (
  onSuccess: (paymentData: PaymentVerificationResponse) => void,
  onError: (error: string) => void
): void => {
  try {
    console.log('🔍 Checking for payment completion...');

    // Check if user returned from payment
    const urlParams = new URLSearchParams(window.location.search);
    console.log('📋 URL Parameters:', Object.fromEntries(urlParams.entries()));

    // Check multiple possible PayU response parameters
    const paymentStatus = urlParams.get('payment_status') ||
      urlParams.get('status') ||
      urlParams.get('payu_status') ||
      urlParams.get('result');

    const transactionId = urlParams.get('txnid') ||
      urlParams.get('transaction_id') ||
      urlParams.get('payment_id') ||
      urlParams.get('payu_payment_id') ||
      urlParams.get('mihpayid');

    console.log('💳 Payment Status:', paymentStatus);
    console.log('🆔 Transaction ID:', transactionId);

    // Check for successful payment
    if (paymentStatus && transactionId &&
      (paymentStatus.toLowerCase() === 'success' ||
        paymentStatus.toLowerCase() === 'completed' ||
        paymentStatus.toLowerCase() === 'successful')) {

      console.log('✅ Payment appears successful, checking stored data...');

      // Get stored registration data
      const storedData = sessionStorage.getItem('pendingRegistration');
      if (storedData) {
        console.log('📦 Found stored registration data');

        // Create payment verification response for PayU
        const paymentData: PaymentVerificationResponse = {
          payment_id: transactionId,
          order_id: `PAYU_${Date.now()}`,
          amount_paid: 500, // ₹5 in paise
          amount_display: '₹5',
          currency: 'INR',
          status: 'completed',
          method: 'PayU',
          verified_at: new Date().toISOString(),
        };

        console.log('💳 Payment data prepared:', paymentData);

        // Call success callback FIRST, then clear stored data
        console.log('🚀 Calling success callback...');
        onSuccess(paymentData);

        // Clear stored data AFTER success callback is processed
        setTimeout(() => {
          sessionStorage.removeItem('pendingRegistration');
          console.log('🗑️ Cleared stored registration data');
        }, 100);
      } else {
        console.log('❌ No stored registration data found');
        onError('Registration data not found. Please try registering again.');
      }
    } else if (paymentStatus &&
      (paymentStatus.toLowerCase() === 'failure' ||
        paymentStatus.toLowerCase() === 'failed' ||
        paymentStatus.toLowerCase() === 'cancelled' ||
        paymentStatus.toLowerCase() === 'error')) {
      console.log('❌ Payment was unsuccessful');
      onError('Payment was unsuccessful. Please try again.');
      // Clear stored data on failure
      sessionStorage.removeItem('pendingRegistration');
    } else {
      console.log('ℹ️ No payment completion detected, continuing normally...');
    }
  } catch (error) {
    console.error('❌ Payment completion check error:', error);
    onError('Failed to verify payment completion. Please contact support.');
  }
};
