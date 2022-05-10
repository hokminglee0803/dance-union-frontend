import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import contentfulService from '../utils/service/contentfulService';
import { transformArticle, transformBannerData, transformBlog, transformCourseTable, transformKnowMore, transformVideoClip, transformWebSettings } from '../utils/transformer';
import { BannerType } from '../interface/Banner';
import ActionAreaCard from '../components/ActionAreaCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import VideocamIcon from '@mui/icons-material/Videocam';
import { ArticleWithBannerType } from '../interface/Article';
import VideoGallery from '../components/VideoGallery';
import { VideoType } from '../interface/Video';
import VideoPlayer from '../components/VideoPlayer';
import { PageSettingProps } from '../interface/PageSetting';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import InfoIcon from '@mui/icons-material/Info';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { CourseType } from '../interface/Course';
import { ImageType } from '../interface/Image';
import CourseTable from '../pageComponent/CourseTable';
import Image from 'next/image'
import ReactPlayer from 'react-player/lazy'
import { BlogType, BlogTypeEnum } from '../interface/Blog';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

interface JoinProps {
    generalInfo: {
        title: string;
        articleCollection: ArticleWithBannerType[];
    },
    knowMore: {
        title: string;
        subTitle: string;
        banner: BannerType[];
        content: string;
    };
    webSettings: PageSettingProps;
    latestNews: BlogType[];
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Join: React.FC<JoinProps> = ({ generalInfo, knowMore, webSettings, latestNews }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        window.scrollTo(0, 0);
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        window.scrollTo(0, 0);
        setValue(index);
    };

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const arrowStyles: React.CSSProperties = {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        cursor: 'pointer',
        height: '100%',
        width: isDesktop ? '100px' : '60px',
        margin: 0,
    };

    const indicatorStyles: React.CSSProperties = {
        background: '#fff',
        width: 12,
        height: 12,
        display: 'inline-block',
        margin: '2px',
        marginBottom: isDesktop ? 30 : 40,
        borderRadius: '20px'
    };


    useEffect(() => {
        if (init) {
            setInit(false);
        }

    }, [init])

    const [autoPlay, setAutoPlay] = useState(true);

