import React from 'react';
import './App.css';
import './bootstrap.min.css';


class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      books: [],
      bookTemp: ''
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
    console.log('props', this.props)
  }
  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddBook(e) {
    this.setState({
      books: this.state.books.concat([this.state.bookTemp]),
      bookTemp: ''
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddAuthor(this.state);
  }

  render() {
    return (
    <form onSubmit={this.handleSubmit}>
    <div className="addAuthorForm__input">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
    </div>
    <div className="addAuthorForm__input">
      <label htmlFor="imageUrl">Image URL</label>
      <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}></input>
    </div>
    <div className="addAuthorForm__input">
      <label htmlFor="bookTemp">Books</label> 
      {this.state.books.map((book) => <p key={book}>{book}</p>)}
      <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}></input>
      <input type="button" value="+" onClick={this.handleAddBook}/>
    </div>
    <input type="submit" value="Add"/>
  </form>
    )}
}

function AddAuthorForm({match, onAddAuthor}) {
  // console.log('author', this.props.authors)
  return (
      <div className="addAuthorForm">
        <h1>Add Author</h1>
      <AuthorForm onAddAuthor={onAddAuthor}/>
      </div>
  )
}

export default AddAuthorForm;
