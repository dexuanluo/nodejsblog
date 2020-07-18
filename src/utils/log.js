const fs = require('fs')
const path = require('path')


const writeLog = (writeStream, log) =>{
    writeStream.write(log + '\n');
};

const createWriteStream = (fileName) => {
    const fullFileName = path.join(__dirname, '../', '../', '/logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream;
};

const accessWriteStream = createWriteStream('access.log');
const errorWriteStream = createWriteStream('error.log');
const eventWriteStream = createWriteStream('event.log');
const access = (log) =>{
    writeLog(accessWriteStream, log);
};
const errorlog = (log) =>{
    writeLog(errorWriteStream, log);
};
const eventlog = (log) =>{
    writeLog(eventWriteStream, log);
};
module.exports = {
    access,
    errorlog,
    eventlog
    
};