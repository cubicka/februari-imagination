import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { CartButtons } from 'app/components/commons/Buttons';
import { colors } from 'app/components/commons/styles';
import { State } from 'app/reducers';
import { AppPage } from 'app/reducers/app';
import { Currency } from 'app/util/formatter';

interface CartState {
    prices: number;
}

interface CartAction {
    goToTransaction: () => any;
}

const Cart: React.SFC<CartState & CartAction> = props => {
    return (
        <TouchableWithoutFeedback onPress={props.goToTransaction}>
            <View style={styles.wrapper}>
                <View style={styles.cart}>
                    <CartButtons.Cart />
                </View>
                <View style={styles.textWrapper}>
                    <Text style={{color: '#666'}}>Total Harga</Text>
                    <Text style={{color: '#666'}}>Rp {Currency(props.prices)}</Text>
                </View>
                <View style={{width: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <CartButtons.Forward />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    cart: {
        backgroundColor: '#56a65d',
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWrapper: {
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    wrapper: {
        borderColor: colors.darkBorder,
        borderTopWidth: 1,
        // position: 'absolute',
        // bottom: 0,
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        // left: 0,
        // right: 0,
    },
});

export default connect<CartState, CartAction, {}, State>(
    state => ({
        prices: state.app.totalPrices,
    }),
    (dispatch: Dispatch) => ({
        goToTransaction: () => dispatch(['/app/currentPage/update', AppPage.Transaction]),
    }),
)(Cart);
