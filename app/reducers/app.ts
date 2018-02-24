import { AnyAction } from 'redux';

export enum AppPage {
    Category = 'Category',
    Home = 'Home',
    GrosirHome = 'GrosirHome',
    ItemDetail = 'ItemDetail',
}

export interface AppState {
    currentPage: AppPage;
}

const initialState: AppState = {
    currentPage: AppPage.GrosirHome,
};

export type appReducerActions = [ '/app/currentPage/update', AppPage ];

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'currentPage/update': {
            return { ...state, currentPage: action.payload };
        }

        default: return state;
    }
}

export default reducer;
