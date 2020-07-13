const { exec } = require("../db/mysql");

const login_authentication = (username, password) =>{
    const sql = `
    select username, realname from users where username='${username}' 
    and password='${password}';
    `
    console.log(username, 'login attemp')
    return exec(sql)
};

module.exports = {
    login_authentication
};