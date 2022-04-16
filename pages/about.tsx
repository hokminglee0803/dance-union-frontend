import { useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import MenuAppBar from '../components/Header';
import LoginForm from '../pageComponent/LoginForm';
import ResponsiveCarousel from '../components/ResponsiveCarousel';
import Article, { FloatProps } from '../components/Article';
import contentfulService from '../utils/service/contentfulService';
import { Asset } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

interface AboutProps {
    articles: any[];
}

const About: React.FC<AboutProps> = ({ articles }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();


    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <div>
            <Head>
                <title>{t('seo_title')}</title>
                <meta name="description" content={t('meta_description')} />
                <meta name="keywords" content={t('meta_keywords')} />
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
                <meta property="og:title" content={t('og_title')} />
                <meta
                    property="og:description"
                    content={t('og_description')} />
                <meta property="og:url" content={t('og_url')} />
                <meta property="og:image" content={t('og_image_url')} />
            </Head>

            <MenuAppBar />

            <div style={{ marginTop: '100px' }} />

            {
                articles.map((item, index) => {
                    const { fields } = item;
                    return <Article
                        key={index}
                        title={fields.title}
                        position={FloatProps.LEFT}
                        description={documentToHtmlString(fields.description)}
                    />
                })
            }

            <Footer />

        </div>
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    try {

        const articles = await contentfulService.getEntriesByContenType('about');

        return {
            props: {
                lngDict,
                articles
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[IndexPage] getStaticProps failed.`);

        throw e;
    }
};

export default About;
