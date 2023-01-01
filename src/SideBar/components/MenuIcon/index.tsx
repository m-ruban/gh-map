import React, { FC } from 'react';

import 'side-bar/components/MenuIcon/menu-icon.less';

const MenyIcon: FC<{ src: string; alt: string }> = ({ src, alt, ...props }) => {
    return <img className="menu-icon" src={src} alt={alt} {...props} />;
};

export default MenyIcon;
