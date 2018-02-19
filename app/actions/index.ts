import { ActionMap } from 'app/actionTypes';
import { appActions } from './app';

const actions: { [name: string]: ActionMap } = {
    app: appActions,
};

export default actions;
