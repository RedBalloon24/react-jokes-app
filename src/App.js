import React from 'react';
import './App.css';
import JokeList from './components/JokeList';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp, faThumbsDown, faLaugh } from '@fortawesome/free-solid-svg-icons'

library.add(faThumbsUp, faThumbsDown, faLaugh)

function App() {
  return (
    <div className="App">
      <JokeList />
    </div>
  );
}

export default App;
