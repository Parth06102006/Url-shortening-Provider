class ApiError extends Error
{
    constructor(statusCode,message='Server is not working',errors = [],stack)
    {
        super(message);
        this.statusCode = statusCode
        this.data = null;
        this.errors = errors;
        this.success = (statusCode>=400);
        stack = this.stack||Error.captureStackTrace(this,this.constructor)
    }
}

export {ApiError};