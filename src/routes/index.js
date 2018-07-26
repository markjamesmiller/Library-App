var express = require('express');
var router = express.Router();
var book = require('../models/books.js');

router.get('/books', function(req, res) {
  book.find({}, function (err, books) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(books);
  });

});

router.get('/books/:bookId', function (req, res, next) {
  const { bookId } = req.params;
  book.findById(bookId, function(err, book) {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
  if (!book) {
    return res.status(404).end(`Could not find book '${bookId}'`);
  }
  res.json(book);
  });
});

router.post('/books', function (req, res, next) {
  const bookData = {
    author: req.body.authorID,
    title: req.body.titleID
  };

  book.create(bookData, function (err, newBook) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(newBook);
  });
});

router.put('/books/:bookId', function(req, res, next) {
    const bookId = req.params.bookId;

    book.findById(bookId, function(err, book) {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        if (!book) {
            return res.status(404).json({message: "book not found"});
        }

        book.title = req.body.titleID;
        book.author = req.body.authorID;

        book.save(function(err, savedbook) {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            res.json(savedbook);
        });

    });
});

router.delete('/books/:bookId', function (req, res, next) {
  const { bookId } = req.params;
  book.findById(bookId, function(err, book) {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
});
  book.deleteOne({ _id: bookId }, function(err){
    console.log(err);
  });

  res.json(book);
  });

module.exports = router;