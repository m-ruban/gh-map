import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toogleGenreView } from 'src/models/genre';
import { RootStore } from 'src/models/reducers';

import Button, { ButtonKind } from 'gg-ukit/components/Button';
import Column from 'gg-ukit/components/Column';
import { H2 } from 'gg-ukit/components/Header';
import { HeaderLine } from 'gg-ukit/components/Header/BasicHeader';
import Paragraph from 'gg-ukit/components/Paragraph';
import Sheet, { SheetPositionType } from 'gg-ukit/components/Sheet';

const GenreView: FC = () => {
    const genre = useSelector((state: RootStore) => state.genre);
    const dispath = useDispatch();

    if (!genre) {
        return null;
    }

    const {
        seo: { name, descr },
        code,
    } = genre;

    return (
        <Sheet
            header={<H2 title={name} line={HeaderLine.TertiaryDimmed} />}
            visible={genre.isShowView}
            positionType={SheetPositionType.Right}
            onClose={() => {
                dispath(toogleGenreView());
            }}
            footer={
                code ? (
                    <Button
                        kind={ButtonKind.Promo}
                        rounded
                        onClick={() => {
                            window.location.href = `https://gamespirit.org/categories${code}`;
                        }}
                    >
                        Далее
                    </Button>
                ) : null
            }
        >
            <Column l={6} m={6} s={5} xs={4} container>
                <Paragraph>{descr}</Paragraph>
            </Column>
        </Sheet>
    );
};

export default GenreView;
