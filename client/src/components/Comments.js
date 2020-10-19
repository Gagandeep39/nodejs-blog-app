/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 02:02:15
 * @modify date 2020-10-19 02:02:15
 * @desc Show comments
 */
import React from 'react';

export default function Comments({ comments }) {
  const renderedComments = Object.values(comments).map((comment) => {
    let content;
    if (comment.status === 'rejected')
      content = 'This comment has been rejected';
    else if (comment.status === 'pending')
      content = 'This comment is awaiting moderation';
    else content = comment.content;
    return <li key={comment.id}> {content} </li>;
  });

  return <ul> {renderedComments} </ul>;
}
