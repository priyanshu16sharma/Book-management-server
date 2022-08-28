# book-record-mangement-server
This is a book record API backend for the 
mangement of records and books

# Routes and Endpoints

# /users
POST: create new users
GET: Get list of all the users ✔


## /users/{id}
GET: Get a user by Id{} ✔
PUT: Update a user by Id{}
DELETE: Delete a user by Id{} 
(Check whether the user has returned the issued book.) 
(Check if there is any fine to collect from user.)

## /user/subscription-details1. 
GET: Get user subscription details
1. Date of subsription
2. Valid till
3. Fine if any

## /books
GET: Get the list of all available books
POST: Add new books

## /books/{id}
GET: Get a book by id{}
POST: Update a book by id{}

# /books/issued
GET: Get a list of issued books

# /books/issued/with-fine
GET: Get all issued book with fine

# Subsxription Types
Basic (3 months)
Standard (6 months)
Premium (12 months)

If the subscription date of a user is 1/01/2022 and user has purchased a 
standard package, user's subscription will expire on 1/07/2022

If the user fails to return the book on time, a fine of Rs. 100/- will be imposed.

If the user fails to return the book on time and meanwhile their subscription also ended
then the fine amount will be increased to Rs. 200/-.
