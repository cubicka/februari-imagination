import app, { AppState } from './app';
import { AddChildReducers, BaseReducer } from './middleware';

export default AddChildReducers(BaseReducer({}), { app });

export interface State {
    app: AppState;
}
