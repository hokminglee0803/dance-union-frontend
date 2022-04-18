import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import contentfulService from '../utils/service/contentfulService';
import { transformBannerData, transformVideoClip, transformWebSettings } from '../utils/transformer';
import { BannerType } from '../interface/Banner';
import ActionAreaCard from '../components/ActionAreaCard';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { VideoType } from '../interface/Video';
import { PageSettingProps } from '../interface/PageSetting';
import VideoPlayer from '../components/VideoPlayer';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';
interface OpenClassType {
    title: BannerType[];
    videoCollection: VideoType[];
    webSettings: PageSettingProps;
}

const OpenClass: React.FC<OpenClassType> = ({ webSettings, title, videoCollection }) => {

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

            <section className="py-lg-4 py-md-3 py-sm-3 py-3" id="promotion" style={{ background: 'white' }}>
                <h4 className="text-center title mb-3">{title}</h4>
                <br /><br />
                {
                    videoCollection?.map(item => {
                        return (
                            <>
                                <VideoPlayer url={item.url} />
                                <h4 className="text-center title mb-3">{item.title}</h4>
                                <br />
                            </>
                        )

                    })
                }
            </section>

            <Footer />

        </div>
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    try {

        const openClassPage = await contentfulService.getEntriesByContentType('openClass');

        const videoCollection = openClassPage[0].fields.videoCollection.map(item => transformVideoClip(item));

        return {
            props: {
                lngDict,
                title: openClassPage[0].fields.title,
                videoCollection: videoCollection,
                webSettings: transformWebSettings(openClassPage[0])
            },
            revalidate: 60,
        };
    } catch (e) {
        console.log(`[Open Class Page] getStaticProps failed.`);

        throw e;
    }
};

export default OpenClass;
