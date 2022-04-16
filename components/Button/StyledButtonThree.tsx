import * as React from 'react';
import { Link } from '@mui/material';
import styles from '../../styles/Button.module.scss';

interface ButtonProps {
    href: string;
    label: string;
}

export default function StyledButtonThree({
    href,
    label
}: ButtonProps) {
    return (
        <div style={{
            margin: '8% 10% 8% 5%',
            float: 'right'
        }}>
            <a className={styles.StyledButtonThree}>
                {label}
            </a>
        </div>
    );
}