const login_authentication = (username, password) =>{
    if (username === 'dexuan' && password === 777){
        return true
    }else {
        return false
    }
};

module.exports = {
    login_authentication
};