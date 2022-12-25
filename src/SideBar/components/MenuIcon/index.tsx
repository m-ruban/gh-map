import React, { FC } from 'react';

import 'side-bar/components/MenuIcon/menu-icon.less';

const MenyIcon: FC<{ src: string; alt: string }> = ({ src, alt }) => {
    return <img className="menu-icon" src={src} alt={alt} />;
};

export default MenyIcon;
