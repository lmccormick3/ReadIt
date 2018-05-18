import React from 'react';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            book: '',
            searchResults: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log('component mounted!');
    }
    handleChange(e) {
        this.setState({
            //if the value in `e.target.name` is === user
            //the expression [e.target.name] : e.target.value
            // will update the user property in our state.
            book: e.target.value
            // uses the input name to grab the value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.get('https://www.googleapis.com/books/v1/volumes?', {
            params: {
                q: this.state.book
            }
        })
            .then((res) => {
                console.log(res);
                this.setState({
                    searchResults: res.data.items
                })
            });
    }
    render() {
        return (
            <div className="searchResults">
                {this.state.searchResults.map((book) => {
                    return (
                        <div className="result">
                            <h2>{book.volumeInfo.title}</h2>
                            <p>{book.volumeInfo.authors}</p>
                            <button className="addBtn" onClick={() => props.addBookToRead(props.firebaseKey)}>Add to List</button>
                        </div>
                    )
                })}
                <form action="" onSubmit={this.handleSubmit}>
                    <input type="text" name="title" onChange={this.handleChange} placeholder="Book Title" value={this.state.title} />
                    <input type="submit" onSubmit={this.handleSubmit} />
                </form>
            </div>
        )
    }
}