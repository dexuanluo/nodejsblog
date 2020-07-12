const {
    getList, 
    getDetail, 
    newBlog,
    updateBlog,
    deleteBlog} = require('../controller/blog');
const {SuccessRes, ErrorRes} = require('../model/result');

const handleBlogRouter = (req, res) =>{
    console.log(req.query)
    const id = req.query.id;
    
    
    if (req.method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return new SuccessRes(listData);
    };

    if (req.method ==='GET' && req.path === '/api/blog/detail'){
        
        const detailData = getDetail(id);
        return new SuccessRes(detailData);
    }

    if (req.method ==='POST' && req.path === '/api/blog/new'){
        
        const data = newBlog(req.body);
        return new SuccessRes(data);
    }
    if (req.method ==='POST' && req.path === '/api/blog/update'){
        const data = updateBlog(id, req.body);
        if (data){
            return new SuccessRes();
        }else{
            return new ErrorRes('Failed update');
        }
        
    }
    if (req.method ==='POST' && req.path === '/api/blog/del'){
        const data = deleteBlog(id);
        if (data){
            return new SuccessRes();
        }else{
            return new ErrorRes('Failed delete');
        }
    }
};

module.exports = handleBlogRouter