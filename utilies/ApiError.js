
class ApiError extends Error{
    constructor(status,message="Something went wrong", error=[], stack=""){
        super(error);
        this.status= status,
        this.data= null,
        this.message= message,
        this.success=false,
        this.error= error
         if(stack){
            this.stack
         }
         else{
            Error.captureStackTrace(this, this.constructor);
         }
    }

}
export {ApiError}