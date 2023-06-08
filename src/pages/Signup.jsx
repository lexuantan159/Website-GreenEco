import React, { useEffect } from 'react';
import FormSignup from '../components/FormSignup/FormSignup';

const Signup = () => {

    useEffect( () => {
        document.title = 'Sign Up';
      })
    return <FormSignup />;
};

export default Signup;
