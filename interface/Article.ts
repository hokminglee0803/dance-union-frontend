import { BannerType } from "./Banner";

export interface ArticleType {
    title: string;
    content: string;
    image: string;
}

export interface ArticleWithBannerType {
    title: string;
    description: string;
    banner: BannerType[]
}