

const handleBlogRouter = (req, res) =>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    
    
    if (method === 'GET' && path === '/api/blog/list'){
        return {msg: 'blog list api'}
    };

    if (method ==='GET' && path === '/api/blog/detail'){
        return {msg: 'blog detail api'}
    }

    if (method ==='POST' && path === '/api/blog/new'){
        return {msg: 'blog new api'}
    }
    if (method ==='POST' && path === '/api/blog/del'){
        return {msg: 'blog delete api'}
    }
};
module.exports = handleBlogRouter