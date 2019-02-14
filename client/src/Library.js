import React from 'react';

//apollo
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

//material-ui
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  title: {
    width: '100%',
    height: 100,
    textAlign: 'center',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '500px',
  },
  grid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
  },
  card: {
    width: '250px !important',
    height: '225px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  itemName: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const Library = () => {     
  const classes = useStyles();
   
  return(
    <div className={classes.itemContainer}>
      <div className={classes.title}>
        <h1>Library</h1>
      </div>
      <Grid container spacing={16} className={classes.grid}>
        <Query
            query={gql`
            {
              items(idToOmit:1) {
                id
                title
                description
                tags {
                  id
                  title
                }
                borrower {
                  username
                }
              }             
            }   
          `}
        >
          {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          const items = data.items.map(({ title, description }) => (
            <Grid item>
              <Card className={classes.card}>
                <CardContent >
                  <Typography className={classes.itemName} color="textSecondary" gutterBottom>
                    Name
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    Description
                  </Typography>
                  <Typography component="p">
                    {description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ));

          console.log(data);
          return items;

          }}
        </Query>
      </Grid>
    </div>
  )
}

export default Library;

{/* <Mutation
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
      {(borrowItem, { loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
    
        <Button type="primary" onClick={borrowItem}>Borrow Item</Button>
      }}
    </Mutation> */}