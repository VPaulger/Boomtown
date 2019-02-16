import React from 'react';

//apollo
import { Query } from "react-apollo";
import gql from "graphql-tag";

//material-ui
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles({
  title: {
    marginTop: 50,
    width: '100%',
    height: 100,
    textAlign: 'center',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'auto',
  },
  grid: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
  },
  card: {
    width: '250px !important',
    height: 225,
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


const MyItems = () => {
  const classes = useStyles();

  return(
    <div className={classes.itemContainer}>
      <div className={classes.title}>
        <h1>My Items Page</h1>
      </div>
    
      <Grid container spacing={16} className={classes.grid}>
        <Query
            query={gql`
            {
              viewer {
                id
                username
                items {
                  title
                  tags {
                    id
                    title
                  }
                description
                }
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

              const items = data.viewer.items.map(({ title, description }) => (
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
                  </Card>
                </Grid>
              ));

              return items;

            }}
        </Query>
      </Grid>

    </div>
  )
}

export default MyItems;