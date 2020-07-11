class BaseRes{
    constructor(data, message){
        if (typeof data === 'string'){
            this.message = data;
            data = null;
            message = null;
        }
        if (data){
            this.data = data;
        }
        if (message){
            this.message = message;
        }
    };
};
class SuccessRes extends BaseRes{
    constructor(data, message){
        super(data, message);
        this.erno = 0;
    }
};
class ErrorRes extends BaseRes{
    constructor(data, message){
        super(data, message);
        this.erno = -1;
    }
};

module.exports = {
    SuccessRes, 
    ErrorRes
};
