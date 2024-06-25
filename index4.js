const express  = require("express");
const fs = require("fs");

const app = express();

PORT = 4000;

const users = require("./MOCK_DATA.json");

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



app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join("")}
        </ul>    
    `
    return res.send(html)
})

app.get("/api/users", (req, res) => {
    console.log(req.headers);
    res.setHeader("newKey", "newValue")
    return res.json(users);
})

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const body = req.body;
        
        let user = users.find(user => user.id === id);

        if(body.first_name){
            user.first_name = body.first_name;
        }
        if(body.last_name){
            user.last_name = body.last_name;
        }
        if(body.email){
            user.email = body.email;
        }
        if(body.gender){
            user.gender = body.gender;
        }

        console.log(user);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            return res.json({status: "updated", id: id})
        })
       // return res.json(users);
     })
     .delete((req, res) => {
        const id = Number(req.params.id);
        const filteredUsers = users.filter(user => user.id !== id);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(filteredUsers), (err, data) => {
            return res.json({status: 'deleted', id: id});
        })
        
     })

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// })

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({...body, id : users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: 'success', id: users.length});
    });
    // return res.json({status: 'pending'});
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