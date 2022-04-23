import { useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import contentfulService from '../utils/service/contentfulService';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { ArticleProps } from '../components/Article';
import { transformArticle, transformBannerData, transformBlog, transformWebSettings } from '../utils/transformer';
import { Carousel } from 'react-responsive-carousel';
import { PageSettingProps } from '../interface/PageSetting';
import { ArticleWithBannerType } from '../interface/Article';
import Image from 'next/image'
import ReactPlayer from 'react-player/lazy'
import { BlogType, BlogTypeEnum } from '../interface/Blog';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';
interface BookingProps {
    title: string;
    articleCollection: ArticleWithBannerType[];
    webSettings: PageSettingProps;
    latestNews: BlogType[];
}

const Booking: React.FC<BookingProps> = ({ title, articleCollection, webSettings, latestNews }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

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

            <section className="contact py-lg-4 py-md-3 py-sm-3 py-3" style={{ background: 'white', textAlign: 'center', width: '85%', margin: 'auto' }}>
                <h4 className="text-center title mb-3">
                    {title}</h4>
                {
                    articleCollection?.map((item, index) => {
                        console.log(item);
                        return <div key={index}>
                            <Carousel
                                onChange={() => {
                                    setAutoPlay(true);
                                }}
                                showIndicators={false} autoFocus={true} autoPlay={true} infiniteLoop={true} emulateTouch={true}>
                                {
                                    item?.banner.map((i, index) => {
                                        return <div key={index}
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => {
                                                router.push(i.actionLink)
                                            }}>
                                            {
                                                i.bannerDesktop !== '' ?
                                                    <Image
                                                        alt={i.bannerSEOTitle}
                                                        title={i.bannerSEOTitle}
                                                        width={isDesktop ? '3648px' : '2736px'}
                                                        height={isDesktop ? '1358px' : '2736px'}
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
                                                            light={i.thumbumbDesktop !== '' ? (isDesktop ? i.thumbumbDesktop : (i.thumbumbMobile ?? i.thumbumbDesktop)) : false}
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
                            <h3 className="text-center title mb-3">{item.title}</h3>
                            <div className=" text-left pt-lg-2 pt-1 mb-lg-5 mb-md-4 mb-sm-4 mb-3">
                                <p style={{ whiteSpace: 'pre-line' }}>
                                    <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                                </p>
                            </div>
                        </div>
                    })

                }
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

        const bookingPage = await contentfulService.getEntriesByContentType('bookingPage');

        const generalIntroBannerList = await Promise.all(bookingPage[0].fields?.generalIntro?.fields?.banner.map(async item => {
            const banner = await contentfulService.getEntriesById(item.sys.id);
            return transformBannerData(banner[0]);
        }))

        const room1BannerList = await Promise.all(bookingPage[0].fields?.room1?.fields?.banner.map(async item => {
            const banner = await contentfulService.getEntriesById(item.sys.id);
            return transformBannerData(banner[0]);
        }))


        const room2BannerList = await Promise.all(bookingPage[0].fields?.Room2?.fields?.banner.map(async item => {
            const banner = await contentfulService.getEntriesById(item.sys.id);
            return transformBannerData(banner[0]);
        }))


        const room3BannerList = await Promise.all(bookingPage[0].fields?.room3?.fields?.banner.map(async item => {
            const banner = await contentfulService.getEntriesById(item.sys.id);
            return transformBannerData(banner[0]);
        }))

        const room4BannerList = await Promise.all(bookingPage[0]?.fields?.room4?.[0]?.fields?.banner.map(async item => {
            const banner = await contentfulService.getEntriesById(item.sys.id);
            return transformBannerData(banner[0]);
        }))

        const articleCollection = [
            transformArticle(bookingPage[0].fields.generalIntro, generalIntroBannerList),
            transformArticle(bookingPage[0].fields.room1, room1BannerList),
            transformArticle(bookingPage[0].fields.Room2, room2BannerList),
            transformArticle(bookingPage[0].fields.room3, room3BannerList),
            transformArticle(bookingPage[0].fields.room4?.[0], room4BannerList)
        ]

        const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0);

        return {
            props: {
                lngDict,
                title: bookingPage[0].fields.title,
                articleCollection: articleCollection,
                webSettings: transformWebSettings(bookingPage[0]),
                latestNews: blogEntries.map(blog => transformBlog(blog))
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Booking Page] getStaticProps failed.`);

        throw e;
    }
};

export default Booking;
