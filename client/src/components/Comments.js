/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 02:02:15
 * @modify date 2020-10-19 02:02:15
 * @desc Show comments
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const url = process.env.REACT_APP_URL;
  const commentService = process.env.REACT_APP_COMMENT_SERVICE;

  const fetchComments = () => {
    axios
      .get(`${url}${commentService}/${postId}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderedComments = Object.values(comments).map((comment) => (
    <li key={comment.id}> {comment.content} </li>
  ));

  return <ul> {renderedComments} </ul>;
}