    return (
        <div>
            <Head>
                <title>{webSettings?.seoTitle}</title>
                <meta name="description" content={webSettings?.seoDescription} />
                <meta name="keywords" content={webSettings?.seoKeywords} />
                <meta name="google-site-verification" content="HSeiJF1wIPEmRWl27NIHwrslEwWKO6YuN0AP2IkOVgk" /> <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
                <meta name="google-site-verification" content="HSeiJF1wIPEmRWl27NIHwrslEwWKO6YuN0AP2IkOVgk" />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}`}
                    hrefLang="zh-hk"
                />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}`}
                    hrefLang="en-hk"
                />
                <link
                    rel="canonical"
                    href={`${HOME_PATH}${localePath}`}
                />
                <meta name="buildVersion" content={'1.0.1'} />
                <meta property="og:locale" content="zh_hk" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={webSettings?.openGraphTitle} />
                <meta property="og:description" content={webSettings?.openGraphDescription} />
                <meta property="og:url" content={webSettings?.openGraphUrl} />
                <meta property="og:site_name" content="Dance Union"></meta>
                <meta property="og:image" content={webSettings?.openGraphImage} />
            </Head>

            <div style={{ marginTop: 50 }} />
            <ResponsiveAppBar />

            <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                <AppBar
                    position="fixed" style={{ marginTop: 55, height: 60, background: 'white', flexGrow: 1 }}>
                    <Tabs
                        value={value}
                        style={{
                            color: 'black'
                        }}
                        onChange={handleChange}
                        // variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        indicatorColor="primary"
                        textColor="inherit"
                        centered
                    >
                        <Tab icon={<EmojiPeopleIcon />} iconPosition="start" label={'加盟聯營'} {...a11yProps(0)} />
                        <Tab icon={<InfoIcon />} iconPosition="start" label={'了解更多'} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    style={{
                        marginTop: 100,
                        zIndex: -1
                    }}
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} >
                        <section className="blog py-lg-4 py-md-3 py-sm-3 py-3" style={{ background: 'white' }}>
                            <h4 className="text-center title mb-3">
                                {generalInfo.title}
                            </h4>
                            {
                                generalInfo.articleCollection.map(item => {
                                    return (
                                        <>
                                            <Carousel
                                                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                                    hasPrev && (
                                                        <div id={'nextArrowLeft'} onClick={onClickHandler} style={{ ...arrowStyles, left: 0 }} >
                                                            <Grid
                                                                style={{
                                                                    height: '100%'
                                                                }}
                                                                container
                                                                spacing={0}
                                                                direction="column"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                            >
                                                                <Grid item xs={3}>
                                                                    <ArrowBackIosIcon fontSize='large' style={{
                                                                        zIndex: 999,
                                                                        opacity: 1,
                                                                        color: 'white',
                                                                        fontSize: 50,
                                                                        fontWeight: 50,
                                                                    }} />
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    )
                                                }
                                                renderArrowNext={(onClickHandler, hasNext, label) =>
                                                    hasNext && (
                                                        <div id={'nextArrow'} onClick={onClickHandler} style={{ ...arrowStyles, right: 0 }} >
                                                            <Grid
                                                                style={{
                                                                    height: '100%'
                                                                }}
                                                                container
                                                                spacing={0}
                                                                direction="column"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                            >
                                                                <Grid item xs={3}>
                                                                    <ArrowForwardIosIcon fontSize='large' style={{
                                                                        zIndex: 999,
                                                                        opacity: 1,
                                                                        color: 'white',
                                                                        fontSize: 50,
                                                                        fontWeight: 50,
                                                                    }} />
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    )
                                                }
                                                onChange={() => {
                                                    setAutoPlay(true);
                                                }}
                                                renderIndicator={(onClickHandler, isSelected, index, label) => {
                                                    if (isSelected) {
                                                        return (
                                                            <div style={{ ...indicatorStyles, background: '#fff', listStyleType: 'circle' }}></div>
                                                        );
                                                    }
                                                    return (
                                                        <div style={{ ...indicatorStyles, background: 'transparent', border: '2px solid white' }}></div>
                                                    );
                                                }}
                                                showIndicators={item?.banner?.length > 1 ? true : false} autoFocus={true} autoPlay={true} infiniteLoop={true} emulateTouch={true}>
                                                {
                                                    item?.banner?.map((i, index) => {
                                                        return <div key={index}
                                                            style={{
                                                                cursor: i.actionLink !== '' ? 'pointer' : 'default'
                                                            }}
                                                            onClick={() => {
                                                                if (i.actionLink !== '') {
                                                                    router.push(i.actionLink)
                                                                }
                                                            }}>
                                                            {
                                                                i.bannerDesktop !== '' ?
                                                                    <Image
                                                                        alt={i.bannerSEOTitle}
                                                                        title={i.bannerSEOTitle}
                                                                        width={isDesktop ? '3648px' : i.bannerMobile === '' ? '3648px' : '2736px'}
                                                                        height={isDesktop ? '1358px' : i.bannerMobile === '' ? '1358px' : '2736px'}
                                                                        src={isDesktop ? i.bannerDesktop : (i.bannerMobile === '' ? i.bannerDesktop : i.bannerMobile)}
                                                                    /> :
                                                                    <div style={{
                                                                        position: 'relative',
                                                                        paddingTop: isDesktop ? '37.5%' : '100%',
                                                                    }}>
                                                                        <ReactPlayer
                                                                            onPlay={() => {
                                                                                setAutoPlay(false);
                                                                            }}
                                                                            onPause={() => {
                                                                                setAutoPlay(true);
                                                                            }}
                                                                            loop={true}
                                                                            light={i.thumbumbDesktop !== '' ? (isDesktop ? i.thumbumbDesktop : (i.thumbumbMobile !== '' ? i.thumbumbMobile : i.thumbumbDesktop)) : false}
                                                                            controls={true}
                                                                            width={'100%'}
                                                                            height={'100%'}
                                                                            style={{
                                                                                position: 'absolute',
                                                                                top: 0,
                                                                                left: 0,
                                                                            }}
                                                                            url={`${i.bannerVideo}`} />
                                                                    </div>
                                                            }
                                                            <div style={{
                                                                backgroundColor: 'black',
                                                                color: 'white',
                                                                fontSize: 20
                                                            }}>
                                                                {i.bannerTitle}
                                                            </div>
                                                        </div>

                                                    })
                                                }

                                            </Carousel>
                                            <h4 style={{ width: isDesktop ? '85%' : '95%', margin: 'auto' }} className="text-center title mb-3">{item.title}</h4>
                                            <div className=" text-center pt-lg-2 pt-1 mb-lg-5 mb-md-4 mb-sm-4 mb-3">
                                                <p>
                                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                                </p>
                                            </div>
                                        </>
                                    )

                                })
                            }
                        </section>

                    </TabPanel>
                    <TabPanel value={value} index={1} >
                        <section className="blog py-lg-4 py-md-3 py-sm-3 py-3" style={{ background: 'white' }} id="blog">
                            <h4 className="text-center title mb-3">
                                {
                                    knowMore?.title
                                }
                            </h4>

                            <Carousel
                                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                    hasPrev && (
                                        <div id={'nextArrowLeft'} onClick={onClickHandler} style={{ ...arrowStyles, left: 0 }} >
                                            <Grid
                                                style={{
                                                    height: '100%'
                                                }}
                                                container
                                                spacing={0}
                                                direction="column"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Grid item xs={3}>
                                                    <ArrowBackIosIcon fontSize='large' style={{
                                                        zIndex: 999,
                                                        opacity: 1,
                                                        color: 'white',
                                                        fontSize: 50,
                                                        fontWeight: 50,
                                                    }} />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    )
                                }
                                renderArrowNext={(onClickHandler, hasNext, label) =>
                                    hasNext && (
                                        <div id={'nextArrow'} onClick={onClickHandler} style={{ ...arrowStyles, right: 0 }} >
                                            <Grid
                                                style={{
                                                    height: '100%'
                                                }}
                                                container
                                                spacing={0}
                                                direction="column"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Grid item xs={3}>
                                                    <ArrowForwardIosIcon fontSize='large' style={{
                                                        zIndex: 999,
                                                        opacity: 1,
                                                        color: 'white',
                                                        fontSize: 50,
                                                        fontWeight: 50,
                                                    }} />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    )
                                }
                                onChange={() => {
                                    setAutoPlay(true);
                                }}
                                renderIndicator={(onClickHandler, isSelected, index, label) => {
                                    if (isSelected) {
                                        return (
                                            <div style={{ ...indicatorStyles, background: '#fff', listStyleType: 'circle' }}></div>
                                        );
                                    }
                                    return (
                                        <div style={{ ...indicatorStyles, background: 'transparent', border: '2px solid white' }}></div>
                                    );
                                }}
                                showIndicators={knowMore?.banner?.length > 1 ? true : false} autoFocus={true} autoPlay={true} infiniteLoop={true} emulateTouch={true}>
                                {
                                    knowMore?.banner.map((item, index) => {
                                        return <div key={index}
                                            style={{
                                                cursor: item.actionLink !== '' ? 'pointer' : 'default'
                                            }}
                                            onClick={() => {
                                                if (item.actionLink !== '') {
                                                    router.push(item.actionLink)
                                                }
                                            }}>
                                            {
                                                item.bannerDesktop !== '' ?
                                                    <Image
                                                        alt={item.bannerSEOTitle}
                                                        title={item.bannerSEOTitle}
                                                        width={isDesktop ? '3648px' : item.bannerMobile === '' ? '3648px' : '2736px'}
                                                        height={isDesktop ? '1358px' : item.bannerMobile === '' ? '1358px' : '2736px'}
                                                        src={isDesktop ? item.bannerDesktop : (item.bannerMobile !== '' ? item.bannerMobile : item.bannerDesktop)}
                                                    /> :
                                                    <div style={{
                                                        position: 'relative',
                                                        paddingTop: isDesktop ? '37.5%' : '100%',
                                                    }}>
                                                        <ReactPlayer
                                                            loop={true}
                                                            onPlay={() => {
                                                                setAutoPlay(false);
                                                            }}
                                                            onPause={() => {
                                                                setAutoPlay(true);
                                                            }}
                                                            light={item.thumbumbDesktop !== '' ? (isDesktop ? item.thumbumbDesktop : (item.thumbumbMobile !== '' ? item.thumbumbMobile : item.thumbumbDesktop)) : false}
                                                            controls={true}
                                                            width={'100%'}
                                                            height={'100%'}
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                            }}
                                                            url={`${item.bannerVideo}`} />
                                                    </div>
                                            }
                                            <div style={{
                                                backgroundColor: 'black',
                                                color: 'white',
                                                fontSize: 40
                                            }}>
                                                {item.bannerTitle}
                                            </div>
                                        </div>
                                    })
                                }
                            </Carousel>
                            <div style={{ width: isDesktop ? '85%' : '97%', margin: 'auto' }}>
                                <div dangerouslySetInnerHTML={{ __html: knowMore.content }} />
                            </div>
                        </section>
                    </TabPanel>
                </SwipeableViews>
                {/* {
                    !isDesktop ? (
                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }} elevation={3}>
                            <BottomNavigation
                                style={{
                                    background: 'lightGrey'
                                }}
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    window.scrollTo(0, 0);
                                    setValue(newValue);
                                }}
                            >
                                <BottomNavigationAction label="加盟聯營" icon={<EmojiPeopleIcon />} />
                                <BottomNavigationAction label="了解更多" icon={<InfoIcon />} />
                            </BottomNavigation>
                        </Paper>
                    ) : ""

                } */}
            </Box>

            <Footer latestNews={latestNews} />

        </div >
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    try {

        const joinPage = await contentfulService.getEntriesByContentType('joinPage');

        const articleCollection = await Promise.all(joinPage[0].fields?.generalInfo?.fields?.articleCollection?.map(async item => {
            const article = await contentfulService.getEntriesById(item.sys.id);
            return transformArticle(article[0]);
        }))

        const bannerList = await Promise.all(joinPage[0].fields?.knowMore?.fields?.banner.map(async item => {
            const banner = await contentfulService.getEntriesById(item.sys.id);
            return transformBannerData(banner[0]);
        }))

        const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0);

        return {
            props: {
                lngDict,
                generalInfo: {
                    title: joinPage[0].fields.generalInfo.fields.title,
                    articleCollection: articleCollection
                },
                knowMore: {
                    ...transformKnowMore(joinPage[0].fields.knowMore),
                    banner: bannerList
                },
                webSettings: transformWebSettings(joinPage[0]),
                latestNews: blogEntries.map(blog => transformBlog(blog))
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Join Page] getStaticProps failed.`);

        throw e;
    }
};

export default Join;
