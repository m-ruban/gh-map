import { Graphics, Sprite, TextMetrics, Texture } from 'pixi.js';

import GenreEventType from 'src/modules/GenreEventType';

import { ICON_SIZE, PADDING_INFO } from 'map/components/GenreEvent/constants';

const ICONS_BY_TYPE = {
    [GenreEventType.Game]: '/icons/game.svg',
    [GenreEventType.Platform]: '/icons/pc.svg',
    [GenreEventType.Other]: '/icons/other.svg',
};

interface InfoIconProps {
    titleWrapper: Graphics;
    metrics: TextMetrics;
    type: GenreEventType;
}

const InfoIcon: (props: InfoIconProps) => Sprite = ({ titleWrapper, metrics, type }) => {
    const icon = ICONS_BY_TYPE[type];
    const infoIcon = new Sprite(Texture.from(icon));
    infoIcon.x = PADDING_INFO;
    infoIcon.y = titleWrapper.y + PADDING_INFO + (metrics.height - ICON_SIZE) / 2;
    infoIcon.height = ICON_SIZE;
    infoIcon.width = ICON_SIZE;
    return infoIcon;
};

export default InfoIcon;
