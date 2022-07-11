import * as React from 'react';
import { Box, Container, Grid, Link, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Facebook as FacebookIcon, Twitter as TwiiterIcon } from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { BlogType } from '../interface/Blog';
import Image from 'next/image'
import { useState, useEffect } from 'react';
import contentfulService from '../utils/service/contentfulService';
import { transformFooter } from '../utils/transformer';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';

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

    const router = useRouter();

    const { t } = useI18n();

    const { locale } = router;

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [init, setInit] = useState(true);
    const [footer, setFooter] = useState(null);

    const fetchFooter = async () => {
        const footerData = await contentfulService.getEntriesById(locale, '4Fyw9g6B6OfXYEbNzOJlds');
        if (footerData) {
            setFooter(transformFooter(footerData[0]));
        }
    }

    useEffect(() => {
        if (init) {
            fetchFooter();
            setInit(false);
        }
    })

    useEffect(() => {
        fetchFooter();
    }, [locale])

    return (
        <section className="footer-w3layouts-bottem py-lg-3 py-md-2 py-sm-3 py-2">
            <div className="container py-lg-4 py-md-4 py-sm-3 py-3">
                <div className="row">
                    <div className="col-lg-4 col-md-3 footer-bottom-txt">
                        <h2>
                            {/* <Link link="/">Dance Union</Link> */}
                        </h2>
                        <p className="pt-lg-4 pt-3">
                            {footer?.description}
                        </p>
                    </div>
                    <div className="col-lg-4 col-md-4 footer-bottom-txt">
                        <h4>{t('footer.title')}</h4>
                        <div className="mt-3 footer-top">
                            <p>
                                <Icon icon="clarity:map-marker-solid" width={25} height={25} />&nbsp; &nbsp;
                                <span>{t('footer.address')}</span>
                                <a target="_blank" rel="noopener noreferrer" href={footer?.googleMapAddress}>
                                    {footer?.address}
                                </a>
                            </p>
                            <p className="pt-2">
                                <Icon icon="bi:phone" width={25} height={25} />&nbsp; &nbsp;
                                <span>{t('footer.address')}</span>
                                <a href={`tel:+852 ${footer?.phone}`}>+852 {footer?.phone.replace(/(\d{4})(\d{4})/, '$1 $2')}</a>
                            </p>
                            <p className="pt-2">
                                <Icon icon="akar-icons:whatsapp-fill" width={25} height={25} />&nbsp; &nbsp;
                                <span>{t('footer.whatsapp')}</span>
                                <a href={`https://api.whatsapp.com/send?phone=852${footer?.whatsapp}`}>+852 {footer?.whatsapp.replace(/(\d{4})(\d{4})/, '$1 $2')}</a>
                            </p>
                            <p className="pt-2">
                                <Icon icon="carbon:email" width={25} height={25} />&nbsp; &nbsp;
                                <span>{t('footer.email')}</span>
                                <a href={`mailto:{footer.email}`}>{footer?.email}</a>
                            </p>
                            <p className="pt-2">
                                <Icon icon="la:fax" width={25} height={25} />&nbsp; &nbsp;
                                <span>{t('footer.fax')}</span>+852 {footer?.fax.replace(/(\d{4})(\d{4})/, '$1 $2')}
                            </p>
                            <p className="pt-2">
                                <Icon icon="healthicons:i-schedule-school-date-time" width={25} height={25} />&nbsp; &nbsp;
                                <span >{t('footer.monToFri')}</span>{footer?.mondayToFriday}
                            </p>
                            <p className="pt-2">
                                <Icon icon="healthicons:i-schedule-school-date-time" width={25} height={25} />&nbsp; &nbsp;
                                <span>{t('footer.holiday')}</span>{footer?.saturdayAndSunday}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 footer-bottom-txt">
                        <Link href={`/news`}>
                            <h4>{t('common.latestBlog')}</h4>
                        </Link>
                        <div className="mt-3 footer-top">
                            {
                                latestNews?.map((item, index) => {
                                    return <div className="row mb-lg-3 mb-2" key={index}>
                                        <div className="col-lg-4 col-md-4 col-sm-4 col-3">
                                            {/* <img alt={'sunny wong dance union'} src={item.desktopBanner} className="img-fluid" /> */}
                                            {
                                                item.desktopBanner !== '' ?
                                                    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
                                                        <Image alt={'sunny wong dance union'} src={item.mobileBanner !== '' ? item.mobileBanner : item.desktopBanner} layout={'fill'} />
                                                    </div>
                                                    : ''
                                            }
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
                        className="text-left mt-lg-5 mt-md-4 mt-3">
                        <div className="move-top text-left mt-3 footer-bottom-txt" style={{ color: '#AAAAAA', fontSize: 10 }}>
                            Copyright @2022 Dance Union. All Rights Reserved
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}