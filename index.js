const express = require('express');
//json data import
const {users} = require("./Data/users.json")

const app = express();

const port = 8080;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(201).json({
        message: "server is up and running"
    })
});

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
 app.get("/users",(req,res)=>{
    res.status(200).json({
        success: true,
        data:users,
    })
})



/**
 * Route: /users/id
 * Method: GET 
 * Description: Get a user by id
 * Access: Public
 * Parameters: id
 */

 app.get("/users/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((element) => element.id===id);
    
    if(!user) {
    return res.status(404).json({
        success: false,
        message: "User not found",
    });
    } 
     return res.status(200).json({
        success: true,
        data: user,
    });
});


app.get("*",(req,res)=>{
    res.status(201).json()
});


app.listen(port,()=>{
    console.log("server is running");
});
