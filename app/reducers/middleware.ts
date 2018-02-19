import Update from 'immutability-helper';

import Action from 'app/actions';
import { Dispatch, Reducer } from 'app/actionTypes';
import { IsArray } from 'app/util/obj';

function ArrToAction(events: string, ...args: any[]) {
    const splitted = events.split('/');
    const module = splitted[0];
    const child = splitted.slice(1).join('/');

    if (module === '') {
        return (dispatch: Dispatch) => (dispatch({type: child, payload: args[0]}));
    }

    if (module in Action) {
        const fn = Action[module][child];
        if (typeof fn === 'function') return fn(...args);
    }

    return () => null;
}

export const ActionMiddleware = (store: any) => (next: any) => (action: any) => {
    if (!IsArray(action)) {
        return next(action);
    }

    if (IsArray(action[0])) {
        return action.forEach((act: any) => {
            const fn = ArrToAction(act[0], ...act.slice(1));
            return fn(store.dispatch, store.getState);
        });
    }

    return ArrToAction(action[0], ...action.slice(1))(store.dispatch, store.getState);
};

export function AddChildReducers(mainReducer = (x: any, y: any) => (x), childReducers: any) {
    const emptyAction = { type: '' };
    const reducerKeys = Object.keys(childReducers);
    const initialState = reducerKeys.reduce((updatedState, reducerName) => {
        const reducer = childReducers[reducerName];
        updatedState[reducerName] = reducer(undefined, emptyAction);
        return updatedState;
    }, {...mainReducer(undefined, emptyAction)});

    return (state: any = initialState, action: any) => {
        const [actionTypeNamespace, ...trimmedActionType] = action.type.split('/');
        if (reducerKeys.indexOf(actionTypeNamespace) === -1) return mainReducer(state, action);

        return Update(state, {
            [actionTypeNamespace]: {
                $apply: (childState: any) => (childReducers[actionTypeNamespace](childState, {
                    ...action,
                    type: trimmedActionType.join('/'),
                })),
            },
        });
    };
}

export function BaseReducer(reducers: {[name: string]: Reducer<any>} = {}) {
    const reducerKeys = Object.keys(reducers);
    return (state: {[name: string]: Reducer<any>} = {}, action: any) => {
        let hasChanged = false;
        const nextState = reducerKeys.reduce((updatedState, reducerName) => {
            const reducer = reducers[reducerName];
            updatedState[reducerName] = reducer(state[reducerName], action);
            hasChanged = hasChanged || updatedState[reducerName] !== state[reducerName];
            return updatedState;
        }, {...state});

        return hasChanged ? nextState : state;
    };
}
