import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { colors } from 'app/components/commons/styles';
import { State } from 'app/reducers';
import { WS } from 'app/reducers/ws';

import GrosirItem from './GrosirItem';

interface GrosirListState {
    ws: WS[];
}

interface GrosirListAction {
    getList: () => any;
}

// const Button: React.SFC<{}> = () => {
//     return (
//         <View style={styles.buttonWrapper}>
//             <Text style={styles.buttonText}>Lihat Semua</Text>
//         </View>
//     );
// };

class GrosirList extends React.Component<GrosirListState & GrosirListAction> {
    componentDidMount() {
        this.props.getList();
    }

    render() {
        const { ws } = this.props;
        const wsRendered = ws.map(w => (
            <GrosirItem key={w.storecode} name={w.name} address={w.address} ws={w} />
        ));

        return (
            <View style={styles.wrapper}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Grosir Langganan</Text>
                    {/* <Text style={styles.titleAction}>Tambah Agen</Text> */}
                </View>
                <View>
                    { wsRendered }
                    {/* <Button /> */}
                </View>
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
        ws: state.ws.list,
    }),
    (dispatch: Dispatch) => ({
        getList: () => dispatch(['ws/getList']),
    }),
)(GrosirList);
