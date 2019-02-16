import React from 'react';

//formik & yup
import { Formik } from 'formik';
import * as Yup from 'yup';

//apollo
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

//router
import { Link } from 'react-router-dom';

//material ui
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
  form: {
    width: 400,
  },
  textField: {
    width: '100%',
    // marginTop: 16,
    marginBottom: 16,
  },
  inputFeedback: {
    marginTop: -16,
    fontSize: 14,
  },
  landingLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  toLoginPage: {
    padding: '1px 6px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.845rem',
    fontWeight: '400',
    fontFamily: 'Helvetica',
    lineHeight: '1.46429em',
  },
});

const LoginForm = ({
  setCSRFToken,
}) => {
 
  const classes = useStyles();

  return (
    <Mutation
      onCompleted={(data) => {
        console.log('csrfToken:', data.login.csrfToken)
        setCSRFToken(data.login.csrfToken)
        localStorage.setItem('token', data.login.csrfToken)
      }}
      onError={(error) => {
        alert(error)
      }}
      mutation={gql`
        mutation($email: String!, $password: String!)  {
          login (
            input: {
              email: $email,
              password: $password
            }
          ) {
            user {
              username
            }
            csrfToken
          }
        }  
      `}
    >
      {(loginUser, { loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
        <div className="app">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={(values, { setSubmitting }) => {
              loginUser({ variables: values })
              setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email()
                .required('required'),
              password: Yup.string()
                .required('required')
            })}
          >
            {props => {
              const {
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                touched,
                values
              } = props;
              return (
                <form
                  className={classes.form}
                  onSubmit={handleSubmit}
                >
      
                  <TextField
                    label="Email"
                    id="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // style={{ width: '100%', marginBottom: 16 }}
                    className={`
                      ${classes.textField}
                      ${errors.email && touched.email
                        ? 'text-input error'
                        : 'text-input'
                      }
                    `}
                  />
                  {errors.email && touched.email && (
                    <div className={classes.inputFeedback}>{errors.email}</div>
                  )}

                  <TextField
                    label="Password"
                    id="password"
                    type="text"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // style={{ width: '100%', marginBottom: 16 }}
                    className={`
                    ${classes.textField}
                    ${errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                    }
                  `}
                  />
                  {errors.password && touched.password && (
                    <div className={classes.inputFeedback}>{errors.password}</div>
                  )}

                  <br />
                  <div className="landingLinks">    
                    <Button 
                      type="submit"
                      color="primary"
                      disabled={isSubmitting} 
                      variant="contained" 
                    >
                      Enter
                    </Button>
                    <Link to="/sign-up-page">Create an account.</Link>
                  </div>

                </form>
              );
            }}
          </Formik>
        </div>
      )}}
    </Mutation>
  );
}

export default LoginForm;
