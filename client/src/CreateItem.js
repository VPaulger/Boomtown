import React from 'react';

//formik & yup
import { Formik } from 'formik';
import * as Yup from 'yup';

//apollo
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

//material ui
import { Button, TextField } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core'


import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  createItemContainer: {
    width: 800,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  textContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    // margin: 10,
    alignSelf: 'flex-end',
  },
});


const CreateItem = () => {
  const classes = useStyles();
        
    return(
      <div className={classes.createItemContainer}>
        <h1>Create Items Page</h1>
        <Mutation
          // update={(cache, { data: { addTodo } }) => {
          //   const { todos } = cache.readQuery({ query: GET_TODOS });
          //   cache.writeQuery({
          //     query: GET_TODOS,
          //     data: { todos: todos.concat([addTodo]) },
          //   });
          // }}
          onError={(error) => {
            alert(error)
          }}
          mutation={gql`
            mutation($title: String!, $description: String!) {
              addItem (
                input: {
                  title: $title,
                  description: $description,
                } 	
              ) {
                  title
                  description
                }
            }  
          `}
        >
          {(signUpUser, { loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            console.log('adding item', data)
            return (
            <div className="app">
              <Formik
                initialValues={{
                  title: '',
                  description: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                  signUpUser({ variables: values })
                  // console.log(values);
                  // console.log(data)
                  setSubmitting(false);
                }}
                validationSchema={Yup.object().shape({
                  title: Yup.string()
                    .required('required'),
                  description: Yup.string()
                    .required('required'),
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
                      <div className={classes.textContainer}>
                        <TextField
                          label="title"
                          id="title"
                          placeholder="Enter your title"
                          type="text"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ width: '390px' }}
                          className={
                            errors.title && touched.title
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.title && touched.title && (
                          <div className="input-feedback">{errors.title}</div>
                        )}

                        <TextField
                          label="description"
                          id="description"
                          type="text"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{ width: '390px' }}
                          className={
                            errors.description && touched.description
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.description && touched.description && (
                          <div className="input-feedback">{errors.description}</div>
                        )}
                      </div>

                      <br />
                      <Button 
                        type="submit"
                        color="primary"
                        disabled={isSubmitting} 
                        variant="contained" 
                        className={classes.button}
                      >
                        Add Item
                      </Button>
                    </form>
                  );
                }}
              </Formik>
            </div>
          )}}
        </Mutation>
      </div>
    )
}

export default CreateItem;