import { AppBar, MenuItem, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import { Link } from "react-router-dom";
interface Props {}

const NavBar: React.FC<Props> = ({}) => {
  return (
    <AppBar position="sticky">
      <Toolbar component="nav">
        <MenuItem component={Link} to="/">
          <Typography align="center" variant="button">
            Home
          </Typography>
        </MenuItem>
        <MenuItem component={Link} to="/about">
          <Typography align="center" variant="button">
            About
          </Typography>
        </MenuItem>
        <MenuItem component={Link} to="/topics">
          <Typography align="center" variant="button">
            Topics
          </Typography>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
