import { Alert, Modal, Typography, useMediaQuery, useTheme, Box } from '@mui/material';
import { GetStaticProps } from 'next';
import { useI18n } from 'next-localization';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import contentfulService from '../utils/service/contentfulService';
import { transformBlog } from '../utils/transformer';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { postMember } from '../utils/mongo';
import { Controller, useForm } from "react-hook-form";
import { BlogType, BlogTypeEnum } from '../interface/Blog';
import Input from 'react-phone-number-input/input'

const PHONE_REGEX =
    new RegExp(/^[2-9][0-9]{7}$/gm);

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || 'https://www.sunnywongofficial.com';;
interface ContactUsProps {
    latestNews: BlogType[];
}

const ContactUs: React.FC<ContactUsProps> = ({ latestNews }) => {

    const router = useRouter();

    const { locale } = router;

    const localePath = locale === 'en' ? 'en/contactus' : 'contactus';

    const { t } = useI18n();

    const [init, setInit] = useState(true);

    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [error, setError] = useState(false);

    const [success, setSuccess] = useState(false);

    const { control, register, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            type: '兒童及青少年課程',
        }
    });

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
        "phone": 0,
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

    const onSubmit = data => {
        if (data.name && data.name !== '' && data.phone && data.phone !== '' && data.email && data.email !== '' && data.type && data.type !== '') {
            setLoading(true)
            postMember({
                ...payload,
                email: data.email,
                name: data.name,
                phone: data.phone.replace('+852'),
                type: data.type,
            }).then(data => {
                setLoading(false);
                setError(false);
                setSuccess(true);
            })
        } else {
            setError(true);
        }
    }

    return (
        <div>
            <Head>
                <title>{t('menu.contactUs')} | Dance Union</title>
                <meta name="description" content='Dance Union Contact Us' />
                <meta name="keywords" content='Contact Us, 聯絡我們, Dance Union, Sunny Wong ' />
                <meta name="google-site-verification" content="Xj24ARH2mUnvhluOalhwzKKZfmd7l6DUR-asS6v-s-o" />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}contactus`}
                    hrefLang="zh-hk"
                />
                <link
                    rel="alternate"
                    href={`${HOME_PATH}en/contactus`}
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

            <Modal
                open={loading}
                onClose={() => {
                    setLoading(false);
                }}
            >
                <Box style={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '60%',
                    transform: 'translate(-50%, -50%)',
                    width: 400
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {t('common.submit')}
                    </Typography>
                </Box>

            </Modal>

            {
                isDesktop ?
                    <img src={'https://images.ctfassets.net/k5r307sl52db/3DT7NTS9H8IDJ1IrnS5sQe/443370cb423130e8bef00d07f426f7c5/CON_P1.jpeg'} width={'100%'} alt={'sunny wong dance union'} />
                    : <img src={'https://images.ctfassets.net/k5r307sl52db/5HaL4DBEAtT3AX3j0MqSU7/fd4b30e340e4cd5a3ca65f1b6468a712/CON_P1_m.jpeg'} width={'100%'} alt={'sunny wong dance union'} />
            }


            <section className="contact py-lg-4 py-md-3 py-sm-3 py-3" id="contact" style={{ background: 'white' }}>
                <div className="container py-lg-5 py-md-4 py-sm-4 py-3">
                    <h4 className="text-center title mb-3">{t('menu.contactUs')}</h4>
                    <br /><br />
                    <div className="row">
                        <div className="col-lg-6 col-md-6 contact-form pb-lg-3 pb-2">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className=" form-group contact-forms">
                                    <input
                                        {...register("name", { required: true, maxLength: 100 })}
                                        name="name" type="text" className="form-control" placeholder={t('common.name')} required={true} onChange={handleChange} />
                                </div>
                                <br />
                                <div className=" form-group contact-forms">
                                    <input
                                        {...register("email", { required: true, maxLength: 100 })}
                                        name="email" type="email" className="form-control" placeholder={t('common.email')} required={true} onChange={handleChange} />
                                </div>
                                <br />
                                <div className="form-group contact-forms">
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{
                                            required: true,
                                            minLength: {
                                                value: 12,
                                                message: 'common.invalidPhoneNumber'
                                            },
                                            maxLength: {
                                                value: 12,
                                                message: 'common.invalidPhoneNumber'
                                            }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Input
                                                value={value}
                                                onChange={onChange}
                                                country="HK"
                                                withCountryCallingCode
                                                international
                                            />
                                        )}
                                    />
                                </div>
                                <br />
                                <div className="form-group contact-forms">
                                    <select
                                        {...register("type", { required: true })}
                                        name="type" className="form-control" placeholder="查詢項目" onChange={handleChange}>
                                        {
                                            type.map((item, index) =>
                                                <option key={index} value={item}>
                                                    {t(`common.${item}`)}
                                                </option>
                                            )
                                        }
                                    </select>
                                </div>
                                <br />
                                {
                                    errors?.name?.message ? <Alert severity="error">{t(errors.name.message)}</Alert> : ""
                                }
                                {
                                    errors?.email?.message ? <Alert severity="error">{t(errors.email.message)}</Alert> : ""
                                }
                                {
                                    errors?.phone?.message ? <Alert severity="error">{t(errors.phone.message)}</Alert> : ""
                                }

                                {
                                    error ? <Alert severity="error">{t('common.warning')}</Alert> : ""
                                }
                                {
                                    success ? <Alert severity="success">{t('common.submitSuccess')}</Alert> : ""
                                }
                                <br />
                                <button
                                    style={{
                                        display: success ? 'none' : 'block'
                                    }}
                                    className="btn sent-butnn btn-lg">
                                    {t('common.submitButton')}
                                </button>
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

    const blogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0, locale);

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
