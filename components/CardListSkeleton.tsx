import { Box, Grid, Skeleton } from '@mui/material';
import * as React from 'react';
import CardItem from './CardItem';

interface CardSkeletonProps {

}

export default function CardListSkeleton({ }: CardSkeletonProps) {

    return (
        <div>
            <CardItem style={{
                marginBottom: '3%',
                width: "90%",
                margin: 'auto'
            }}>
                <Box sx={{ width: '100%', marginRight: 0.5 }}>
                    <Box >
                        <Grid
                            container
                        >
                            <Grid
                                xs={12}
                                sm={4}
                                md={4}
                                item>
                                <Skeleton variant="rectangular" width={'100%'} height={180} />
                            </Grid>

                            <Grid
                                xs={12}
                                sm={8}
                                md={8}
                                item>
                                <Grid
                                    style={{
                                        margin: "auto",
                                        width: '95%'
                                    }}
                                    container
                                >
                                    <Skeleton variant="rectangular" width={'100%'} height={30} />
                                    <br /><br />
                                    <Skeleton variant="rectangular" width={'80%'} height={10} />
                                    <br />
                                    <Skeleton variant="rectangular" width={'80%'} height={10} />
                                    <br />
                                    <Skeleton variant="rectangular" width={'80%'} height={10} />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </CardItem>
        </div>
    );
}