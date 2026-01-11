// Payment configuration for the application
import config from './config.js';

// Payment constants
export const PAYMENT_CONFIG = {
  currency: 'INR',
  // Fixed registration fee (in rupees)
  registrationFee: 500, // ₹500
  // Payment options
  options: {
    name: 'LG 87 ',
    description: 'Event Registration Fee',
    theme: {
      color: '#2563eb', // Blue theme matching your UI
    },
    prefill: {
      contact: '',
    },
    notes: {
      event: 'LG 87 ',
      date: 'February 1, 2026',
    },
    retry: {
      enabled: true,
      max_count: 3,
    },
  },
};

/**
 * Get registration fee
 * @returns {number} Fee amount in rupees
 */
export const getRegistrationFee = () => {
  return PAYMENT_CONFIG.registrationFee;
};

/**
 * Convert paise to rupees for display
 * @param {number} amountInPaise - Amount in paise
 * @returns {number} Amount in rupees
 */
export const paiseToRupees = (amountInPaise) => {
  return amountInPaise / 100;
};

/**
 * Convert rupees to paise
 * @param {number} amountInRupees - Amount in rupees
 * @returns {number} Amount in paise
 */
export const rupeesToPaise = (amountInRupees) => {
  return Math.round(amountInRupees * 100);
};

// Export default as empty object since we no longer have Razorpay
export default {};
