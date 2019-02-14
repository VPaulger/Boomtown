import React from 'react';

import LoginForm from './LoginForm';

const LoginPage = ({
  setCSRFToken,
}) => (
  <div>
    <h1>Welcome home.</h1>

    <LoginForm setCSRFToken={setCSRFToken}/>

  </div>
);

export default LoginPage;
