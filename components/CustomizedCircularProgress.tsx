
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';


export function CustomizedCircularProgress(props) {
    return (
        <div>
            <div style={{ margin: 'auto', width: '10%', marginTop: 50 }}>
                <img src={'https://images.ctfassets.net/k5r307sl52db/6rKA3sePUzxuHhyN1xi5Ls/e56ce34f61ac25723a1afb0a06af553a/orange-loader.gif'} alt='loading' width={100} height={100} />
            </div>
        </div>
    );
}
export default CustomizedCircularProgress