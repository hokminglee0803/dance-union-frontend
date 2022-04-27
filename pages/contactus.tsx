import { Alert, useMediaQuery, useTheme } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import contentfulService from '../utils/service/contentfulService';
import { transformBannerData, transformBlog } from '../utils/transformer';
import { BannerType } from '../interface/Banner';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { postMember } from '../utils/mongo';
import Image from 'next/image'
import { BlogType, BlogTypeEnum } from '../interface/Blog';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';
interface ContactUsProps {
    latestNews: BlogType[];
}

const ContactUs: React.FC<ContactUsProps> = ({ latestNews }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [error, setError] = useState(false);

    const [success, setSuccess] = useState(false);

    const [loading, setLoading] = useState(false);
    const type = [
        '兒童及青少年課程',
        'Vibe Open Class',
    ];

    const [payload, setPayload] = useState({
        "name": "",
        "type": type[0],
        "source": "Website",
        "email": "",
        "phone": "",
        "alternatePhone": "",
        "age": "",
        "childAge": "",
        "occupation": "",
        "gender": "",
        "contactTime": "",
        "referral": [],
        "remark": "",
        status: '未檢閱 - 未檢閱'
    })

    const handleChange = (event) => {
        setPayload({
            ...payload,
            [event.target.name]: event.target.value
        })
    }


    useEffect(() => {
        if (init) {
            setInit(false);
        }

    }, [init])

    return (
        <div>
            <Head>
                <title>聯絡我們 | Dance Union</title>
                <meta name="description" content='Dance Union Contact Us' />
                <meta name="keywords" content='Contact Us, 聯絡我們, Dance Union, Sunny Wong ' />
                <meta name="google-site-verification" content="HSeiJF1wIPEmRWl27NIHwrslEwWKO6YuN0AP2IkOVgk" />
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

            {
                isDesktop ?
                    <img src={'https://lh3.googleusercontent.com/d/1F3FJAZKRz5_hlNQI-kYf5Kslg6DKDKgO'} width={'100%'} alt={'sunny wong dance union'} />
                    : ""
            }


            <section className="contact py-lg-4 py-md-3 py-sm-3 py-3" id="contact" style={{ background: 'white' }}>
                <div className="container py-lg-5 py-md-4 py-sm-4 py-3">
                    <h4 className="text-center title mb-3">聯絡我們</h4>
                    <br /><br />
                    <div className="row">
                        <div className="col-lg-6 col-md-6 contact-form pb-lg-3 pb-2">
                            <form action="#" method="post">

                                <div className=" form-group contact-forms">
                                    <input name="name" type="text" className="form-control" placeholder="姓名" required={true} onChange={handleChange} />
                                </div>
                                <br />
                                <div className=" form-group contact-forms">
                                    <input name="email" type="email" className="form-control" placeholder="電郵" required={true} onChange={handleChange} />
                                </div>
                                <br />
                                <div className=" form-group contact-forms">
                                    <input name="phone" type="text" className="form-control" placeholder="聯絡電話" required={true} onChange={handleChange} />
                                </div>
                                <br />
                                <div className="form-group contact-forms">
                                    <select name="type" className="form-control" placeholder="查詢項目" onChange={handleChange}>
                                        {
                                            type.map((item, index) =>
                                                <option key={index} value={item}>
                                                    {item}
                                                </option>
                                            )
                                        }
                                    </select>
                                </div>
                                <br />
                                {
                                    error ? <Alert severity="error">請寫下你的姓名, 電郵以及聯絡電話</Alert> : ""
                                }
                                {
                                    success ? <Alert severity="success">你要查詢已經發出！</Alert> : ""
                                }
                                <br />
                                <button onClick={() => {
                                    setLoading(true)
                                    if (payload.name && payload.name !== '' && payload.phone && payload.phone !== '' && payload.type && payload.type !== '') {
                                        postMember(payload).then(data => {
                                            setLoading(false);
                                            setError(false);
                                            setSuccess(true);
                                        })
                                    } else {
                                        setError(true);
                                    }
                                }} type="button" className="btn sent-butnn btn-lg">發送</button>
                            </form>
                        </div>
                        <div className="address_mail_footer_grids col-lg-6 col-md-6">
                            <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Dance%20Union&t=&z=17&ie=UTF8&iwloc=&output=embed" scrolling="no" ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <Footer latestNews={latestNews} />

        </div>
    )

}

export const getStaticProps: GetStaticProps = async ({ locale }) => {

    const { default: lngDict = {} } = await import(
        `../locales/${locale}.json`
    );

    const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0);

    try {
        return {
            props: {
                lngDict,
                latestNews: blogEntries.map(blog => transformBlog(blog))
            },
            revalidate: 1,
        };
    } catch (e) {
        console.log(`[Contact Us] getStaticProps failed.`);

        throw e;
    }
};

export default ContactUs;
