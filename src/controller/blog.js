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

module.exports = {
    getList
};