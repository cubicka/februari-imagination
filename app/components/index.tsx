import React from 'react';
import { connect } from 'react-redux';

import { State } from 'app/reducers';
import { AppPage } from 'app/reducers/app';

import Category from './Category';
import Grosir from './Grosir';
import Home from './Home';
import ItemDetail from './ItemDetail';

interface StateProps {
    currentPage: AppPage;
}

const App: React.SFC<StateProps> = props => {
    switch (props.currentPage) {
        case AppPage.Category: return <Category />;
        case AppPage.GrosirHome: return <Grosir />;
        case AppPage.Home: return <Home />;
        case AppPage.ItemDetail: return <ItemDetail />;
        default: return <Home />;
    }
};

export default connect<StateProps, {}, {}, State>(
    state => ({
        currentPage: state.app.currentPage,
    }),
)(App);
