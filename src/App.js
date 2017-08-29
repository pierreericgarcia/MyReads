import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import BooksSearch from './BooksSearch'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  onShelfUpdate = (book, shelf) => {
    if (book.shelf === 'none') {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.concat([ book ])
        }));
      });
    } else {
      const index = this.state.books.map(function(x) {return x.id; }).indexOf(book.id);
      BooksAPI.update(book, shelf).then(() => {
        let books = this.state.books.slice();
        books[index].shelf = shelf;
        this.setState({ books });
      });
    }
  }

  onBookSearch = (query, maxResults) => {
    BooksAPI.search(query, maxResults).then((books) => {
      let searchBooks = books.map(book => {
        let alreadyExists = false;
        let ancientBook = {};
        for (let i = 0; i < this.state.books.length; i++) {
          if (this.state.books[i].id === book.id) {
            alreadyExists = true;
            ancientBook = this.state.books[i];
          }
        }
        if (alreadyExists) {
          return ancientBook;
        } else {
          book.shelf = 'none';
          return book;
        }
      });
      this.setState({ searchBooks });
    }).catch(() => {
      this.setState({ searchBooks: [] });
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <BooksList books={this.state.books} onShelfUpdate={this.onShelfUpdate}/>
        )}/>
        <Route path="/search" render={() => (
          <BooksSearch onShelfUpdate={this.onShelfUpdate} books={this.state.searchBooks} onBookSearch={this.onBookSearch}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
