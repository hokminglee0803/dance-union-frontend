import { useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import contentfulService from '../utils/service/contentfulService';
import { transformBannerData } from '../utils/transformer';
import { BannerType } from '../interface/Banner';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';
interface SunnyWongProps {
    mainPageBanner: BannerType[];
    highlight: BannerType[];
}

const SunnyWong: React.FC<SunnyWongProps> = ({ mainPageBanner, highlight }) => {

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

            <img src={'https://lh3.googleusercontent.com/d/1F3FJAZKRz5_hlNQI-kYf5Kslg6DKDKgO'} width={'100%'} />
            <section className="contact py-lg-4 py-md-3 py-sm-3 py-3" id="contact" style={{ background: 'white' }}>
                <div className="container py-lg-5 py-md-4 py-sm-4 py-3">
                    <h4 className="text-center title mb-3">聯絡我們</h4>
                    <br /><br />
                    <div className="row">
                        <div className="col-lg-6 col-md-6 contact-form pb-lg-3 pb-2">
                            <form action="#" method="post">
                                {/* 
                                <div className=" form-group contact-forms">
                                    <input name="name" type="text" className="form-control" placeholder="姓名" required="" onChange={handleChange} />
                                </div>
                                <div className=" form-group contact-forms">
                                    <input name="email" type="email" className="form-control" placeholder="電郵" required="" onChange={handleChange} />
                                </div>
                                <div className=" form-group contact-forms">
                                    <input name="phone" type="text" className="form-control" placeholder="聯絡電話" required="" onChange={handleChange} />
                                </div> */}
                                <div className="form-group contact-forms">
                                    {/* <textarea className="form-control" placeholder="查詢項目" required=""></textarea> */}
                                    {/* <select name="type" className="form-control" placeholder="查詢項目" onChange={handleChange}>
                                        {
                                            type.map((item, index) =>
                                                <option key={index} value={item}>
                                                    {item}
                                                </option>
                                            )
                                        }
                                    </select> */}
                                </div>
                                <button onClick={() => {
                                    // setLoading(true)
                                    // postMember(payload).then(data => {
                                    //     setLoading(false)
                                    // })
                                }} type="button" className="btn sent-butnn btn-lg">發送</button>
                            </form>
                        </div>
                        <div className="address_mail_footer_grids col-lg-6 col-md-6">
                            <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Dance%20Union&t=&z=17&ie=UTF8&iwloc=&output=embed" scrolling="no" ></iframe>
                        </div>
                    </div>
                </div>
            </section>

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

export default SunnyWong;
