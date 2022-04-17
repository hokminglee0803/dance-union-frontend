import { useMediaQuery, useTheme } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import MenuAppBar from '../../components/Header';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';
import { BlogType } from '../../interface/Blog';
import contentfulService from '../../utils/service/contentfulService';
import { transformBlog, transformWebSettings } from '../../utils/transformer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { ShareSocial } from 'react-share-social'
import { PageSettingProps } from '../../interface/PageSetting';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

interface BlogEntryProps {
    blogEntry: BlogType;
    webSettings: PageSettingProps;
}

const Blog: React.FC<BlogEntryProps> = ({ blogEntry, webSettings }) => {

    const router = useRouter()

    const { pid } = router.query;

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const [url, setUrl] = useState('');

    useEffect(() => {
        if (init) {
            setUrl(window.location.href);
            setInit(false);
        }
    }, [init])

    return <div>
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

        <section className="blog py-lg-4 py-md-3 py-sm-3 py-3" style={{ background: 'white', width: '85%', margin: 'auto' }}>
            <div className="container py-lg-5 py-md-4 py-sm-4 py-3">
                <h3 className="text-center title mb-3">
                    {
                        blogEntry.title
                    }</h3>
                <div className="color-img-three">
                    <img alt="sunnyWong" src={isDesktop ? blogEntry.desktopBanner : blogEntry.mobileBanner} className="img-fluid" />
                </div>
                <div className="blog-date-grid mt-3">
                    <ul>
                        <li>
                            <Link href="">{
                                blogEntry.createdDate
                            }</Link>
                        </li>
                    </ul>
                </div>
                <div className="blog-left-wthree mt-lg-4 mt-3">
                    <h4 className="pb-3">
                        <Link href="/">
                            {
                                blogEntry.title
                            }
                        </Link>
                    </h4>
                    <p>
                        <div dangerouslySetInnerHTML={{
                            __html: blogEntry.content
                        }}>

                        </div>
                    </p>
                </div>
                <div className="container py-lg-5 py-md-4 py-sm-4 py-3">
                    <div className="blog-date-grid mt-3">
                        <Box>
                            <Typography>
                                分享文章：
                            </Typography>
                        </Box>
                    </div>
                    <ShareSocial
                        style={{
                            borderRadius: 3,
                            border: 0,
                            color: 'white',
                            width: '100%'
                        }}
                        url={`${url}`}
                        socialTypes={['facebook', 'twitter', 'line', 'linkedin']}
                    />

                </div>
            </div>
        </section>

        <Footer />

    </div >


}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths: any[] = []
    const blogEntries = await contentfulService.getEntriesById();

    blogEntries.map((blogEntry) => {
        paths.push(
            {
                params: {
                    blogId: blogEntry?.sys?.id
                },
            }
        )
    })
    return {
        paths: paths,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {

    const { default: lngDict = {} } = await import(
        `../../locales/${locale}.json`
    );

    try {

        const blogEntry = await contentfulService.getEntriesById(params?.blogId?.toString());

        return {
            props: {
                lngDict,
                blogEntry: transformBlog(blogEntry[0]),
                webSettings: transformWebSettings(blogEntry[0])
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Blog Page] getStaticProps failed.`);

        throw e;
    }
};

export default Blog