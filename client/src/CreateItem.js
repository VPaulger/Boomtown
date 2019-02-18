import React from 'react';
import Select from "react-select";

//formik & yup
import { Formik } from 'formik';
import * as Yup from 'yup';

//components
import SelectTags from "./SelectTags"

//apollo
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

//material ui
import { Button, TextField } from '@material-ui/core'
// import { createMuiTheme } from '@material-ui/core'


import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  createItemContainer: {
    paddingTop: 50,
    width: '100%',
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
  createItem: {
    paddingTop: 20,
  },
  TextField: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputFeedback: {
    marginTop: 10,
  }
});


const CreateItem = () => {
  const classes = useStyles();
        
    return(
      <div className={classes.createItemContainer}>
        <h2>Create Item:</h2>
        <Mutation
          onError={(error) => {
            alert(error)
          }}
          mutation={gql`
            mutation($item: NewItemInput!) {
              addItem (
                input: $item	
              ) {
                  id
                  title
                  description
                }
            }  
          `}
        >
          {(addItem, { loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
            <div className="app">
              <Formik
                initialValues={{
                  title: '',
                  description: '',
                  tags: [],
                }}
                onSubmit={(values, { setSubmitting }) => {
                  values = {
                    ...values,
                    tags: values.tags.map(t => t.value),
                  };
                  addItem({ variables: {
                    item: values
                  } })
                  // console.log(values);
                  // console.log(data)
                  setSubmitting(false)
                  
                }}
                validationSchema={Yup.object().shape({
                  title: Yup.string()
                    .required('required'),
                  description: Yup.string()
                    .required('required'),
                  tags: Yup.array()
                    .of(
                      Yup.object().shape({
                        label: Yup.string().required(),
                        value: Yup.string().required(),
                      })
                  ),
                })}
              >
                {props => {
                  const {
                    errors, 
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    setFieldTouched,
                    touched,
                    values,                    
                  } = props;
                  return (
                    <form
                      className={classes.form}
                      onSubmit={handleSubmit}
                    >
                      <div className={classes.textContainer}>
                        <div className={classes.TextField}>
                          <TextField
                            label="title"
                            id="title"
                            placeholder="Enter your title"
                            type="text"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ width: '350px', paddingRight: '20px' }}
                            className={
                              errors.title && touched.title
                                ? 'text-input error'
                                : 'text-input'
                            }
                          />
                          {errors.title && touched.title && (
                            <div className={classes.inputFeedback}>{errors.title}</div>
                          )}
                        </div>

                        <div className={classes.TextField}>
                          <TextField
                            label="description"
                            id="description"
                            type="text"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ width: '350px', paddingRight: '20px' }}
                            className={
                              errors.description && touched.description
                                ? 'text-input error'
                                : 'text-input'
                            }
                          />
                          {errors.description && touched.description && (
                            <div className={classes.inputFeedback}>{errors.description}</div>
                          )}
                        </div>


                        <SelectTags
                          value={values.tags}
                          onChange={setFieldValue}
                          // options={options}
                          onBlur={setFieldTouched}
                          error={errors.topics}
                          touched={touched.topics}
                        />

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