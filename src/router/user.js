const {login_authentication} = require('../controller/user');
const {SuccessRes, ErrorRes} = require('../model/result');
const handleUserRouter = (req, res) =>{
    
    //login
    if (req.method === 'POST' && req.path === '/api/user/login'){
        const {username, password} = req.body;
        
        const res = login_authentication(username, password);
        if (res){
            return new SuccessRes();
        } else {
            return new ErrorRes('login failed');
        }
    }

};

module.exports = handleUserRouter;
