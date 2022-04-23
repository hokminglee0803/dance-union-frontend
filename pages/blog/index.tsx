import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import contentfulService from '../../utils/service/contentfulService';
import { transformArticleWithImage, transformBannerData, transformBlog } from '../../utils/transformer';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { ArticleType } from '../../interface/Article';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import VideocamIcon from '@mui/icons-material/Videocam';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SwipeableViews from 'react-swipeable-views';
import { BlogType, BlogTypeEnum } from '../../interface/Blog';
import Link from 'next/link'
import InfiniteScroll from "react-infinite-scroll-component";
import CustomizedCircularProgress from '../../components/CustomizedCircularProgress';
import Image from 'next/image'

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

interface BlogEntriesProps {
    initBlogEntries: BlogType[];
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

const BlogMainPage: React.FC<BlogEntriesProps> = ({
    initBlogEntries,
    latestNews
}) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [value, setValue] = useState(1);

    const [blogEntries, setBlogEntries] = useState(initBlogEntries);

    const [from, setFrom] = useState(3);
    const [type, setType] = useState(BlogTypeEnum.DIRECTION);
    const [lazyLoadList, setLazyLoadList] = useState([]);
    const [stopLazyLoad, setStopLazyLoad] = useState(false);
    const [loading, setLoading] = useState(false);

    async function fetchPageDetail(type) {
        setFrom(3);
        setType(type);
        setLazyLoadList([])
        setStopLazyLoad(false);
        const tempBlogEntries = await contentfulService.getBlogEntries(type, 3, 0);
        setBlogEntries(tempBlogEntries.map(blog => transformBlog(blog)))
        setLoading(false)
    }

    const fetchMoreData = () => {
        contentfulService.getBlogEntries(type, 5, from).then(data => {
            setFrom(from + 5);
            setLazyLoadList(lazyLoadList.concat(data.map(blog => transformBlog(blog))));
            if (data.length === 0) {
                setStopLazyLoad(true);
            }
        })
    };

