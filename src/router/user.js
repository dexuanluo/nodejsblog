const {login_authentication} = require('../controller/user');
const {SuccessRes, ErrorRes} = require('../model/result');



const handleUserRouter = (req, res) =>{
    
    //login
    if (req.method === 'GET' && req.path === '/api/user/login'){
        const {username, password} = req.query;
        
        const result = login_authentication(username, password);
        return result.then(
            (data)=>{
                if (data.length>0){
                    req.session.realname = data[0].realname;
                    req.session.username = data[0].username;
                    return new SuccessRes(req.session);
                } else {
                    return new ErrorRes('wrong username or password');
                }
            }
        );
        
    }
    if (req.method==='GET'&& req.path==='/api/user/login-test'){
        if (req.cookie.userId){
            return Promise.resolve(new SuccessRes(req.session));
        }
        return Promise.resolve(new ErrorRes('not login'));
    }


};

module.exports = handleUserRouter;
