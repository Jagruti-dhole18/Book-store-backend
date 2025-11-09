import Book from "../models/book.model.js";
import cloudinary from "../config/cloud.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, price, desc, stock, language } = req.body;

    if (
      !title ||
      !author ||
      !price ||
      !desc ||
      !language ||
      stock === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = undefined;

    if (req.file) {
      try {
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const uploadResult = await cloudinary.uploader.upload(base64Image, {folder: "books"});
        imageUrl = uploadResult.secure_url;
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed" });
      }
    }

    const newBook = await Book.create({
      imageUrl,
      title,
      author,
      price,
      desc,
      language,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Book Created successfully",
      Book: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error"
    });
  }
};
