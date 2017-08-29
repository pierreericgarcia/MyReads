import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

function BooksList (props){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf onShelfUpdate={props.onShelfUpdate} category="Currently Reading" books={props.books.filter(book => {
              return book.shelf === "currentlyReading";
            })}/>
            <BookShelf onShelfUpdate={props.onShelfUpdate} category="Want to Read" books={props.books.filter(book => {
              return book.shelf === "wantToRead";
            })}/>
            <BookShelf onShelfUpdate={props.onShelfUpdate} category="Read" books={props.books.filter(book => {
              return book.shelf === "read";
            })}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
}

export default BooksList;
