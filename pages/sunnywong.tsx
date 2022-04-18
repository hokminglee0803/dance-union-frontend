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
import { transformBannerData, transformMediaUrl, transformShowCollection, transformVideoClip, transformWebSettings } from '../utils/transformer';
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

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

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
}

const SunnyWong: React.FC<SunnyWongProps> = ({ intro, banner, showCollection, albumCollection, videoCollection, webSettings }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const [showMore, setShowMore] = useState(false);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() => {
        if (init) {
            setInit(false);
        }

    }, [init])

    return (
        <div>
            <Head>
                <title>{webSettings?.seoTitle}</title>
                <meta name="description" content={webSettings?.seoDescription} />
                <meta name="keywords" content={webSettings?.seoKeywords} />
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
                <meta property="og:title" content={webSettings?.openGraphTitle} />
                <meta property="og:description" content={webSettings?.openGraphDescription} />
                <meta property="og:url" content={webSettings?.openGraphUrl} />
                <meta property="og:image" content={webSettings?.openGraphImage} />
            </Head>

            <div style={{ marginTop: 50 }} />
            <ResponsiveAppBar />

            <div >
                <section style={{ background: '#ffffff' }} className="py-lg-4 py-md-3 py-sm-3 py-3">
                    <div className="container py-lg-5 py-md-4 py-sm-4 py-3" >
                        <div className="row">
                            <div style={{ margin: 50, marginLeft: 'auto', marginRight: 'auto', maxWidth: 250, }}>
                                <img src={intro.image} alt={t('image_alt')} className="img-fluid" />
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
                                <div style={{ margin: 50, marginTop: 0, marginLeft: 'auto', marginRight: 'auto', maxWidth: 220 }}>
                                    <img src={intro.extendImage} alt={t('image_alt')} className="img-fluid" />
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
                            {showMore ? '更少' : '更多'}
                        </Button>
                    </div>
                </section>
                <section style={{ background: '#ffffff' }} className="about py-lg-4 py-md-3 py-sm-3 py-3">

                    <Carousel showIndicators={false} autoFocus={true} autoPlay={true} infiniteLoop={true} emulateTouch={true}>
                        {
                            banner?.map((item, index) => {
                                return <div key={index}>
                                    <img alt={t('image_alt')} src={isDesktop ? item.bannerDesktop : item.bannerMobile} />
                                    <p
                                        style={{
                                            fontSize: '1.5vw',
                                            display: 'block',
                                            width: '100%',
                                            maxWidth: '100%',
                                            padding: '0',
                                            marginBottom: '.5rem',
                                            lineHeight: 'inherit',
                                            color: 'white',
                                            whiteSpace: 'normal',
                                            backgroundColor: 'black',
                                        }}
                                    >
                                        {item.bannerTitle}</p>
                                </div>
                            })
                        }
                    </Carousel>

                    <div className="container py-lg-5 py-md-4 py-sm-4 py-3" >
                        <div className="row">
                            <div className="col-lg-7 text-left about-two-grids">
                                <h5 className="mb-lg-4 mb-3">Sunny Wong &nbsp;
                                    <span className="mid-color">主要作品一覽</span>
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
                                    return <TabPanel value={value} key={index}>
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
                                    <span className="mid-color">相片</span>
                                </h5>
                            </div>
                        </div>
                        <ImageGallery photos={albumCollection} />
                    </div>
                    <div className="container py-lg-5 py-md-4 py-sm-4 py-3" >
                        <div className="row">
                            <div className="col-lg-7 text-left about-two-grids">
                                <h5 className="mb-lg-4 mb-3">Sunny Wong &nbsp;
                                    <span className="mid-color">影片</span>
                                </h5>
                            </div>
                        </div>
                        <VideoGallery videos={videoCollection} />
                    </div>
                </section>
            </div>

            <Footer />

        </div>
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    try {

        const sunnyWongPage = await contentfulService.getEntriesByContentType('sunnyWongPage');

        const banner = sunnyWongPage[0]?.fields?.banner.map(item => transformBannerData(item));

        const showCollection = sunnyWongPage[0]?.fields?.sunnyWongShowCollection.map(item => transformShowCollection(item));

        const albumCollection = sunnyWongPage[0].fields.sunnyWongAlbum.map(item => transformMediaUrl(item));

        const videoCollection = sunnyWongPage[0].fields.sunnyWongVideoCollection.map(item => transformVideoClip(item));

        return {
            props: {
                lngDict,
                intro: {
                    intro: documentToHtmlString(sunnyWongPage[0].fields.sunnyWongIntro),
                    image: sunnyWongPage[0]?.fields?.sunnyWongImage?.fields?.file?.url ?? '',
                    extendIntro: documentToHtmlString(sunnyWongPage[0].fields.sunnyWongIntroExtend),
                    extendImage: sunnyWongPage[0]?.fields?.sunnyWongExtendImage?.fields?.file?.url ?? ''
                },
                banner: banner,
                showCollection: showCollection,
                albumCollection: albumCollection,
                videoCollection: videoCollection,
                webSettings: transformWebSettings(sunnyWongPage[0])
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[IndexPage] getStaticProps failed.`);

        throw e;
    }
};

export default SunnyWong;
