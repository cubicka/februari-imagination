import Update from 'immutability-helper';
import { AnyAction } from 'redux';

export interface WS {
    address: string;
    name: string;
    storecode: string;
}

export interface Category {
    categoryname: string;
    categorycode: string;
}

export interface Item {
    skucode: string;
    description: string;
    category: string;
    subcategory: string;
    price: string;
}

export interface WSState {
    currentActive: WS;
    list: WS[];
    category: {
        [name: string]: Category[],
    };
    categoryActive: {
        [name: string]: string,
    };
    lastUpdate: {
        [storecode: string]: {
            [categorycode: string]: Date;
        };
    };
    items: {
        [storecode: string]: {
            [categorycode: string]: Item[];
        };
    };
    searchItems: Item[];
    searchKey: string;
    isSearching: boolean;
}

const initialState: WSState = {
    currentActive: {
        name: '', storecode: '', address: '',
    },
    list: [],
    category: {},
    categoryActive: {},
    items: {},
    lastUpdate: {},
    searchItems: [],
    searchKey: '',
    isSearching: false,
};

export type wsReducerActions = ['/ws/category/set', { [name: string]: Category[] }] |
    ['/ws/category/update', { id: string, categories: Category[] }] |
    ['/ws/categoryActive/update', { id: string, value: string }] |
    ['/ws/current/update', WS] |
    ['/ws/items/set', Item[]] |
    ['/ws/items/update', { storecode: string, categorycode: string, items: Item[]}] |
    ['/ws/searchItems/update', Item[]] |
    ['/ws/searchKey/update', string] |
    ['/ws/isSearching/update', boolean] |
    [ '/ws/list/update', WS[] ] ;

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'category/set': {
            return { ...state, category: action.payload };
        }

        case 'category/update': {
            const { id, categories } = action.payload;
            return Update(state, {
                category: {
                    [id]: { $set: categories },
                },
            });
        }

        case 'categoryActive/update': {
            const { id, value } = action.payload;
            return Update(state, {
                categoryActive: {
                    [id]: { $set: value },
                },
            });
        }

        case 'current/update': {
            return { ...state, currentActive: action.payload };
        }

        case 'items/set': {
            return { ...state, items: action.payload };
        }

        case 'items/update': {
            const { categorycode, items, storecode } = action.payload;
            const categoryItems = Update(state.items[storecode] || {}, {
                [categorycode]: { $set: items },
            });

            const categoryLastUpd = Update(state.lastUpdate[storecode] || {}, {
                [categorycode]: { $set: new Date() },
            });

            return Update(state, {
                items: {
                    [storecode]: { $set: categoryItems },
                },
                lastUpdate: {
                    [storecode]: { $set: categoryLastUpd },
                },
            });
        }

        case 'list/update': {
            return { ...state, list: action.payload };
        }

        case 'searchItems/update': {
            return { ...state, searchItems: action.payload };
        }

        case 'searchKey/update': {
            return { ...state, searchKey: action.payload };
        }

        case 'isSearching/update': {
            return { ...state, isSearching: action.payload };
        }

        default: return state;
    }
}

export default reducer;
