const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title:'title A',
            content:'content A',
            createTime: 1594503016188,
            author: 'doublelift'
        },
        {
            id: 1,
            title:'title B',
            content:'content B',
            createTime: 1594503080091,
            author: 'triplelift'
        }
    ];
}
const getDetail = (id) => {
    return [
        {
            id: 1,
            title:'title A',
            content:'content A',
            createTime: 1594503016188,
            author: 'doublelift'
        },
        {
            id: 1,
            title:'title B',
            content:'content B',
            createTime: 1594503080091,
            author: 'triplelift'
        }
    ];
};
const newBlog = (blogData= {}) => {
    
    return {
        id:99999
    };
};
const updateBlog = (id, blogData = {}) =>{
    
    return false
}

const deleteBlog = (id) =>{
    console.log('delete', id)
    return true
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
};