import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import Cart from 'app/components/Cart';
import { State } from 'app/reducers';
import { WS } from 'app/reducers/ws';

import ItemCollections from './ItemCollections';
import Page from './Page';

interface GrosirState {
    ws?: WS;
    cart: any[];
}

interface GrosirAction {
    getCategories: () => any;
}

// const Grosir: React.SFC<GrosirState> = props => {
class Grosir extends React.Component<GrosirState & GrosirAction> {
    componentDidMount() {
        const { getCategories } = this.props;
        getCategories();
    }

    render() {
        const { cart, ws } = this.props;
        const Header = Page(ws ? ws.name : '');

        return (
            <Header>
                <View style={{flex: 1}}>
                    <ScrollView>
                        <ItemCollections />
                    </ScrollView>
                </View>
                {
                    cart.length > 0 &&
                    <View style={{backgroundColor: 'red', position: 'absolute', bottom: 0, left: 0, right: 0}}>
                        <Cart />
                    </View>
                }
            </Header>
        );
    }
}

export default connect<GrosirState, GrosirAction, {}, State>(
    state => {
        return {
            ws: state.ws.list.find(ws => ws.storecode === state.app.storecode),
            cart: state.app.cart,
        };
    },
    (dispatch: Dispatch) => ({
        getCategories: () => dispatch(['ws/getCategory']),
    }),
)(Grosir);
