const  querrystring = require('querystring');
const  handleBlogRouter = require('./src/router/blog');
const  handleUserRouter = require('./src/router/user');

const getPostData = (req)=>{
    const promise = new Promise(
        (resolve, reject) =>{
            if (req.method !== 'POST'){
                resolve({});
                return;
            }
            if (req.headers['content-type'] !== 'application/json'){
                resolve({});
                return;
            }
            let postData = '';
            req.on(
                'data',
                (chunk)=>{
                    postData += chunk.toString();
                }
            )
            req.on(
                'end',
                () =>{
                    if (!postData){
                        resolve({});
                        return;
                    }
                    resolve(
                        JSON.parse(postData)
                    );
                }
                
            )
            
        }
    );
    return promise;
};


const serverHandler = (req, res)=> {
    //set header
    res.setHeader('Content-type', 'application/json');
    //get path
    const url = req.url;
    req.path = url.split('?')[0];
    //get query
    req.query = querrystring.parse(url.split('?')[1]);
    //deal with post req
    
    getPostData(req).then((postData) =>{
        req.body = postData;
        //handle router
        const blogResult = handleBlogRouter(req, res);
        if (blogResult){
            blogResult.then(
                (blogData)=>{
                    if (blogData){
                        res.end(
                            JSON.stringify(blogData)
                        );
                        return;
                    };
                    
                }
            );
            return;
        }

        const userData = handleUserRouter(req, res);
        if (userData){
            res.end(
                JSON.stringify(userData)
            );
            return;
        };
        
        console.log('not found');
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 NOT FOUND\n");
        res.end();
        return;
    });
    
        
        
    
    }
    


    
    


module.exports = serverHandler;