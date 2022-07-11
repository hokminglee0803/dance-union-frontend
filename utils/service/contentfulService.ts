import contentfulClient from "../contentfulClient";
import { translateLocale } from "../transformer";

const client = contentfulClient.initContentful();

const getEntriesByContentType = async (contentType: string, locale: string) => {
    return await client.getEntries({
        content_type: `${contentType}`,
        locale: translateLocale(locale),
    })
        .then((entry) => {
            return entry?.items;
        }).catch((err) => {
            console.error(err);
            return [];
        })
}

const getBlogEntries = async (blogType: string, limit: number, skip: number, locale: string) => {
    return await client.getEntries({
        'fields.blogType': blogType ?? 'SEO',
        content_type: 'blog',
        skip: skip,
        limit: limit,
        order: '-sys.createdAt',
        locale: translateLocale(locale),
    })
        .then((entry) => {
            return entry?.items;
        }).catch((err) => {
            console.error(err);
            return [];
        })
}

const getEntriesById = async (locale: string, id?: string) => {
    let query = {

    };
    if (id !== undefined) {
        query = {
            ...query,
            'sys.id': id,
        }
    }
    return await client.getEntries({
        locale: translateLocale(locale),
        ...query
    })
        .then((entry) => {
            return entry?.items;
        }).catch((err) => {
            console.error(err);
            return [];
        })
}

export default {
    getEntriesByContentType,
    getBlogEntries,
    getEntriesById
}