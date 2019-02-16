import React from 'react';

//material ui
import { Button } from '@material-ui/core'

import { Link } from 'react-router-dom'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    height: 36,
  },
  input: {
    display: 'none',
  },
});

const LogoutButton = ({
  setCSRFToken,
}) => (
    <div className = "logout">
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Button 
        variant="contained" 
        color="secondary"
        className={styles.button}
        onClick={() => {
          localStorage.removeItem('token')
          setCSRFToken(null)
      }}>
        Logout
      </Button>
    </Link>
    </div>
);

export default LogoutButton;