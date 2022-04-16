import { Box, Divider, Drawer, Fab, IconButton, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Clear as ClearIcon, RestartAlt as RestartAltIcon, Search as SearchIcon } from '@mui/icons-material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MenuAppBar from '../components/Header';
import useActivityCardCollection from '../hook/useActivityCardCollection';
import MenuItem from '../components/MenuItem';
import Footer from '../components/Footer';
import ResponsiveCarousel from '../components/ResponsiveCarousel';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';
interface IndexPageProps {
}

const IndexPage: React.FC<IndexPageProps> = () => {

  const router = useRouter();

  const { locale } = router;

  const localePath = locale === 'en' ? '/en/' : '/';

  const { t } = useI18n();

  const [init, setInit] = useState(true);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    ActivityCardCollection,
    ActivityCardCollectionProps,
    SearchPopup,
    SearchPopupProps
  } = useActivityCardCollection(12);

  useEffect(() => {
    if (init) {

      setTimeout(function () {
        ActivityCardCollectionProps.setActivities([
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/173_b745dcaaea.jpg',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/5060_73578fcb82.jpg',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/5075_e67732d8a4.JPG',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/27_a92ad6c196.jpg',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/173_b745dcaaea.jpg',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/5060_73578fcb82.jpg',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/5075_e67732d8a4.JPG',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/27_a92ad6c196.jpg',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/173_b745dcaaea.jpg',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/5060_73578fcb82.jpg',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/5075_e67732d8a4.JPG',
          },
          {
            imageUrl: 'https://easyvolunteer.hk/assets/uploads/services/27_a92ad6c196.jpg',
          }
        ]);
      }, 1000);

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

      <Drawer
        anchor={'top'}
        open={SearchPopupProps.isDrawerOpen}
        onClose={SearchPopupProps.closeDrawer}
      >
        {SearchPopup}
        <div>
          <Fab
            sx={{
              position: 'fixed',
              bottom: 30,
              right: 170,
            }}
          >
            <SearchIcon fontSize={'large'} />
          </Fab>
          <Fab
            sx={{
              position: 'fixed',
              bottom: 30,
              right: 100,
            }}
          >
            <RestartAltIcon fontSize={'large'} />
          </Fab>
          <Fab
            onClick={SearchPopupProps.closeDrawer}
            sx={{
              position: 'fixed',
              bottom: 30,
              right: 30,
            }}
          >
            <ClearIcon
              fontSize={'large'} />
          </Fab>
        </div>
      </Drawer>

      <MenuAppBar />

      <div style={{ margin: 0 }} />

      <ResponsiveCarousel />

      <div style={{ margin: 25 }} />

      <h1
        style={{
          margin: "auto",
          width: isDesktop ? '80%' : '90%',
          color: 'orange',
          borderBottom: '5px solid orange'
        }}>
        最新活動
      </h1>

      <div style={{ margin: 35 }} />

      <ActivityCardCollection />

      <Footer />

    </div>
  )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

  const { default: lngDict = {} } = await import(
    `../locales/${locale}.json`
  );

  try {

    return {
      props: {
        lngDict,
      },
      revalidate: 1,
    };
  } catch (e) {
    console.log(`[IndexPage] getStaticProps failed.`);

    throw e;
  }
};

export default IndexPage;
