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
  const url = process.env.REACT_APP_URL;
  const postService = process.env.REACT_APP_POST_SERVICE;

  const onSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(url + postService, title)
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
