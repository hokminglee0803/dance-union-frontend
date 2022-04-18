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
import { transformArticle, transformBannerData, transformWebSettings } from '../utils/transformer';
import { Carousel } from 'react-responsive-carousel';
import { PageSettingProps } from '../interface/PageSetting';
import { ArticleWithBannerType } from '../interface/Article';
import Image from 'next/image'

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';
interface BookingProps {
    title: string;
    articleCollection: ArticleWithBannerType[];
    webSettings: PageSettingProps;
}

const Booking: React.FC<BookingProps> = ({ title, articleCollection, webSettings }) => {

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
                        return <div key={index}>
                            <Carousel showIndicators={false} autoFocus={true} autoPlay={true} infiniteLoop={true} emulateTouch={true}>
                                {
                                    item?.banner.map((i, index) => {
                                        return <div key={index}>
                                            <img alt="sunnyWong" src={isDesktop ? i.bannerDesktop : i.bannerMobile} />
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
                            <div className=" text-left pt-lg-2 pt-1 mb-lg-5 mb-md-4 mb-sm-4 mb-3">
                                <p style={{ whiteSpace: 'pre-line' }}>
                                    <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                                </p>
                            </div>
                        </div>
                    })

                }
            </section>


            {/* <section className="py-lg-4 py-md-3 py-sm-3 py-3" style={{ background: 'white' }}>
                <h4 className="text-center title mb-3">舞蹈室租借</h4>
                <div className="container py-lg-5 py-md-4 py-sm-4 py-3">
                    <div>
                        <img alt="sunnyWong" src="https://lh3.googleusercontent.com/d/1OTYBjTWLOQ7j9i0pdf1bugny48vX_VTQ" className="img-fluid" />
                    </div>
                    <div className="row" >
                        <div className="mb-lg-4 mb-3">
                            <br />
                            <h3 style={{ textAlign: 'center' }}>
                                逾千呎舞蹈室&nbsp;&nbsp;演唱會級別音響設備
                            </h3>
                            <br />
                            <p>
                                Dance Union位處港島北角區中心地帶，附近商舖食肆林立，鄰近港鐵站，且有完善巴士網絡，交通方便。
                            </p>
                            <p className="mt-2">
                                我們坐擁近一萬呎空間，其中舞蹈室範圍佔超過四千呎，地面採用特製彈性木板，能有效緩衝身體與地面之間的衝擊，減低受傷可能性。音響系統均採用專業演唱會配置，符合大眾對音樂質素的追求。場地更設置了活動式高分貝隔音版，租用者可按活動需求選擇場地的大小。
                            </p>
                            <p className="mt-2">
                                本場地設有自助水機、獨立浴室並提供風筒，租用者需自備毛巾及沐浴用品。
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{ background: 'lightGray' }} className="about py-lg-4 py-md-3 py-sm-3 py-3">
                <div className="container py-lg-5 py-md-4 py-sm-4 py-3" >
                    <div className="row">
                        <div style={{ margin: 'auto', width: '95%' }}>
                            <div className="team-list-team">
                                <div className="team-member">
                                    <h3 style={{ textAlign: 'center' }}>
                                        大排舞室
                                    </h3>
                                    <div className="team-image">
                                        <img alt="sunnyWong" src="https://lh3.googleusercontent.com/d/1-PgQSWH5gIzI7xpSwh47Ycc-no3ulRZ_" className="img-fluid" />
                                    </div>
                                    <div className="team-hover">
                                        <div className="desk text-center">
                                            <h4 className="mb-2">
                                                容納人數：60人
                                            </h4>
                                        </div>
                                        <div className="s-link">
                                            <a href="#" style={{ fontSize: 20 }} >
                                                租用查詢
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div style={{ margin: 'auto', width: '95%' }}>
                            <div className="team-list-team">
                                <div className="team-member">
                                    <h3 style={{ textAlign: 'center' }}>
                                        中排舞室
                                    </h3>
                                    <div className="team-image">
                                        <img alt="sunnyWong" src="https://lh3.googleusercontent.com/d/1qNAnhcuUNhUFDtrGMixdSzJzhKPfd74_" className="img-fluid" />
                                    </div>
                                    <div className="team-hover">
                                        <div className="desk text-center">
                                            <h4 className="mb-2">
                                                容納人數：40人
                                            </h4>
                                        </div>
                                        <div className="s-link">
                                            <a href="#" style={{ fontSize: 20 }} >
                                                租用查詢
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div style={{ margin: 'auto', width: '95%' }}>
                            <div className="team-list-team">
                                <div className="team-member">
                                    <h3 style={{ textAlign: 'center' }}>
                                        小排舞室
                                    </h3>
                                    <div className="team-image">
                                        <img alt="sunnyWong" src="https://lh3.googleusercontent.com/d/1Dmsyz1fqsyUgysM6KzSW4DNasA-bVS_d" className="img-fluid" />
                                    </div>
                                    <div className="team-hover">
                                        <div className="desk text-center">
                                            <h4 className="mb-2">
                                                容納人數：20人
                                            </h4>
                                        </div>
                                        <div className="s-link">
                                            <a href="#" style={{ fontSize: 20 }} >
                                                租用查詢
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div style={{ margin: 'auto', width: '95%' }}>
                            <div className="team-list-team">
                                <div className="team-member">
                                    <h3 style={{ textAlign: 'center' }}>
                                        接待處
                                    </h3>
                                    <div className="team-image">
                                        <img alt="sunnyWong" src="https://lh3.googleusercontent.com/d/1KoWoS9di7cC25Hzg07bWMwUrnAV_L7ij" className="img-fluid" />
                                    </div>
                                    <div className="team-hover">
                                        <div className="desk text-center">
                                            <h4 className="mb-2">

                                            </h4>
                                        </div>
                                        <div className="s-link">
                                            <a href="#" style={{ fontSize: 20 }} >
                                                租用查詢
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <Footer />

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

        return {
            props: {
                lngDict,
                title: bookingPage[0].fields.title,
                articleCollection: articleCollection,
                webSettings: transformWebSettings(bookingPage[0])
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Booking Page] getStaticProps failed.`);

        throw e;
    }
};

export default Booking;
