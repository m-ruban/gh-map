import { Sprite, Texture } from 'pixi.js';

import { getIconPath } from 'src/modules/image';

interface GenreIconProps {
    x: number;
    path: string;
}

const ICON_SIZE = 60;
const OPTIONS = { scale: 10 };

const GenreIcon: (props: GenreIconProps) => Promise<Sprite> = async ({ x, path }) => {
    const genreTexture = await Texture.fromURL(getIconPath(path), { resourceOptions: OPTIONS });
    const genreIcon = new Sprite(genreTexture);
    genreIcon.x = x;
    genreIcon.height = ICON_SIZE;
    genreIcon.width = ICON_SIZE;
    return genreIcon;
};

export default GenreIcon;
