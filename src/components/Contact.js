import React from 'react'
import './Contact.css';

function Contact (props)
{
    return(
        <div className="contact-wrapper">
            <a href="https://github.com/daniloikeda" target="_blank">
                <div className="contact_item github">
                    <i aria-hidden="true" className="github big icon"></i>
                </div>
            </a>
            <a href="https://www.linkedin.com/in/danilo-carneiro-ikeda-310492100/" target="_blank">
                <div className="contact_item linkedin">
                    <i aria-hidden="true" className="linkedin big icon"></i>
                </div>
            </a>            
        </div>
    );
}

export default Contact; 