import { Sprite, Texture } from 'pixi.js';

import { WIDTH_YEAR } from 'map/modules/constants';

import { GENRE_IMAGE_HEIGHT, PADDING_WRAPPER } from 'map/components/GenreEvent/constants';

const Image: (props: { image: string }) => Promise<Sprite> = async ({ image }) => {
    const genreTexture = await Texture.fromURL(image);
    const genreImage = new Sprite(genreTexture);
    genreImage.x = 0;
    genreImage.y = 0;
    genreImage.width = WIDTH_YEAR - PADDING_WRAPPER * 2;
    genreImage.height = GENRE_IMAGE_HEIGHT;
    genreImage.cacheAsBitmap = true;
    return genreImage;
};

export default Image;
