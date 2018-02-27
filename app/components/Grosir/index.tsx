import React from 'react';
import { connect } from 'react-redux';

import { State } from 'app/reducers';
import { WS } from 'app/reducers/ws';

import CategoryOverview from './CategoryOverview';
import Page from './Page';

interface GrosirState {
    ws: WS;
}

const Grosir: React.SFC<GrosirState> = props => {
    const { ws } = props;
    const Header = Page(ws.name);
    return (
        <Header>
            <CategoryOverview title={'Item Terbaru'} />
            <CategoryOverview title={'Item Terlaris'} />
        </Header>
    );
};

export default connect<GrosirState, {}, {}, State>(
    state => ({
        ws: state.ws.currentActive,
    }),
)(Grosir);
