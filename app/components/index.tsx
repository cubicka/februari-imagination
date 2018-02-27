import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { State } from 'app/reducers';
import { AppPage } from 'app/reducers/app';

import Category from './Category';
import Grosir from './Grosir';
import Home from './Home';
import ItemDetail from './ItemDetail';
import Login from './Login';

interface StateProps {
    currentPage: AppPage;
    hasInitialized: boolean;
    usercode?: string;
}

interface ActionProps {
    init: () => any;
}

// const App: React.SFC<StateProps> = props => {
class App extends React.Component<StateProps & ActionProps> {
    componentDidMount() {
        const { hasInitialized, init } = this.props;
        if (!hasInitialized) init();
    }

    render() {
        const { currentPage, hasInitialized, usercode } = this.props;

        if (!hasInitialized) return <View />;
        if (!usercode) return <Login />;

        switch (currentPage) {
            case AppPage.Category: return <Category />;
            case AppPage.GrosirHome: return <Grosir />;
            case AppPage.Home: return <Home />;
            case AppPage.ItemDetail: return <ItemDetail />;
            default: return <Home />;
        }
    }
}

export default connect<StateProps, ActionProps, {}, State>(
    state => ({
        currentPage: state.app.currentPage,
        hasInitialized: state.app.hasInitialized,
        usercode: state.app.usercode,
    }),
    (dispatch: Dispatch) => ({
        init: () => dispatch(['app/init']),
    }),
)(App);
