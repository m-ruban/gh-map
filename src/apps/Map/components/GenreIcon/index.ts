import { Sprite, Texture } from 'pixi.js';

interface GenreIconProps {
    x: number;
    path: string;
}

const ICON_SIZE = 80;

const GenreIcon: (props: GenreIconProps) => Sprite = ({ x, path }) => {
    const genreTexture = Texture.from(path);
    const genreIcon = new Sprite(genreTexture);
    genreIcon.x = x;
    genreIcon.height = ICON_SIZE;
    genreIcon.width = ICON_SIZE;
    return genreIcon;
};

export default GenreIcon;
