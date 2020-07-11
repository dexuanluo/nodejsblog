const  handleBlogRouter = require('./src/router/blog');
const  handleUserRouter = require('./src/router/user');
const serverHandler = (req, res)=> {
    
    

    res.setHeader('Content-type', 'application/json');

    const blogData = handleBlogRouter(req, res);
    if (blogData){
        res.end(
            JSON.stringify(blogData)
        );
        return;
    };
    

    const userData = handleUserRouter(req, res);
    if (userData){
        res.end(
            JSON.stringify(userData)
        );
        return;
    };
    //return bad request
    console.log('not found');
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write("404 NOT FOUND\n");
    res.end();
    

}
module.exports = serverHandler;