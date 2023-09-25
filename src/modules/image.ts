const root = 'https://gamespirit.org/image/icon/alt/';

export const getPath: (path: string) => string = (path: string) => {
    return `${root}${path}`;
};
