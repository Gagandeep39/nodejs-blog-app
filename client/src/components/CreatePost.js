/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 01:05:38
 * @modify date 2020-10-19 01:05:38
 * @desc Form to create a new Post
 */
import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const host = process.env.REACT_APP_HOSTNAME;
  const postServicePort = process.env.REACT_APP_POST_SERVICE;

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://${host}:${postServicePort}/posts/create`, { title })
      .then((response) => {
        console.log(response);
        setTitle('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            name='title'
            type='text'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-control'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
}
