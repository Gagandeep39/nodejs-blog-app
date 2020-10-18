import React from 'react';
import './App.css';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <div className='container'>
      <h1 className='display-2'>Blog App</h1>
      <CreatePost />
    </div>
  );
}

export default App;
