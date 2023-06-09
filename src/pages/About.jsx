import AboutPage from '../components/AboutPage/AboutPage';

import React, { useEffect } from 'react';

const About = () => {
    useEffect(() => {
        document.title = 'About';
    });
    return (
        <div>
            <AboutPage />
        </div>
    );
};

export default About;
