const express = require("express");
const app = express();
const port = 3000;

const joi = require('joi')

app.use(express.json());

// CRUD
let books = [
  { name: "Clean code", author: "Martin", price: 7, id: 1 },
  { name: "Clean architector", author: "Martin", price: 5, id: 2 },
  { name: "Fact fullness", author: "Gates 2", price: 3, id: 3 },
  { name: "Clean code 2", author: "Martin", price: 7, id: 4 },
  { name: "Clean architector 2", author: "Martin", price: 5, id: 5 },
  { name: "Fact fullness 2 ", author: "Gates", price: 3, id: 6 },
  { name: "Clean code 3", author: "Martin", price: 7, id: 7 },
  { name: "Clean architector 3", author: "Martin", price: 5, id: 8 },
  { name: "Fact fullness 3", author: "Gates", price: 3, id: 9 },
];

// Get method
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/books", (req, res) => {
  res.send(books);
});

app.get("/books/:id/", (req, res) => {
  const book = books.filter((val) => {
    return val.id === +req.params.id;
  })[0];

  res.send(book);
});

// Post
app.post("/create", (req, res) => {
  const length = books.length;

  // if (!req.body.name) {
  //   res.status(403).send("Error name validation is not true");
  //   return;
  // }

  // if (typeof req.body.name !== "string") {
  //   res.status(403).send("Error name validation is not true. must have string");
  //   return;
  // }

  // if (typeof req.body.price !== "number") {
  //   res
  //     .status(403)
  //     .send("Error price validation is not true. must have number");
  //   return;
  // }

  const book = {
    name: req.body.name,
    author: req.body.author,
    id: length + 1,
  };



  const schema = joi.object({
    name:joi.string().min(3).max(15).required(),
    author: joi.string().min(3).max(20).required(),
  })

  const result = schema.validate(req.body)

  if(result.error){
    res.send(result.error.message)
    return
  }

  books.push(book);

  res.send("Success");
});

// Put
app.put("/update/:id", (req, res) => {
  let idx = books.findIndex((book) => book.id === +req.params.id);

  let book = books[idx];

  book.name = req.body.name || book.name;
  book.author = req.body.author || book.author;
  book.price = req.body.price || book.price;

  books[idx] = book;

  res.status(200).send("success");
});

// Delete
app.delete("/book/:id", (req, res) => {
  books = books.filter((book) => {
    return book.id !== +req.params.id;
  });

  res.send("Deleted successfull");
});

app.listen(port, () => {
  console.log("Server working on port " + port);
});


/* ================== oziq ovqat product => name price id // CRUD */