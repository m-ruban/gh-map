import React, { FC, ReactNode } from 'react';

import 'side-bar/components/MenuItem/menu-item.less';

const MenuItem: FC<{ children: ReactNode }> = ({ children, ...props }) => {
    return (
        <div className="menu-item" {...props}>
            {children}
        </div>
    );
};

export default MenuItem;
