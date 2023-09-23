import React, { FC, useState } from 'react';

import Column from 'gg-ukit/components/Column';
import { H2 } from 'gg-ukit/components/Header';
import { HeaderLine } from 'gg-ukit/components/Header/BasicHeader';
import Paragraph from 'gg-ukit/components/Paragraph';
import Sheet, { SheetPositionType } from 'gg-ukit/components/Sheet';
import MenyIcon from 'side-bar/components/MenuIcon';
import MenuItem from 'side-bar/components/MenuItem';

const Help: FC = () => {
    const [showSheet, setShowSheet] = useState(false);
    return (
        <>
            <MenuItem
                onClick={() => {
                    setShowSheet(!showSheet);
                }}
            >
                <MenyIcon src="/icons/help.svg" alt="help" />
            </MenuItem>
            <Sheet
                header={<H2 title="Help" line={HeaderLine.TertiaryDimmed} />}
                visible={showSheet}
                positionType={SheetPositionType.Left}
                onClose={() => {
                    setShowSheet(false);
                }}
            >
                <Column l={6} m={8} s={5} xs={4} container>
                    <Paragraph>
                        Карта игрового мира так же проста - центральный город, в котором расположена вся необходимая
                        герою инфраструктура и четыре большие локации расположены по четырём частям света. Каждый
                        уровень имеет свой дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и
                        тематику - будь то северные горы, болота затопленный город. В конце каждой есть босс, который и
                        даст вам необходимую часть ключа.
                    </Paragraph>
                    <Paragraph>
                        Карта игрового мира так же проста - центральный город, в котором расположена вся необходимая
                        герою инфраструктура и четыре большие локации расположены по четырём частям света. Каждый
                        уровень имеет свой дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и дизайн и
                        тематику - будь то северные горы, болота затопленный город. В конце каждой есть босс, который и
                        даст вам необходимую часть ключа.
                    </Paragraph>
                </Column>
            </Sheet>
        </>
    );
};

export default Help;
