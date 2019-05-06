import React from 'react';

import './UserOutput.css';

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            <h3>Formula: {props.formula}</h3>
            <div className="UserOutput container">
                <h4 className="text">Range</h4>
                <div>
                    <h5>Start: {props.start}</h5>
                    <h5>End: {props.end}</h5>
                </div> 
            </div>
        </div>
    );
};

export default userOutput;