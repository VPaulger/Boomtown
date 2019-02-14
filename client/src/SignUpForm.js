import React from 'react';

//formik & yup
import { Formik } from 'formik';
import * as Yup from 'yup';

//apollo
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
    fontSize: '4px !important',
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

const SignUpForm = ({
  setCSRFToken,
}) => {

  const classes = useStyles();

  return (
    <Mutation
      onCompleted={(data) => {
        console.log('csrfToken:', data.signup.csrfToken)
        setCSRFToken(data.signup.csrfToken)
        localStorage.setItem('token', data.signup.csrfToken)
      }}
      onError={(error) => {
        alert(error)
      }}
      mutation={gql`
        mutation($username: String!, $email: String!, $password: String!) {
          signup (
            input: {
              username: $username,
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
      {(signUpUser, { loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        return (
        <div className="app">
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: ''
            }}
            onSubmit={(values, { setSubmitting }) => {
              signUpUser({ variables: values })
              // console.log(values);
              // console.log(data)
              setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .required('required'),
              email: Yup.string()
                .email()
                .required('required'),
              password: Yup.string()
                .min(8, 'Password is too short - minimum 8 characters.')
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
                    label="Username"
                    id="username"
                    placeholder="Enter your username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // style={{ width: '100%', marginBottom: 16 }}
                    className={`
                      ${classes.textField}
                      ${errors.username && touched.username
                        ? 'text-input error'
                        : 'text-input'
                      }
                    `}
                  />
                  {errors.username && touched.username && (
                    <div className="inputFeedback">{errors.username}</div>
                  )}

                  <TextField
                    label="Email"
                    id="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // style={{ width: '100%', marginBottom: 16  }}
                    className={`
                      ${classes.textField}
                      ${errors.email && touched.email
                        ? 'text-input error'
                        : 'text-input'
                      }
                    `}
                  />
                  {errors.email && touched.email && (
                    <div className="inputFeedback">{errors.email}</div>
                  )}

                  <TextField
                    label="Password"
                    id="password"
                    placeholder="Enter your password"
                    type="text"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // style={{ width: '100%', marginBottom: 16  }}
                    className={`
                      ${classes.textField}
                      ${errors.password && touched.password
                        ? 'text-input error'
                        : 'text-input'
                      }
                    `}
                  />
                  {errors.password && touched.password && (
                    <div className="inputFeedback">{errors.password}</div>
                  )}


                  <br />
                  <div className={classes.landingLinks}>  
                    <Button 
                      type="submit"
                      color="primary"
                      disabled={isSubmitting} 
                      variant="contained" 
                    >
                      Create Account
                    </Button>
                    <Link className={classes.toLoginPage} to="/">Login to existing account.</Link>
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

export default SignUpForm;
