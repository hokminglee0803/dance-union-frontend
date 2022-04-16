import * as React from 'react';
import { Link } from '@mui/material';
import styles from '../../styles/Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
    label: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

export default function StyledButtonTwo({
    label,
    onClick,
    style
}: ButtonProps) {
    return (
        <>
            <div onClick={onClick}
                className={clsx(
                    styles.StyledButtonTwo,
                    styles.fromLeft,
                    style
                )}>
                {label}
            </div>
        </>
    );
}