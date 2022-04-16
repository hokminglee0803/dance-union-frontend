import { FormControl, InputBase, InputAdornment, InputLabel } from '@mui/material';
import * as React from 'react';

interface InputFieldProps {
    name: string;
    label: string;
    autoComplete?: string;
    type: string;
    placeholder: string;
    required?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function InputField({ name, label, autoComplete, type, placeholder, required, icon, style, disabled }: InputFieldProps) {

    return (
        <>
            <InputLabel sx={{
                fontSize: 15,
                marginLeft: '2.5%',
                paddingBottom:'8px',
                color: 'orange',
                fontWeight: 'bold',
            }}>
                {label}
            </InputLabel>
            <FormControl sx={{
                width: '100%',
                border: '2px solid orange',
                borderRadius: '30px',
                paddingTop: '5px',
                paddingBottom: '5px',
                marginBottom: '2%',
                ...style
            }} >
                <InputBase
                    type={type}
                    name={name}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    fullWidth
                    required={required}
                    disabled={disabled}
                    sx={{
                        width: '90%',
                        ml: 1,
                        flex: 1,
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            {icon}
                        </InputAdornment>
                    }
                />
            </FormControl>
        </>
    );
}