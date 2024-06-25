const fs = require("fs");

function logReqRes(filename){
    return (req, res, next) => {
        fs.appendFile(filename, `${Date.now()} : ${req.method} : ${req.path}\n`, (err, data) => {
            if(err){
                fs.appendFile("./errorLog.txt", `${err}\n`, (err, data) => {
                    return res.end();
                })
            }
            next();
        });
        
    }
}

module.exports = logReqRes;