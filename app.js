const  querrystring = require('querystring');
const  handleBlogRouter = require('./src/router/blog');
const  handleUserRouter = require('./src/router/user');


const getCookieExp = ()=>{
    const t = new Date(Date.now() + (24 * 60 * 60 * 1000));
    return t.toUTCString();
}
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

const SESSION_CACHE = {};

const serverHandler = (req, res)=> {
    //set header
    res.setHeader('Content-type', 'application/json');
    //get path
    const url = req.url;
    req.path = url.split('?')[0];
    //get query
    req.query = querrystring.parse(url.split('?')[1]);
    //extract cookie
    req.cookie = {};
    let setCookie = false;
    const cookieStr = req.headers.cookie||'';
    
    if (cookieStr === ''){setCookie = true;}
    cookieStr.split(';').forEach((item)=>{
        const arr = item.split('=');
        const key = arr[0]||'';
        const val = arr[1]||'';
        req.cookie[key.trim()] = val.trim();
    })
    //handle session
    const userId = req.cookie.userId || `${((Math.floor(Math.random()*10000) + Date.now()) - Math.floor(Math.random()*1000000))}_${Math.floor(Math.random()*1000000)}`;
    
    if (!SESSION_CACHE[userId]){
        SESSION_CACHE[userId] = {};
    }
    req.session = SESSION_CACHE[userId]
    //deal with post req
    
    getPostData(req).then((postData) =>{
        req.body = postData;
        //handle router
        
        const blogResult = handleBlogRouter(req, res);
        if (blogResult){
            blogResult.then(
                (blogData)=>{
                    if (blogData){
                        
                        if (setCookie){
                            
                            res.setHeader(`Set-Cookie`, `userId=${userId}; path=/; httpOnly; expires=${getCookieExp()}`);
                        }
                        res.end(
                            JSON.stringify(blogData)
                        );
                        return;
                    };
                    
                }
            );
            return;
        }

        const userResult = handleUserRouter(req, res);
        if (userResult){
            userResult.then(
                (userData)=>{
                    if (userData){
                        
                        if (setCookie){
                            res.setHeader(`Set-Cookie`, `userId=${userId}; path=/; httpOnly; expires=${getCookieExp()}`);
                        }
                        res.end(
                            JSON.stringify(userData)
                        );
                        return;
                    };
                }
            );
            return;
        }
        

        console.log('not found');
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 NOT FOUND\n");
        res.end();
        return;
    });
    
        
        
    
    }
    


    
    


module.exports = serverHandler;