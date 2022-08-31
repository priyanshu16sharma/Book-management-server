const express = require("express");
const {users} = require("../Data/users.json");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
 router.get("/",(req,res)=>{
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

//:id is syntax where id can be passed as parameter for eg. http://localhost:8080/users/1 here 1 is replacing :id thus : is necessary
 router.get("/:id",(req,res)=>{
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

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: none
 */

router.post("/", (req,res)=>{
    let {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    let user = users.find((each) => each.id===id);

    if(user){
        return res.status(404).json({
            message: "User already exists"
        })
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    
    return res.status(201).json(users);

    
})

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Update details in server
 * Access: Public
 * Parameters: id
 */

router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const { data } = req.body;
    const user = users.find((element) => element.id===id);

    if(!user){
        return res.status(404).json({
            success:false,
            message: "element not found"

        })
    }
   
//to overwrite content of each by the contents of data
    const updatedBook = users.map((each)=>{
        if(each.id===id){
            
            return {
                 
                ...each,
                ...data
            };
        }
        return each;
    });
    
    
    return res.status(201).json({
        success: true,
        data: updatedUser 

    }
    );

});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: DELETE details of the user with matching id from server
 * Access: Public
 * Parameters: id
 */


router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    let user = users.find((element)=> element.id===id);

    if(!user){
        return res.status(404).send({
            message: "No such user exist"
        })
    }
    // else{
    //     let deleteUser = users.map((element,index)=>{
    //         if(element.id===id && !element.issuedBook) {
                
    //             users.splice(index,1);
    //             }
    //             /**else{
    //                 return res.status(200).json({
    //                     message: `User has ${element.issuedBook} issued book`
    //                 }
    //                 )
    //             }*/
    //         }
    //         return users;
    //     });
    // }

    const index = users.indexOf(user);
    if(user.id===id && !user.issuedBook) {              
             users.splice(index,1);
             res.status(202).json(users);
    }

    res.status(202).json({
        message: `User has ${user.issuedBook} books issued`
    });

    res.status(202).json(users);
})

module.exports = router;