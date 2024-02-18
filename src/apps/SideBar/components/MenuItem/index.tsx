import React, { FC, PropsWithChildren } from 'react';
import { Merge } from 'type-fest';

import './menu-item.less';

type HTMLDivWithChildren = Merge<JSX.IntrinsicElements['div'], PropsWithChildren>;

interface MenuItemProps {
    name: string;
}

const MenuItem: FC<HTMLDivWithChildren & MenuItemProps> = ({ children, name, ...props }) => {
    return (
        <div className={`menu-item menu-item_${name}`} {...props}>
            {children}
        </div>
    );
};

export default MenuItem;
