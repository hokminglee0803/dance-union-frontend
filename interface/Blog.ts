export interface BlogType {
    id: string;
    title: string;
    description: string;
    content: string;
    desktopBanner: string;
    mobileBanner: string;
    createdDate: string;
}

export enum BlogTypeEnum {
    SEO = 'SEO',
    NEWS = '新聞',
    DIRECTION = '動向',
    SHOW = '演出'
}
