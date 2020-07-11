

const handleBlogRouter = (req, res) =>{
    
    
    
    if (req.method === 'GET' && req.path === '/api/blog/list'){
        return {msg: 'blog list api'}
    };

    if (req.method ==='GET' && req.path === '/api/blog/detail'){
        return {msg: 'blog detail api'}
    }

    if (req.method ==='POST' && req.path === '/api/blog/new'){
        return {msg: 'blog new api'}
    }
    if (req.method ==='POST' && req.path === '/api/blog/del'){
        return {msg: 'blog delete api'}
    }
};
module.exports = handleBlogRouter