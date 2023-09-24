import React, { FC, PropsWithChildren } from 'react';
import { Merge } from 'type-fest';

import './menu-item.less';

const MenuItem: FC<Merge<JSX.IntrinsicElements['div'], PropsWithChildren>> = ({ children, ...props }) => {
    return (
        <div className="menu-item" {...props}>
            {children}
        </div>
    );
};

export default MenuItem;
