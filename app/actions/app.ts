import Bluebird from 'bluebird';

import { Dispatch } from 'app/actionTypes';
import { Load } from 'app/util/storage';

import { CATEGORIES, ITEMS } from './ws';

export const STORECODE = 'storecode';
export const USERCODE = 'usercode';
export const WSLIST = 'ws_list';
export const TRANSACTIONS = 'transactions';

type initAction = ['app/init'];
function init() {
    return (dispatch: Dispatch) => {
        return Bluebird.all([
            Load(CATEGORIES, {}),
            Load(ITEMS, {}),
            Load(STORECODE, ''),
            Load(USERCODE, ''),
            Load(TRANSACTIONS, []),
            Load(WSLIST, []),
        ])
        .then(([categories, items, storecode, usercode, transactions, wslist]) => {
            dispatch(['/app/initialize', { storecode, transactions, usercode }]);
            dispatch(['/ws/list/update', wslist]);
            dispatch(['/ws/category/set', categories]);
            dispatch(['/ws/items/set', items]);
        });
    };
}

export type appActions = initAction;
export default {
    init,
};
