const express = require('express');
//json data import
const {users} = require("./Data/users.json")
//imprting routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books")

const app = express();

const port = 8080;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(201).json({
        message: "server is up and running"
    })
});

app.use("/users",usersRouter);
app.use("/books",booksRouter);




app.get("*",(req,res)=>{
    res.status(201).json()
});


app.listen(port,()=>{
    console.log("server is running");
});
