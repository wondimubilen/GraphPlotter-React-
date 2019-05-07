import React from 'react';
import './History.css';


    const history = (props) => {
        return (
            <div className="History">
                <h5>Formula: {props.formula}</h5>
                <div className="History container">
                    <h5 className="text">Range</h5>
                    <div>
                        <h5>Start: {props.start}</h5>
                        <h5>End: {props.end}</h5>
                    </div>
                </div>
            </div>
        );
    };

export default (history);
