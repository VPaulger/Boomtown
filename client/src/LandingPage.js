import React from 'react';
import { Route } from "react-router-dom";

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

const LandingPage = ({
  setCSRFToken,
}) => (
  <div className="landingPage">
    <div className="landingText">
      <h1>BOOMTOWN</h1>
      <h3>Share. Borrow. Prosper.</h3>
    </div>

    <div className="landingForm">
      <Route path="/" exact render={() => (
        <LoginPage setCSRFToken={setCSRFToken} />
      )} />
      <Route path="/sign-up-page" exact render={() => (
        <SignUpPage setCSRFToken={setCSRFToken} />
      )}/>
    </div>
  </div>
);

export default LandingPage;