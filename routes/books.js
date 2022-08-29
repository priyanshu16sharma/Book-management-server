const express = require("express");
const {books} = require("../Data/books.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get the list of all available books
 * Access: Public
 * Parameters: None
 */

router.get("/",(req,res)=>{
    res.status(201).json({
        success: true,
        data: books,
    });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get the list of a particular book by id
 * Access: Public
 * Parameters: id
 */

router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((element)=>{
        if(element.id===id){
            return element;
        }
    })
    if(!book){
        return res.status(201).json({
            message: "Book with this id doesn't exist"
        })
    }

    res.status(201).json({
        success: true,
        Data: book
    })
})

/**
 * Route: /books
 * Method: POST
 * Description: Add a new book 
 * Access: Public
 * Parameters: none
 */

router.post("/",(req,res)=>{
    const {id, name, author, genre, price, publisher} = req.body;
    const book = books.find((element)=> element.id==id);
    if(!book){
    const updateBook = books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher
    })
    return res.status(201).json({
        success: true,
        Data: books
    })
};
    
    res.status(404).json({
        message: "Id already exists"
    })
})

module.exports = router;