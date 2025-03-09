import React, { ReactElement, ReactNode, useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';

import MapEvent from 'src/modules/MapEvent';

import Paragraph from 'gg-ukit/components/Paragraph';
import Frame from 'side-bars/components/Frame';
import Gallery from 'side-bars/components/Gallery';

import './article-view.less';

interface ArticleViewState {
    description: ReactNode;
    title: string;
    link: string;
    anchor: ReactNode;
    articleId: number;
    images?: string[];
}

const EMPTY_STATE: ArticleViewState = {
    title: '',
    description: '',
    link: '',
    anchor: '',
    articleId: 0,
    images: [],
};

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
    const [descriptionKey, setDescriptionKey] = useState(0);
    const [showDefaultContent, setShowDefaultContent] = useState(true);
    const [articleView, setArticleView] = useState<ArticleViewState>(EMPTY_STATE);
    const [showGallery, setShowGallery] = useState(false);
    const handleOnClose = useCallback(() => {
        setShowDefaultContent(true);
        setArticleView(EMPTY_STATE);
    }, []);

    useEffect(() => {
        const showArticleView = (event: CustomEvent) => {
            const state = event.detail as ArticleViewState;
            // state.images = ['https://gamespirit.org/image/fps/zCkEM_test_cover.jpg'];
            setArticleView(state);
            setShowDefaultContent(false);
        };
        document.addEventListener(MapEvent.ShowDetail, showArticleView);
        return () => {
            document.removeEventListener(MapEvent.ShowDetail, showArticleView);
        };
    }, []);

    const { description, anchor, title, link, articleId, images } = articleView;
    const wrappedDescription = isString(description) ? <Paragraph>{description}</Paragraph> : description;

    // recalc text len
    useEffect(() => {
        setDescriptionKey((value) => ++value);
        setShowGallery(false);
    }, [description]);

    const detectAnimationEnd = useCallback(
        (node: HTMLDivElement) => {
            if (images?.length > 0) {
                const callback = () => {
                    setShowGallery(true);
                    node.removeEventListener('animationend', callback);
                };
                node.addEventListener('animationend', callback);
            }
        },
        [images]
    );

    const descriptionRef = useCallback(
        (node: HTMLDivElement) => {
            if (node) {
                detectAnimationEnd(node);
                node.style.setProperty('--len', `${node.textContent.length}`);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [description]
    );

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
                    <div className="article-view-defailt-content">
                        <Paragraph>И тут появиться информация по теме...</Paragraph>
                    </div>
                )}
                {!showDefaultContent && (
                    <>
                        {!articleId && (
                            <div key={descriptionKey} ref={descriptionRef} className="article-view-content">
                                {wrappedDescription}
                                {images?.length > 0 && (
                                    <div
                                        className={classnames('article-view-gallery', {
                                            'article-view-gallery_show': showGallery,
                                        })}
                                    >
                                        <Gallery slides={images} />
                                    </div>
                                )}
                            </div>
                        )}
                        {articleId && (
                            <iframe
                                className="article-view-iframe"
                                src={`https://gamespirit.org/article/${articleId}/`}
                            />
                        )}
                    </>
                )}
            </Frame>
        </div>
    );
};

export default ArticleView;
