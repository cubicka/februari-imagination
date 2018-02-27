import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { State } from 'app/reducers';
import { Item } from 'app/reducers/ws';

import ItemPresentation from './ItemPresentation';
import Page from './Page';
import UnitCounter from './UnitCounter';

interface ItemState {
    item: Item;
    cartQty: number;
}

const ItemDetail: React.SFC<ItemState> = props => {
    return (
        <Page>
            <ItemPresentation item={props.item} />
            <View style={{ backgroundColor: '#fff', padding: 15 }}>
                <UnitCounter name={'Pcs'} price={parseFloat(props.item ? props.item.price : '0')}
                    item={props.item} qty={props.cartQty} />
            </View>
        </Page>
    );
};

export default connect<ItemState, {}, {}, State>(
    state => {
        const cartItem = state.app.cart.find(c => c.item.skucode === state.app.itemDetail.skucode);

        return {
            item: state.app.itemDetail,
            cartQty: cartItem ? cartItem.qty : 0,
        };
    },
)(ItemDetail);
