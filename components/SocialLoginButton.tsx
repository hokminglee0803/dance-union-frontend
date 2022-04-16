import * as React from 'react';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { Facebook as FacebookIcon, Google as GoogleIcon } from '@mui/icons-material';

enum socialType {
    GOOGLE,
    FACEBOOK
}

interface SocialLoginButtonProps {
    type: socialType;
}

export default function SocialLoginButton({ type }: SocialLoginButtonProps) {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    let icon;
    let label;
    let color;

    switch (type) {
        case socialType.FACEBOOK:
            icon = <FacebookIcon fontSize='inherit' />;
            label = 'Facebook 登入';
            color = '#4267B2';
            break;
        case socialType.GOOGLE:
            icon = <GoogleIcon fontSize='inherit' />;
            label = 'Gmail 登入';
            color = '#DB4437';
            break;
    }

    return (
        <Button
            disableElevation
            disableRipple
            sx={{
                background: color,
                color: 'white',
                width: '100%',
                paddingTop: '15px',
                paddingBottom: '15px',
                fontSize: 20,
                borderRadius: '15px',
                '&:hover': {
                    background: 'none',
                },
                marginBottom: '3%'
            }}
            // variant="contained"
            startIcon={icon}>
            {label}
        </Button>

    );
}