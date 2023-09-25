import React, { FC, useEffect, useState } from 'react';

import { Advice } from 'src/models/history';
import MapEvent from 'src/modules/MapEvent';

import Button, { ButtonKind } from 'gg-ukit/components/Button';
import Column from 'gg-ukit/components/Column';
import { H2 } from 'gg-ukit/components/Header';
import { HeaderLine } from 'gg-ukit/components/Header/BasicHeader';
import Paragraph from 'gg-ukit/components/Paragraph';
import Sheet, { SheetPositionType } from 'gg-ukit/components/Sheet';

const TipView: FC = () => {
    const [advice, setAdvice] = useState<Advice>();
    const [showSheet, setShowSheet] = useState(false);

    useEffect(() => {
        document.addEventListener(MapEvent.TipOpen, (event: CustomEvent) => {
            setAdvice(event.detail as Advice);
            setShowSheet(!showSheet);
        });
    }, [showSheet]);

    if (!advice) {
        return null;
    }

    return (
        <Sheet
            header={<H2 title={advice.title} line={HeaderLine.TertiaryDimmed} />}
            visible={showSheet}
            positionType={SheetPositionType.Right}
            onClose={() => {
                setShowSheet(false);
            }}
            footer={
                advice.link ? (
                    <Button
                        kind={ButtonKind.Promo}
                        rounded
                        onClick={() => {
                            window.location.href = advice.link;
                        }}
                    >
                        Далее
                    </Button>
                ) : null
            }
        >
            <Column l={4} m={4} s={4} xs={4} container>
                <Paragraph>{advice.description}</Paragraph>
            </Column>
        </Sheet>
    );
};

export default TipView;
