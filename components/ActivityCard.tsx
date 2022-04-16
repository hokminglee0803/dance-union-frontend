import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import {
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    Accessibility as AccessibilityIcon,
    DateRange as DateRangeIcon,
    AccessTime as AccessTimeIcon,
    LocationOn as LocationOnIcon
} from '@mui/icons-material';
import * as React from 'react';
import CardItem from './CardItem';
import { useRouter } from 'next/router';

interface ActivityCardProps {
    imageUrl: string;
    title: string;
    date: string;
    time: string;
    location: string;
}

export default function ActivityCard({ imageUrl, title, date, time, location }: ActivityCardProps) {

    const router = useRouter();

    return (
        <div>
            <Card sx={{
                width: '90%',
                margin: 'auto',
                my: 2,
                '&:hover': {
                    cursor: 'pointer'
                }
            }}>
                <CardMedia
                    onClick={() => {
                        router.push('/post/123')
                    }}
                    component="img"
                    height="150"
                    image={imageUrl}
                    alt="Logo"
                />
                <CardContent>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        margin: '2%'
                    }}>
                        <AccessibilityIcon />
                        &nbsp;
                        <span>{title}</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        margin: '2%'
                    }}>
                        <DateRangeIcon />
                        &nbsp;
                        <span>{date}</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        margin: '2%'
                    }}>
                        <AccessTimeIcon />
                        &nbsp;
                        <span>{time}</span>
                    </div>
                    {/* <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        margin: '2%'
                    }}>
                        <LocationOnIcon />
                        &nbsp;
                        <span>{location}</span>
                    </div> */}
                </CardContent>
                {/* <CardActions
                    disableSpacing
                    style={{
                        float: 'right'
                    }}
                >
                    <IconButton size='small' >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton size='small' >
                        <ShareIcon />
                    </IconButton>

                </CardActions> */}
            </Card>
        </div >
    );
}