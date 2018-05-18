import React from 'react';

const bookToRead = (props) => {
  return(
    <li>
      <div>
        <h3>{props.bookToRead.title}</h3>
        <h4>{props.bookToRead.author}</h4>
        <button onClick={() => props.removeBookToRead(props.bookToRead.key)}>Remove</button>
        <button onClick={() => props.completeBookToRead(props.bookToRead.key)}>Finished!</button>
      </div>
    </li>
  )
};

export default bookToRead;