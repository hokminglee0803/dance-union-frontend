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
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image'

const ResponsiveAppBar = () => {
    const [nav, setNav] = React.useState(false);
    const [user, setUser] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const router = useRouter();

    const handleOpenNavMenu = (event) => {
        setNav(true);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setNav(false);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const toggleDrawer = (open, route?: () => void) => (event) => {
        route && route();
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setNav(open);
    };


    const list = () => (
        <Box
            sx={{ width: 'auto' }}
            style={{ backgroundColor: '#333333' }}
            role="presentation"
            // onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button onClick={toggleDrawer(false, () => router.push('/'))} style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#333333' }}>
                    <Link href='/'>
                        <Image alt={'sunny wong dance union'} src={'https://images.ctfassets.net/k5r307sl52db/7kOMaN5hSsCRv0WM3Rm1V4/0402c1b26019544ee674f70f100f3bb4/logo_web.png'} width={30} height={30} />
                    </Link>
                </ListItem>
                <ListItem button onClick={toggleDrawer(false, () => router.push('/'))} style={{ backgroundColor: 'white', borderBottom: '1px black solid' }}>
                    Home
                </ListItem>
                <ListItem button onClick={toggleDrawer(false, () => router.push('/sunnywong'))} style={{ backgroundColor: 'white' }}>
                    Sunny Wong
                </ListItem>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/danceunion'))} style={{ backgroundColor: 'white' }}>
                    Dance Union
                </ListItem>
                <Divider />
                <ListItem button onClick={() => setUser(!user)} style={{ backgroundColor: 'white' }}>
                    <ListItemText primary="課程" />
                    {user ? (
                        <ExpandLessIcon />
                    ) : (
                        <ExpandMoreIcon />
                    )}
                </ListItem>
                <Collapse
                    in={user}
                    timeout="auto"
                    unmountOnExit
                >
                    <List component="div" disablePadding>
                        <ListItem button style={{ paddingLeft: '5%', backgroundColor: 'white' }} onClick={toggleDrawer(false, () => router.push('/course'))} >
                            兒童及青少年課程
                        </ListItem>
                        <ListItem button style={{ paddingLeft: '5%', backgroundColor: 'white' }} onClick={toggleDrawer(false, () => router.push('/openclass'))} >
                            Open Class
                        </ListItem>
                    </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/show'))} style={{ backgroundColor: 'white' }}>
                    演出邀請
                </ListItem>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/art'))} style={{ backgroundColor: 'white' }}>
                    文化藝術推廣
                </ListItem>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/blog'))} style={{ backgroundColor: 'white' }}>
                    最新消息
                </ListItem>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/place'))} style={{ backgroundColor: 'white' }}>
                    場地租借
                </ListItem>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/contactus'))} style={{ backgroundColor: 'white' }}>
                    聯絡我們
                </ListItem>
            </List>
        </Box >
    );

    return (
        <AppBar
            position="fixed" style={{ backgroundColor: '#333333', height: 55 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            handleCloseNavMenu();
                            router.push('/')
                        }}
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <Image alt={'sunny wong dance union'} src={'https://images.ctfassets.net/k5r307sl52db/7kOMaN5hSsCRv0WM3Rm1V4/0402c1b26019544ee674f70f100f3bb4/logo_web.png'} width={40} height={40} />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <Image alt={'sunny wong dance union'} src={'https://images.ctfassets.net/k5r307sl52db/7kOMaN5hSsCRv0WM3Rm1V4/0402c1b26019544ee674f70f100f3bb4/logo_web.png'} width={40} height={40} />
                        </Typography>
                    </Box>
                    <SwipeableDrawer
                        anchor={'top'}
                        open={nav}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        {list()}
                    </SwipeableDrawer>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                        }}
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/');
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/sunnywong')
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Sunny Wong
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/danceunion')
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Dance Union
                        </Button>
                        <Button
                            onClick={handleOpenUserMenu}
                            endIcon={<ExpandMoreIcon fontSize={'small'} />}
                            style={{ color: 'white' }}
                        >
                            課程
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/show')
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            演出邀請
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/art')
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            文化藝術推廣
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/blog')
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            最新消息
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/place')
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            場地租借
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/contactus')
                            }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            聯絡我們
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
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
                            <MenuItem
                                onClick={() => {
                                    handleCloseUserMenu();
                                    router.push('/course')
                                }}
                            >
                                <Typography textAlign="center" >
                                    兒童及青少年課程
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleCloseUserMenu();
                                    router.push('/openclass')
                                }}
                            >
                                <Typography textAlign="center" >
                                    Open Class
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
