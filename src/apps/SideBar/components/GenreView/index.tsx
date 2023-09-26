import React, { FC, useEffect, useState } from 'react';

import MapEvent from 'src/modules/MapEvent';

import Column from 'gg-ukit/components/Column';
import { H2 } from 'gg-ukit/components/Header';
import { HeaderLine } from 'gg-ukit/components/Header/BasicHeader';
import Paragraph from 'gg-ukit/components/Paragraph';
import Sheet, { SheetPositionType } from 'gg-ukit/components/Sheet';

const GenreView: FC = () => {
    const [genreId, setGenreId] = useState(false);
    const [showSheet, setShowSheet] = useState(false);

    useEffect(() => {
        document.addEventListener(MapEvent.GenreOpen, (event: CustomEvent) => {
            setGenreId(event.detail.id);
            setShowSheet(!showSheet);
        });
    }, [showSheet]);

    return (
        <>
            <Sheet
                header={<H2 title={`Genre View ${genreId}`} line={HeaderLine.TertiaryDimmed} />}
                visible={showSheet}
                positionType={SheetPositionType.Right}
                onClose={() => {
                    setShowSheet(false);
                }}
            >
                <Column l={6} m={6} s={5} xs={4} container>
                    <Paragraph>
                        Карта игрового мира так же проста - центральный город, в котором расположена вся необходимая
                        герою инфраструктура и четыре большие локации расположены по четырём частям света. Каждый
                        уровень имеет свой дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и
                        тематику - будь то северные горы, болота затопленный город. В конце каждой есть босс, который и
                        даст вам необходимую часть ключа.
                    </Paragraph>
                    <Paragraph>
                        Карта игрового мира так же проста - центральный город, в котором расположена вся необходимая
                        герою инфраструктура и четыре большие локации расположены по четырём частям света. Каждый
                        уровень имеет свой дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и
                        тематику - будь то северные горы, болота затопленный город. В конце каждой есть босс, который и
                        даст вам необходимую часть ключа.
                    </Paragraph>
                </Column>
            </Sheet>
        </>
    );
};

export default GenreView;
