const {
    getList, 
    getDetail, 
    newBlog,
    updateBlog,
    deleteBlog} = require('../controller/blog');
const {SuccessRes, ErrorRes} = require('../model/result');

const handleBlogRouter = (req, res) =>{
    const id = req.query.id;
    
    
    if (req.method === 'GET' && req.path === '/api/blog/list'){
        
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        return getList(author, keyword).then((listData =>{
            return new SuccessRes(listData);
        }));
        
    };

    if (req.method ==='GET' && req.path === '/api/blog/detail'){
        const result = getDetail(id);
        return result.then((detailData)=>{
            return new SuccessRes(detailData[0])
        });
    }

    if (req.method ==='POST' && req.path === '/api/blog/new'){
        req.body.author = 'dexuan'
        const result = newBlog(req.body);
        return result.then((data)=>{
            return new SuccessRes({
                id:data.insertId
            });
        })
    }
    if (req.method ==='POST' && req.path === '/api/blog/update'){
        const result = updateBlog(id, req.body);
        return result.then(
            (data)=>{
                if (data.affectedRows > 0){
                    return new SuccessRes();
                }else{
                    return new ErrorRes('Failed update');
                }
            }
        );
        
    }
    if (req.method ==='POST' && req.path === '/api/blog/del'){
        const author = 'dexuan'
        const result = deleteBlog(id, author);
        return result.then(
            (data)=>{
                if (data.affectedRows > 0){
                    return new SuccessRes();
                }else{
                    return new ErrorRes('Failed delete');
                }
            }
        );
        
    }
}

module.exports = handleBlogRouter