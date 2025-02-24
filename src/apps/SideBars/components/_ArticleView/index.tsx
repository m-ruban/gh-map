import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import MapEvent from 'src/modules/MapEvent';

import { H2 } from 'gg-ukit/components/Header';
import { HeaderLine } from 'gg-ukit/components/Header/BasicHeader';
import Sheet, { SheetPositionType } from 'gg-ukit/components/Sheet';

import './articleView.less';

const ArticleView: FC = () => {
    const [articleId, setArticleId] = useState<number>();
    const [title, setTitle] = useState<string>();
    const [showSheet, setShowSheet] = useState(false);
    const [height, setHeight] = useState<number>(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const wrapperRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    }, []);

    useEffect(() => {
        document.addEventListener(MapEvent.ArticleOpen, (event: CustomEvent) => {
            setArticleId(event.detail.articleId as number);
            setTitle(event.detail.title as string);
            setShowSheet(!showSheet);
        });
    }, [showSheet]);

    useEffect(() => {
        if (!articleId) {
            return;
        }
        if (!height) {
            return;
        }
        setTimeout(() => {
            iframeRef.current.height = `${height - 10}px`;
        }, 0);
    }, [articleId, height]);

    if (!articleId) {
        return null;
    }

    return (
        <Sheet
            header={<H2 title={title} line={HeaderLine.TertiaryDimmed} />}
            visible={showSheet}
            positionType={SheetPositionType.Right}
            onClose={() => {
                setShowSheet(false);
                setArticleId(0);
            }}
        >
            <div ref={wrapperRef} className="article-view">
                <iframe
                    ref={iframeRef}
                    className="article-view-iframe"
                    loading="eager"
                    src={`https://gamespirit.org/article/${articleId}/`}
                />
            </div>
        </Sheet>
    );
};

export default ArticleView;
