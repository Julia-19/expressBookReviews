const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    return /^[a-zA-Z0-9_.-]+$/.test(username);
};

const authenticatedUser = (username,password)=>{ return users.some(user => user.username === username && user.password === password);
};

//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;
    if (authenticatedUser(username, password)) {
      const token = jwt.sign({ username }, "secret_key");
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
