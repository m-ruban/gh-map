import React, { FC } from 'react';

import { dispatchCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

import Link from 'gg-ukit/components/Link';
import Paragraph from 'gg-ukit/components/Paragraph';
import MenyIcon from 'side-bars/components/MenuIcon';
import MenuItem from 'side-bars/components/MenuItem';

import './help.less';

const Help: FC = () => {
    return (
        <>
            <MenuItem
                onClick={() => {
                    const detail = {
                        description: (
                            <>
                                <Paragraph>
                                    <span className="site-name">GG.MAP</span> - это небольшой проект, целью которого
                                    является систематизация знаний о развития игровой индустрии. В даном проекте мы
                                    сконцентрировались на создании единого таймлайна основных событий истории.
                                </Paragraph>
                                <Paragraph>
                                    История разбита на года, каждый год обычно характеризуется каким-то контекстом, так
                                    как игровая индустрия не существует в вакууме (например, кризис 2008 года или
                                    covid-2019).
                                </Paragraph>
                                <Paragraph>
                                    Для каждого жанра мы старались отобразить основные события, которые повлияли на его
                                    развитие. Часть ссылок ведет на нашу основную площадку{' '}
                                    <Link href="https://gamespirit.org/">gamespirit.org</Link> и открывается на карте, а
                                    часть ссылок ведет на иные сайты.
                                    <div>
                                        <img className="legend-example" src="/img/genre.jpg" alt="жанр" />
                                    </div>
                                </Paragraph>
                                <Paragraph>
                                    Если вы нашли ошибку и хотите, чтобы мы поправили, отправьте письмо на email{' '}
                                    <Link href="mailto:gamespirit.org@gmail.com">gamespirit.org@gmail.com</Link>
                                </Paragraph>
                            </>
                        ),
                        title: 'О проекте',
                        link: 'https://gamespirit.org/',
                        anchor: 'GameSpirit.org',
                    };
                    dispatchCustomEvent(MapEvent.ShowDetail, { detail });
                }}
                name="help"
            >
                <MenyIcon src="/icons/help.svg" alt="help" name="help" />
            </MenuItem>
        </>
    );
};

export default Help;
