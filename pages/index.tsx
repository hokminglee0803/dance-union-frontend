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

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH;
interface IndexPageProps {
  mainPageBanner: BannerType[];
  highlight: BannerType[];
  webSettings: PageSettingProps;
  latestNews: BlogType[];
}

const IndexPage: React.FC<IndexPageProps> = ({ mainPageBanner, highlight, webSettings, latestNews }) => {

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

      <Carousel
        showIndicators={false} autoFocus={true} infiniteLoop={true} emulateTouch={true} showThumbs={false} autoPlay={true}>
        {
          mainPageBanner.map((item, index) => {
            return <div key={index}
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                router.push(item.actionLink)
              }}>
              {
                item.bannerDesktop !== '' && item.bannerMobile !== '' ?
                  < Image
                    alt={item.bannerSEOTitle}
                    title={item.bannerSEOTitle}
                    width={isDesktop ? '3648px' : '2736px'}
                    height={isDesktop ? '1358px' : '2736px'}
                    src={isDesktop ? item.bannerDesktop : item.bannerMobile}
                  /> :
                  <div style={{
                    position: 'relative',
                    paddingTop: isDesktop ? '37.5%' : '100%',
                  }}>
                    <ReactPlayer
                      loop={true}
                      light={item.thumbumbDesktop !== '' && item.thumbumbMobile !== '' ? (isDesktop ? item.thumbumbDesktop : item.thumbumbMobile) : false}
                      controls={true}
                      loop={true}
                      width={'100%'}
                      height={'100%'}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                      url={
                        `${item.bannerVideo}`
                      }
                    />
                  </div>
              }
              <div style={{
                backgroundColor: 'black',
                color: 'white',
                fontSize: 20
              }}>
                {item.bannerTitle}
              </div>
            </div>
          })
        }
      </Carousel>

      <div style={{ margin: 10 }}>
        <Grid container spacing={3}>
          {
            highlight.map((item, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <ActionAreaCard
                    img={isDesktop ? item.bannerDesktop : item.bannerMobile}
                    title={item.bannerTitle}
                  />
                </Grid>
              )
            })
          }
        </Grid>
      </div>

      <Footer latestNews={latestNews} />

    </div>
  )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

  const { default: lngDict = {} } = await import(
    `../locales/${locale}.json`
  );

  try {

    const homePage = await contentfulService.getEntriesByContentType('homePage');

    const mainPageBanner = [];
    const highlight = [];

    homePage.map(item => {
      item.fields.mainPageBanner.map(banner => {
        mainPageBanner.push(transformBannerData(banner))
      })

      item.fields.highlight.map(banner => {
        highlight.push(transformBannerData(banner))
      })
    })

    const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0);

    return {
      props: {
        lngDict,
        mainPageBanner,
        highlight,
        webSettings: transformWebSettings(homePage[0]),
        latestNews: blogEntries.map(blog => transformBlog(blog))
      },
      revalidate: 1,
    };
  } catch (e) {
    console.log(`[IndexPage] getStaticProps failed.`);

    throw e;
  }
};

export default IndexPage;
