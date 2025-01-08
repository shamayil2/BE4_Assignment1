const { initializeDatabase } = require("./db/db.connect")
const express = require("express")
initializeDatabase()
const app = express()
app.use(express.json())
const fs = require("fs")
const Book = require("./models/book.models")



async function addBook(newBooktoAdd) {
    try {
        const newBook = new Book(newBooktoAdd)
        const addedBook = await newBook.save()
        return addedBook
    } catch (error) {
        console.log("An error occured while seeding data.", error)
    }

}

async function getBooks() {
    try {
        const books = await Book.find()
        return books
    } catch (error) {
        console.log(error)
    }
}

app.get("/books", async(req, res) => {
    try {
        const books = await getBooks()
        if (books.length !== 0) {
            res.json(books)
        } else {
            res.status(404).json({ error: "Books Dont exist" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error getting the books" })
    }
})

app.post("/books", async(req, res) => {
    try {
        const newBook = await addBook(req.body)
        if (newBook) {
            res.status(201).json({ message: "Book added successfully", book: newBook })
        } else {
            res.status(404).json({ error: "Book Not Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Book Cannot be Added" })
    }
})

async function getBookByTitle(bookTitle) {
    try {
        const book = await Book.findOne({ title: bookTitle })
        return book

    } catch (error) {
        console.log(error)
    }
}

app.get("/books/:bookTitle", async(req, res) => {
    try {
        const book = await getBookByTitle(req.params.bookTitle)
        if (book) {
            res.json(book)
        } else {
            res.status(404).json({ error: "Cannot find book" })
        }
    } catch (error) {
        res.status(500).json({ error: "Cannot Fetch Book" })
    }
})

async function getBooksByAuthor(authorName) {
    try {
        const books = await Book.find({ author: authorName })
        return books
    } catch (error) {
        console.log(error)
    }
}

app.get("/books/author/:authorName", async(req, res) => {
    try {
        const books = await getBooksByAuthor(req.params.authorName)
        if (books.length !== 0) {
            res.json(books)
        } else {
            res.status(404).json({ error: "Books Not Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Cannot Fetch Books" })
    }
})

async function booksByGenre(genreName) {
    try {
        const books = await Book.find({ genre: genreName })
        return books
    } catch (error) {
        console.log(error)
    }
}

app.get("/books/genre/:genreName", async(req, res) => {
    try {
        const books = await booksByGenre(req.params.genreName)
        if (books.length !== 0) {
            res.json(books)
        } else {
            res.status(404).json({ error: "Books Not Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Cannot fetch Books" })
    }
})

async function getBooksByYear(releaseYear) {
    try {
        const books = await Book.find({ publishedYear: releaseYear })
        return books
    } catch (error) {
        console.log(error)
    }
}

app.get("/books/year/:releaseYear", async(req, res) => {
    try {
        const books = await getBooksByYear(req.params.releaseYear)
        if (books.length !== 0) {
            res.json(books)
        } else {
            res.status(404).json({ error: "Books Not Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Cannot fetch Books" })
    }
})

async function updateBookWithId(bookId, dataToUpdate) {
    try {
        const book = await Book.findByIdAndUpdate(bookId, dataToUpdate, { new: true })
        return book
    } catch (error) {
        console.log(error)
    }
}

async function getBookById(bookId) {
    try {
        const book = await Book.findById(bookId)
        return book
    } catch (error) {
        console.log(error)
    }
}

app.post("/books/:bookId", async(req, res) => {
    try {
        const updatedBook = await updateBookWithId(req.params.bookId, req.body)
        if (!updatedBook) {
            res.status(404).json({ error: "Book Not Found" })
        } else {

            res.status(200).json({ message: "Book Updated Successfully" })
        }


    } catch (error) {
        res.status(500).json({ error: "Cannot update Book" })
    }
})

async function updateBookByTitle(bookTitle, dataToUpdate) {
    try {
        const book = await Book.findOneAndUpdate({ title: bookTitle }, dataToUpdate, { new: true })
        return book
    } catch (error) {
        console.log(error)
    }
}

app.post("/books/title/:bookTitle", async(req, res) => {
    try {
        const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body)
        if (!updatedBook) {
            res.status(404).json({ error: "Book Does Not Exist" })
        } else {
            res.status(200).json({ message: "Book Updated Successfully", book: updatedBook })
        }
    } catch (error) {
        res.status(500).json({ error: "Cannot Update Book" })
    }
})

async function deleteBookById(bookId) {
    try {
        const book = await Book.findByIdAndDelete(bookId)
        return book
    } catch (error) {
        console.log(error)
    }
}

app.delete("/books/:bookId", async(req, res) => {
    try {
        const Book = await deleteBookById(req.params.bookId)
        if (Book) {
            res.status(200).json({ message: "Book Deleted Successfully", book: Book })
        } else {
            res.status(404).json({ error: "Book Not Found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Cannot Delete Book" })
    }
})

const PORT = 3000

app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT)
})