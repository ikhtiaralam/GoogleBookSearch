import React, { Component } from 'react';
import API from '../utils/API';
import "./Search.css";

class Search extends Component {
  state = {
    searchTerm: '',
    booksList: []
  };

  searchGoogleBooks = bookQuery => {
    API.searchGoogleBooks(bookQuery)
      .then(res => {
        // take res.data.items array and create new array with less information
        const booksList = res.data.items.map(book => {
          return {
            googleId: book.id,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            date: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://fillmurray.com/200/300',
            link: book.volumeInfo.infoLink
          };
        });
        // set state to have new book list
        this.setState({ booksList });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.searchTerm) {
      return false;
    }

    this.searchGoogleBooks(this.state.searchTerm);
  };

  saveBook = bookId => {
    // find book in this.state.booksList based on the bookId value
    const bookPicked = this.state.booksList.find(book => book.bookId === bookId);
    console.log(bookPicked);
    API.saveBook(bookPicked)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {/* make jumbotron */}
        <div className="jumbotron jumbotron-fluid bg-dark text-light">
          <div className="container-fluid-top">
            <h1 className="title">Find Your Favorite Book!</h1>
          </div>
        </div>


        {/* create row with two columns */}
        <div className="container-fluid-bottom">
          {/* <div className="row"> */}
            {/* form section */}


            <div className="searchBar">
            
              <h3>Search For A Book</h3>
              <form onSubmit={this.handleFormSubmit}>
                <input
                  name="searchTerm"
                  onChange={this.handleInputChange}
                  placeholder="Enter book name here"
                  value={this.state.searchTerm}
                  type="input"
                  className="form-control mb-3"
                />
        

                <button className="searchButton btn-block btn-success" onClick={this.handleFormSubmit}>
                  Search for book
                </button>
              </form>
            </div>


            {/* Result Section */}
            <div className="row">
            <div className="col-12 col-md-12">
              {!this.state.booksList.length ? (
                <h3 className="text-results">Results:</h3>
              ) 
              
              
              : (
                <React.Fragment>
                  <h4>Search Results for: {this.state.searchTerm}</h4>
                  <div className="row">
                    {this.state.booksList.map(book => {
                      return (
                        <div className="col-12 col-md-4" key={book.bookId}>
                          <div className="card">
                            <img src={book.image} alt={book.title} className="card-img-top" />
                            <div className="card-body">
                              <h5 className="card-title">{book.title}</h5>
                              <p className="card-text">Released: {book.date}</p>
                              {book.authors ? <p className="card-text">By: {book.authors.join(', ')}</p> : ''}
                              <p className="card-text">
                                <strong>Description</strong>: {book.description}{' '}
                              </p>

                              <a
                                href={book.link}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="btn btn-success btn-small">
                                See More.
                              </a>
                              <button onClick={() => this.saveBook(book.bookId)} className="btn btn-dark btn-small">
                                Save Book.
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
