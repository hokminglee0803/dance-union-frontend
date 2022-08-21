import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import contentfulService from '../utils/service/contentfulService';
import { transformArticle, transformBannerData, transformBlog, transformVideoClip, transformWebSettings } from '../utils/transformer';
import { BannerType } from '../interface/Banner';
import ActionAreaCard from '../components/ActionAreaCard';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { VideoType } from '../interface/Video';
import { PageSettingProps } from '../interface/PageSetting';
import ReactPlayer from 'react-player/lazy'
import { BlogType, BlogTypeEnum } from '../interface/Blog';
import { ArticleWithBannerType } from '../interface/Article';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Image from 'next/image'

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || 'https://www.sunnywongofficial.com';;
interface OpenClassType {
    generalInfo: {
        title: string;
        articleCollection: ArticleWithBannerType[];
    },
    title: BannerType[];
    webSettings: PageSettingProps;
    latestNews: BlogType[];
}

const OpenClass: React.FC<OpenClassType> = ({ generalInfo, webSettings, title, latestNews }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en/openclass' ? 'en/openclass' : 'openclass';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const indicatorStyles: React.CSSProperties = {
        background: '#fff',
        width: 12,
        height: 12,
        display: 'inline-block',
        margin: '2px',
        marginBottom: isDesktop ? 30 : 40,
        borderRadius: '20px'
    };

    const arrowStyles: React.CSSProperties = {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        cursor: 'pointer',
        height: '100%',
        width: isDesktop ? '100px' : '60px',
        margin: 0,
    };


    const [autoPlay, setAutoPlay] = useState(true);

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
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
                <meta name="google-site-verification" content="Xj24ARH2mUnvhluOalhwzKKZfmd7l6DUR-asS6v-s-o" />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}openclass`}
                    hrefLang="zh-hk"
                />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}en/openclass`}
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

            <section className="py-lg-4 py-md-3 py-sm-3 py-3" id="promotion" style={{ background: 'white' }}>
                <br />
                <h4 className="text-center title mb-3">{title}</h4>
                <br />
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
                                <h4 className="text-center title mb-3">{item.title}</h4>
                                <div className=" text-center pt-lg-2 pt-1 mb-lg-5 mb-md-4 mb-sm-4 mb-3" style={{ width: isDesktop ? '85%' : '95%', margin: 'auto' }}>
                                    <p>
                                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                    </p>
                                </div>
                            </>
                        )

                    })
                }
                {/* {
                    videoCollection?.map(item => {
                        return (
                            <>
                                <div style={{
                                    position: 'relative',
                                    paddingTop: isDesktop ? '37.5%' : '100%',
                                }}>
                                    <ReactPlayer
                                        light={item.thumbumbDesktop !== '' && item.thumbumbMobile !== '' ? (isDesktop ? item.thumbumbDesktop : item.thumbumbMobile) : false}
                                        controls={true}
                                        width={'100%'}
                                        height={'100%'}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                        }}
                                        url={`${item.url}`} />
                                </div>
                                <br />
                                <h4 className="text-center title mb-3">{item.title}</h4>
                                <br />
                            </>
                        )

                    })
                } */}
            </section>

            <Footer latestNews={latestNews} />

        </div>
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    try {

        const openClassPage = await contentfulService.getEntriesByContentType('openClass', locale);

        const articleCollection = await Promise.all(openClassPage[0].fields?.generalInfoSession?.fields?.articleCollection?.map(async item => {
            const article = await contentfulService.getEntriesById(locale, item.sys.id);
            return transformArticle(article[0]);
        }))

        const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0, locale);

        return {
            props: {
                lngDict,
                title: openClassPage[0].fields.title,
                generalInfo: {
                    title: openClassPage[0].fields.generalInfoSession.fields.title,
                    articleCollection: articleCollection
                },
                webSettings: transformWebSettings(openClassPage[0]),
                latestNews: blogEntries.map(blog => transformBlog(blog))
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Open Class Page] getStaticProps failed.`);

        throw e;
    }
};

export default OpenClass;
