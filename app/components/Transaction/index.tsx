import React from 'react';
import { DatePickerAndroid, Image, ScrollView, StyleSheet, Text, TimePickerAndroid, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { ItemButtons } from 'app/components/commons/Buttons';
import { BlueWideButton, GreenWideButton } from 'app/components/commons/Buttons/wideButtons';
import Spacer from 'app/components/commons/Spacer';
import { colors } from 'app/components/commons/styles';
import config from 'app/config';
import { State } from 'app/reducers';
import { CartItem } from 'app/reducers/app';
import { Item } from 'app/reducers/ws';
import { Currency, Waktu } from 'app/util/formatter';

import Header from './Header';

interface ItemProps {
    item: Item;
    qty: number;

    decrease: () => any;
    increase: () => any;
}

const ItemItem: React.SFC<ItemProps> = props => {
    return (
        <View style={{flexDirection: 'row', padding: 15}}>
            <Image source={{uri: `${config.imageUri}/SFA_LITE/api/v1/upload/${props.item.skucode}.jpg`}}
                style={{width: 60, height: 60}} />
            <View style={{flex: 2, marginLeft: 10}}>
                <Text style={{color: colors.darkGrayText}}>{props.item.description}</Text>
                <Text style={{color: colors.amberText}}>Rp {Currency(parseFloat(props.item.price))}</Text>
            </View>
            <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ItemButtons.Minus onPress={props.decrease} />
                <Text style={{fontSize: 18}}>{props.qty}</Text>
                <ItemButtons.Plus onPress={props.increase} />
            </View>
        </View>
    );
};

interface TransactionState {
    cart: CartItem[];
    totalPrice: number;
}

interface TransactionAction {
    decrease: (item: Item) => any;
    increase: (item: Item) => any;
    pesan: (d: Date) => any;
}

class Transaction extends React.Component<TransactionState & TransactionAction> {
    state = {
        pickup: (new Date()).setDate((new Date()).getDate() + 1),
    };

    changePickupDate = () => {
        try {
            return DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(this.state.pickup),
            })
            .then(({action, year, month, day}) => {
                if (action !== DatePickerAndroid.dismissedAction && day && (month || month === 0) &&
                    year) {
                    const anotherDate = new Date(this.state.pickup);
                    anotherDate.setDate(day);
                    anotherDate.setMonth(month);
                    anotherDate.setFullYear(year);
                    this.setState({
                        pickup: anotherDate,
                    });
                }
            });
        } catch ({code, message}) {
            // console.warn('Cannot open date picker', message);
        }
    }

    changePickupTime = () => {
        try {
            return TimePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                hour: (new Date(this.state.pickup)).getHours(),
                minute: (new Date(this.state.pickup)).getMinutes(),
                is24Hour: true,
            })
            .then(({action, hour, minute}) => {
                if (action !== DatePickerAndroid.dismissedAction && (hour || hour === 0) &&
                    (minute || minute === 0)) {
                    const anotherDate = new Date(this.state.pickup);
                    anotherDate.setHours(hour);
                    anotherDate.setMinutes(minute);
                    this.setState({
                        pickup: anotherDate,
                    });
                }
            });
        } catch ({code, message}) {
            // console.warn('Cannot open date picker', message);
        }
    }

    render() {
        const cartRendered = this.props.cart.map(cartItem => {
            return <ItemItem key={cartItem.item.skucode} item={cartItem.item} qty={cartItem.qty}
                decrease={() => this.props.decrease(cartItem.item)}
                increase={() => this.props.increase(cartItem.item)} />;
        });

        return (
            <View style={styles.wrapper}>
                { Header }
                <ScrollView>
                    <View style={{backgroundColor: colors.gray}}>
                        <View style={{padding: 15}}><Text style={{fontSize: 14, color: colors.blue}}>
                            Produk</Text></View>
                        { cartRendered }
                    </View>
                    <Spacer size={15} />
                    <View style={{padding: 15, backgroundColor: '#fff'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: '#212121', fontSize: 16, flex: 1}}>Waktu Pengambilan</Text>
                            <Text style={{color: '#212121', fontSize: 16, flex: 1, textAlign: 'right'}}>
                                {Waktu(new Date(this.state.pickup))}</Text>
                        </View>
                        <Spacer size={15} />
                        <View style={{flexDirection: 'row'}}>
                            <BlueWideButton onPress={this.changePickupDate}>Ganti Hari</BlueWideButton>
                            <Spacer size={15} />
                            <BlueWideButton onPress={this.changePickupTime}>Ganti Jam</BlueWideButton>
                        </View>
                        <Spacer size={25} />
                        <Text style={{color: '#212121', fontSize: 16}}>Total Belanja</Text>
                        <Text style={{color: colors.amberText, fontSize: 16}}>
                            Rp {Currency(this.props.totalPrice)}</Text>
                    </View>
                    <View style={{padding: 15}}>
                        <GreenWideButton onPress={() =>
                            this.props.pesan(new Date(this.state.pickup))}>Pesan</GreenWideButton>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { paddingBottom: 50 },
});

export default connect<TransactionState, TransactionAction, {}, State>(
    state => ({
        cart: state.app.cart,
        totalPrice: state.app.totalPrices,
    }),
    (dispatch: Dispatch) => ({
        decrease: (item: Item) => dispatch(['/app/cart/substract', item]),
        increase: (item: Item) => dispatch(['/app/cart/add', item]),
        pesan: (time: Date) => dispatch(['ws/pesan', time]),
    }),
)(Transaction);
