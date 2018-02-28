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
import Loading from './Loading';
import Login from './Login';
import Transaction from './Transaction';

interface StateProps {
    currentPage: AppPage;
    hasInitialized: boolean;
    usercode?: string;
    showItemDetail: boolean;
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
        const { currentPage, hasInitialized, usercode, showItemDetail } = this.props;

        if (!hasInitialized) return <Loading />;
        if (!usercode) return <Login />;

        return <View style={{flex: 1}}>
            <View style={{flex: 1}}>
            { currentPage === AppPage.GrosirHome && <Grosir /> }
            { currentPage === AppPage.Transaction && <Transaction /> }
            { currentPage !== AppPage.GrosirHome && currentPage !== AppPage.Transaction && <Home /> }
            </View>
            {
                showItemDetail &&
                <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                    <ItemDetail />
                </View>
            }
        </View>;
    }
}

export default connect<StateProps, ActionProps, {}, State>(
    state => ({
        currentPage: state.app.currentPage,
        hasInitialized: state.app.hasInitialized,
        usercode: state.app.usercode,
        showItemDetail: state.app.showItemDetail,
    }),
    (dispatch: Dispatch) => ({
        init: () => dispatch(['app/init']),
    }),
)(App);
