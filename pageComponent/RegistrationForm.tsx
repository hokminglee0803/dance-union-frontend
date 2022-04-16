import * as React from 'react';
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, Input, InputAdornment, InputBase, InputLabel, Link, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AccountCircle as AccountCircleIcon, Password as PasswordIcon } from '@mui/icons-material';
import InputField from '../components/InputField';
import StyledButtonTwo from '../components/Button/StyledButtonTwo';
import StyledButtonThree from '../components/Button/StyledButtonThree';
import StyledButtonOne from '../components/Button/StyledButtonOne';
import SocialLoginButton from '../components/SocialLoginButton';
import RadioInputField from '../components/RadioInputField';

export default function RegistrationForm() {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{
                width: isDesktop ? '80%' : '90%',
                margin: 'auto',
                marginTop: '10%',
                marginBottom: '10%'
            }}
        >
            <Paper
                elevation={1}
                style={{
                    borderRadius: '15px 15px 15px 15px',
                    background: 'white',
                    width: '70%',
                    border: '3px solid orange'
                }}>
                <Typography style={{
                    color: 'orange',
                    width: '90%',
                    margin: 'auto',
                    marginTop: '10%'
                }}>
                    <h2 style={{
                        borderLeft: '20px solid orange'
                    }}>
                        &nbsp; 新帳戶註冊
                    </h2>
                </Typography>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                        width: '85%',
                        margin: 'auto',
                        marginBottom: '10%'
                    }}
                >
                    <Box component="form"
                        // onSubmit={handleSubmit}
                        noValidate sx={{ mt: 1 }}>
                        <InputField
                            label='登入電郵'
                            name='email'
                            autoComplete='email'
                            type="email"
                            placeholder='登入電郵'
                            icon={<AccountCircleIcon fontSize='medium' />}
                        />
                        <InputField
                            label='手提電話'
                            name='mobile'
                            required
                            type="tel"
                            placeholder='手提電話'
                            icon={<PasswordIcon fontSize='medium' />}
                        />
                        <InputField
                            label='密碼'
                            name='password'
                            autoComplete='current-password'
                            required
                            type="password"
                            placeholder='密碼'
                            icon={<PasswordIcon fontSize='medium' />}
                        />
                        <InputField
                            label='確認密碼'
                            name='repassword'
                            autoComplete='current-password'
                            required
                            type="password"
                            placeholder='確認密碼'
                            icon={<PasswordIcon fontSize='medium' />}
                        />

                        <RadioInputField
                            name={'本人已閱覽並同意有關使用條款，免責聲明及私隱政策聲明。如違反有關條款及聲明，本人明白「好義配」義工網站有權暫停或終止本人的帳號。本人明白及同意登記成為「好義配」義工同時，將自動加入成為「青協會員/青協之友及青協義工」，並受有關條款及細則約束。'} />

                        <div style={{
                            // margin: '10%'
                            height: '100'
                        }}>
                            <StyledButtonOne
                                label={'註冊'}
                                onClick={() => {
                                    console.log('Login');
                                }}
                            />
                        </div>
                    </Box>
                </Grid>
            </Paper>
        </Grid>

    );
}