const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if(req.url == "/favicon.ico"){
        return res.end();
    }
     const log = `${Date.now()} : ${req.url} : New Request received\n`;
     const myurl = url.parse(req.url, true);
     console.log(myurl);
     fs.appendFile("./log.txt", log, (err, result) => {
        //res.end("hello from server");
        switch(myurl.pathname){
            case "/" :
                res.end("home page");
                break;
            case "/about" :
                const name = myurl.query.name;
                res.end(`I am ${name}`);
                break;
            case "/signup" :
                if(req.method == "GET") res.end("this is signup form");
                else if (req.method == "POST") {
                    //DB
                    req.end("success")
                } 
            default :
                res.end("404")
        }
     });
    // console.log("new request received");
    
})

myServer.listen(4000, () => console.log('server listen on port 4000'))