import * as bluebird from 'bluebird';
import { Alert } from 'react-native';

import { Dispatch } from 'app/actionTypes';
import { Post } from 'app/util/network';
import { Save } from 'app/util/storage';

import { STORECODE, USERCODE } from './app';

type loginAction = ['auth/login', string, string];
function login(username: string, password: string) {
    return (dispatch: Dispatch) => {
        dispatch(['/auth/isLoggingIn/update', true]);
        return Post('/auth/retail/sign-in', { username, password })
        .then((response: any) => {
            return bluebird.all([
                Save(STORECODE, response.storecode),
                Save(USERCODE, response.usercode),
            ]);
        })
        .then(([storecode, usercode]) => {
            dispatch(['/auth/isLoggingIn/update', false]);
            dispatch(['/app/storecode/update', storecode]);
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
