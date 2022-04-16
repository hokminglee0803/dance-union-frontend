import contentfulClient from "../contentfulClient";

const client = contentfulClient.initContentful();

const getEntriesByContenType = async (contentType: string) => {
    return await client.getEntries({
        content_type: `${contentType}`
    })
        .then((entry) => {
            console.log(entry.items)
            return entry?.items;
        }).catch((err) => {
            console.error(err);
            return [];
        })
}

export default {
    getEntriesByContenType
}