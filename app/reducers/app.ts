import { AnyAction } from 'redux';

import { Item } from './ws';

export enum AppPage {
    Category = 'Category',
    Home = 'Home',
    GrosirHome = 'GrosirHome',
    ItemDetail = 'ItemDetail',
    Transaction = 'Transaction',
}

export interface CartItem {
    item: Item;
    qty: number;
}

export interface Transaction {
    storename: string;
    status: string;
    totalPrice: number;
    itemsCount: number;
    orderid: string;
    picktime: Date;
}

export interface AppState {
    currentPage: AppPage;
    hasInitialized: boolean;
    usercode?: string;
    storecode: string;
    showItemDetail: boolean;
    itemDetail: Item;
    cart: CartItem[];
    totalPrices: number;
    transactions: Transaction[];
}

const initialState: AppState = {
    currentPage: AppPage.Home,
    hasInitialized: false,
    storecode: '',
    showItemDetail: false,
    cart: [],
    itemDetail: {
        skucode: '',
        description: '',
        category: '',
        subcategory: '',
        price: '0',
    },
    totalPrices: 0,
    transactions: [],
};

export type appReducerActions = [ '/app/currentPage/update', AppPage ] |
    ['/app/cart/add', Item] |
    ['/app/cart/substract', Item] |
    ['/app/cart/clean'] |
    ['/app/cart/empty'] |
    ['/app/initialize', { usercode: string }] |
    ['/app/itemDetail/set', Item] |
    ['/app/showItemDetail/update', boolean ] |
    ['/app/storecode/update', string ] |
    ['/app/transactions/update', Transaction[]] |
    ['/app/usercode/update', string];

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'cart/add': {
            const item = action.payload;
            const itemIdx = state.cart.findIndex(c => c.item.skucode === item.skucode);

            if (itemIdx === -1) {
                return {
                    ...state,
                    cart: [...state.cart, {item, qty: 1}],
                    totalPrices: state.totalPrices + parseFloat(item.price),
                };
            }

            return {
                ...state,
                cart: [
                    ...state.cart.slice(0, itemIdx),
                    { item, qty: state.cart[itemIdx].qty + 1 },
                    ...state.cart.slice(itemIdx + 1),
                ],
                totalPrices: state.totalPrices + parseFloat(item.price),
            };
        }

        case 'cart/substract': {
            const item = action.payload;
            const itemIdx = state.cart.findIndex(c => c.item.skucode === item.skucode);

            if (itemIdx === -1) {
                return {
                    ...state,
                    cart: [...state.cart],
                };
            }

            return {
                ...state,
                cart: [
                    ...state.cart.slice(0, itemIdx),
                    { item, qty: Math.max(0, state.cart[itemIdx].qty - 1) },
                    ...state.cart.slice(itemIdx + 1),
                ],
                totalPrices: state.totalPrices - ((state.cart[itemIdx].qty === 0) ? 0 : parseFloat(item.price)),
            };
        }

        case 'cart/clean': {
            return { ...state, cart: state.cart.filter(c => c.qty > 0) };
        }

        case 'cart/empty': {
            return { ...state, cart: [] };
        }

        case 'currentPage/update': {
            return { ...state, currentPage: action.payload };
        }

        case 'initialize': {
            const { storecode, transactions, usercode } = action.payload;
            return { ...state, hasInitialized: true, storecode, usercode, transactions };
        }

        case 'itemDetail/set': {
            return { ...state, itemDetail: action.payload };
        }

        case 'showItemDetail/update': {
            return { ...state, showItemDetail: action.payload };
        }

        case 'storecode/update': {
            return { ...state, storecode: action.payload };
        }

        case 'transactions/update': {
            return { ...state, transactions: action.payload };
        }

        case 'usercode/update': {
            return { ...state, usercode: action.payload };
        }

        default: return state;
    }
}

export default reducer;
