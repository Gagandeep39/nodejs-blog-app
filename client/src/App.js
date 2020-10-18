import React from 'react';
import './App.css';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';

function App() {
  return (
    <div className='container'>
      <h1 className='display-2'>Blog App</h1>
      <CreatePost />
      <hr />
      <h1 className='display-2'>Posts</h1>
      <Posts />
    </div>
  );
}

export default App;
