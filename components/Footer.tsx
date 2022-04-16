import * as React from 'react';
import { Box, Container, Grid, Link, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Facebook as FacebookIcon, Twitter as TwiiterIcon } from '@mui/icons-material';

const Copyright = () => {
    return (
        <React.Fragment>
            版權屬XXXXXX擁有
            {'© '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

const iconStyle = {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'warning.main',
    mr: 1,
    '&:hover': {
        bgcolor: 'warning.dark',
    },
};

export default function Footer() {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Typography
            component="footer"
            sx={{ display: 'flex', bgcolor: 'rgb(255, 242, 218)' }}
        >
            <Container sx={{ my: 8, display: 'flex' }}>
                <Grid container spacing={5}>
                    <Grid item xs={6} sm={4} md={3}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ height: 120 }}
                        >
                            <Grid item sx={{ display: 'flex' }}>
                                <Box component="a" href="https://mui.com/" sx={iconStyle}>
                                    <FacebookIcon />
                                </Box>
                                <Box component="a" href="https://twitter.com/MUI_hq" sx={iconStyle}>
                                    <TwiiterIcon />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Copyright />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    );
}