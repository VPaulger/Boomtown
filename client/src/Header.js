import React from 'react';

import LogoutButton from './LogoutButton'

const Header = ({
  setCSRFToken,
}) => (
  <div>
    This Is the Header Yo.

    <LogoutButton setCSRFToken={setCSRFToken}/>
  </div>

);

export default Header;