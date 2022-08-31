const express = require("express");
const {books} = require("../Data/books.json");
const {users} = require("../Data/users.json");

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


/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get the list of issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/by-user",(req,res)=>{
    const usersWithIssuedbooks = users.filter((element)=>{
        if(element.issuedBook){
            return element;
        }
    });

    const issuedbooks = [];

    usersWithIssuedbooks.forEach((element)=>{
        let book = books.find((book)=>{
            if(book.id===element.issuedBook) return book;
        }
            );
        book.issuedBy=element.name;
        book.issuedDate=element.issuedDate;
        book.returnDate=element.returnDate;

        issuedbooks.push(book);
    })

    if(issuedbooks.length===0){
        return res.status(440).send({
            success: false,
            message: "No books are issued yet"
        })
    };
     console.log(...books);
    return res.status(201).send(issuedbooks);
});


/**
 * Route: /books/:id
 * Method: PUT
 * Description: update the books by id
 * Access: Public
 * Parameters: id
 */


router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    const book = books.find((book)=>{
        if(book.id===id){
             return book
        }
    });


    if(!book){
        return res.status(404).send({
            success:false,
            message: "No book with such id exist"
        })
    }

    
    const updatedData = books.map((each)=>{
        if(each.id===id){
            return{ ...each, ...data };
            
        }
        return each;
    })
    

    return res.status(201).json({
        success: true,
        data: updatedData});
})


router.get("/subscription-details/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((element)=>{
        if(element.id===id) return element;
    });

    if(!user){
        return res.status(201).send({
            success: false,
            message:"No user with this ID exists"
        })
    }

    const getDateInDays = (data="")=>{
        if(data===""){
            date = new Date();
        }
        else{
            date = new Date(data);
        }

        const days= Math.floor(date/(1000*60*60*24));
        return days;
    }

    const subscriptionExpirationDate=(date)=>{
        if(user.subscriptionType==="Basic"){date=date+90};
        if(user.subscriptionType==="Standard"){date=date+180};
        if(user.subscriptionType==="Premium"){date=date+360};

        return date;
    }



    const presentDate = getDateInDays();
    const returnDate = getDateInDays(user.returnDate);
    const subscriptionDate = getDateInDays(user.subscriptionDate);
    const subscriptionExpiration = subscriptionExpirationDate(subscriptionDate);

    
    const subInfo = {
        ...user,
        subscriptionExpired: returnDate>presentDate,
        daysLeftForExpiration: subscriptionExpiration>presentDate ? (subscriptionExpiration-presentDate):0,
        fine: returnDate<presentDate? (subscriptionExpiration<=presentDate? 200 : 100):0
    }

    res.status(201).send({
        success:true,
        data: subInfo});
})




module.exports = router;