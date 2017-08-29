import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class BooksSearch extends Component {
  state = {
    query: ''
  }

  handleChange(e) {
    let query = e.target.value;
    this.setState({ query });
    if (query.length > 0) {
      this.props.onBookSearch(query, 20);
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(this.props.books && this.state.query.length > 0) && (
              this.props.books.map(book => {
                return (
                  <Book key={book.id} book={book} onShelfUpdate={this.props.onShelfUpdate}/>
                )
              })
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BooksSearch;
