import React from 'react';

const bookToRead = (props) => {
  return(
    <li>
      <div className="book">
        <h3>{props.bookToRead.title}</h3>
        <h4>{props.bookToRead.author}</h4>
        <div className="buttons">
          <button className="removeBtn" onClick={() => props.removeBookToRead(props.bookToRead.key)}>Remove</button>
          <button className="finishedBtn" onClick={() => props.completeBookToRead(props.bookToRead.key)}>Finished!</button>
        </div>
      </div>
    </li>
  )
};

export default bookToRead;