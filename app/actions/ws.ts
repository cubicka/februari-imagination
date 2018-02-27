import { Dispatch } from 'app/actionTypes';
import { AppPage } from 'app/reducers/app';
import { WS } from 'app/reducers/ws';
import { Get } from 'app/util/network';
import { Save } from 'app/util/storage';

import { WSLIST } from './app';

type getListAction = ['ws/getList'];
function getList() {
    return (dispatch: Dispatch) => {
        return Get('/retail/ws')
        .then((response: any) => {
            return Save(WSLIST, response.ws);
        })
        .then((ws: any) => {
            dispatch(['/ws/list/update', ws]);
        })
        .catch(() => null);
    };
}

type selectAction = ['ws/select', WS];
function select(ws: WS) {
    return (dispatch: Dispatch) => {
        dispatch(['/ws/current/update', ws]);
        dispatch(['/app/currentPage/update', AppPage.GrosirHome]);
    };
}

export type wsAction = getListAction | selectAction;
export default {
    getList, select,
};
