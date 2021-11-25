import { Injectable } from '@angular/core';
import { Exception } from '../common/exception';
import { ThemeConfigure } from '../common/themeconfigure';




export enum ThemeStyle {
    Default = 'default',
    Dark = 'dark',
    White = 'white'
}





@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly _themes: Record<ThemeStyle, string>;
    private _currentTheme: ThemeStyle;


    public get currentTheme(): ThemeStyle {
        return this._currentTheme;
    }




    constructor() {
        this._themes = {
            default: '默认主题',
            dark: '黑暗主题',
            white: '亮色主题'
        }

        this.changeTheme(ThemeStyle.White);

    }

    public get themes():Record<ThemeStyle, string>{
        return this._themes;
    }


    /**
     * 移除一个主题
     * @param themeId 
     */
    private removeTheme(themeId: ThemeStyle) {
        const themeClass = `theme-${themeId}`;
        document.documentElement.classList.remove(themeId);
        const removedThemeStyle = document.getElementById(themeClass);
        if (removedThemeStyle) {
            document.head.removeChild(removedThemeStyle);
        }
    }


    /**
     * 改变主题
     * @param themeId 
     * #throw Exception
     */
    public async changeTheme(themeId: ThemeStyle): Promise<void> {
        if (this._themes[themeId] == null) throw Exception.build("don't try to load an undeclared theme");
        try {
            await this.loadTheme(themeId);
            if (this._currentTheme) {
                this.removeTheme(this._currentTheme);
            }
            this._currentTheme = themeId;
        } catch (ex) {
            throw Exception.fromCatch(ex, 'A fatal error was encountered while loading the theme file.')
        }
    }

    private async loadTheme(themeId: string): Promise<void> {
        const themeClass = `theme-${themeId}`;
        await this.loadCssFile(`${themeClass}.css`, themeClass);
        document.documentElement.classList.add(themeId);
    }





    private loadCssFile(href: string, id: string): Promise<Event> {
        return new Promise((resolve, reject) => {
            const style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = href;
            style.id = id;
            style.onload = resolve;
            style.onerror = reject;
            document.head.append(style);
        });
    }
}
