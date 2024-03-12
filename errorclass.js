class phone extends Error{
    constructor(message,status){
        super(message)
        this.status=status
        this.greg=true
        Error.captureStackTrace(this,this.constructor)
    }
}


module.exports=phone