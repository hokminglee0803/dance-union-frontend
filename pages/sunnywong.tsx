import { useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import contentfulService from '../utils/service/contentfulService';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Carousel } from 'react-responsive-carousel';
import { options, transformBannerData, transformBlog, transformMediaUrl, transformShowCollection, transformVideoClip, transformWebSettings } from '../utils/transformer';
import { BannerType } from '../interface/Banner';
import VideoGallery from '../components/VideoGallery';
import ImageGallery from '../components/ImageGallery';
import { Box } from "@mui/system";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid, Typography } from "@mui/material";
import { VideoType } from '../interface/Video';
import { PageSettingProps } from '../interface/PageSetting';
import Image from 'next/image'
import ReactPlayer from 'react-player/lazy'
import { BlogType, BlogTypeEnum } from '../interface/Blog';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{ width: '80%', height: 250, overflowY: 'scroll', marginTop: 'auto', marginBottom: 'auto' }}
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

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || 'https://www.sunnywongofficial.com';;

interface ShowCollectionProp {
    year: string;
    collectionList: string[]
}

interface SunnyWongProps {
    intro: {
        intro: string;
        image: string;
        extendIntro: string;
        extendImage: string;
    };
    banner: BannerType[];
    showCollection: ShowCollectionProp[];
    albumCollection: string[];
    videoCollection: VideoType[];
    webSettings: PageSettingProps;
    latestNews: BlogType[];
}

