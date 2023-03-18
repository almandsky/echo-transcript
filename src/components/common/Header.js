import React, { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";

import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";

import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";


import { NavLink, useLocation } from "react-router-dom";

import routes from './routes';


const Header = (props) => {
    const { isAuthenticated, login, logout, userHasScopes, getProfile } = props.auth || {};

    const location = useLocation();
    const activeStyle = { color: "#1976D2" };
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const loadUserProfile = () => {
        getProfile((profile) =>
            setProfile(profile)
        );
    };

    useEffect(() => {
        if (isAuthenticated && isAuthenticated()) {
            loadUserProfile();
        } else {
            setTimeout(()=> {
                if (isAuthenticated()) {
                    loadUserProfile();
                }
            }, 1000);
        }
    }, []);


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
                    isAuthenticated && isAuthenticated() ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="User Profile">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={profile?.nickname} src={profile?.picture} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={logout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Button color="inherit" onClick={login}>Login</Button>
                    )
                }

            </Toolbar>
        </AppBar>
    );
};

export default Header;
