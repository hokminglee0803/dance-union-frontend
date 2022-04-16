import { useMediaQuery, useTheme } from '@mui/material';
import { useI18n } from 'next-localization';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import ActivityPost from '../../components/ActivityPost';
import Footer from '../../components/Footer';
import MenuAppBar from '../../components/Header';
import MenuBottom from '../../components/MenuIButtom';
import NextPrevBar from '../../components/NextPrevBar';
import Title from '../../components/Title';
import useActivityCardCollection from '../../hook/useActivityCardCollection';

const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || '';

const Post: React.FC<any> = () => {

    const router = useRouter()

    const { pid } = router.query;

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const { locale } = router;

    const localePath = locale === 'en' ? '/en/' : '/';

    const { t } = useI18n();

    const {
        ActivityCardCollection,
        ActivityCardCollectionProps,
    } = useActivityCardCollection(4, true);

    const [init, setInit] = useState(true);

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
                    }
                ]);
            }, 1000);

            setInit(false);
        }

    }, [init])

    return <div>
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

        <MenuAppBar />

        <ActivityPost
            imageUrl={''} title={''} date={{
                from: '',
                to: ''
            }} time={{
                from: '',
                to: ''
            }} district={[]} category={[]} description={''} serial={''} target={''} requirement={{
                age: '',
                noOfParticipate: '',
                skillset: [],
                description: ''
            }} contactEmail={''} contactMobile={''} contactPerson={''} registrationDeadline={''} resultAnnouncementDate={''}
        />

        <br />

        <NextPrevBar
            nextLabel='下一頁'
            nextLink={'/'}
            prevLabel='上一頁'
            prevLink={'/'}
        />

        <br />

        <Title
            title={'最新活動'}
            buttons={
                <MenuBottom
                    href='/'
                    label='更多活動'
                />
            } />

        <br />

        <ActivityCardCollection />

        <Footer />

    </div >


}
export default Post