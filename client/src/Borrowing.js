import React from 'react';

//apollo
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Borrowing = () => {        
    return(
        <Query
            query={gql`
            {
              viewer {
                borrowed {
                  title
                }
              }              
            }   
          `}
        >
            {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            const items = data.viewer.borrowed.map(({ title }) => (
              <div key={title}>
                <h3>{title}</h3> 
              </div>
            ));

            console.log(data);
            return items;

            }}
        </Query>
    )
}

export default Borrowing;