/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 01:10:42
 * @modify date 2020-10-19 01:10:42
 * @desc Component to display a list of Posts
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';
import Comments from './Comments';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const host = process.env.REACT_APP_HOSTNAME;
  const postServicePort = process.env.REACT_APP_POST_SERVICE;

  const fetchPosts = () => {
    axios
      .get(`${host}:${postServicePort}/posts`)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      className='card'
      key={post.id}
      style={{ width: '30%', marginBottom: '20px' }}
    >
      <div className='card-body'>
        <h3> {post.title} </h3>
        <Comments postId={post.id} />
        <CreateComment postId={post.id} />
      </div>
    </div>
  ));

  return <div className='d-flex flex-row flex-wrap justify-content-between'>{renderedPosts}</div>;
}
