import ContactPage from '../components/ContactPage/ContactPage';

import React, { useEffect } from 'react';

const Contact = () => {
    useEffect(() => {
        document.title = 'Contact';
    });
    return (
        <div>
            <ContactPage/>
        </div>
    );
};

export default Contact;
