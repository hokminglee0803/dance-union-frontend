import * as React from 'react';
import { Box, Container, Grid, Link, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Facebook as FacebookIcon, Twitter as TwiiterIcon } from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { BlogType } from '../interface/Blog';

const Copyright = () => {
    return (
        <React.Fragment>
            版權屬XXXXXX擁有
            {'© '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

const iconStyle = {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'warning.main',
    mr: 1,
    '&:hover': {
        bgcolor: 'warning.dark',
    },
};

interface FooterProps {
    latestNews?: BlogType[];
}

export default function Footer({ latestNews }: FooterProps) {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <section className="footer-w3layouts-bottem py-lg-3 py-md-2 py-sm-3 py-2">
            <div className="container py-lg-4 py-md-4 py-sm-3 py-3">
                <div className="row">
                    <div className="col-lg-4 col-md-3 footer-bottom-txt">
                        <h2>
                            {/* <Link link="/">Dance Union</Link> */}
                        </h2>
                        <p className="pt-lg-4 pt-3">
                            Dance Union致力於舞蹈教育及舞蹈文化推廣，為香港培育新一代舞蹈人才，及為各大機構提供舞蹈編排、舞蹈演出等專業服務。
                        </p>
                    </div>
                    <div className="col-lg-4 col-md-4 footer-bottom-txt">
                        <h4>聯絡我們</h4>
                        <div className="mt-3 footer-top">
                            <p>
                                <Icon icon="clarity:map-marker-solid" width={25} height={25} />&nbsp; &nbsp;
                                <span>地址: </span>
                                <a target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/i5qy8TS12EUwxeBz8">
                                    北角英皇道499號1樓
                                </a>
                            </p>
                            <p className="pt-2">
                                <Icon icon="bi:phone" width={25} height={25} />&nbsp; &nbsp;
                                <span>電話: </span>
                                <a href="tel:+852 2881 7260">+852 2881 7260</a>
                            </p>
                            <p className="pt-2">
                                <Icon icon="carbon:email" width={25} height={25} />&nbsp; &nbsp;
                                <span>地址: </span>
                                <a href="mailto:info@sunnywongofficial.com">info @sunnywongofficial.com</a>
                            </p>
                            <p className="pt-2">
                                <Icon icon="la:fax" width={25} height={25} />&nbsp; &nbsp;
                                <span>傳真: </span>+852 2893 9050
                            </p>
                            <p className="pt-2">
                                <Icon icon="healthicons:i-schedule-school-date-time" width={25} height={25} />&nbsp; &nbsp;
                                <span >星期一至五: </span>下午一時到晚上九時
                            </p>
                            <p className="pt-2">
                                <Icon icon="healthicons:i-schedule-school-date-time" width={25} height={25} />&nbsp; &nbsp;
                                <span>星期六及日: </span>上午十時至晚上七時
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 footer-bottom-txt">
                        <Link href={`/news`}>
                            <h4>最新文章</h4>
                        </Link>
                        <div className="mt-3 footer-top">
                            {
                                latestNews?.map(item => {
                                    return <div className="row mb-lg-3 mb-2">
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-3">
                                            <img alt="sunnyWong" src={item.desktopBanner} className="img-fluid" />
                                        </div>
                                        <div className="col-lg-8 col-md-8 col-sm-8 col-9 footer-us ">
                                            <p>
                                                <a href={`/news/${item.id}`}>
                                                    {item.title}
                                                </a>
                                            </p>
                                            <div className="blog-date-time mt-2">
                                                <ul>
                                                    <li>
                                                        <a href={`/news/${item.id}`}>
                                                            {item.createdDate}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }


                        </div>
                    </div>

                    <div
                        style={{
                            cursor: 'pointer'
                        }}
                        className="text-center mt-lg-5 mt-md-4 mt-3">
                        <div onClick={() => { window.scroll(0, 0) }} className="move-top text-center mt-3">
                            <span className="fa fa-arrow-up" aria-hidden="true"></span>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}