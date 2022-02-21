/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {Button} from '@osui/ui';
import ThemeProvider from '@osui/theme-provider';

export default {
    title: 'ThemeProvider',
};

export const Demo = () => {
    const {useTheme, DarkModeSwitcher} = ThemeProvider;
    const theme = useTheme();
    return (
        <ThemeProvider>
            <DarkModeSwitcher>
                开关
            </DarkModeSwitcher>
            <Button>Hello: {theme}</Button>
        </ThemeProvider>
    );
};
