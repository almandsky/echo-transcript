import React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";


import { NavLink, useLocation } from "react-router-dom";


const Header = () => {
    const location = useLocation();
    const activeStyle = { color: "#1976D2" };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClick = (event) => {
        setOpen(true);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const routes = {
        '/': "Echo Transcript",
        '/talkgpt': "Talk to GPT",
        '/about': "About"
    }

    return (
        <AppBar position="static">
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
                    open={open}
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
            </Toolbar>
        </AppBar>
    );
};

export default Header;
