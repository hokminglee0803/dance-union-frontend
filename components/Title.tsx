import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useMediaQuery, useTheme } from '@mui/material';
import MenuItem from './MenuItem';
import MenuBottom from './MenuIButtom';

interface TitleProps {
    title: string;
    buttons: React.ReactNode;
}

export default function Title({ title, buttons }: TitleProps) {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <div>
            <Toolbar
                sx={{ justifyContent: 'space-between' }}
                style={{
                    margin: "auto",
                    borderBottom: '5px solid orange',
                    background: 'white',
                    padding: 0,
                    width: isDesktop ? '80%' : '90%'
                }}
            >
                <div
                    style={{
                        fontSize: 30,
                        fontWeight: '400',
                        color: 'orange'
                    }}>
                    {title}
                </div>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    {buttons}
                </Box>
            </Toolbar>
        </div>
    );
}