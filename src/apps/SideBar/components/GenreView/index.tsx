import React, { FC, useEffect, useState } from 'react';

import { Seo } from 'src/models/genres';
import MapEvent from 'src/modules/MapEvent';

import Button, { ButtonKind } from 'gg-ukit/components/Button';
import Column from 'gg-ukit/components/Column';
import { H2 } from 'gg-ukit/components/Header';
import { HeaderLine } from 'gg-ukit/components/Header/BasicHeader';
import Paragraph from 'gg-ukit/components/Paragraph';
import Sheet, { SheetPositionType } from 'gg-ukit/components/Sheet';

type SeoWithCode = Seo & { code: string };

const GenreView: FC = () => {
    const [genre, setGenreSeo] = useState<SeoWithCode>(null);
    const [showSheet, setShowSheet] = useState(false);

    useEffect(() => {
        document.addEventListener(MapEvent.GenreOpen, (event: CustomEvent) => {
            setGenreSeo(event.detail as SeoWithCode);
            setShowSheet(!showSheet);
        });
    }, [showSheet]);

    if (!genre) {
        return null;
    }

    const { name, descr, code } = genre;

    return (
        <>
            <Sheet
                header={<H2 title={name} line={HeaderLine.TertiaryDimmed} />}
                visible={showSheet}
                positionType={SheetPositionType.Right}
                onClose={() => {
                    setShowSheet(false);
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
        </>
    );
};

export default GenreView;
