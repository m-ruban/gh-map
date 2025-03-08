import React, { FC } from 'react';

import Image from 'gg-ukit/components/Image';
import Slider from 'gg-ukit/components/Slider';

import './gallery.less';

interface GalleryProps {
    slides: string[];
    note?: string;
}

const Gallery: FC<GalleryProps> = ({ slides, note }) => {
    return (
        <div className="gallery">
            <Slider
                note={note}
                slides={slides.map((silde) => {
                    return {
                        view: <Image alt={'item'} src={silde} />,
                        preview: <Image alt={'item'} src={silde} />,
                    };
                })}
            />
        </div>
    );
};

export default Gallery;
