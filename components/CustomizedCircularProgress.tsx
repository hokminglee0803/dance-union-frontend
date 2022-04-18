
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';


export function CustomizedCircularProgress(props) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', background: '#000000' }}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <div
                        style={{
                            fontSize: '1.5vw',
                            width: '100%',
                            maxWidth: '100%',
                            lineHeight: 'inherit',
                            color: 'white',
                            whiteSpace: 'normal',
                            backgroundColor: 'black',
                        }}
                    >
                        <img src="https://lh3.googleusercontent.com/d/1UenlU7wXz3QTghLBKdDctskNc-Ke8OoZ" alt="loading..." width="100" />&nbsp;&nbsp;載入中
                    </div>
                </Grid>
            </Grid >
        </Box>
    );
}
export default CustomizedCircularProgress