import { Alert } from 'react-native';

import { Dispatch } from 'app/actionTypes';
import { Post } from 'app/util/network';
import { Save } from 'app/util/storage';

import { USERCODE } from './app';

type loginAction = ['auth/login', string, string];
function login(username: string, password: string) {
    return (dispatch: Dispatch) => {
        dispatch(['/auth/isLoggingIn/update', true]);
        return Post('/auth/retail/sign-in', { username, password })
        .then((response: any) => {
            return Save(USERCODE, response.usercode);
        })
        .then((usercode: any) => {
            dispatch(['/auth/isLoggingIn/update', false]);
            dispatch(['/app/usercode/update', usercode]);
        })
        .catch(() => {
            dispatch(['/auth/isLoggingIn/update', false]);
            Alert.alert('Autentikasi gagal.');
        });
    };
}

export type authAction = loginAction;
export default {
    login,
};
