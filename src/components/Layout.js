import { ClassNames, ThemeProvider } from "@emotion/react";
import { makeStyles } from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import { SubjectOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";
import { useHistory, useLocation } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { format } from "date-fns";
import { typography } from "@mui/system";
import { Typography } from "@mui/material";
import { Avatar } from "@mui/material";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `cal(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <div className={classes.root}>
      {/*app bar*/}
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <typography className={classes.date}>
            Today is the {format(new Date(), "do MMMM Y")}
          </typography>
          <Typography>Mansi</Typography>
          <Avatar src="/klaus-av.png" />
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <typography variant="h5" className={classes.title}>
            NOTES
          </typography>
        </div>

        {/*list / links */}
        <list>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </list>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
