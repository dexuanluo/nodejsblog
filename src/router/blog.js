const {
    getList, 
    getDetail, 
    newBlog,
    updateBlog,
    deleteBlog} = require('../controller/blog');

const {SuccessRes, ErrorRes} = require('../model/result');

const loginCheck = (req)=>{
    if (!req.session.username){
        return Promise.resolve(
            new ErrorRes('not login')
        )
    }
}

const handleBlogRouter = (req, res) =>{
    const id = req.query.id;
    
    
    if (req.method === 'GET' && req.path === '/api/blog/list'){
        
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        return getList(author, keyword).then((listData => {
            return new SuccessRes(listData);
        }));
        
    };

    if (req.method ==='GET' && req.path === '/api/blog/detail'){
        if (!id){
            return Promise.resolve(
                new ErrorRes('no id specified')
            )
        }
        const result = getDetail(id);
        return result.then((detailData)=>{
            console.log(detailData)
            return new SuccessRes(detailData[0])
        });
    }

    if (req.method ==='POST' && req.path === '/api/blog/new'){
        const loginResult = loginCheck(req);
        if (loginResult){
            return loginResult;
        }
        req.body.auhtor = req.session.username;
        const result = newBlog(req.body);
        return result.then((data)=>{
            return new SuccessRes({
                id:data.insertId
            });
        })
    }
    if (req.method ==='POST' && req.path === '/api/blog/update'){
        const loginResult = loginCheck(req);
        if (loginResult){
            return loginResult;
        }
        if (!id){
            return Promise.resolve(
                new ErrorRes('no id specified')
            )
        }
        req.body.auhtor = req.session.username;
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
        const loginResult = loginCheck(req);
        if (loginResult){
            return loginResult;
        }
        if (!id){
            return Promise.resolve(
                new ErrorRes('no id specified')
            )
        }

        const author = req.session.username;
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