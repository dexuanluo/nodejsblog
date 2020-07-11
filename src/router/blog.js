const {getList} = require('../controller/blog');
const {SuccessRes, ErrorRes} = require('../model/result');
const handleBlogRouter = (req, res) =>{
    
    
    
    if (req.method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return new SuccessRes(listData);
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