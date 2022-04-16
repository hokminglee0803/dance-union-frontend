import { Button, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import ActivityCard from '../components/ActivityCard';
import ActivityListCard from '../components/ActivityListCard';
import CardListSkeleton from '../components/CardListSkeleton';
import CardSkeleton from '../components/CardSkeleton';
import useSearchBar from './useSearchBar';


export default function useActivityCardList(showCase?: number, searchBarDisable?: boolean) {

    const { SearchBar, SearchPopup, SearchBarProps } = useSearchBar();

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [activities, setActivities] = React.useState(null);

    const ActivityCardListProps = {
        activities: activities,
        setActivities: setActivities
    }


    const ActivityCardList = () => {
        return (
            <div style={{
                marginBottom: '7%'
            }}>
                {
                    searchBarDisable ?
                        '' :
                        <>
                            <Grid
                                style={{
                                    margin: "auto",
                                    marginTop: '100',
                                    width: isDesktop ? '80%' : '90%'
                                }}
                            >
                                <SearchBar />
                            </Grid>
                            <br /></>
                }

                <h1
                    style={{
                        margin: "auto",
                        width: isDesktop ? '80%' : '90%',
                        color: 'orange',
                        borderBottom: '5px solid orange',
                        marginBottom: '5%'
                    }}>
                    搜尋結果
                </h1>

                <Paper
                    elevation={0}
                    style={{
                        margin: "auto",
                        borderRadius: '15px 15px 15px 15px',
                        background: 'white',
                        width: isDesktop ? '90%' : '100%'
                    }}>

                    <Grid
                        container
                        spacing={2}
                    >
                        {
                            activities ?
                                <>
                                    {
                                        activities.map((item, index) => {
                                            return <Grid key={index} item xs={12} sm={12} md={12} lg={12}>
                                                <ActivityListCard
                                                    imageUrl={item.imageUrl}
                                                    serial={'2022000095'}
                                                    title={'安在家中做義工@「愛心響鈴大行動」關懷致電義工招募'}
                                                    skill={'輔導服務/心靈支援'}
                                                    date={'2022-03-31'}
                                                    time={'09:00 至 18:00'}
                                                    location={'東區'}
                                                    isDesktop={isDesktop}
                                                />
                                            </Grid>
                                        })
                                    }
                                </>
                                :
                                <>
                                    {
                                        [...Array(showCase ?? 12)].map((item, index) => {
                                            return <Grid key={index} item xs={12} sm={12} md={12} lg={12}>
                                                {
                                                    isDesktop ?
                                                        <CardListSkeleton />
                                                        : <CardSkeleton />
                                                }
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
        ActivityCardList,
        ActivityCardListProps,
        SearchPopup,
        SearchPopupProps: SearchBarProps
    }
}