import { Box, Paper, Skeleton, styled } from '@mui/material';
import * as React from 'react';

interface CardItemProps {
    children: React.ReactNode;
    style: React.CSSProperties;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '0px solid grey',
    margin: '5%',
}));

export default function CardItem({ children, style }: CardItemProps) {
    return <Item style={{
        ...style
    }} elevation={2} >
        {children}
    </Item>;
}