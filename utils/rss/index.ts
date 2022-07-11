import { Feed } from 'feed';
import contentfulService from '../service/contentfulService';
import { transformBlog } from '../transformer';
import fs from 'fs';
import moment from 'moment';
import { BlogTypeEnum } from '../../interface/Blog';

export const generateRSS = async (locale) => {

    const feed = new Feed({
        title: 'Dance Union',
        description: 'Dance Union 更新',
        id: 'https://www.sunnywongofficial.com',
        link: 'https://www.sunnywongofficial.com',
        image: `https://images.ctfassets.net/k5r307sl52db/1DQVJnEJoJVJvs40xGBOeg/c60f47d9679cabc010a08b1659de39e0/logo_black_1_.png`,
        favicon: `https://images.ctfassets.net/k5r307sl52db/1DQVJnEJoJVJvs40xGBOeg/c60f47d9679cabc010a08b1659de39e0/logo_black_1_.png`,
        copyright: `© ${new Date().getFullYear()} Dance Union. All rights reserved.`,
        feedLinks: {
            atom: `https://www.sunnywongofficial.com/atom.xml`,
        },
        author: {
            name: 'Sunny Wong',
            email: 'danceunioncms@gmail.com',
            link: 'https://www.sunnywongofficial.com',
        },
    });

    const seoBlogEntries = await contentfulService.getBlogEntries(BlogTypeEnum.SEO, 2, 0, locale);

    await Promise.all(
        seoBlogEntries.map(blog => transformBlog(blog)).map(async (post) => {
            const validURI = `https://www.sunnywongofficial.com/news/${post.id}`;

            feed.addItem({
                id: validURI,
                link: validURI,
                title: post.title,
                description: post.description,
                date: moment(post.createdDate, 'DD/MM/YYYY').toDate(),
                image: post.desktopBanner,
                content: post.content,
                author: [
                    {
                        name: 'Sunny Wong',
                        email: 'danceunioncms@gmail.com',
                        link: 'https://www.sunnywongofficial.com',
                    },
                ],
            });
        })
    );

    const invalidCharInXMLSpecRegexp =
        // eslint-disable-next-line no-control-regex
        /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

    fs.writeFileSync(
        './public/rss.xml',
        feed.atom1().replace(invalidCharInXMLSpecRegexp, '')
    );
    fs.writeFileSync(
        './public/atom.xml',
        feed.atom1().replace(invalidCharInXMLSpecRegexp, '')
    );
};