import { ActionMap, ThunkAction } from 'app/actionTypes';

export type updateAppState = ['app/updateAppState', string];
export function updateAppState(state: string): ThunkAction<void> {
    return dispatch => {
        dispatch(['/app/update', state]);
    };
}

export type appActions = updateAppState;
export const appActions: ActionMap = {
    updateAppState,
};
