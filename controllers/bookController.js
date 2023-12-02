const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addBook = async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const newBook = await Book.create({ title, author, genre });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
