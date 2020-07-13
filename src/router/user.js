const {login_authentication} = require('../controller/user');
const {SuccessRes, ErrorRes} = require('../model/result');
const handleUserRouter = (req, res) =>{
    
    //login
    if (req.method === 'POST' && req.path === '/api/user/login'){
        const {username, password} = req.body;
        
        const result = login_authentication(username, password);
        return result.then(
            (data)=>{
                if (data.length>0){
                    return new SuccessRes();
                } else {
                    return new ErrorRes('wrong username or password');
                }
            }
        );
        
    }

};

module.exports = handleUserRouter;
