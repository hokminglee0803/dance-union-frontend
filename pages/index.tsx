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
        <meta name="google-site-verification" content="HSeiJF1wIPEmRWl27NIHwrslEwWKO6YuN0AP2IkOVgk" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"></meta>
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

      <Carousel
        onChange={() => {
          setAutoPlay(true);
        }}
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
        transitionTime={750}
        showIndicators={mainPageBanner?.length > 1 ? true : false} autoFocus={true} infiniteLoop={true} emulateTouch={true} showThumbs={false} autoPlay={autoPlay} >
        {
          mainPageBanner.map((item, index) => {
            return <div key={index}
              style={{
                cursor: item.actionLink !== '' ? 'pointer' : 'default'
              }}
              onClick={() => {
                if (item.actionLink !== '') {
                  router.push(item.actionLink)
                }
              }}>
              {
                item.bannerDesktop !== '' ?
                  < Image
                    alt={item.bannerSEOTitle}
                    title={item.bannerSEOTitle}
                    width={isDesktop ? '3648px' : item.bannerMobile === '' ? '3648px' : '2736px'}
                    height={isDesktop ? '1358px' : item.bannerMobile === '' ? '1358px' : '2736px'}
                    src={isDesktop ? item.bannerDesktop : (item.bannerMobile !== '' ? item.bannerMobile : item.bannerDesktop)}
                  /> :
                  <div style={{
                    position: 'relative',
                    paddingTop: isDesktop ? '37.5%' : '100%',
                  }}>
                    <ReactPlayer
                      loop={true}
                      onPlay={() => {
                        setAutoPlay(false);
                      }}
                      onPause={() => {
                        setAutoPlay(true);
                      }}
                      light={item.thumbumbDesktop !== '' ? (isDesktop ? item.thumbumbDesktop : (item.thumbumbMobile !== '' ? item.thumbumbMobile : item.thumbumbDesktop)) : false}
                      controls={true}
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
      </Carousel >

      <div style={{ margin: 10 }}>
        <Grid container spacing={3}>
          {
            highlight.map((item, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <ActionAreaCard
                    img={isDesktop ? item.bannerDesktop : (item.bannerMobile !== '' ? item.bannerDesktop : item.bannerMobile)}
                    title={item.bannerTitle}
                    href={item.actionLink}
                  />
                </Grid>
              )
            })
          }
        </Grid>
      </div>

      <Footer latestNews={latestNews} />

    </div >
  )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

  const { default: lngDict = {} } = await import(
    `../locales/${locale}.json`
  );

  try {

    const homePage = await contentfulService.getEntriesByContentType('homePage', locale);

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

    const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0, locale);

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
