import * as React from 'react';
import { Button, Link, Menu, MenuItem } from '@mui/material';
import {
    ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';
const rightLink = {
    fontSize: 16,
    color: 'gray',
    ml: 3,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '&:hover': {
        color: 'orange',
        borderBottom: '1px solid orange',
        cursor: 'pointer'
    },
};

interface MenuDropDownItemProps {
    label: string;
}

export default function MenuDropDownItem({ label }: MenuDropDownItemProps) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Link
                variant="h6"
                underline="none"
                // href={href}
                onClick={handleClick}
                sx={{ ...rightLink }}
            >
                {label}<ArrowDropDownIcon />
            </Link>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>私隱政策聲明</MenuItem>
                <MenuItem onClick={handleClose}>使用條款</MenuItem>
                <MenuItem onClick={handleClose}>常見問題</MenuItem>
                <MenuItem onClick={handleClose}>免責聲明</MenuItem>
            </Menu>
        </>
    );
}