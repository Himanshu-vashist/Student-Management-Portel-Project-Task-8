import React, { useState, useEffect } from "react";
import "./Library.css"; // Ensure you have this CSS file with appropriate styles

function LibraryManagement() {
  const [books, setBooks] = useState([]);
  const [studentAccount, setStudentAccount] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://openlibrary.org/works/OL45804W/editions.json");
        const data = await response.json();
        const bookList = data.entries.map((book, index) => ({
          id: index,
          title: book.title,
          author: book.authors?.[0]?.name || "Unknown Author",
          isAvailable: true,
          coverImage: book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` : null,
        }));
        setBooks(bookList);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const borrowBook = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === bookId ? { ...book, isAvailable: false } : book))
    );
    setStudentAccount((prevAccount) => [...prevAccount, { bookId, borrowedDate: new Date() }]);
  };

  const returnBook = (bookId) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === bookId ? { ...book, isAvailable: true } : book))
    );
    setStudentAccount((prevAccount) => prevAccount.filter((item) => item.bookId !== bookId));
  };

  const calculateOverdue = (borrowedDate) => {
    const today = new Date();
    const borrowed = new Date(borrowedDate);
    const daysElapsed = Math.ceil((today - borrowed) / (1000 * 60 * 60 * 24));
    return daysElapsed > 7 ? `Overdue by ${daysElapsed - 7} days` : "On time";
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="library-container">
      <h1>Library Management System</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by book name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="book-list">
        <h2>Available Books</h2>
        <ul>
          {currentBooks.map((book) => (
            <li key={book.id} className={`book-item ${book.isAvailable ? "available" : "unavailable"}`}>
              <div className="book-info">
                {book.coverImage && <img src={book.coverImage} alt={book.title} className="book-cover" />}
                <strong>{book.title}</strong> by {book.author}
              </div>
              <div className="actions">
                {book.isAvailable ? (
                  <button className="borrow-button" onClick={() => borrowBook(book.id)}>Borrow</button>
                ) : (
                  <button className="borrowed-button" disabled>Borrowed</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
          <button key={index + 1} className="page-button" onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      <div className="account">
        <h2>Student Account</h2>
        {studentAccount.length > 0 ? (
          <ul>
            {studentAccount.map((item) => {
              const borrowedBook = books.find((book) => book.id === item.bookId);
              return (
                <li key={item.bookId} className="account-item">
                  <div className="book-info">
                    <strong>{borrowedBook.title}</strong> - Borrowed on:{" "}
                    {item.borrowedDate.toLocaleDateString()}
                  </div>
                  <div className="overdue-status">
                    {calculateOverdue(item.borrowedDate)}
                  </div>
                  <button className="return-button" onClick={() => returnBook(item.bookId)}>Return</button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No books borrowed.</p>
        )}
      </div>
    </div>
  );
}

export default LibraryManagement;
