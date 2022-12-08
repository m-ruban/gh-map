import { Sprite, Texture } from 'pixi.js';

interface IconProps {
    start: number;
    path: string;
}

const ICON_SIZE = 80;

const Icon: (props: IconProps) => Sprite = ({ start, path }) => {
    const genreTexture = Texture.from(path);
    const genreIcon = new Sprite(genreTexture);
    genreIcon.x = start;
    genreIcon.height = ICON_SIZE;
    genreIcon.width = ICON_SIZE;
    return genreIcon;
};

export default Icon;
