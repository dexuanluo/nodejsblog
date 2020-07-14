const {login_authentication} = require('../controller/user');
const {SuccessRes, ErrorRes} = require('../model/result');
const { set } = require('../db/redis');



const handleUserRouter = (req, res) =>{
    
    //login
    if (req.method === 'POST' && req.path === '/api/user/login'){
        const {username, password} = req.body;
        
        const result = login_authentication(username, password);
        return result.then(
            (data)=>{
                if (data.length>0){
                    req.session.realname = data[0].realname;
                    req.session.username = data[0].username;
                    set(req.sessionId, req.session);
                    return new SuccessRes(
                        {
                            session:req.session
                        });
                } else {
                    return new ErrorRes('wrong username or password');
                }
            }
        );
        
    }
    // if (req.method==='GET'&& req.path==='/api/user/login-test'){
    //     if (req.session.username){
    //         return Promise.resolve(new SuccessRes({
    //             session: req.session
    //         }));
    //     }
        
    //     return Promise.resolve(new ErrorRes('not login'));
    // }


};

module.exports = handleUserRouter;
