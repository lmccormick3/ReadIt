import React from 'react';

const completedBooks = (props) => {
    return (
        <li>
            <div>
                <h3>{props.bookToRead.title}</h3>
                <h4>{props.bookToRead.author}</h4>
                <button onClick={() => props.removeBookToRead(props.bookToRead.key)}>Remove</button>
            </div>
        </li>
    )
};

export default completedBooks;