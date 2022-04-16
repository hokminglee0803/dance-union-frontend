import * as React from 'react';
import { Link } from '@mui/material';
import styles from '../../styles/Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
    label: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

export default function StyledButtonOne({
    label,
    onClick,
    style
}: ButtonProps) {
    return (
        <div
            onClick={onClick}
            className={clsx(
                styles.StyledButtonOne,
                style
            )}>
            <span>
                {label}
            </span>
            <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
        </div>
    );
}