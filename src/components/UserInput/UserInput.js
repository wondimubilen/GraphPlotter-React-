import React from 'react';
import './UserInput.css';


const userInput = (props) => {
    const inputStyle = {
        border: '2px solid red'
    };

    return <input className="UserInput"
        style={inputStyle}
        onChange={props.changed}
        value={props.currentFormula} />;
};

export default userInput;