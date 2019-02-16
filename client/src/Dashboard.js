// import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
// import { makeStyles } from '@material-ui/styles';


// import { Route, Link } from 'react-router-dom';

// import MyItems from './MyItems'
// import Borrowing from './Borrowing'
// import Library from './Library'
// import LogoutButton from './LogoutButton'
// import CreateItem from './CreateItem';

// const useStyles = makeStyles({
//   dashboard: {
//     width: '100vw',
//     height: '100vh',
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   main: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//   },
//   list: {
//     background: '#FFFFFF',
//     height: '100vh',
//   },
//   listItem: {
//     width: 250,
//     height: 55,
//   },
//   toolBar: {
//     display: 'flex',
//     justifyContent: 'space-between', 
//     alignItems: 'center',
//     minHeight: '55px !important',
//     background: '#FFFFFF',
//   },
//   content: {
//     display: 'flex',
//     // width: '100%',
//     padding: '20px',
//   },
//   items: {
//     display: 'grid',
//     width: '100%',
//   },
// });


// function Dashboard({
//   setCSRFToken,
//   history,
// }) {
//   const classes = useStyles();

//   return (
//     <div className={classes.dashboard}>

//       <List component="nav" className={classes.list}>
//         <ListItem>
//           <ListItemText primary="Boomtown" />
//         </ListItem>
//         <Divider />
//         <ListItem button component={Link} to="/" selected={history.location.pathname === '/'} className={classes.listItem}>
//           <ListItemText primary="My Items" />
//         </ListItem>
//         <ListItem button component={Link} to="/borrowing" selected={history.location.pathname === '/borrowing'} className={classes.listItem}>
//           <ListItemText primary="Borrowing" />
//         </ListItem>
//         <ListItem button component={Link} to="/library" selected={history.location.pathname === '/library'} className={classes.listItem}>
//           <ListItemText primary="Library" />
//         </ListItem>
//       </List>

//       <div className={classes.main}>
//         <AppBar position="static" color="default">
//           <Toolbar className={classes.toolBar}>
//             <Typography variant="h6" color="inherit">
//               Share. Borrow. Prosper.
//             </Typography>
//             <Route path="/" render={() => (
//               <LogoutButton setCSRFToken={setCSRFToken} />
//             )} />
//           </Toolbar>
//         </AppBar>

//         <div className={classes.content}>
//           <Route path="/" exact render={() => (
//             <div className={classes.items}>
//             <MyItems setCSRFToken={setCSRFToken} />
//             <CreateItem />
//             </div>
//           )} />
//           <Route path="/borrowing" exact render={() => (
//             <Borrowing setCSRFToken={setCSRFToken} />
//           )} />
//           <Route path="/library" exact render={() => (
//             <Library setCSRFToken={setCSRFToken} />
//           )} />
//         </div>
//       </div>

//     </div>
//   );
// }

// // SimpleAppBar.propTypes = {
// //   classes: PropTypes.object.isRequired,
// // };

// export default Dashboard;





import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/styles';

import { Route, Link } from 'react-router-dom';

import MyItems from './MyItems'
import Borrowing from './Borrowing'
import Library from './Library'
import LogoutButton from './LogoutButton'
import CreateItem from './CreateItem';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginTop: 65,
  },
  toolBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  logo: {
    height: 65,
    paddingTop: 0,
  },
}));

function ResponsiveDrawer({
  setCSRFToken,
  history,
},props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
          <List className={classes.logo}>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
            <Toolbar button component={Link} to="/" >
              <Typography color="inherit" >
                Boomtown
              </Typography>
            </Toolbar>
            <Divider />
            <ListItem button component={Link} to="/" selected={history.location.pathname === '/'} className={classes.listItem}>
              <ListItemText primary="My Items" />
            </ListItem>
            <ListItem button component={Link} to="/borrowing" selected={history.location.pathname === '/borrowing'} className={classes.listItem}>
              <ListItemText primary="Borrowing" />
            </ListItem>
            <ListItem button component={Link} to="/library" selected={history.location.pathname === '/library'} className={classes.listItem}>
              <ListItemText primary="Library" />
            </ListItem>
            <Divider />

          </List>
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div className={classes.root}>
    
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <CssBaseline />
      
        
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.toolBar}>
            <Typography variant="h6" color="inherit" noWrap>
              Share. Borrow. Prosper.
            </Typography>
            <Route path="/" render={() => (
              <LogoutButton setCSRFToken={setCSRFToken} />
            )} />
          </div>
        </Toolbar>
      </AppBar>
       
      
      <div className={classes.content}>
        <Route path="/" exact render={() => (
          <div>
            <MyItems setCSRFToken={setCSRFToken} />
            <CreateItem />
          </div>
        )} />
        <Route path="/borrowing" exact render={() => (
          <Borrowing setCSRFToken={setCSRFToken} />
        )} />
        <Route path="/library" exact render={() => (
          <Library setCSRFToken={setCSRFToken} />
        )} />
      </div>

    </div>
  );
}

ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};

export default ResponsiveDrawer;