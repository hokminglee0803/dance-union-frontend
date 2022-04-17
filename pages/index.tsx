import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { Carousel } from 'react-responsive-carousel';
import contentfulService from '../utils/service/contentfulService';
import { transformBannerData } from '../utils/transformer';
import { BannerType } from '../interface/Banner';
import ActionAreaCard from '../components/ActionAreaCard';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';
interface IndexPageProps {
  mainPageBanner: BannerType[];
  highlight: BannerType[];
}

const IndexPage: React.FC<IndexPageProps> = ({ mainPageBanner, highlight }) => {

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

      <div style={{ marginTop: 50 }} />
      <ResponsiveAppBar />

      <Carousel autoFocus={true} infiniteLoop={true} emulateTouch={true} showThumbs={false} autoPlay={true}>
        {
          mainPageBanner.map((item, index) => {
            return <div key={index}>
              <img alt={t('image_alt')} src={isDesktop ? item.bannerDesktop : item.bannerMobile} />
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

      <Footer />

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

    return {
      props: {
        lngDict,
        mainPageBanner,
        highlight
      },
      revalidate: 1,
    };
  } catch (e) {
    console.log(`[IndexPage] getStaticProps failed.`);

    throw e;
  }
};

export default IndexPage;
