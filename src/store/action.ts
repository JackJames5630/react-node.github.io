import * as React from 'react';

export const SET_THEME_MODE = "SET THEME MODE"
export const setThemeMode = (themeMode: any) => {
    return {
        type: SET_THEME_MODE,
        payload: themeMode
    }
}