const SunnyWong: React.FC<SunnyWongProps> = ({ intro, banner, showCollection, albumCollection, videoCollection, webSettings, latestNews }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en/sunnywong' ? 'en/sunnywong' : 'sunnywong';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const [showMore, setShowMore] = useState(false);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
                <meta name="google-site-verification" content="Xj24ARH2mUnvhluOalhwzKKZfmd7l6DUR-asS6v-s-o" />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}sunnywong`}
                    hrefLang="zh-hk"
                />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}en/sunnywong`}
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

            <div >
                <section style={{ background: '#ffffff' }} className="py-lg-4 py-md-3 py-sm-3 py-3">
                    <div className="container py-lg-5 py-md-4 py-sm-4 py-3" >
                        <div className="row">
                            <div style={{ width: '80%', margin: 'auto', marginBottom: 30, maxWidth: 250, }}>
                                {
                                    intro.image !== '' ?
                                        <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                                            <Image alt={'sunny wong dance union'} src={intro.image} className="img-fluid" layout='fill' />
                                        </div>
                                        : ''
                                }
                            </div>
                            <div className="col-lg-7 text-left about-two-grids">
                                <h5 className="mb-lg-4 mb-3">Sunny Wong &nbsp;
                                    <span className="mid-color">黃國榮</span>
                                </h5>
                                <div className="about-para-txt">
                                    <p style={{ whiteSpace: 'pre-line' }}>
                                        <div dangerouslySetInnerHTML={{ __html: intro.intro }} />
                                    </p>
                                </div>

                            </div>
                        </div>
                        <br />
                        <Collapse
                            in={showMore}
                            timeout="auto"
                            unmountOnExit
                        >
                            <div className="row">
                                <div style={{ width: '85%', margin: 'auto', marginBottom: 30, maxWidth: 220 }}
                                >
                                    {
                                        intro.extendImage ?
                                            <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                                                <Image alt={'sunny wong dance union'} src={intro.extendImage} className="img-fluid" layout='fill' />
                                            </div> : ''
                                    }
                                </div>
                                <div className="col-lg-7 text-left about-two-grids">
                                    <div className="about-para-txt">
                                        <p style={{ whiteSpace: 'pre-line' }}>
                                            <div dangerouslySetInnerHTML={{ __html: intro.extendIntro }} />
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </Collapse>
                        <Button onClick={() => setShowMore(!showMore)} variant="contained" style={{ float: 'right' }} endIcon={showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
                            {showMore ? t('common.less') : t('common.more')}
                        </Button>
                    </div>
                </section>
                <section style={{ background: '#ffffff' }} className="about py-lg-4 py-md-3 py-sm-3 py-3">
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
                        showIndicators={banner?.length > 1 ? true : false} autoFocus={true} autoPlay={true} infiniteLoop={true} emulateTouch={true}>
                        {
                            banner?.map((item, index) => {
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
                                                    onPlay={() => {
                                                        setAutoPlay(false);
                                                    }}
                                                    onPause={() => {
                                                        setAutoPlay(true);
                                                    }}
                                                    loop={true}
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
                                        fontSize: 20
                                    }}>
                                        {item.bannerTitle}
                                    </div>
                                </div>
                            })
                        }
                    </Carousel>

                    <div className="container py-lg-5 py-md-4 py-sm-4 py-3" >
                        <div className="row">
                            <div className="col-lg-7 text-left about-two-grids">
                                <h5 className="mb-lg-4 mb-3">Sunny Wong &nbsp;
                                    <span className="mid-color">{t('sunnyWong.majarProductionDisplay')}</span>
                                </h5>
                            </div>
                        </div>
                        <Box
                            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 300, marginBottom: 0 }}
                        >
                            <Tabs
                                orientation="vertical"
                                variant="scrollable"
                                value={value}
                                onChange={handleChange}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                {
                                    showCollection.map((item, index) => {
                                        return <Tab key={index} label={item.year} {...a11yProps(item.year)} />
                                    })
                                }
                            </Tabs>
                            {
                                showCollection.map((item, index) => {
                                    return <TabPanel value={value} key={index} index={index}>
                                        <Grid container spacing={2}>
                                            {item?.collectionList.map((item, index) => {
                                                return <Grid key={index} item xs={4}>
                                                    {item}
                                                </Grid>
                                            })}
                                        </Grid>
                                    </TabPanel>
                                })
                            }
                        </Box>
                    </div>
                    <div className="container py-lg-5 py-md-4 py-sm-4 py-3" >
                        <div className="row">
                            <div className="col-lg-7 text-left about-two-grids">
                                <h5 className="mb-lg-4 mb-3">Sunny Wong &nbsp;
                                    <span className="mid-color">{t('common.album')}</span>
                                </h5>
                            </div>
                        </div>
                        <ImageGallery photos={albumCollection} />
                    </div>
                    <div className="container py-lg-5 py-md-4 py-sm-4 py-3" >
                        <div className="row">
                            <div className="col-lg-7 text-left about-two-grids">
                                <h5 className="mb-lg-4 mb-3">Sunny Wong &nbsp;
                                    <span className="mid-color">{t('common.video')}</span>
                                </h5>
                            </div>
                        </div>
                        <VideoGallery videos={videoCollection} />
                    </div>
                </section>
            </div>

            <Footer latestNews={latestNews} />

        </div>
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    try {

        const sunnyWongPage = await contentfulService.getEntriesByContentType('sunnyWongPage', locale);

        const banner = sunnyWongPage[0]?.fields?.banner.map(item => transformBannerData(item));

        const showCollection = sunnyWongPage[0]?.fields?.sunnyWongShowCollection.map(item => transformShowCollection(item));

        const albumCollection = sunnyWongPage[0].fields.sunnyWongAlbum.map(item => transformMediaUrl(item));

        const videoCollection = sunnyWongPage[0].fields.sunnyWongVideoCollection.map(item => transformVideoClip(item));

        const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0, locale);

        return {
            props: {
                lngDict,
                intro: {
                    intro: documentToHtmlString(sunnyWongPage[0].fields.sunnyWongIntro, options),
                    image: sunnyWongPage[0]?.fields?.sunnyWongImage?.fields?.file?.url ? `https:${sunnyWongPage[0]?.fields?.sunnyWongImage?.fields?.file?.url}` : '',
                    extendIntro: documentToHtmlString(sunnyWongPage[0].fields.sunnyWongIntroExtend, options),
                    extendImage: sunnyWongPage[0]?.fields?.sunnyWongExtendImage?.fields?.file?.url ? `https:${sunnyWongPage[0]?.fields?.sunnyWongExtendImage?.fields?.file?.url}` : '',
                },
                banner: banner,
                showCollection: showCollection,
                albumCollection: albumCollection,
                videoCollection: videoCollection,
                webSettings: transformWebSettings(sunnyWongPage[0]),
                latestNews: blogEntries.map(blog => transformBlog(blog))
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[IndexPage] getStaticProps failed.`);

        throw e;
    }
};

export default SunnyWong;
