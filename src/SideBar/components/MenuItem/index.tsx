import React, { FC, ReactNode } from 'react';

import 'side-bar/components/MenuItem/menu-item.less';

const MenuItem: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className="menu-item">{children}</div>;
};

export default MenuItem;
