import React from 'react';

//material ui
import { Button } from '@material-ui/core'

//apollo
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const BorrowItemButton = ({id}) => (
    <div>
      <Mutation
          onError={(error) => {
            alert(error)
          }}
          mutation={gql`
            mutation($borrower: NewBorrowerInput!) {
              addBorrower (
                input: $borrower
              ) {
                id
                borrower {
                  username
                }
              }
            }  
          `}
        >
          {(borrowItem, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
            console.log(data)
            return (
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  borrowItem({ variables: { borrower: { itemID: id }} })
                }}
                // onSubmit={(values, { setSubmitting }) => {
                //   borrowItem({ variables: { borrower: { item: ___, borrowerID: __ }} })
                //   // console.log(values);
                //   console.log(data)
                //   setSubmitting(false);
                // }}
              >
                Borrow
              </Button>
            )
          }}
      </Mutation>
    </div>
);

export default BorrowItemButton;