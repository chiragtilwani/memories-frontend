import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { GiRiver } from 'react-icons/gi'
import Sizes from '../../styles/Sizes'
import { makeStyles } from '@mui/styles'
import { NavLink, Link,useNavigate } from 'react-router-dom'
import {DispatchContext} from '../../context/UserContext'
import {useContext} from 'react'


const useStyles = makeStyles({
    river_icon_1: {
        marginRight: '1rem',
        fontSize: '2.3rem',
        display: 'flex',
        [Sizes.down('md')]: {
            display: 'none',
        }
    },
    river_icon_2: {
        marginRight: '1rem',
        fontSize: '2.3rem',
        display: 'none',
        [Sizes.down('md')]: {
            display: 'flex',
        }
    },
    active: {
        fontWeight: 'bolder',
        fontSize: '1.2rem',
        letterSpacing: '.2rem',
        transitionDuration: '.1s',
    },
    navLink: {
        textDecoration: 'none',
        color: 'black'
    },
    Link: {
        textDecoration: 'none',
        padding: '1rem 3rem',
        width: '100%',
        margin: '0rem',
        height: '100%',
        color: 'black',
    }
})

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const classes = useStyles()

    const navigate=useNavigate()

    const {isLoggedIn,logout}=useContext(DispatchContext);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function handleLogout(){
        logout();
        navigate('/')
    }
    return (
        <AppBar position="sticky">
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <GiRiver className={classes.river_icon_1} />
                    <Link to='/' style={{color:'white',textDecoration: 'none'}}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                fontSize: '2.3rem'
                            }}
                        >
                            MEMORIES
                        </Typography>
                    </Link>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu} style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                <Link to="/" className={classes.Link}><Typography textAlign="center">Places</Typography></Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Link to="/users" className={classes.Link}><Typography textAlign="center" >Users</Typography></Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Link to="/add-place" className={classes.Link}><Typography textAlign="center" >Add Place</Typography></Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <GiRiver className={classes.river_icon_2} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MEMORIES
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <NavLink to='/' style={{ color: '#f1faee', textDecoration: 'none', padding: '1.5rem' }} className={navData => navData.isActive ? classes.active : null}>Places</NavLink>
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <NavLink to='/users' style={{ color: '#f1faee', textDecoration: 'none', padding: '1.5rem' }} className={navData => navData.isActive ? classes.active : null}>Users</NavLink>
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <NavLink to='/add-place' style={{ color: '#f1faee', textDecoration: 'none', padding: '1.5rem' }} className={navData => navData.isActive ? classes.active : null}>Add Place</NavLink>
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                            {isLoggedIn&&<MenuItem onClick={handleCloseUserMenu}>
                                <Link to="/profile" className={classes.Link}><Typography textAlign="center">Profile</Typography></Link>
                            </MenuItem>}
                            {!isLoggedIn&&<MenuItem onClick={handleCloseUserMenu}>
                                <Link to="/login" className={classes.Link}><Typography textAlign="center">Login</Typography></Link>
                            </MenuItem>}
                            {!isLoggedIn&&<MenuItem onClick={handleCloseUserMenu}>
                                <Link to="/signup" className={classes.Link}><Typography textAlign="center">Signup</Typography></Link>
                            </MenuItem>}
                            {isLoggedIn&&<MenuItem onClick={handleCloseUserMenu}>
                                <Link to="" className={classes.Link} onClick={handleLogout}><Typography textAlign="center">Logout</Typography></Link>
                            </MenuItem>}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
