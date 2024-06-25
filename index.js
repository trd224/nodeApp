const express  = require("express");
const userRouter = require("./routes/user");
const  mongodbConnection = require("./connection");
const logReqRes = require("./middlewares");

const app = express();

PORT = 4000;


//mongodb_connection
mongodbConnection("mongodb://127.0.0.1:27017/nodeLearn")
.then(() => console.log("mongoDB connected"))
.catch(err => console.log("Error ", err));


//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
app.use(logReqRes("log.txt"));


//routes
app.use("/api/users", userRouter);


//server listen with PORT
app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));