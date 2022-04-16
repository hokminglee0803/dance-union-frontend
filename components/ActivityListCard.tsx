import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, Typography } from '@mui/material';
import {
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    Accessibility as AccessibilityIcon,
    DateRange as DateRangeIcon,
    AccessTime as AccessTimeIcon,
    LocationOn as LocationOnIcon,
    Menu as MenuIcon,
    Description as DescriptionIcon,
    PeopleAlt as PeopleAltIcon,
    Numbers as NumbersIcon,
} from '@mui/icons-material';
import * as React from 'react';
import CardItem from './CardItem';
import { useRouter } from 'next/router';
import IconText from './IconText';
import StyledButtonOne from './Button/StyledButtonOne';
import StyledButtonThree from './Button/StyledButtonThree';

interface ActivityListCardProps {
    imageUrl: string;
    serial: string;
    title: string;
    date: string;
    time: string;
    location: string;
    skill: string;
    isDesktop: boolean;
}

export default function ActivityListCard({ imageUrl, title, date, time, location, serial, skill, isDesktop }: ActivityListCardProps) {

    const router = useRouter();

    const detail = (
        <>
            <span style={{
                fontSize: '18px',
                color: 'orange',
                fontWeight: 'bold',
            }}>
                安在家中做義工@「愛心響鈴大行動」關懷致電義工招募
            </span>
            <br />
            <span style={{
                fontSize: '15px',
            }}>
                編號: 202000001
            </span>
            <br /><br />
            <IconText
                icon={
                    <MenuIcon
                        style={{
                            color: 'orange',
                        }}
                    />
                }
                style={{
                    marginBottom: '1%'
                }}
                text={'輔導服務/心靈支援'} />
            <IconText
                icon={<LocationOnIcon
                    style={{
                        color: 'orange',
                    }}
                />}
                style={{
                    marginBottom: '1%'
                }}
                text={'東區'} />
            <IconText
                icon={<DateRangeIcon
                    style={{
                        color: 'orange',
                    }}
                />}
                style={{
                    marginBottom: '1%'
                }}
                text={'2022-03-31 09:00 - 18:00'} />
            <IconText
                icon={<AccessibilityIcon
                    style={{
                        color: 'orange',
                    }}
                />}
                style={{
                    marginBottom: '1%'
                }}
                text={'任何服務對象'} />
        </>
    )

    return (
        <div>
            {
                isDesktop ?
                    <Paper
                        elevation={3}
                        style={{
                            margin: "auto",
                            borderRadius: '0px 0px 0px 0px',
                            background: 'white',
                            width: isDesktop ? '90%' : '90%'
                        }}>
                        <Grid
                            style={{
                                padding: '20px',
                                paddingLeft: '0'
                            }}
                            container
                        >

                            <Grid
                                xs={12}
                                md={4}
                                item>
                                <Paper
                                    elevation={5}
                                    sx={{
                                        margin: "auto",
                                        width: '85%',
                                        // marginBottom: '5%'
                                    }}
                                >
                                    <img

                                        width={'100%'}
                                        height={'100%'}
                                        src='https://easyvolunteer.hk/assets/uploads/services/7_d29d3b6011.png'
                                    />
                                </Paper>

                            </Grid>

                            <Grid
                                xs={12}
                                md={8}
                                item>
                                <Grid
                                    style={{
                                        margin: "auto",
                                        width: '100%',
                                        marginTop: '2%'
                                    }}
                                    container
                                >
                                    <Grid
                                        style={{
                                            margin: '2%',
                                            marginTop: 0,
                                            width: "100%"
                                        }}
                                        item >
                                        <div style={{
                                            float: 'right'
                                        }}>
                                            <IconButton
                                                size='small' >
                                                <FavoriteIcon style={{
                                                    color: 'orange'
                                                }} />
                                            </IconButton>
                                            <IconButton
                                                size='small' >
                                                <ShareIcon style={{
                                                    color: 'orange'
                                                }} />
                                            </IconButton>
                                        </div>
                                        {detail}

                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                xs={12}
                                md={4}
                                item>
                            </Grid>


                            <Grid
                                xs={12}
                                md={4}
                                item>
                            </Grid>


                        </Grid>
                    </Paper> :
                    <Card sx={{
                        width: '95%',
                        margin: 'auto',
                        my: 2,
                        boxShadow: 5,
                    }}>
                        <CardMedia

                            onClick={() => {
                                router.push('/post/123')
                            }}
                            component="img"
                            height="180"
                            sx={{
                                boxShadow: 5,
                                margin: 'auto',
                                width: '95%',
                                marginTop: '3%',
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                            image={imageUrl}
                            alt="Logo"
                        />
                        <CardContent style={{
                            fontSize: '13px',
                            paddingBottom: 0,
                            marginBottom: 0,
                        }}>
                            {detail}
                        </CardContent>
                        <CardActions
                            style={{
                                paddingTop: 0,
                                marginTop: 0,
                                float: 'right',
                            }}
                            disableSpacing>
                            <IconButton
                                size='small' >
                                <FavoriteIcon style={{
                                    color: 'orange'
                                }} />
                            </IconButton>
                            <IconButton
                                size='small' >
                                <ShareIcon style={{
                                    color: 'orange'
                                }} />
                            </IconButton>
                            <IconButton
                                size='small' >
                                <ShareIcon style={{
                                    color: 'orange'
                                }} />
                            </IconButton>
                        </CardActions>
                    </Card>
            }
        </div >
    );
}