import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import moment from 'moment';

export const options = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, next) => next(node.content).replace('\n', '<br/>')
    }
}

export const transformFooter = (data: any) => {
    return {
        address: data?.fields?.address ?? '',
        description: data.fields?.description ?? '',
        email: data.fields?.email ?? '',
        fax: data?.fields?.fax ?? '',
        googleMapAddress: data.fields?.googleMapAddress ?? '',
        mondayToFriday: data.fields?.mondayToFriday ?? '',
        saturdayAndSunday: data.fields?.saturdayAndSunday ?? '',
        whatsapp: data.fields?.whatsapp ?? '',
        phone: data.fields?.phone ?? '',
    }
}

export const transformBannerData = (banner: any) => {
    return {
        bannerTitle: banner?.fields?.bannerTitle ?? '',
        bannerDesktop: banner?.fields?.desktopBanner?.fields?.file?.url ? `https:${banner.fields?.desktopBanner?.fields?.file?.url}` : '',
        bannerMobile: banner?.fields?.mobileBanner?.fields?.file?.url ? `https:${banner.fields?.mobileBanner?.fields?.file?.url}` : '',
        bannerVideo: banner?.fields?.bannerVideo ?? '',
        thumbumbDesktop: banner?.fields?.thumbumbDesktop?.fields?.file?.url ? `https:${banner.fields?.thumbumbDesktop?.fields?.file?.url}` : '',
        thumbumbMobile: banner?.fields?.thumbumbMobile?.fields?.file?.url ? `https:${banner.fields?.thumbumbMobile?.fields?.file?.url}` : '',
        actionLink: banner.fields?.actionLink ?? '',
    }
}

export const transformShowCollection = (item: any) => {
    return {
        year: item.fields.Year,
        collectionList: item.fields.showCollectionList
    }
}

export const transformMediaUrl = (item: any) => {
    return {
        src: item?.fields?.file?.url ? `https:${item?.fields?.file?.url}` : '',
        height: 1,
        width: 1,
    }
}

export const transformArticleWithImage = (item: any) => {
    return {
        title: item?.fields?.title,
        content: documentToHtmlString(item?.fields?.content, options),
        image: item?.fields?.image?.fields?.file?.url ? `https:${item?.fields?.image?.fields?.file?.url}` : '',
    }
}

export const transformBlog = (item: any) => {
    return {
        id: item?.sys?.id ?? '',
        title: item?.fields?.title ?? '',
        content: documentToHtmlString(item?.fields?.content, options),
        description: documentToHtmlString(item?.fields?.description, options),
        desktopBanner: item?.fields?.desktopBanner?.fields?.file?.url ? `https:${item?.fields?.desktopBanner?.fields?.file?.url}` : '',
        mobileBanner: item?.fields?.mobileBanner?.fields?.file?.url ? `https:${item?.fields?.mobileBanner?.fields?.file?.url}` : '',
        createdDate: moment(item?.sys?.createdAt).format('DD/MM/YYYY')
    }
}

export const transformArticle = (item: any, banner?: any[]) => {
    return {
        title: item?.fields?.title ?? '',
        description: documentToHtmlString(item?.fields?.description, options) ?? '',
        banner: banner ?? (item?.fields?.banner?.map(item => transformBannerData(item)) ?? [])
    }
}

export const transformVideoClip = (clip: any) => {
    return {
        title: clip?.fields?.title ?? '',
        url: clip.fields?.url ?? '',
        description: documentToHtmlString(clip.fields?.description, options) ?? '',
        thumbumbDesktop: clip?.fields?.thumbumbDesktop?.fields?.file?.url ? `https:${clip.fields?.thumbumbDesktop?.fields?.file?.url}` : '',
        thumbumbMobile: clip?.fields?.thumbumbMobile?.fields?.file?.url ? `https:${clip.fields?.thumbumbMobile?.fields?.file?.url}` : '',
    }
}

export const transformWebSettings = (item: any) => {
    return {
        seoTitle: item?.fields?.seoTitle ?? '',
        seoDescription: item.fields?.seoDescription ?? '',
        seoKeywords: item.fields?.seoKeywords?.toString() ?? '',
        openGraphTitle: item?.fields?.openGraphTitle ?? '',
        openGraphDescription: item?.fields?.openGraphDescription ?? '',
        openGraphUrl: item.fields?.openGraphUrl ?? '',
        openGraphImage: item?.fields?.openGraphImage?.fields?.file?.url ?? '',
    }
}

export const transformKnowMore = (item: any) => {

    return {
        title: item?.fields?.title ?? '',
        subTitle: item?.fields?.subTitle ?? '',
        content: documentToHtmlString(item?.fields?.content, {
            renderNode: {
                [BLOCKS.PARAGRAPH]: (node, next) => next(node.content).replace('\n', '<br/><br/><br/>')
            }
        }) ?? '',
    }
}

export const transformCourseTable = (item: any) => {
    return {
        title: item?.fields?.title ?? '',
        age: documentToHtmlString(item?.fields?.age, options) ?? '',
        course: documentToHtmlString(item?.fields?.course, options) ?? '',
        show: documentToHtmlString(item?.fields?.show, options) ?? '',
        exam: documentToHtmlString(item?.fields?.exam, options) ?? '',
    }
}
