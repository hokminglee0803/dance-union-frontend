import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import contentfulService from '../utils/service/contentfulService';
import { transformArticle, transformBannerData, transformCourseTable, transformKnowMore, transformVideoClip, transformWebSettings } from '../utils/transformer';
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

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

interface CourseProps {
    generalInfo: {
        title: string;
        articleCollection: ArticleWithBannerType[];
    },
    videoInfo: {
        title: string;
        videoCollection: VideoType[];
        moreVideoList: VideoType[];
    };
    imageInfo: {
        title: string;
        imageCollection: ImageType[];
    };
    knowMore: {
        title: string;
        subTitle: string;
        banner: BannerType[];
        table: CourseType[];
        content: string;
    };
    webSettings: PageSettingProps;
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

const Course: React.FC<CourseProps> = ({ generalInfo, videoInfo, imageInfo, knowMore, webSettings }) => {

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
        setValue(index);
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

            <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                {
                    !isDesktop ? (
                        null
                    ) : (
                        <AppBar
                            position="fixed" style={{ marginTop: 55, height: 60, background: 'white', flexGrow: 1 }}>
                            <Tabs
                                value={value}
                                style={{
                                    color: 'black'
                                }}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                indicatorColor="primary"
                                textColor="inherit"
                            >
                                <Tab icon={<EmojiPeopleIcon />} iconPosition="start" label={'課程精選'} {...a11yProps(0)} />
                                <Tab icon={<VideocamIcon />} iconPosition="start" label={'相關影片'} {...a11yProps(1)} />
                                <Tab icon={<PhotoAlbumIcon />} iconPosition="start" label={'精選相集'} {...a11yProps(2)} />
                                <Tab icon={<InfoIcon />} iconPosition="start" label={'了解更多'} {...a11yProps(3)} />
                            </Tabs>
                        </AppBar>
                    )
                }

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
                                            <Carousel showIndicators={false} autoFocus={true} autoPlay={true} infiniteLoop={true} emulateTouch={true}>
                                                {
                                                    item?.banner?.map((i, index) => {
                                                        return <div key={index}>
                                                            <img src={isDesktop ? i.bannerDesktop : i.bannerMobile} />
                                                            <div style={{
                                                                backgroundColor: 'black',
                                                                color: 'white',
                                                                fontSize: 20
                                                            }}>{i.bannerTitle}</div>
                                                        </div>

                                                    })
                                                }

                                            </Carousel>
                                            <h3 className="text-center title mb-3">{item.title}</h3>
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
                        <section className="py-lg-4 py-md-3 py-sm-3 py-3" id="promotion" style={{ background: 'white' }}>
                            <h4 className="text-center title mb-3">{videoInfo.title}</h4>
                            <br /><br />
                            {
                                videoInfo.videoCollection.map(item => {
                                    return (
                                        <>
                                            <VideoPlayer url={item.url} />
                                            <h4 className="text-center title mb-3">{item.title}</h4>
                                            <br />
                                        </>
                                    )

                                })
                            }

                            <h3 className="text-center title mb-3">更多影片</h3>
                            <div className="row gallery-info">
                                <VideoGallery videos={videoInfo.moreVideoList} />
                            </div>
                        </section>
                    </TabPanel>
                    <TabPanel value={value} index={2} >
                        <section className="py-lg-4 py-md-3 py-sm-3 py-3" style={{ background: 'white' }} id="blog">
                            <h4 className="text-center title mb-3">{imageInfo.title}</h4>

                            {
                                imageInfo.imageCollection?.map(item => {
                                    return (<>
                                        <Carousel showIndicators={false} autoFocus={true} autoPlay={true} infiniteLoop={true} emulateTouch={true}>
                                            {
                                                item.banner.map((i, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <img src={isDesktop ? i.bannerDesktop : i.bannerMobile} />
                                                            <div style={{
                                                                backgroundColor: 'black',
                                                                color: 'white',
                                                                fontSize: 20
                                                            }}>{i.bannerTitle}</div>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </Carousel>
                                        <h4 className="text-center title mb-3">{item.title}</h4>
                                        <br />
                                        <div className=" text-center pt-lg-2 pt-1 mb-lg-5 mb-md-4 mb-sm-4 mb-3">
                                            <p>
                                                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                            </p>
                                        </div>

                                    </>)
                                })
                            }
                        </section>
                    </TabPanel>
                    <TabPanel value={value} index={3} >
                        <section className="blog py-lg-4 py-md-3 py-sm-3 py-3" style={{ background: 'white' }} id="blog">
                            <h4 className="text-center title mb-3">
                                {
                                    knowMore?.title
                                }
                            </h4>

                            <Carousel showIndicators={false} autoFocus={true} autoPlay={true} infiniteLoop={true} emulateTouch={true}>
                                {
                                    knowMore?.banner.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <img src={isDesktop ? item.bannerDesktop : item.bannerMobile} />
                                                <div style={{
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    fontSize: 20
                                                }}>{item.bannerTitle}</div>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                            <h3 className="text-center title mb-3">
                                {knowMore?.subTitle}
                            </h3>
                            <div className="container py-lg-5 py-md-4 py-sm-4 py-3">
                                <CourseTable pageData={knowMore?.table} />
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: knowMore.content }} />
                        </section>
                    </TabPanel>
                </SwipeableViews>
                {
                    !isDesktop ? (
                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }} elevation={3}>
                            <BottomNavigation
                                style={{
                                    background: 'lightGrey'
                                }}
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            >
                                <BottomNavigationAction label="課程精選" icon={<EmojiPeopleIcon />} />
                                <BottomNavigationAction label="相關影片" icon={<VideocamIcon />} />
                                <BottomNavigationAction label="精選相集" icon={<PhotoAlbumIcon />} />
                                <BottomNavigationAction label="了解更多" icon={<InfoIcon />} />
                            </BottomNavigation>
                        </Paper>
                    ) : ""

                }
            </Box>

            <Footer />

        </div >
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    try {

        const coursePage = await contentfulService.getEntriesByContentType('coursePage');

        const articleCollection = await Promise.all(coursePage[0].fields?.generalInfoSession?.fields?.articleCollection?.map(async item => {
            const article = await contentfulService.getEntriesById(item.sys.id);
            return transformArticle(article[0]);
        }))

        const videoCollection = await Promise.all(coursePage[0].fields?.videoSession?.fields?.videoCollection?.map(async item => {
            const video = await contentfulService.getEntriesById(item.sys.id);
            return transformVideoClip(video[0]);
        }))

        const moreVideoList = await Promise.all(coursePage[0].fields?.videoSession?.fields?.moreVideo?.map(async item => {
            const moreVideo = await contentfulService.getEntriesById(item.sys.id);
            return transformVideoClip(moreVideo[0]);
        }))

        const imageCollection = await Promise.all(coursePage[0].fields?.imageSession?.fields?.imageCollection?.map(async item => {
            const image = await contentfulService.getEntriesById(item.sys.id);
            return transformArticle(image[0])
        }))

        const courseTableList = await Promise.all(coursePage[0].fields?.knowMoreSession?.fields?.courseTable.map(async item => {
            const courseTable = await contentfulService.getEntriesById(item.sys.id);
            return transformCourseTable(courseTable[0]);
        }))

        const bannerList = await Promise.all(coursePage[0].fields?.knowMoreSession?.fields?.banner.map(async item => {
            const banner = await contentfulService.getEntriesById(item.sys.id);
            return transformBannerData(banner[0]);
        }))

        return {
            props: {
                lngDict,
                generalInfo: {
                    title: coursePage[0].fields.generalInfoSession.fields.title,
                    articleCollection: articleCollection
                },
                videoInfo: {
                    title: coursePage[0].fields.videoSession.fields.title,
                    videoCollection: videoCollection,
                    moreVideoList: moreVideoList
                },
                imageInfo: {
                    title: coursePage[0].fields.imageSession.fields.title,
                    imageCollection: imageCollection,
                },
                knowMore: {
                    ...transformKnowMore(coursePage[0].fields.knowMoreSession),
                    banner: bannerList,
                    table: courseTableList
                },
                webSettings: transformWebSettings(coursePage[0])
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Course Page] getStaticProps failed.`);

        throw e;
    }
};

export default Course;
