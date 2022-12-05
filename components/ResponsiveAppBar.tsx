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
import { Link, Slide } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image'
import LanguageIcon from '@mui/icons-material/LanguageRounded';
import { useI18n } from 'next-localization';

const ResponsiveAppBar = () => {

    const [langShow, setLangShow] = React.useState(false);

    const [nav, setNav] = React.useState(false);
    const [user, setUser] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const router = useRouter();

    const { t } = useI18n();

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
                    <Image alt={'sunny wong dance union'} src={'https://images.ctfassets.net/k5r307sl52db/1DQVJnEJoJVJvs40xGBOeg/c60f47d9679cabc010a08b1659de39e0/logo_black_1_.png'} width={120} height={40} />
                </ListItem>
                <ListItem button onClick={toggleDrawer(false, () => router.push('/'))} style={{ backgroundColor: 'white', borderBottom: '1px black solid' }}>
                    {t('menu.home')}
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
                    <ListItemText primary={t('menu.course')} />
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
                            {t('menu.childCourse')}
                        </ListItem>
                        <ListItem button style={{ paddingLeft: '5%', backgroundColor: 'white' }} onClick={toggleDrawer(false, () => router.push('/openclass'))} >
                            Vibe Open Class
                        </ListItem>
                        <ListItem button style={{ paddingLeft: '5%', backgroundColor: 'white' }} onClick={toggleDrawer(false, () => router.push('/danceCourse'))} >
                            {t('menu.danceBeginnerProgram')}
                        </ListItem>
                        <ListItem button style={{ paddingLeft: '5%', backgroundColor: 'white' }} onClick={toggleDrawer(false, () => router.push('/dance'))} >
                            {t('menu.danceLesson')}
                        </ListItem>

                    </List>
                </Collapse>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/show'))} style={{ backgroundColor: 'white' }}>
                    {t('menu.show')}
                </ListItem>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/art'))} style={{ backgroundColor: 'white' }}>
                    {t('menu.promotion')}
                </ListItem>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/blog'))} style={{ backgroundColor: 'white', color: 'orange' }}>
                    {t('menu.news')}
                </ListItem>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/place'))} style={{ backgroundColor: 'white' }}>
                    {t('menu.renting')}
                </ListItem>
                <Divider />
                <ListItem button onClick={toggleDrawer(false, () => router.push('/contactus'))} style={{ backgroundColor: 'white' }}>
                    {t('menu.contactUs')}
                </ListItem>
                <Divider />
            </List>
        </Box >
    );

    return (
        <AppBar
            position="fixed" style={{ backgroundColor: '#444444', height: 65 }}>
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
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        <Image alt={'sunny wong dance union'} src={'https://images.ctfassets.net/k5r307sl52db/1DQVJnEJoJVJvs40xGBOeg/c60f47d9679cabc010a08b1659de39e0/logo_black_1_.png'} width={100} height={40} />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            style={{
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                router.push('/')
                            }}
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <Image alt={'sunny wong dance union'} src={'https://images.ctfassets.net/k5r307sl52db/1DQVJnEJoJVJvs40xGBOeg/c60f47d9679cabc010a08b1659de39e0/logo_black_1_.png'} width={120} height={40} />
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
                            sx={{
                                my: 2, color: 'white', display: 'block',
                                '&:hover': {
                                    color: 'orange',

                                },
                            }}
                        >
                            {t('menu.home')}
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/sunnywong')
                            }}
                            sx={{
                                my: 2, color: 'white', display: 'block', '&:hover': {
                                    color: 'orange',

                                },
                            }}
                        >
                            Sunny Wong
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/danceunion')
                            }}
                            sx={{
                                my: 2, color: 'white', display: 'block', '&:hover': {
                                    color: 'orange',
                                },
                            }}
                        >
                            Dance Union
                        </Button>
                        <Button
                            onClick={handleOpenUserMenu}
                            endIcon={<ExpandMoreIcon fontSize={'small'} />}
                            sx={{
                                my: 2, color: 'white', '&:hover': {
                                    color: 'orange',

                                },
                            }}
                        >
                            {t('menu.course')}
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/show')
                            }}
                            sx={{
                                my: 2, color: 'white', display: 'block', '&:hover': {
                                    color: 'orange',

                                },
                            }}
                        >
                            {t('menu.show')}
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/art')
                            }}
                            sx={{
                                my: 2, color: 'white', display: 'block', '&:hover': {
                                    color: 'orange',

                                },
                            }}
                        >
                            {t('menu.promotion')}
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/blog')
                            }}
                            sx={{
                                my: 2, color: 'yellow', display: 'block', '&:hover': {
                                    color: 'orange',

                                },
                            }}
                        >
                            {t('menu.news')}
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/place')
                            }}
                            sx={{
                                my: 2, color: 'white', display: 'block', '&:hover': {
                                    color: 'orange',

                                },
                            }}
                        >
                            {t('menu.renting')}
                        </Button>
                        <Button
                            onClick={() => {
                                handleCloseNavMenu();
                                router.push('/contactus')
                            }}
                            sx={{
                                my: 2, color: 'white', display: 'block', '&:hover': {
                                    color: 'orange',

                                },
                            }}
                        >
                            {t('menu.contactUs')}
                        </Button>
                    </Box>
                    <Box>
                        <IconButton onClick={() => {
                            router.push(router.asPath, undefined, { locale: 'zh' })
                        }}>
                            <Typography>
                                <b style={{ color: 'white' }}>
                                    中
                                </b>
                            </Typography>
                        </IconButton>
                        <IconButton onClick={() => {
                            router.push(router.asPath, undefined, { locale: 'en' })

                        }}>
                            <Typography>
                                <b style={{ color: 'white' }}>
                                    EN
                                </b>
                            </Typography>
                        </IconButton>
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
                                    {t('menu.childCourse')}
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleCloseUserMenu();
                                    router.push('/openclass')
                                }}
                            >
                                <Typography textAlign="center" >
                                    Vibe Open Class
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleCloseUserMenu();
                                    router.push('/danceCourse')
                                }}
                            >
                                <Typography textAlign="center" >
                                    {t('menu.danceBeginnerProgram')}
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleCloseUserMenu();
                                    router.push('/dance')
                                }}
                            >
                                <Typography textAlign="center" >
                                    {t('menu.danceLesson')}
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
