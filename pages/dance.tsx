import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import contentfulService from '../utils/service/contentfulService';
import { transformBannerData, transformBlog, transformWebSettings } from '../utils/transformer';
import { BannerType } from '../interface/Banner';
import ActionAreaCard from '../components/ActionAreaCard';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { PageSettingProps } from '../interface/PageSetting';
import Image from 'next/image'
import { BlogType, BlogTypeEnum } from '../interface/Blog';
import ReactPlayer from 'react-player/lazy'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { FAQType } from '../interface/FAQ';
import FAQ from '../components/FAQ';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || 'https://www.sunnywongofficial.com';
interface IndexPageProps {
  webSettings: PageSettingProps;
  latestNews: BlogType[];
  faq: FAQType;
}

const IndexPage: React.FC<IndexPageProps> = ({ webSettings, latestNews, faq }) => {

  const router = useRouter();

  const { locale } = router;

  const localePath = locale === 'en' ? 'en/dance' : 'dance';

  const { t } = useI18n();

  const [init, setInit] = useState(true);

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [autoPlay, setAutoPlay] = useState(true);

  const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    cursor: 'pointer',
    height: '100%',
    width: isDesktop ? '100px' : '60px',
    margin: 0,
  };

  useEffect(() => {
    if (init) {
      setInit(false);
    }

  }, [init])

  const indicatorStyles: React.CSSProperties = {
    background: '#fff',
    width: 12,
    height: 12,
    display: 'inline-block',
    margin: '2px',
    marginBottom: isDesktop ? 30 : 40,
    borderRadius: '20px'
  };

  return (
    <div>
      <Head>
        <title>{webSettings?.seoTitle}</title>
        <meta name="description" content={webSettings?.seoDescription} />
        <meta name="keywords" content={webSettings?.seoKeywords} />
        <meta name="google-site-verification" content="Xj24ARH2mUnvhluOalhwzKKZfmd7l6DUR-asS6v-s-o" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
        <link
          rel="alternate"
          href={`${HOME_PATH}dance`}
          hrefLang="zh-hk"
        />
        <link
          rel="alternate"
          href={`${HOME_PATH}en/dance`}
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

      <div style={{ marginTop: 100 }} />

      <FAQ faq={faq} />

      <Footer latestNews={latestNews} />

    </div >
  )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

  const { default: lngDict = {} } = await import(
    `../locales/${locale}.json`
  );

  try {

    const dancePage = await contentfulService.getEntriesByContentType('dance', locale);

    const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0, locale);

    const contents = [];

    for (let index = 0; index < dancePage[0].fields.faq.fields.contents.length; index++) {
      const faqContent = dancePage[0].fields.faq.fields.contents[index]
      const content = await contentfulService.getEntriesById(locale, faqContent.sys.id);
      contents.push({
        title: documentToHtmlString(content[0]?.fields.title) ?? '',
        description: documentToHtmlString(content[0]?.fields.description) ?? '',
      })
    }

    const questions = [];

    for (let index = 0; index < dancePage[0].fields.faq.fields.faq.length; index++) {
      const faqQuestion = dancePage[0].fields.faq.fields.faq[index]
      const question = await contentfulService.getEntriesById(locale, faqQuestion.sys.id);
      questions.push({
        question: question[0]?.fields.question ?? '',
        answer: question[0]?.fields.answer ?? ''
      })
    }
    
    const faqTitle = documentToHtmlString(dancePage[0].fields.faq.fields.faqTitle);
    return {
      props: {
        lngDict,
        webSettings: transformWebSettings(dancePage[0]),
        latestNews: blogEntries.map(blog => transformBlog(blog)),
        faq: {
          contents,
          faqTitle,
          questions
        }
      },
      revalidate: 1,
    };
  } catch (e) {
    console.log(`[IndexPage] getStaticProps failed.`);

    throw e;
  }
};

export default IndexPage;
