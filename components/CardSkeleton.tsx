import { Box, Skeleton } from '@mui/material';
import * as React from 'react';
import CardItem from './CardItem';

interface CardSkeletonProps {

}

export default function CardSkeleton({ }: CardSkeletonProps) {

    return (
        <div>
            <CardItem>
                <Box sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                    <Skeleton variant="rectangular" width={'100%'} height={118} />
                    <Box sx={{ pt: 0.5 }}>
                        <br />
                        <Skeleton />
                        <Skeleton width="60%" />
                        <Skeleton width="60%" />
                    </Box>
                </Box>
            </CardItem>
        </div>
    );
}