    const handleChange = (event, newValue) => {
        setLoading(true)
        window.scrollTo(0, 0)
        setValue(newValue);
        let tempType = BlogTypeEnum.DIRECTION;
        switch (newValue) {
            case 0:
                tempType = BlogTypeEnum.NEWS;
                break;
            case 1:
                tempType = BlogTypeEnum.DIRECTION;
                break;
            case 2:
                tempType = BlogTypeEnum.SHOW;
                break;
        }
        setType(tempType);
        fetchPageDetail(tempType);
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        if (init) {
            setInit(false);
        }

    }, [init])

    const blogDetail = () => {
        return (
            <section className="blog py-lg-4 py-md-3 py-sm-3 py-3" id="blog">
                <h4 className="text-center title mb-3">
                    {type}
                </h4>
                <div className="container py-lg-5 py-md-4 py-sm-4 py-3">
                    {
                        blogEntries?.map((item, i) => {
                            if (i === 0) {
                                return <>
                                    <div style={{ width: '80%', margin: 'auto' }}>
                                        <div className="color-img-three">
                                            {
                                                item.desktopBanner !== '' && item.mobileBanner !== '' ? <img alt={'sunny wong dance union'} src={isDesktop ? item.desktopBanner : item.mobileBanner} className="img-fluid" /> : ''
                                            }
                                        </div>
                                        <div className="blog-date-grid mt-3">
                                            <ul>
                                                <li>
                                                    <Link href={`/blog/${item.id}`}>{item.createdDate}</Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="blog-left-wthree mt-lg-4 mt-3" >
                                            <h4 className="pb-3">
                                                <Link href={`/blog/${item.id}`}>{item.title}</Link>
                                            </h4>
                                            <p>
                                                <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                            </p>
                                        </div>
                                        <div className="view-buttn mt-md-4 mt-3">
                                            <Link href={`/blog/${item.id}`}>Read More</Link>
                                        </div>
                                    </div>
                                </>
                            }
                        })
                    }
                    <div className="row mt-lg-5 mt-md-4 mt-sm-4 mt-3">
                        {
                            blogEntries.map((item, i) => {
                                if (i !== 0) {
                                    return <div className="col-lg-6 col-md-6 blog-left-sub">
                                        <div className="back-ground-color">
                                            <div className="color-img-three">
                                                {
                                                    item.desktopBanner !== '' && item.mobileBanner !== '' ? <img alt={'sunny wong dance union'} src={isDesktop ? item.desktopBanner : item.mobileBanner} className="img-fluid" /> : ''
                                                }
                                            </div>
                                            <div className="blog-date-grid mt-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/blog/${item.id}`}>{item.createdDate}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="blog-left-wthree mt-lg-4 mt-3">
                                                <h4 className="pb-3">
                                                    <Link href={`/blog/${item.id}`}>{item.title}</Link>
                                                </h4>
                                                <p>
                                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                                </p>
                                            </div>
                                            <div className="view-buttn mt-md-4 mt-3">
                                                <Link href={`/blog/${item.id}`}>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                }
                            })
                        }
                        <InfiniteScroll
                            dataLength={lazyLoadList?.length ? lazyLoadList.length : 0}
                            next={fetchMoreData}
                            hasMore={true}
                            loader={!stopLazyLoad ? <div style={{ margin: 'auto', width: '10%', marginTop: 50 }}>
                                <img src={'https://images.ctfassets.net/k5r307sl52db/6rKA3sePUzxuHhyN1xi5Ls/e56ce34f61ac25723a1afb0a06af553a/orange-loader.gif'} alt='loading' width={100} height={100} />
                            </div> : ""}
                        >
                            <div className="row mt-lg-5 mt-md-4 mt-sm-4 mt-3">
                                {lazyLoadList?.map((item: BlogType, index) => {
                                    return <div key={index} className="col-lg-6 col-md-6 blog-left-sub">
                                        <div className="back-ground-color">
                                            <div className="color-img-three">
                                                {
                                                    item.desktopBanner !== '' && item.mobileBanner !== '' ? <img alt={'sunny wong dance union'} src={isDesktop ? item.desktopBanner : item.mobileBanner} className="img-fluid" /> : ''
                                                }
                                            </div>
                                            <div className="blog-date-grid mt-3">
                                                <ul>
                                                    <li>
                                                        <Link href={`/blog/${item.id}`}>{item.createdDate}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="blog-left-wthree mt-lg-4 mt-3">
                                                <h4 className="pb-3">
                                                    <Link href={`/blog/${item.id}`}>{item.title}</Link>
                                                </h4>
                                                <p>
                                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                                </p>
                                            </div>
                                            <div className="view-buttn mt-md-4 mt-3">
                                                <Link href={`/blog/${item.id}`}>Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </section >
        )
    }


    return (
        <div>
            <Head>
                <title>{'最新消息 | Dance Union'}</title>
                <meta name="description" content={'最新消息 | Dance Union'} />
                <meta name="keywords" content={'Dance Union, Sunny Wong, Blog, 網誌, 最新消息'} />
                <meta name="google-site-verification" content="HSeiJF1wIPEmRWl27NIHwrslEwWKO6YuN0AP2IkOVgk" />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}`}
                    hrefLang="zh-hk"
                />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}/en/`}
                    hrefLang="en-hk"
                />
                <link
                    rel="canonical"
                    href={`${HOME_PATH}${localePath}`}
                />
                <meta name="buildVersion" content={'1.0.1'} />
                <meta property="og:title" content={'網誌 | Dance Union'} />
                <meta
                    property="og:description"
                    content={'網誌 | Dance Union'} />
                {/* <meta property="og:url" content={t('og_url')} /> */}
                {/* <meta property="og:image" content={t('og_image_url')} /> */}
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
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        indicatorColor="primary"
                        textColor="inherit"
                    >
                        <Tab icon={<NewReleasesIcon />} iconPosition="start" label="新聞" {...a11yProps(0)} />
                        <Tab icon={<TrackChangesIcon />} iconPosition="start" label="動向" {...a11yProps(1)} />
                        <Tab icon={<VideocamIcon />} iconPosition="start" label="演出" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    style={{
                        marginTop: 100
                    }}
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} >
                        {
                            loading ?
                                <CustomizedCircularProgress /> :
                                blogDetail()
                        }
                    </TabPanel>
                    <TabPanel value={value} index={1} >
                        {
                            loading ?
                                <CustomizedCircularProgress /> :
                                blogDetail()
                        }
                    </TabPanel>
                    <TabPanel value={value} index={2} >
                        {
                            loading ?
                                <CustomizedCircularProgress /> :
                                blogDetail()
                        }
                    </TabPanel>
                </SwipeableViews>
            </Box>

            <Footer latestNews={latestNews} />

        </div>
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../../locales/${locale}.json`
    );

    try {

        const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.DIRECTION, 3, 0);

        const seoBlogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0);

        return {
            props: {
                lngDict,
                initBlogEntries: blogEntries.map(blog => transformBlog(blog)),
                latestNews: seoBlogEntries.map(blog => transformBlog(blog))
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Blog Page] getStaticProps failed.`);

        throw e;
    }
};

export default BlogMainPage;
