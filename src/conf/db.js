const env = process.env.NODE_ENV
let MYSQL_CONF;
if (env === 'dev'){
    MYSQL_CONF = require('./dev_connection');
}

if (env === 'production'){
    MYSQL_CONF = require('./prd_connection');
}

module.exports = {
    MYSQL_CONF
}