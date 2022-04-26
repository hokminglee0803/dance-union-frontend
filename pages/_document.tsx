import { ReactElement } from 'react';
import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';
// import { ServerStyleSheet } from 'styled-components';
// import { AppProps } from 'next/app';
// import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';

export default class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {

        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render(): ReactElement {
        return (
            <Html
                className="notranslate" translate="no"
            >
                <Head>
                    <meta name="google" content="notranslate" />
                    <meta charSet="utf-8" />
                    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
                    <meta name="google-site-verification" content="HSeiJF1wIPEmRWl27NIHwrslEwWKO6YuN0AP2IkOVgk" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <script src="https://cdn.jsdelivr.net/npm/contentful@latest/dist/contentful.browser.min.js"></script>
                    <link
                        rel="shortcut icon"
                        type="image/x-icon"
                        href="https://images.ctfassets.net/k5r307sl52db/1DQVJnEJoJVJvs40xGBOeg/c60f47d9679cabc010a08b1659de39e0/logo_black_1_.png"
                    />
                    <script dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-MVQMLH5');`
                    }}></script>
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-P5GEVWMHMT"></script>
                    <script>
                        {
                            `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());

                                gtag('config', 'G-P5GEVWMHMT');
                            `
                        }
                    </script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}