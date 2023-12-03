
const fs = require('fs');

function loadAuthors() {
    const authorsData = fs.readFileSync('./data/authors.json', 'utf8');
    return JSON.parse(authorsData).authors;
}

function loadBooks() {
    const booksData = fs.readFileSync('./data/books.json', 'utf8');
    return JSON.parse(booksData).books;
}

module.exports = {
    loadAuthors,
    loadBooks,
};
