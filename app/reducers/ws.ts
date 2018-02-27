import { AnyAction } from 'redux';

export interface WS {
    address: string;
    name: string;
    storecode: number;
}

export interface WSState {
    currentActive: WS;
    list: WS[];
}

const initialState: WSState = {
    currentActive: {
        name: '', storecode: -1, address: '',
    },
    list: [],
};

export type wsReducerActions = [ '/ws/list/update', WS[] ] |
    ['/ws/current/update', WS];

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'current/update': {
            return { ...state, currentActive: action.payload };
        }

        case 'list/update': {
            return { ...state, list: action.payload };
        }

        default: return state;
    }
}

export default reducer;
