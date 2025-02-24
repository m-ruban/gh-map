import React, { ReactElement, ReactNode } from 'react';

interface FrameProps {
    title: string;
    height?: number;
    children: ReactNode;
    anchor?: ReactNode;
    link?: string;
    primaryAction?: ReactNode;
    secondaryAction?: ReactNode;
}

import './frame.less';

const Frame = ({ children, title, height, link, anchor, primaryAction, secondaryAction }: FrameProps): ReactElement => {
    return (
        <div className="frame" style={height ? { height } : {}}>
            <div className="frame-title">{title}</div>
            {primaryAction && !secondaryAction && (
                <div className="only-frame-primary-action-wrapper">{primaryAction}</div>
            )}
            {primaryAction && secondaryAction && (
                <div className="frame-actions-wrapper">
                    {secondaryAction}
                    <div className="frame-actions-divider" />
                    {primaryAction}
                </div>
            )}
            {children}
            {link && (
                <div className="frame-link">
                    <a href={link} target="_blank" rel="noreferrer">
                        {anchor || 'Далее'}
                    </a>
                </div>
            )}
        </div>
    );
};

export default Frame;
