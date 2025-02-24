import React, { FC } from 'react';

import Paragraph from 'gg-ukit/components/Paragraph';

import './mobile-alert.less';

const MobileAlert: FC = () => {
    return (
        <div className="mobile-alert">
            <Paragraph>Sorry, mobile version is turn off</Paragraph>
        </div>
    );
};

export default MobileAlert;
