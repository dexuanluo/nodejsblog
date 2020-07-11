const handleUserRouter = (req, res) =>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    

    //login
    if (method === 'POST' && path === '/api/user/login'){
        return {msg: 'this is user login api'};
    }

};

module.exports = handleUserRouter;
