import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter } from 'react-router-dom';

const authors = [
    {
      name: 'Mark Twain',
      imageUrl: 'images/authors/marktwain.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['The Adventures of Huckleberry Finn', 'Yankee in King Arthurs Cour']
    },
    {
      name: 'Joseph Conrad',
      imageUrl: 'images/authors/josephconrad.png',
      imageSource: 'Wikimedia Commons',
      books: ['Heart of Darkness', 'Connie Boy', 'apocalyse later']
    },
    {
      name: 'J.K. Rowling',
      imageUrl: 'images/authors/jkrowling.jpg',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Daniel Ogren',
      books: ['Harry Potter and the Sorcerers Stone', 'Where to find beasts']
    },
    {
      name: 'Stephen King',
      imageUrl: 'images/authors/stephenking.jpg',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Pinguino',
      books: ['The Shining', 'IT']
    },
    {
      name: 'Charles Dickens',
      imageUrl: 'images/authors/charlesdickens.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
      name: 'William Shakespeare',
      imageUrl: 'images/authors/williamshakespeare.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
  ];

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
            author.books.some((title) => 
                title === answer))
    }
}

function resetState() {
  return {
   turnData: getTurnData(authors),
   highlight: '',
 };
}

let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function goBack() {
  window.history.back()
}

function App() {
  console.log('authors', authors)
  return <AuthorQuiz {...state} 
  onAnswerSelected={onAnswerSelected} 
  onContinue={() => {
    state = resetState();
    render();
  }} />;
}

const AuthorWrapper = withRouter(({ history }) => 
 <AddAuthorForm  onAddAuthor={(author) => {
   authors.push(author);
   history.push('./');
  }
  }/>
);

function render() {
  ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <Route exact path='/' component={App} /><Route/>
      <Route exact path='/add' component={AuthorWrapper} />
    </React.Fragment>
  </BrowserRouter>, document.getElementById('root'));
}
render();
registerServiceWorker();
