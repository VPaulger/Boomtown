import React, { useState } from 'react'

//react router
import { BrowserRouter as Router, Route } from "react-router-dom"

//apollo
import { ApolloProvider} from "react-apollo"
import apolloClient from './apolloClient'

//components
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'

//material-ui
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core';


const initialCSRFToken = localStorage.getItem('token')

  
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#666666',
      main: '#212121',
      dark: '#000000',
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

const App = (props) => {

  const [csrfToken, setCSRFToken] = useState(initialCSRFToken)

  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <div>
            
            { csrfToken == null && ( 
              <LandingPage setCSRFToken={setCSRFToken}/>
            )}
            { csrfToken != null && (
              <Route path="/" render={({history}) => (
                <Dashboard setCSRFToken={setCSRFToken} history={history}/>
              )} /> 
            )}

          </div>
        </ThemeProvider>
      </ApolloProvider>
    </Router>
  )
}


export default App;
