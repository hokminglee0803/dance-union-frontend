import { FormControl, InputBase, InputAdornment, FormLabel, FormControlLabel, Radio } from '@mui/material';
import * as React from 'react';

interface RadioInputField {
    name: string;
    style?: React.CSSProperties;
}

export default function RadioInputField({ name, style }: RadioInputField) {

    return (
        <FormControl sx={{
            width: '100%',
            paddingTop: '10px',
            paddingBottom: '10px',
            marginBottom: '2%',
            marginTop: '2%',
            ...style
        }} >
            <FormControlLabel value="tnc" control={<Radio />} label={name} />
        </FormControl>

    );
}