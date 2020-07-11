const handleUserRouter = (req, res) =>{
    
    

    //login
    if (req.method === 'POST' && req.path === '/api/user/login'){
        return {msg: 'this is user login api'};
    }

};

module.exports = handleUserRouter;
