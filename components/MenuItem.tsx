import * as React from 'react';
import { Link } from '@mui/material';

const rightLink = {
    fontSize: 16,
    color: 'gray',
    ml: 3,
    '&:hover': {
        color: 'orange',
        borderBottom: '1px solid orange',
    },
};

interface MenuAppBarProps {
    href: string;
    label: string;
}

export default function MenuItem({ href, label }: MenuAppBarProps) {

    return (
        <Link
            variant="h6"
            underline="none"
            href={href}
            sx={{ ...rightLink }}
        >
            {label}
        </Link>
    );
}