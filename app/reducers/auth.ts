import { AnyAction } from 'redux';

export interface AuthState {
    isLoggingIn: boolean;
}

const initialState = {
    isLoggingIn: false,
};

export type authReducerActions = [ '/auth/isLoggingIn/update', boolean ];

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'isLoggingIn/update': {
            return { ...state, isLoggingIn: action.payload };
        }

        default: return state;
    }
}

export default reducer;
