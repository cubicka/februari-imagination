import { ActionMap } from 'app/actionTypes';

import app, { appActions } from './app';
import auth, { authAction } from './auth';
import ws, { wsAction } from './ws';

const actions: { [name: string]: ActionMap } = {
    app,
    auth,
    ws,
};

export default actions;
export type CustomAction = appActions | authAction | wsAction;
