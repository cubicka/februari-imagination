import { Alert } from 'react-native';

import { Dispatch, ThunkAction } from 'app/actionTypes';
import { AppPage } from 'app/reducers/app';
import { WS } from 'app/reducers/ws';
import { Get, Post } from 'app/util/network';
import { Save } from 'app/util/storage';

import { STORECODE, WSLIST } from './app';

import { Item } from 'app/reducers/ws';

export const CATEGORIES = 'categories';
export const ITEMS = 'items';

type getCategoryAction = ['ws/getCategory'];
function getCategory(): ThunkAction<Promise<any>> {
    return (dispatch: Dispatch, getState) => {
        const state = getState();
        const storecode = state.app.storecode;

        return Get(`/retail/ws/${storecode}/category`)
        .then((response: any) => {
            dispatch(['/ws/category/update', { id: storecode, categories: response.categories }]);
        })
        .then(() => {
            const latestState = getState();
            return Save(CATEGORIES, latestState.ws.category);
        });
    };
}

type getItemsAction = ['ws/getItems', string, string];
function getItems(storecode: string, categorycode: string): ThunkAction<Promise<any> | any> {
    return (dispatch: Dispatch, getState) => {
        const state = getState();

        if (state.ws.lastUpdate[storecode] && state.ws.lastUpdate[storecode][categorycode]) {
            const prevDate = state.ws.lastUpdate[storecode][categorycode];
            if (((new Date()).getTime() - prevDate.getTime()) < 5 * 60 * 1000) {
                return;
            }
        }

        return Get(`/retail/ws/${storecode}/items/${categorycode || '-'}`)
        .then((response: any) => {
            dispatch(['/ws/items/update', { storecode, categorycode, items: response.products }]);
        })
        .then(() => {
            const latestState = getState();
            return Save(ITEMS, latestState.ws.items);
        });
    };
}

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
        return Save(STORECODE, ws.storecode);
    };
}

type showDetailAction = ['ws/showDetail', Item];
function showDetail(item: Item) {
    return (dispatch: Dispatch) => {
        dispatch(['/app/itemDetail/set', item]);
        dispatch(['/app/showItemDetail/update', true]);
    };
}

type pesanAction = ['ws/pesan', Date];
function pesan(picktime: Date): ThunkAction<Promise<any> | any>  {
    return (dispatch: Dispatch, getState) => {
        const state = getState();
        const storecode = state.app.storecode;
        const items = state.app.cart.map(c => ({ skucode: c.item.skucode, pcsqty: c.qty }));

        return Post('/retail/orders', {
            storecode,
            items,
            picktime,
            remarks: '',
        })
        .then(() => {
            Alert.alert('Pesanan telah diterima.');
            dispatch(['/app/cart/empty']);
            dispatch(['/app/currentPage/update', AppPage.Home]);
        })
        .catch(() => {
            Alert.alert('Pesanan gagal. Coba cek koneksi internet.');
        });
    };
}

export type wsAction = getCategoryAction | getItemsAction |
    getListAction | pesanAction | selectAction | showDetailAction;
export default {
    getCategory, getItems, getList, pesan, select, showDetail,
};
