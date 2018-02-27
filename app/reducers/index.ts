import app, { appReducerActions, AppState } from './app';
import auth, { authReducerActions, AuthState } from './auth';
import { AddChildReducers, BaseReducer } from './middleware';
import ws, { wsReducerActions, WSState } from './ws';

export default AddChildReducers(BaseReducer({}), {
    app, auth, ws,
});

export interface State {
    app: AppState;
    auth: AuthState;
    ws: WSState;
}

export type ReducerAction = appReducerActions | authReducerActions | wsReducerActions;
