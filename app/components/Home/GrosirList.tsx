import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import Spacer from 'app/components/commons/Spacer';
import { colors } from 'app/components/commons/styles';
import { State } from 'app/reducers';
import { Transaction } from 'app/reducers/app';
import { WS } from 'app/reducers/ws';
import { Currency, Waktu } from 'app/util/formatter';

import GrosirItem from './GrosirItem';

const TransactionItem: React.SFC<{ item: Transaction }> = props => {
    const { item } = props;

    return (
        <View style={{flexDirection: 'row', padding: 10, borderWidth: 1, borderRadius: 10,
            borderColor: colors.grayBorder, marginVertical: 5}}>
            <View style={{flex: 1}}>
                <Text style={{ fontSize: 14, color: '#4e4e4e' }}>{item.storename}</Text>
                <Text style={{ fontSize: 12, color: '#ff7129' }}>Rp {Currency(item.totalPrice)}</Text>
                <Text style={{ fontSize: 12, color: '#4e4e4e' }}>Diambil {Waktu(item.picktime)}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 12, color: '#188266' }}>{item.status}</Text>
                <Text style={{ fontSize: 12, color: '#4e4e4e' }}>{item.itemsCount} barang</Text>
            </View>
        </View>
    );
};

interface GrosirListState {
    ws: WS[];
    transactions: Transaction[];
}

interface GrosirListAction {
    getList: () => any;
    getTransactions: () => any;
}

class GrosirList extends React.Component<GrosirListState & GrosirListAction> {
    componentDidMount() {
        this.props.getList();
        this.props.getTransactions();
    }

    render() {
        const { transactions, ws } = this.props;
        const wsRendered = ws.map(w => (
            <GrosirItem key={w.storecode} name={w.name} address={w.address} ws={w} />
        ));

        const transactionsRendered = transactions.map(t => (
            <TransactionItem key={t.orderid} item={t} />
        ));

        return (
            <View style={styles.wrapper}>
                <ScrollView>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Grosir Langganan</Text>
                </View>
                <View>
                    { wsRendered }
                </View>
                <Spacer size={20} />
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Transaksi terbaru</Text>
                </View>
                {
                    transactions.length > 0 ?
                    <View>
                    { transactionsRendered }
                    </View> :
                    <View style={{ justifyContent: 'center', padding: 30 }}>
                        <ActivityIndicator size={'large'} color={colors.blue} />
                    </View>
                }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonText: {
        color: colors.blueText,
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonWrapper: {
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        flexDirection: 'row',
        height: 37,
    },
    title: {
        color: colors.grayText,
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
    },
    titleAction: {
        color: colors.greenText,
        fontSize: 12,
        fontWeight: 'bold',
    },
    titleRow: {
        flexDirection: 'row',
    },
    wrapper: {
        backgroundColor: colors.white,
        flex: 1,
        marginBottom: 15,
        padding: 15,
    },
});

export default connect<GrosirListState, GrosirListAction, {}, State>(
    state => ({
        transactions: state.app.transactions,
        ws: state.ws.list,
    }),
    (dispatch: Dispatch) => ({
        getList: () => dispatch(['ws/getList']),
        getTransactions: () => dispatch(['ws/getTransactions']),
    }),
)(GrosirList);
