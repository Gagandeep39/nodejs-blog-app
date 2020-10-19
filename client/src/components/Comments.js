/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 02:02:15
 * @modify date 2020-10-19 02:02:15
 * @desc Show comments
 */
import React from 'react';

export default function Comments({ comments }) {
  const renderedComments = Object.values(comments).map((comment) => (
    <li key={comment.id}> {comment.content} </li>
  ));

  return <ul> {renderedComments} </ul>;
}
