import { CustomAction } from 'app/actions';
import { ReducerAction, State } from 'app/reducers';

export interface SimpleAction {
    type: string;
    [extraProps: string]: any;
}

export type Action = SimpleAction | ReducerAction | CustomAction;

export type ThunkAction<R> = (
    dispatch: Dispatch,
    getState: () => State,
    extraArgument?: any,
) => R;

export type ThunkActionCreator = (...args: any[]) => ThunkAction<any>;
export interface ActionMap {
    [name: string]: ThunkActionCreator;
}

export interface Dispatch {
    <R>(asyncAction: ThunkAction<R>): R;
    <A extends Action>(action: A): A;
}

export type Reducer<S> = (state: S, action: Action) => S;
