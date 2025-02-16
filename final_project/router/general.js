const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



const doesExist = (username)=>{
     let userswithsamename = users.filter((user)=>{
         return user.username == username
         });
         if(userswithsamename.length > 0){
             return true;
         }else{
             return false;
         }
         }


public_users.post("/register", (req,res) => {

  const username = req.body.username
  const password = req.body.password

  if(username && password){
      if(!doesExist(username)){
          users.push({"username":username,"password":password});
          return res.status(200).json({message: "User succesfully registred. Now you can log in"});
      }else{
          return res.status(404).json({message: "User already exists!"});
      }
  }
  return res.status(404).json({message: "Unable to register user."});


//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4))
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn
    res.send(books[isbn])
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let bookKeys = Object.keys(books);
    console.log(bookKeys)
    const authorParam = req.params.author;
    const matchingBooks = [];

  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      const book = books[key];
      if (book.author === authorParam) {
        matchingBooks.push(book);
      }
    }
  }

  res.send(matchingBooks);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let bookKeys = Object.keys(books);
    console.log(bookKeys)
    const titleParam = req.params.title;
    const matchingBooks = [];

  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      const book = books[key];
      if (book.title === titleParam) {
        matchingBooks.push(book);
      }
    }
  }

  res.send(matchingBooks);
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbnParam = req.params.isbn;
    const book = books[isbnParam];
    const reviews = book ? book.reviews : null;
    res.send(reviews);

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
