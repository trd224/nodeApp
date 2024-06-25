const express  = require("express");

const app = express();

PORT = 4000;


app.get("/", (req, res) => {
    return res.send("Hello from Home page");
})

app.get("/about", (req, res) => {
    return res.send("Hello from About page "+ req.query.name);
})

app.listen(PORT, ()=>console.log(`server running on port ${PORT}`));