import { Button, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import ActivityCard from '../components/ActivityCard';
import CardSkeleton from '../components/CardSkeleton';
import useSearchBar from './useSearchBar';


export default function useActivityCardCollection(showCase?: number, searchBarDisable?: boolean) {

    const { SearchBar, SearchPopup, SearchBarProps } = useSearchBar();

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [activities, setActivities] = React.useState(null);

    const ActivityCardCollectionProps = {
        activities: activities,
        setActivities: setActivities
    }


    const ActivityCardCollection = () => {
        return (
            <div style={{
                marginBottom: '7%'
            }}>
                <Paper
                    elevation={0}
                    style={{
                        margin: "auto",
                        borderRadius: '15px 15px 15px 15px',
                        background: 'white',
                        width: isDesktop ? '80%' : '100%'
                    }}>

                    {
                        searchBarDisable ?
                            '' :
                            <>
                                <Grid
                                    style={{
                                        margin: "auto",
                                        marginTop: '100',
                                        width: '95%'
                                    }}
                                >
                                    <SearchBar />
                                </Grid>
                                <br /></>
                    }

                    <Grid
                        container
                        spacing={2}
                    >
                        {
                            activities ?
                                <>
                                    {
                                        activities.map((item, index) => {
                                            return <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                                <ActivityCard
                                                    imageUrl={item.imageUrl}
                                                    title={''}
                                                    date={''}
                                                    time={''}
                                                    location={''} />
                                            </Grid>
                                        })
                                    }
                                </>
                                :
                                <>
                                    {
                                        [...Array(showCase ?? 12)].map((item, index) => {
                                            return <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                                <CardSkeleton />
                                            </Grid>
                                        })
                                    }
                                </>
                        }
                    </Grid>
                </Paper>
            </div>
        );
    }

    return {
        ActivityCardCollection,
        ActivityCardCollectionProps,
        SearchPopup,
        SearchPopupProps: SearchBarProps
    }
}