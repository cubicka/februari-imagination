import { AnyAction } from 'redux';

export enum AppPage {
    Category = 'Category',
    Home = 'Home',
    GrosirHome = 'GrosirHome',
    ItemDetail = 'ItemDetail',
}

export interface AppState {
    currentPage: AppPage;
    hasInitialized: boolean;
    usercode?: string;
}

const initialState: AppState = {
    currentPage: AppPage.Home,
    hasInitialized: false,
};

export type appReducerActions = [ '/app/currentPage/update', AppPage ] |
    ['/app/initialize', { usercode: string }] |
    ['/app/usercode/update', string];

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'currentPage/update': {
            return { ...state, currentPage: action.payload };
        }

        case 'initialize': {
            const { usercode } = action.payload;
            return { ...state, hasInitialized: true, usercode };
        }

        case 'usercode/update': {
            return { ...state, usercode: action.payload };
        }

        default: return state;
    }
}

export default reducer;
