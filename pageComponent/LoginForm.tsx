import * as React from 'react';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, Input, InputAdornment, InputBase, InputLabel, Link, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AccountCircle as AccountCircleIcon, Password as PasswordIcon } from '@mui/icons-material';
import InputField from '../components/InputField';
import StyledButtonTwo from '../components/Button/StyledButtonTwo';
import StyledButtonThree from '../components/Button/StyledButtonThree';
import StyledButtonOne from '../components/Button/StyledButtonOne';
import SocialLoginButton from '../components/SocialLoginButton';

enum socialType {
    GOOGLE,
    FACEBOOK
}

export default function LoginForm() {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const CustomInputComponent = ({ inputRef, ...rest }) => (
        <Paper
            component="form"
            elevation={0}
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                margin: 'auto',
                border: '2px solid orange',
                borderRadius: '30px',
            }}
        >
            {/* <IconButton
        disableTouchRipple
        disableRipple
        sx={{ p: '10px', color: 'orange' }}>
        <SearchIcon />
    </IconButton> */}
            <InputBase
                ref={inputRef}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
            />
        </Paper>
    );

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{
                width: '80%',
                margin: 'auto',
                marginTop: '10%',
                marginBottom: '10%'
            }}
        >
            <Grid
                xs={12}
                item>
                <Container
                    maxWidth="xs"
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'orange',
                            marginBottom: '3%'
                        }}
                        component="h1">
                        <h3>
                            現有用戶登入
                        </h3>
                    </Typography>
                    <SocialLoginButton
                        type={socialType.GOOGLE} />
                    <SocialLoginButton
                        type={socialType.FACEBOOK} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'orange'
                        }}
                    >
                        <Typography component="h3">
                            <b>
                                或
                            </b>
                        </Typography>
                        <Box component="form"
                            // onSubmit={handleSubmit}
                            noValidate sx={{ mt: 1 }}>
                            <InputField
                                name='email'
                                autoComplete='email'
                                type="email"
                                placeholder='登入電郵'
                                icon={<AccountCircleIcon fontSize='medium' />}
                            />
                            <InputField
                                name='password'
                                autoComplete='current-password'
                                required
                                type="password"
                                placeholder='密碼'
                                icon={<PasswordIcon fontSize='medium' />}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox value="remember" color="default"
                                    />}
                                label="記住我"
                            />

                            <div style={{
                                // margin: '10%'
                                height: '100'
                            }}>
                                <StyledButtonOne
                                    label={'登入'}
                                    onClick={() => {
                                        console.log('Login');
                                    }}
                                />
                            </div>

                            <Grid
                                style={{
                                    marginTop: '5%'
                                }}
                                container>
                                <Grid item xs>
                                    <Link href="#">
                                        重設密碼
                                    </Link>

                                </Grid>
                                <Grid item>
                                    <Link href="#">
                                        新用戶登記
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Grid>


        </Grid>

    );
}