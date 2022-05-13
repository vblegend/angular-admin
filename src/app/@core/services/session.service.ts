import { Injectable } from "@angular/core";

import * as CryptoJS from 'crypto-js'


@Injectable({
    providedIn: 'root'
})
export class SessionService {

    public readonly confuseCode = {
        version: 1.0,
        date: '2020-12-12 00:00:00',
        password: '~!@#$%^&*(*))/**/'
    }



    /**
     * get the key content in the session
     * @param key 
     * @param value 
     */
    public set<T>(key: string, value: T): void {
        const _key = this.generateKey(key);
        const data = CryptoJS.AES.encrypt(JSON.stringify(value), this.generateIV(key)).toString();
        sessionStorage.setItem(_key, data);
    }

    /**
     * set the key content to the session 
     * @param key 
     * @returns 
     */
    public get<T>(key: string): T | null {
        const _key = this.generateKey(key);
        const value = sessionStorage.getItem(_key);
        if (value == null) return null;
        const data = CryptoJS.AES.decrypt(value, this.generateIV(key));
        const result = data.toString(CryptoJS.enc.Utf8);
        return JSON.parse(result);
    }

    /**
     * remove the key from session
     * @param key 
     */
    public remove(key: string): void {
        const _key = this.generateKey(key);
        sessionStorage.removeItem(_key);
    }


    public generateKey(key: string): string {
        return CryptoJS.MD5(key + JSON.stringify(this.confuseCode)).toString();
    }


    public generateIV(key: string): string {
        return CryptoJS.MD5(JSON.stringify(this.confuseCode) + key + '$').toString();
    }
}