import { Injectable } from '@angular/core';
import { Exception } from '../common/exception';
import { ThemeConfigure } from '../common/themeconfigure';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly _themes: Record<string, string>;
    private _currentTheme: string;


    public get currentTheme(): string {
        return this._currentTheme;
    }

    constructor() {
        this._themes = {
            default: '默认主题'
        }
    }

    public get themes(): Record<string, string> {
        return this._themes;
    }


    /**
     * register themes
     * @param _themes 
     */
    public registerTheme(_themes: Record<string, string>) {
        for (const key in _themes) {
            this._themes[key] = _themes[key];
        }
    }



    /**
     * 移除一个主题
     * @param themeId 
     */
    private removeTheme(themeId: string) {
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
    public async changeTheme(themeId: string = 'default'): Promise<void> {
        if (this._themes[themeId] == null) throw Exception.build('change Theme', "don't try to load an undeclared theme");
        try {
            if (this._currentTheme === themeId) return;
            await this.loadTheme(themeId);
            if (this._currentTheme) {
                this.removeTheme(this._currentTheme);
            }
            this._currentTheme = themeId;
        } catch (ex) {
            throw Exception.fromCatch('change Theme', ex, 'A fatal error was encountered while loading the theme file.')
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
