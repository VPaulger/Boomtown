import React from 'react';

//material ui
import { Button } from '@material-ui/core'

import { createMuiTheme } from '@material-ui/core'

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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const LogoutButton = ({
  setCSRFToken,
}) => (
    <div className = "logout">
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Button 
        // variant="contained" 
        color="primary"
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