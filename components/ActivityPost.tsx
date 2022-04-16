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

interface ActivityPostProps {
    imageUrl: string;
    title: string;
    date: {
        from: string;
        to: string;
    };
    time: {
        from: string;
        to: string;
    }
    district: string[];
    category: string[];
    description: string;
    serial: string;
    target: string;
    requirement: {
        age: string;
        noOfParticipate: string;
        skillset: string[];
        description: string
    };
    contactEmail: string;
    contactMobile: string;
    contactPerson: string;
    registrationDeadline: string;
    resultAnnouncementDate: string;
}

export default function ActivityPost({
    imageUrl, title, date, time, district, category, description, serial, target, requirement,
    contactEmail, contactMobile, contactPerson, registrationDeadline, resultAnnouncementDate
}: ActivityPostProps) {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const router = useRouter();

    return (
        <div>
            <h1
                style={{
                    margin: "auto",
                    marginBottom: '3%',
                    width: isDesktop ? '80%' : '90%',
                    color: 'orange',
                    fontWeight:'400',
                    borderBottom: '5px solid orange'
                }}>
                活動詳情
            </h1>
            <Paper
                elevation={3}
                style={{
                    margin: "auto",
                    borderRadius: '0px 0px 0px 0px',
                    background: 'white',
                    width: isDesktop ? '80%' : '90%'
                }}>
                <Grid
                    container
                >
                    <Grid
                        xs={12}
                        md={4}
                        item>
                        <img
                            width={'100%'}
                            height={'100%'}
                            src='https://easyvolunteer.hk/assets/uploads/services/7_d29d3b6011.png'
                        />
                    </Grid>

                    <Grid
                        xs={12}
                        md={8}
                        item>
                        <Grid
                            style={{
                                margin: "auto",
                                width: '100%'
                            }}
                            container
                        >
                            <Grid
                                style={{
                                    margin: '2%'
                                }}
                                item >
                                <h4>
                                    安在家中做義工@「愛心響鈴大行動」關懷致電義工招募
                                </h4>
                                <span>
                                    編號: 202000001
                                </span>
                                <br />
                                <br />
                                <IconText
                                    icon={
                                        <MenuIcon
                                            style={{
                                                color: 'orange',
                                                marginBottom: '1%'
                                            }}
                                        />
                                    }
                                    text={'輔導服務/心靈支援'} />
                                <IconText
                                    icon={<LocationOnIcon
                                        style={{
                                            color: 'orange',
                                            marginBottom: '1%'
                                        }}
                                    />}
                                    text={'東區'} />
                                <IconText
                                    icon={<DateRangeIcon
                                        style={{
                                            color: 'orange',
                                            marginBottom: '1%'
                                        }}
                                    />}
                                    text={'2022-03-31 09:00 - 18:00'} />
                                <IconText
                                    icon={<AccessibilityIcon
                                        style={{
                                            color: 'orange',
                                            marginBottom: '1%'
                                        }}
                                    />}
                                    text={'任何服務對象'} />
                                <IconText
                                    icon={<DescriptionIcon
                                        style={{
                                            color: 'orange',
                                            marginBottom: '1%'
                                        }}
                                    />}
                                    text={'第五波疫情下我們在家的時間增多，有沒有思考過留在家中的時間也可以變得更有意義?'} />
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
                        md={8}
                        item>
                        <Grid
                            style={{
                                margin: "auto",
                                width: '100%'
                            }}
                            container
                        >
                            <Grid
                                style={{
                                    margin: '2%',
                                    padding: '2%',
                                    border: '2px solid orange',
                                    borderRadius: '15px 15px 15px 15px',
                                }}
                                item >
                                <div
                                    style={{
                                        color: 'orange',
                                        fontSize: 20,
                                        marginBottom: '1%',
                                    }}
                                >
                                    義工要求
                                </div>
                                <IconText
                                    icon={<PeopleAltIcon
                                        style={{
                                            color: 'orange',
                                            marginBottom: '1%'
                                        }}
                                    />}
                                    text={'16歲以上'} />
                                <IconText
                                    icon={<NumbersIcon
                                        style={{
                                            color: 'orange',
                                            marginBottom: '1%'
                                        }}
                                    />}
                                    text={'無人數限制'} />
                                <IconText
                                    icon={<LightbulbIcon
                                        style={{
                                            color: 'orange',
                                            marginBottom: '1%'
                                        }}
                                    />}
                                    text={'輔導/聆聽'} />
                                <IconText
                                    icon={<DescriptionIcon
                                        style={{
                                            color: 'orange',
                                            marginBottom: '1%'
                                        }}
                                    />}
                                    text={'如義工有興趣參與關懷致電行動，請立即報名以獲取活動詳情。'} />
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
                        md={8}
                        item>
                        <Grid
                            style={{
                                margin: "auto",
                                width: '100%'
                            }}
                            container
                        >
                            <Grid
                                style={{
                                    margin: '2%',
                                    padding: '2%',
                                    border: '2px solid orange',
                                    borderRadius: '15px 15px 15px 15px',
                                    width: '100%'
                                }}
                                item >
                                <div
                                    style={{
                                        color: 'orange',
                                        fontSize: 20,
                                        marginBottom: '1%',
                                    }}
                                >
                                    查詢
                                </div>
                                <table>
                                    <tr>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 150
                                        }}>
                                            聯絡人:
                                        </td>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 100
                                        }}>
                                            Jo
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 150
                                        }}>
                                            電話:
                                        </td>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 100
                                        }}>
                                            -
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 150
                                        }}>
                                            電郵:
                                        </td>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 100
                                        }}>
                                            yvn@hkfyg.org.hk
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 150
                                        }}>
                                            網址:
                                        </td>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 100
                                        }}>
                                            https://hkfyg.org.hk/zh/caringtocall/
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 150
                                        }}>
                                            截止報名日期:
                                        </td>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 100
                                        }}>
                                            2022-03-31 00:00
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 150
                                        }}>
                                            報名結果公佈日期
                                        </td>
                                        <td style={{
                                            margin: '5%',
                                            minWidth: 100
                                        }}>
                                            2022-03-21 00:00
                                        </td>
                                    </tr>
                                </table>
                            </Grid>
                        </Grid>
                        <StyledButtonThree
                            href={''}
                            label={'立即報名'} />

                    </Grid>
                </Grid>
            </Paper>

        </div >
    );
}