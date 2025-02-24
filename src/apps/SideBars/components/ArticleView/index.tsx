import React, { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';

import MapEvent from 'src/modules/MapEvent';

import Paragraph from 'gg-ukit/components/Paragraph';
import Frame from 'side-bars/components/Frame';

import './article-view.less';

interface ArticleViewState {
    description: ReactNode;
    title: string;
    link: string;
    anchor: ReactNode;
}

const EMPTY_STATE: ArticleViewState = { title: '', description: '', link: '', anchor: '' };

const CloseIcon = () => {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.6 16L0 14.4L6.4 8L0 1.6L1.6 0L8 6.4L14.4 0L16 1.6L9.6 8L16 14.4L14.4 16L8 9.6L1.6 16Z"
                fill="#404A53"
            />
        </svg>
    );
};

const isString = (value: unknown) => typeof value === 'string';

const ArticleView = (): ReactElement => {
    const [showDefaultContent, setShowDefaultContent] = useState(true);
    const [articleView, setArticleView] = useState<ArticleViewState>(EMPTY_STATE);
    const handleOnClose = useCallback(() => {
        setShowDefaultContent(true);
        setArticleView(EMPTY_STATE);
    }, []);

    useEffect(() => {
        const showArticleView = (event: CustomEvent) => {
            setArticleView(event.detail as ArticleViewState);
            setShowDefaultContent(false);
        };
        document.addEventListener(MapEvent.ShowDetail, showArticleView);
        return () => {
            document.removeEventListener(MapEvent.ShowDetail, showArticleView);
        };
    }, []);

    const { description: _description, anchor, title, link } = articleView;
    const description = isString(_description) ? <Paragraph>{_description}</Paragraph> : _description;

    return (
        <div className="article-view">
            <Frame
                title={showDefaultContent ? 'Выберите что-нибудь' : title}
                link={link}
                anchor={anchor}
                primaryAction={
                    !showDefaultContent && (
                        <button className="article-close-button" type="button" onClick={handleOnClose}>
                            <CloseIcon />
                        </button>
                    )
                }
            >
                {showDefaultContent && (
                    <Paragraph>И тут появиться информация по теме или перейдите на страницу жанра...</Paragraph>
                )}
                {!showDefaultContent && <div className="article-view-content">{description}</div>}
            </Frame>
        </div>
    );
};

export default ArticleView;
