class ApiError extends Error(){
    constructor(status, error=[], message="somethingwentWrong", stack){
         super(error),
         this.status= status,
         this.error=error,
         this.success = false,
         this.message= message,
         this.data= this.data
         if(stack){
            this.stack
         }
         else{
            Error.captureStackTrace(stack)
         }

    }
}
export {ApiError}