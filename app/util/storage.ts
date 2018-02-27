import {  AsyncStorage } from 'react-native';

export function Save(name: string, value: any) {
    return AsyncStorage.setItem(name, JSON.stringify(value))
    .then(() => value);
}

export function Load(name: string, defaultValue?: any) {
    return AsyncStorage.getItem(name)
    .then(value => {
        try {
            return JSON.parse(value) || defaultValue;
        } catch (err) {
            return defaultValue;
        }
    });
}
