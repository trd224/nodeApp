const express  = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

PORT = 4000;

const users = require("./MOCK_DATA.json");

//connection
mongoose.connect('mongodb://127.0.0.1:27017/nodeLearn')
.then(() => console.log("mongoDB connected"))
.catch((err) => console.log("Mongo err", err));

//schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String},
    email: { type: String, required: true, unique: true},
    gender: { type: String}

},{
    timestamps: true
})

//model
const User = mongoose.model('User', userSchema);




app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    fs.appendFile("./log.txt", `${Date.now()} : ${req.method} : ${req.path}\n`, (err, data) => {
        if(err){
            fs.appendFile("./errorLog.txt", `${err}\n`, (err, data) => {
                return res.end();
            })
        }
        next();
    });
    
})



app.get("/users", async (req, res) => {
    const allUsers = await User.find({});
    const html = `
        <ul>
            ${allUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
        </ul>    
    `
    return res.send(html)
})

app.get("/api/users", async (req, res) => {
    //console.log(req.headers);
    const allUsers = await User.find({})
    res.setHeader("newKey", "newValue")
    return res.json(allUsers);
})

app.route("/api/users/:id")
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);
        return res.json(user);
    })
    .patch(async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastName : "beeeee"})
        return res.json({status: "updated", id: req.params.id})
       
     })
     .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({status: 'deleted', id: req.params.id});

        
     })

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// })

app.post("/api/users", async (req, res) => {
    const body = req.body;
    console.log(body);
   
    await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender
    })

    return res.status(201).json({msg: 'success'})
})

// app.patch("/api/users/:id", (req, res) => {
//     return res.json({status: 'pending'});
// })

// app.delete("/api/users/:id", (req, res) => {
//     return res.json({status: 'pending'});
// })

app.get("/about", (req, res) => {
    return res.send("Hello from About page "+ req.query.name);
})






app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));