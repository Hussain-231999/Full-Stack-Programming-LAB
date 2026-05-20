/**
 * Global error handling middleware
 * Catches all errors and sends appropriate response
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Default error status and message
  let statusCode = 500;
  let message = 'Internal server error';

  // Check if error message contains specific patterns
  if (err.message.includes('not found')) {
    statusCode = 404;
    message = err.message;
  } else if (err.message.includes('Invalid API key')) {
    statusCode = 401;
    message = err.message;
  } else if (err.message.includes('rate limit')) {
    statusCode = 429;
    message = err.message;
  } else if (err.message.includes('Unable to connect')) {
    statusCode = 503;
    message = err.message;
  } else if (err.message) {
    message = err.message;
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
