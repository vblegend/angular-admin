
import * as CryptoJS from 'crypto-js'


export class SessionManager {



    /**
     * get the key content in the session
     * @param key 
     * @param value 
     */
    public set<T>(key: string, value: T): void {
        const _key = CryptoJS.MD5(key).toString();
        const data = CryptoJS.AES.encrypt(JSON.stringify(value), _key).toString();
        sessionStorage.setItem(_key, data);
    }

    /**
     * set the key content to the session 
     * @param key 
     * @returns 
     */
    public get<T>(key: string): T {
        const _key = CryptoJS.MD5(key).toString();
        const value = sessionStorage.getItem(_key);
        if (value == null) return null;
        const data = CryptoJS.AES.decrypt(value, _key);
        const result = data.toString(CryptoJS.enc.Utf8);
        return JSON.parse(result);
    }

}