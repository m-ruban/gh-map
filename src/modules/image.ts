const root = 'https://gamespirit.org/';
const rootIcon = 'https://gamespirit.org/image/icon/alt/';
const rootImage = 'https://gamespirit.org/image/';

export const getIconPath: (path: string) => string = (image) => {
    return `${rootIcon}${image}`;
};

export const getEventPath: (keyword: string, image: string) => string = (keyword, image) => {
    return `${rootImage}${keyword}/${image}`;
};

export const getLink: (keyword: string) => string = (keyword) => {
    return `${root}${keyword}`;
};
