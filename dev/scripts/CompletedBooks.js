import React from 'react';

const completedBooks = (props) => {
    return (
        <li>
            <div>
                <h3>{props.bookToRead.title}</h3>
                <h4>by {props.bookToRead.author}</h4>
                <button className="removeBtn" onClick={() => props.removeBookToRead(props.bookToRead.key)}>Remove</button>
            </div>
        </li>
    )
};

export default completedBooks;