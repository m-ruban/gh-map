import React, { FC, useEffect, useState } from 'react';

import MapEvent from 'src/modules/MapEvent';

import Column from 'gg-ukit/components/Column';
import { H2 } from 'gg-ukit/components/Header';
import { HeaderLine } from 'gg-ukit/components/Header/BasicHeader';
import Paragraph from 'gg-ukit/components/Paragraph';
import Sheet, { SheetPositionType } from 'gg-ukit/components/Sheet';

const ArticleView: FC = () => {
    const [articleId, setArticleId] = useState<number>();
    const [showSheet, setShowSheet] = useState(false);

    useEffect(() => {
        document.addEventListener(MapEvent.ArticleOpen, (event: CustomEvent) => {
            setArticleId(event.detail.articleId as number);
            setShowSheet(!showSheet);
        });
    }, [showSheet]);

    // TODO load article by id

    if (!articleId) {
        return null;
    }

    return (
        <Sheet
            header={<H2 title={'title article'} line={HeaderLine.TertiaryDimmed} />}
            visible={showSheet}
            positionType={SheetPositionType.Right}
            onClose={() => {
                setShowSheet(false);
            }}
        >
            <Column l={4} m={4} s={4} xs={4} container>
                <Paragraph>{'body article'}</Paragraph>
            </Column>
        </Sheet>
    );
};

export default ArticleView;
