import React from 'react';

//react select
import Select from "react-select";

//apollo
import { Query } from "react-apollo";
import gql from "graphql-tag";


const SelectTags = () => {
  return (
    <Query
      query={gql`
        {
          tags {
            id
            title
          }
        }    
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        const options = data.tags.map(({ id, title }) => (
            {value: id, label: title}
        ));
    
        return (
          <div style={{ margin: "1rem 0", color: "black", width: 300 }}>
            <Select
              id="color"
              isMulti
              options={options}
            />
          </div>
        )
      }}
    </Query>
  )
}

export default SelectTags;