import React from 'react';

const Header = (props) => {
    return (
        <header>
            <div className="headerContent">
                <h1>ReadIt</h1> 
                <div className="icon"> 
                    <img src="./assets/bookIcon.png" alt=""/>
                </div>
            </div>
        </header>
    )
}

export default Header;