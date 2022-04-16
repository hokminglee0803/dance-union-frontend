import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
    Menu as MenuIcon,
    LocationOn as LocationOnIcon,
    Accessibility as AccessibilityIcon,
    DateRange as DateRangeIcon,
    Description as DescriptionIcon,
    PeopleAlt as PeopleAltIcon,
    Numbers as NumbersIcon,
    Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import * as React from 'react';
import CardItem from './CardItem';
import { useRouter } from 'next/router';
import IconText from './IconText';
import StyledButtonOne from './Button/StyledButtonOne';
import StyledButtonTwo from './Button/StyledButtonTwo';
import StyledButtonThree from './Button/StyledButtonThree';
import MenuBottom from './MenuIButtom';

interface NextPrevBarProps {
    prevLabel?: string;
    nextLabel?: string;
    prevLink?: string;
    nextLink?: string;
}

export default function NextPrevBar({
    prevLabel, prevLink,
    nextLabel, nextLink
}: NextPrevBarProps) {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            container
        >
            <Grid item >
                <MenuBottom
                    href={prevLink}
                    label={prevLabel}
                />
                <MenuBottom
                    href={nextLink}
                    label={nextLabel}
                />
            </Grid>
        </Grid>
    );
}