import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import routes from './routes';
import AuthContext from "../AuthContext";

const Header = () => {
    const location = useLocation();
    const activeStyle = { color: "#1976D2" };
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const isHomePage = location.pathname === '/';

    return (
        <AuthContext.Consumer>
            {auth => (
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            Object.keys(routes).map((key) => {
                                return (
                                    <MenuItem
                                        key={key}
                                        onClick={handleClose}
                                        component={NavLink}
                                        to={key}
                                        activeStyle={activeStyle}
                                        exact={key === '/'}
                                    >
                                        {routes[key]}
                                    </MenuItem>
                                )
                            })
                        }
                    </Menu>
                    <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                        {routes[location.pathname]}
                    </Typography>
                    {
                        isHomePage ? null :
                            auth?.isAuthenticated && auth?.isAuthenticated() ? (
                                <Button color="inherit" onClick={auth?.logout}>Logout</Button>
                            ) : (
                                <Button color="inherit" onClick={auth?.login}>Login</Button>
                            )
                    }
                </Toolbar>
            </AppBar>
            )}
        </AuthContext.Consumer>
    );
};

export default Header;
