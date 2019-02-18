import React from 'react';

//material ui
import { Button } from '@material-ui/core'

//apollo
import { Mutation } from "react-apollo";
import gql from "graphql-tag";


const ReturnItemButton = (props) => (
    <div>
      {console.log('this is the id', props.itemID)}

      <Mutation
          onError={(error) => {
            alert(error)
          }}
          mutation={gql`
            mutation($itemID: NewReturnInput!) {
              returnItem (
                input: $itemID
              ) {
                id
                title
              }
            }  
          `}
        >
          {(returnItem, { loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
            console.log("id:", props.itemID)
            return (
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  returnItem({ variables: { itemID: props.itemID }})
                  window.location = '/borrowing'
                }}
              >
                Return
              </Button>
            )
          }}
      </Mutation>
    </div>
);

export default ReturnItemButton;