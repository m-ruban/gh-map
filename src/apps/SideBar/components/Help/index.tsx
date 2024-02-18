import React, { FC, useState } from 'react';

import Button, { ButtonKind } from 'gg-ukit/components/Button';
import Column from 'gg-ukit/components/Column';
import { H2 } from 'gg-ukit/components/Header';
import { HeaderLine } from 'gg-ukit/components/Header/BasicHeader';
import Link from 'gg-ukit/components/Link';
import Paragraph from 'gg-ukit/components/Paragraph';
import Sheet, { SheetPositionType } from 'gg-ukit/components/Sheet';
import MenyIcon from 'side-bar/components/MenuIcon';
import MenuItem from 'side-bar/components/MenuItem';

import './help.less';

const Help: FC = () => {
    const [showSheet, setShowSheet] = useState(false);
    return (
        <>
            <MenuItem
                onClick={() => {
                    setShowSheet(!showSheet);
                }}
                name="help"
            >
                <MenyIcon src="/icons/help.svg" alt="help" name="help" />
            </MenuItem>
            <Sheet
                header={<H2 title="О проекте" line={HeaderLine.TertiaryDimmed} />}
                visible={showSheet}
                positionType={SheetPositionType.Left}
                onClose={() => {
                    setShowSheet(false);
                }}
                footer={
                    <Button
                        kind={ButtonKind.Promo}
                        rounded
                        onClick={() => {
                            window.location.href = `https://gamespirit.org/`;
                        }}
                    >
                        GameSpirit.org
                    </Button>
                }
            >
                <Column l={6} m={8} s={5} xs={4} container>
                    <Paragraph>
                        <span className="site-name">GG.MAP</span> - это небольшой проект, целью которого является
                        систематизация знаний о развития игровой индустрии. В даном проекте мы сконцентрировались на
                        создании единого таймлайна основных событий истории.
                    </Paragraph>
                    <Paragraph>
                        История разбита на года, каждый год обычно характеризуется каким-то контекстом, так как игровая
                        индустрия не существует в вакууме (например, кризис 2008 года или covid-2019).
                        <div>
                            <img className="legend-example" src="/img/year.jpg" alt="год" />
                        </div>
                    </Paragraph>
                    <Paragraph>
                        Для каждого жанра мы старались отобразить основные события, которые повлияли на его развитие.
                        Часть ссылок ведет на нашу основную площадку{' '}
                        <Link href="https://gamespirit.org/">gamespirit.org</Link> и открывается на карте, а часть
                        ссылок ведет на иные сайты.
                        <div>
                            <img className="legend-example" src="/img/genre.jpg" alt="жанр" />
                        </div>
                    </Paragraph>
                    <Paragraph>
                        Если вы нашли ошибку и хотите, чтобы мы поправили, отправьте письмо на email{' '}
                        <Link href="mailto:gamespirit.org@gmail.com">gamespirit.org@gmail.com</Link>
                    </Paragraph>
                </Column>
            </Sheet>
        </>
    );
};

export default Help;
