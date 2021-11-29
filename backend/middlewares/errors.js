const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'development') {
        console.log(err);

        res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
            error: err,
            stack: err.stack
        });
        
    } else {

        let error = { ...err };
        error.message = err.message;

        // Wrong Mongoose Object ID Error
        if (error.name === 'CastError') {
            error = new ErrorHandler('Resource not found', 404);
        }

        // Handling Mongoose duplicate key errors
        if (error.code === 11000) {
            error = new ErrorHandler('Duplicate field value entered', 400);
        }

        // Handling Mongoose Validation Error
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(val => val.message);
            error = new ErrorHandler(message, 400);
        }

        // Handling wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        // Handling Expired JWT error
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON Web Token is expired. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}