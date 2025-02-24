import React, { FC } from 'react';

import './menu-icon.less';

const MenyIcon: FC<{ name: string; src: string; alt: string }> = ({ name, src, alt, ...props }) => {
    return <img className={`menu-icon menu-icon_${name}`} src={src} alt={alt} {...props} />;
};

export default MenyIcon;
