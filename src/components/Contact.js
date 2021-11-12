import React from 'react'
import './Contact.css';

function Contact (props)
{
    return(
        <div className="contact-wrapper">
            <div className="contact_item">
                <i aria-hidden="true" className="github icon"></i> Github
            </div>
            <div className="contact_item">
                <i aria-hidden="true" className="linkedin icon"></i> Linkedin
            </div>
            <div className="contact_item">
                <i aria-hidden="true" className="mail icon"></i>dcidaniloikeda@hotmail.com
            </div>
        </div>
    );
}

export default Contact; 