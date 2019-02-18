import React from 'react';

//apollo
import { Query } from "react-apollo";
import gql from "graphql-tag";

const UserGreeting = () => {        
    return(
        <Query
            query={gql`
            {
              viewer {
                username
              }              
            }   
          `}
        >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return (
                <h1>Welcome {data.viewer.username}.</h1>
              )
            }}
        </Query>
    )
}

export default UserGreeting;