/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 01:38:28
 * @modify date 2020-10-19 01:38:28
 * @desc Ad comment component
 */
import React, { useState } from 'react';
import axios from 'axios';

export default function CreateComment({ postId }) {
  const [content, setContent] = useState('');
  const url = process.env.REACT_APP_URL;
  const commentService = process.env.REACT_APP_COMMENT_SERVICE;

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(url + commentService + `/${postId}/comments`, { content })
      .then((response) => setContent(''))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='input-group mb-3'>
        <input
          name='comment'
          required
          placeholder='Comment'
          className='form-control'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className='input-group-append'>
          <button className='btn btn-success' type='submit'>
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
