const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const { username, password } = req.body;
  if (isValid(username)) {
    // code to register a new user
    users.push({ username, password });
    return res.status(200).json({ message: "User registered successfully" });
  } else {
    return res.status(400).json({ message: "Invalid username" });
}
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.json(books);
  return res.status(300).json({message: "implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    if (books.hasOwnProperty(isbn)) {
        const book = books[isbn];
        res.json(book);
 }});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const booksByAuthor = Object.values(books).filter(book => book.author === author);
    res.json(booksByAuthor);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksWithTitle = Object.values(books).filter(book => book.title === title);
    res.json(booksWithTitle);
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const reviews = books[isbn].reviews;
    res.json({ reviews });
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
