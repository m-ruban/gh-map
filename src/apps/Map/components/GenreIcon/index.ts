import { Sprite, Texture } from 'pixi.js';

import { getPath } from 'src/modules/image';

interface GenreIconProps {
    x: number;
    path: string;
}

const ICON_SIZE = 80;

const GenreIcon: (props: GenreIconProps) => Promise<Sprite> = async ({ x, path }) => {
    const genreTexture = await Texture.fromURL(getPath(path));
    const genreIcon = new Sprite(genreTexture);
    genreIcon.x = x;
    genreIcon.height = ICON_SIZE;
    genreIcon.width = ICON_SIZE;
    return genreIcon;
};

export default GenreIcon;
