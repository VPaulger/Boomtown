import React from 'react';

import SignUpForm from './SignUpForm';

const SignUpPage = ({
  setCSRFToken,
}) => (
  <div>
    <h1>Welcome home.</h1>

    <SignUpForm setCSRFToken={setCSRFToken}/>

  </div>
);

export default SignUpPage;
