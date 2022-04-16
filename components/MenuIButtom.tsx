import * as React from 'react';
import { Link } from '@mui/material';

const rightLink = {
    fontSize: 16,
    ml: 3,
    border: '1px orange solid',
    borderRadius: '30px',
    paddingRight: '30px',
    paddingLeft: '30px',
    color: 'orange',
    '&:hover': {
        backgroundColor: 'orange',
        color: 'white',
    },
};

interface MenuAppBarProps {
    href: string;
    label: string;
    style?: React.CSSProperties;
    disable?: boolean
}

export default function MenuBottom({ href, label, style }: MenuAppBarProps) {

    return (
        <Link
            variant="h6"
            underline="none"
            href={href}
            sx={{
                ...rightLink,
                ...style,
            }}
        >
            {label}
        </Link>
    );
}