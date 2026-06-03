// Application-wide constants and configuration

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const TOAST_AUTO_DISMISS_TIME = 4000; // 4 seconds

export const ITEMS_PER_PAGE = 10;

export const ITEM_STATUSES = ['Active', 'Archived'];

export const TOAST_VARIANTS = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const DEBOUNCE_DELAY = 300; // milliseconds
