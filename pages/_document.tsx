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
            <Html className="notranslate" translate="no">
                <Head>
                    <meta name="google" content="notranslate" />
                    <script src="https://cdn.jsdelivr.net/npm/contentful@latest/dist/contentful.browser.min.js"></script>
                    <link
                        rel="shortcut icon"
                        type="image/x-icon"
                        href="https://assets.ctfassets.net/k5r307sl52db/4iYdFvRoDdcBS1u8htN6aa/7ca9e7c2bb9aec0eb00a86082c585719/favicon.ico"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}