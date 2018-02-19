// import { appActions } from 'app/actions/app';
import { State } from 'app/reducers';
import { appReducerActions } from 'app/reducers/app';

export interface SimpleAction {
    type: string;
    [extraProps: string]: any;
}

// type ArrayAction = appActions;
type ReducerAction = appReducerActions;
// export type Action = SimpleAction | ArrayAction | ReducerAction;
export type Action = SimpleAction | ReducerAction;

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
