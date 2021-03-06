import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import firebase from 'firebase';
import Search from './Search';
import BookToRead from './BookToRead';
import CompletedBooks from './CompletedBooks';
import Header from './Header';
import Footer from './Footer';

const config = {
  apiKey: "AIzaSyC6Ml-m9yk_1w3DidR8RXz2jtGmtYHxQBI",
  authDomain: "project-56737.firebaseapp.com",
  databaseURL: "https://project-56737.firebaseio.com",
  projectId: "project-56737",
  storageBucket: "project-56737.appspot.com",
  messagingSenderId: "1012723227310"
};

firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      book: '',
      title: '',
      author: '',
      searchResults: [],
      bookToRead: [],
      addedBooks: [],
      completedBooks: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addBookToRead = this.addBookToRead.bind(this);
    this.removeBookToRead = this.removeBookToRead.bind(this);
    this.completeBookToRead = this.completeBookToRead.bind(this);
  }

  componentDidMount() {
    const dbRef = firebase.database().ref('booksToRead');

    dbRef.on('value',(snapshot) => {
      console.log(snapshot.val());
      const data = snapshot.val();
      const bookArray = [];

      for(let item in data) {
        console.log(item);
        console.log(data[item]);
        data[item].key = item;
        bookArray.push(data[item]);
      }
      const completed = bookArray.filter((book) => {
        console.log(book.completed === true);
        return book.completed === true;
      });
      const incompleted = bookArray.filter((book) => {
        console.log(book.completed === false);
        return book.completed === false;
      });

      this.setState({
        addedBooks: bookArray,
        bookToRead: incompleted,
        completedBooks: completed
      })
    });
  }

  handleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.get('https://www.googleapis.com/books/v1/volumes?', {
      params: {
        q: this.state.title,
        maxResults: 9
      }
    })
      .then((res) => {
        this.setState({
          searchResults: res.data.items,
        })
      });
    }

  addBookToRead(title, author, completed) {
    const bookToRead = {
      title: title,
      author: author,
      completed: false
    }

    const bookToReadArray = Array.from(this.state.bookToRead);
    const dbRef = firebase.database().ref('booksToRead');
    const key = dbRef.push(bookToRead).key;

    bookToRead.key = key; 
    bookToReadArray.push(bookToRead)

    this.setState({
      bookToRead: bookToReadArray
    })
  }

  removeBookToRead(keyToRemove) {
    firebase.database().ref(`booksToRead/${keyToRemove}`).remove();
  }

  completeBookToRead(keyToUpdate) {
    firebase.database().ref(`booksToRead/${keyToUpdate}`)
      .update({
        completed: true
      })     
  }

  render() {
    return (
      <div> 
        <Header />
        <div className="wrapper">
          <div className="content">
            <div className="searchResults">
              <div className="searchField">
                <form action="" onSubmit={this.handleSubmit}>
                  <input type="text" name="title" onChange={this.handleChange} placeholder="Book Title" value={this.state.title} className="input"/>
                  <input type="submit" onSubmit={this.handleSubmit} value="Search Books" className="submit"/>
                </form>
                </div>
              <div className="results">
                {this.state.searchResults.map((book) => {
                  return (
                    <div className="result">
                      <h2>{book.volumeInfo.title}</h2>
                      <p>{book.volumeInfo.authors}</p>
                      <button className="addBtn" onClick={() => this.addBookToRead(book.volumeInfo.title, book.volumeInfo.authors)}>Add To List</button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="list">
            <div className="toRead">
              <h2>Books To Read:</h2>
              <ul className="toReadItem">
                {this.state.bookToRead !== undefined ? this.state.bookToRead.map((book) => {
                  return (
                    <BookToRead 
                    key={book.key}
                    bookToRead={book}
                    removeBookToRead={this.removeBookToRead} 
                    completeBookToRead={this.completeBookToRead}
                    />
                  )
                }): null }
              </ul>
            </div>
            <div className="finishedBooks">
              <h2>Finished:</h2>
              <ul>
                {this.state.completedBooks.map((book) => {
                  return( <CompletedBooks
                  key={book.key}
                  bookToRead={book}
                  removeBookToRead={this.removeBookToRead}
                  completed={book.completed}
                  />
                )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div> 
      <Footer />
    </div>
    //main container
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
