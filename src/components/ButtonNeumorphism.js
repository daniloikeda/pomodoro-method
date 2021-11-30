import React from 'react';
import './ButtonNeumorphism.css';

function ButtonNeumorphism (props) {
    const iconClassName = `neumorphism-button-icon ${props.icon} icon`;
    const buttonLabel = props.buttonLabel;
    const handleButtonClick = () => {
        if (props.handleButtonClick) {
            props.handleButtonClick();
        }
    }
    return(
        <div className="neumorphism-wrapper">
            <button className="neumorphism-button" onClick={handleButtonClick}>
                <i className={iconClassName}></i>
                <label className="neumorphism-button-label">{buttonLabel}</label>
            </button>
        </div>
    );
}

export default ButtonNeumorphism;