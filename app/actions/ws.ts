import { Alert } from 'react-native';

import { Dispatch, ThunkAction } from 'app/actionTypes';
import { AppPage, Transaction } from 'app/reducers/app';
import { WS } from 'app/reducers/ws';
import bounce from 'app/util/bounce';
import { Get, Post } from 'app/util/network';
import { Save } from 'app/util/storage';

import { STORECODE, TRANSACTIONS, WSLIST } from './app';

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

function transformTransaction(transaction: any): Transaction {
    return {
        storename: transaction.grosir.name,
        status: transaction.iscanceled === '1' ? 'Batal' : (transaction.isprint === '1' ? 'Ter-print' : 'Antri'),
        totalPrice: transaction.items.reduce((total: number, item: any) => {
            return total + item.pcsqty * parseFloat(item.price);
        }, 0),
        itemsCount: transaction.items.length,
        orderid: transaction.orderid,
        picktime: new Date(transaction.picktime),
    };
}

type getTransactionsAction = ['ws/getTransactions'];
function getTransactions()  {
    return (dispatch: Dispatch) => {
        return Get('/retail/orders')
        .then((response: any) => {
            const t = response.transactions.slice(0, 5).map(transformTransaction);
            return Save(TRANSACTIONS, t)
            .then(() => {
                dispatch(['/app/transactions/update', t]);
            });
        })
        .catch(() => {
            // Alert.alert('Pesanan gagal. Coba cek koneksi internet.');
        });
    };
}

function fetchItem(storecode: string, name: string): ThunkAction<Promise<any>> {
    return (dispatch: Dispatch, getState) => {
        return Get(`/retail/ws/${storecode}/itemsByName`, { name })
        .then((response: any) => {
            const state = getState();
            const searchKey = state.ws.searchKey;
            if (searchKey === name) {
                dispatch(['/ws/searchItems/update', response.products]);
                dispatch(['/ws/isSearching/update', false]);
            }
        })
        .catch(() => {
            dispatch(['/ws/isSearching/update', false]);
        });
    };
}

type searchItemAction = ['ws/searchItem', string];
function searchItem(name: string): ThunkAction<void> {
    return (dispatch: Dispatch, getState) => {
        const state = getState();
        const storecode = state.app.storecode;

        dispatch(['/ws/isSearching/update', true]);
        dispatch(['/ws/searchKey/update', name]);

        bounce('searchItems', () => {
            dispatch(fetchItem(storecode, name));
        });
    };
}

export type wsAction = getCategoryAction | getItemsAction |
    getListAction | getTransactionsAction | pesanAction | searchItemAction | selectAction | showDetailAction;
export default {
    getCategory, getItems, getList, getTransactions, pesan, searchItem, select, showDetail,
};
