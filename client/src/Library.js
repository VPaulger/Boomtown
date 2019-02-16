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
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

//components
import BorrowItemButton from './BorrowItemButton'


const useStyles = makeStyles({
  title: {
    width: '100%',
    height: 100,
    textAlign: 'center',
  },
  itemContainer: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    height: '100vh',
    marginTop: 65,
    // position: 'relative',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
  },
  card: {
    width: '250px !important',
    height: '250px',
  },
  itemName: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  borrowButton: {
    background: '#000000',
    color: '#FFFFFF',
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

          const items = data.items.map(({ id, title, description, borrower }) => (
            <Grid item>
              <Card className={classes.card} style={{background: borrower ? '#D62426' : '#FFFFFF'}}>
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
                  <BorrowItemButton id={id} />
                </CardActions>
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

export default Library;