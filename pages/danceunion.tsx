import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import contentfulService from '../utils/service/contentfulService';
import { transformArticleWithImage, transformBannerData, transformBlog, transformVideoClip, transformWebSettings } from '../utils/transformer';
import { BannerType } from '../interface/Banner';
import ActionAreaCard from '../components/ActionAreaCard';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { ArticleType } from '../interface/Article';
import { PageSettingProps } from '../interface/PageSetting';
import Image from 'next/image'
import { BlogType, BlogTypeEnum } from '../interface/Blog';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || 'https://www.sunnywongofficial.com';;

interface AboutProps {
    aboutDanceUnion: ArticleType;
    purpose: ArticleType;
    service: ArticleType;
    show: ArticleType;
    booking: ArticleType;
    socialResponsibility: ArticleType;
    partner: ArticleType;
    webSettings: PageSettingProps;
    latestNews: BlogType[];
}

const About: React.FC<AboutProps> = ({
    aboutDanceUnion,
    purpose,
    service,
    show,
    booking,
    socialResponsibility,
    partner,
    webSettings,
    latestNews
}) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? 'en/danceunion' : 'danceunion';

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
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
                <meta name="google-site-verification" content="Xj24ARH2mUnvhluOalhwzKKZfmd7l6DUR-asS6v-s-o" />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}danceunion`}
                    hrefLang="zh-hk"
                />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}en/danceunion`}
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

            <section style={{ background: '#ffffff' }} className="about py-lg-4 py-md-3 py-sm-3 py-3" >
                <div className="container py-lg-5 py-md-4 py-sm-4 py-3">
                    <div className="row" style={{ marginBottom: 20 }}>
                        {
                            !isDesktop ?
                                <div className="col-lg-5 about-imgs-txt" style={{ marginBottom: 50 }}>
                                    <img alt={'sunny wong dance union'} src={aboutDanceUnion.image} className="img-fluid" />
                                </div> : ""
                        }
                        <br />
                        <div className="col-lg-7 text-left about-two-grids">
                            <h5 className="mb-lg-4 mb-3">{t('danceUnion.aboutDanceUnion_1')}
                                <span className="mid-color">{t('danceUnion.aboutDanceUnion_2')}</span>
                            </h5>
                            <div className="about-para-txt">
                                <p style={{ whiteSpace: 'pre-line' }}>
                                    <div dangerouslySetInnerHTML={{ __html: aboutDanceUnion.content }} />
                                </p>
                            </div>

                        </div>
                        {
                            isDesktop ?
                                <div className="col-lg-5 about-imgs-txt" style={{ marginBottom: 50 }}>
                                    <img alt={'sunny wong dance union'} src={aboutDanceUnion.image} className="img-fluid" />
                                </div> : ""
                        }
                    </div>
                    <br />
                    <div className="row" style={{ marginBottom: 20 }}>
                        <div className="col-lg-5 about-imgs-txt" style={{ marginBottom: 20 }}>
                            <img alt={'sunny wong dance union'} src={purpose.image} className="img-fluid" />
                        </div>
                        <div className="col-lg-7 text-left about-two-grids">
                            <h5 className="mb-lg-4 mb-3">{t('danceUnion.purpose_1')}
                                <span className="mid-color">{t('danceUnion.purpose_2')}</span>
                            </h5>
                            <div className="about-para-txt">
                                <p style={{ whiteSpace: 'pre-line' }}>
                                    <div dangerouslySetInnerHTML={{ __html: purpose.content }} />
                                </p>
                            </div>

                        </div>
                    </div>
                    <br />
                    <div className="row" style={{ marginBottom: 20 }}>
                        {
                            !isDesktop ?
                                <div className="col-lg-5 about-imgs-txt" style={{ marginBottom: 20 }}>
                                    <img alt={'sunny wong dance union'} src={service.image} className="img-fluid" />
                                </div> : ""
                        }
                        <div className="col-lg-7 text-left about-two-grids">
                            <h5 className="mb-lg-4 mb-3">{t('danceUnion.service_1')}
                                <span className="mid-color">{t('danceUnion.service_2')}</span>
                            </h5>
                            <div className="about-para-txt">
                                <div className="about-para-txt">
                                    <p style={{ whiteSpace: 'pre-line' }}>
                                        <div dangerouslySetInnerHTML={{ __html: service.content }} />
                                    </p>
                                </div>
                            </div>
                        </div>
                        {
                            isDesktop ?
                                <div className="col-lg-5 about-imgs-txt">
                                    <img alt={'sunny wong dance union'} src={service.image} className="img-fluid" />
                                </div> : ''
                        }
                    </div>
                    <br />
                    <div className="row" style={{ marginBottom: 20 }}>
                        <div className="col-lg-5 about-imgs-txt" style={{ marginBottom: 20 }}>
                            <img alt={'sunny wong dance union'} src={show.image} className="img-fluid" />
                        </div>
                        <div className="col-lg-7 text-left about-two-grids">
                            <h5 className="mb-lg-4 mb-3">{t('danceUnion.show_1')}
                                <span className="mid-color">{t('danceUnion.show_2')}</span>
                            </h5>
                            <div className="about-para-txt">
                                <div className="about-para-txt">
                                    <div className="about-para-txt">
                                        <p style={{ whiteSpace: 'pre-line' }}>
                                            <div dangerouslySetInnerHTML={{ __html: show.content }} />
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <br />
                    <div className="row" style={{ marginBottom: 20 }}>
                        {
                            !isDesktop ? <div className="col-lg-5 about-imgs-txt" style={{ marginBottom: 20 }}>
                                <img alt={'sunny wong dance union'} src={booking.image} className="img-fluid" />
                            </div> : ""
                        }
                        <div className="col-lg-7 text-left about-two-grids">
                            <h5 className="mb-lg-4 mb-3">{t('danceUnion.booking_1')}
                                <span className="mid-color">{t('danceUnion.booking_2')}</span>
                            </h5>
                            <div className="about-para-txt">
                                <p style={{ whiteSpace: 'pre-line' }}>
                                    <div dangerouslySetInnerHTML={{ __html: booking.content }} />
                                </p>
                            </div>
                        </div>
                        {
                            isDesktop ? <div className="col-lg-5 about-imgs-txt">
                                <img alt={'sunny wong dance union'} src={booking.image} className="img-fluid" />
                            </div> : ""
                        }
                    </div>
                    <br />
                    <div className="row" style={{ marginBottom: 20 }}>
                        <div className="col-lg-5 about-imgs-txt" style={{ marginBottom: 20 }}>
                            <img alt={'sunny wong dance union'} src={socialResponsibility.image} className="img-fluid" />
                        </div>
                        <div className="col-lg-7 text-left about-two-grids">
                            <h5 className="mb-lg-4 mb-3">{t('danceUnion.socialResponsibility_1')}
                                <span className="mid-color">{t('danceUnion.socialResponsibility_2')}</span>
                            </h5>
                            <div className="about-para-txt">
                                <p style={{ whiteSpace: 'pre-line' }}>
                                    <div dangerouslySetInnerHTML={{ __html: socialResponsibility.content }} />
                                </p>
                            </div>

                        </div>
                    </div>
                    <br />
                    <div className="row" style={{ marginBottom: 20 }}>
                        {
                            !isDesktop ?
                                <div className="col-lg-5 about-imgs-txt" style={{ marginBottom: 20 }}>
                                    <img alt={'sunny wong dance union'} src={partner.image} className="img-fluid" />
                                </div> : ''
                        }
                        <div className="col-lg-7 text-left about-two-grids">
                            <h5 className="mb-lg-4 mb-3">{t('danceUnion.partner_1')}
                                <span className="mid-color">{t('danceUnion.partner_2')}</span>
                            </h5>
                            <div className="about-para-txt">
                                <p style={{ whiteSpace: 'pre-line' }}>
                                    <div dangerouslySetInnerHTML={{ __html: partner.content }} />
                                </p>
                            </div>

                        </div>
                        {
                            isDesktop ?
                                <div className="col-lg-5 about-imgs-txt">
                                    <img alt={'sunny wong dance union'} src={partner.image} className="img-fluid" />
                                </div> : ''
                        }
                    </div>
                </div>
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

        const danceUnionPage = await contentfulService.getEntriesByContentType('danceUnionPage', locale);

        const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0, locale);

        return {
            props: {
                lngDict,
                aboutDanceUnion: transformArticleWithImage(danceUnionPage[0].fields.aboutDanceUnion),
                purpose: transformArticleWithImage(danceUnionPage[0].fields.purpose),
                service: transformArticleWithImage(danceUnionPage[0].fields.service),
                show: transformArticleWithImage(danceUnionPage[0].fields.show),
                booking: transformArticleWithImage(danceUnionPage[0].fields.booking),
                socialResponsibility: transformArticleWithImage(danceUnionPage[0].fields.socialResponsibility),
                partner: transformArticleWithImage(danceUnionPage[0].fields.partner),
                webSettings: transformWebSettings(danceUnionPage[0]),
                latestNews: blogEntries.map(blog => transformBlog(blog))
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[About Page] getStaticProps failed.`);

        throw e;
    }
};

export default About;
