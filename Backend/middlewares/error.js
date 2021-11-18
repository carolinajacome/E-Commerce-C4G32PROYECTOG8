const ErrorHandler = require('../utils/errorHandler');

module.exports= (err,req,res,next)=>{
    err.statusCode= err.statusCode || 500;
    err.message = err.message || 'Internal Serve Error';

    res.status(err.statusCode).json({
        succes:false; 
    })

}