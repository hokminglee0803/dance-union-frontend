import '../styles/globals.css'
import React, { ReactElement } from 'react';
import type { AppProps /* , AppContext */ } from 'next/app';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import { I18nProvider } from 'next-localization';
import { useRouter } from 'next/router';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../styles/style.css'
import "react-responsive-carousel/lib/styles/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import CommonSpeedDial from '../components/CommonSpeedDial';

function MyApp({ Component, pageProps }: AppProps): ReactElement {

  if (typeof window === 'undefined') {
    console.log('[Dance Union Website] Greeting from server side!');
  }

  const { locale } = useRouter();
  const { lngDict, ...rest } = pageProps;

  return (
    <CookiesProvider>
      <I18nProvider
        lngDict={{ ...lngDict }}
        locale={String(locale)}
      >
        <LocalizationProvider dateAdapter={DateAdapter}>
          <>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
              />
            </Head>
            <Component {...rest} />
            <CommonSpeedDial/>
          </>
        </LocalizationProvider>
      </I18nProvider>
    </CookiesProvider>
  );
}

export default MyApp;