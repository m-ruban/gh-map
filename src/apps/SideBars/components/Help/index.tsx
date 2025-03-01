import React, { FC } from 'react';

import { dispatchCustomEvent } from 'src/modules/events';
import MapEvent from 'src/modules/MapEvent';

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
                                    GG.MAP - это небольшой проект, целью которого является систематизация знаний о
                                    развития игровой индустрии. В даном проекте мы сконцентрировались на создании
                                    единого таймлайна основных событий истории.
                                    <br />
                                    История разбита на года, каждый год обычно характеризуется каким-то контекстом, так
                                    как игровая индустрия не существует в вакууме (например, кризис 2008 года или
                                    covid-2019).
                                    <br />
                                    Для каждого жанра мы старались отобразить основные события, которые повлияли на его
                                    развитие. Часть ссылок ведет на нашу основную площадку gamespirit.org и открывается
                                    на карте, а часть ссылок ведет на иные сайты.
                                    <br />
                                    Если вы нашли ошибку и хотите, чтобы мы поправили, отправьте письмо на email
                                    gamespirit.org@gmail.com
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
