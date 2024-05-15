// File: utils/error.js

// Import the 'http-errors' library for creating HTTP errors
import createError from 'http-errors';

/**
 * Function to create a custom error with a specific status code and message.
 * @param {number} status - The HTTP status code.
 * @param {string} message - The error message.
 * @returns {Error} - The custom error object.
 */
export const createCustomError = (status, message) => {
    return createError(status, message);
};
