const AsyncHandler = (requesthandler)=>{
    return(req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((error)=>next(error))
    }
}
export {AsyncHandler}