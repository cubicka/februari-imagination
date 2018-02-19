import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

import GrosirItem from './GrosirItem';

const Button: React.SFC<{}> = () => {
    return (
        <View style={styles.buttonWrapper}>
            <Text style={styles.buttonText}>Lihat Semua</Text>
        </View>
    );
};

const GrosirList: React.SFC<{}> = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>Grosir Langganan</Text>
                <Text style={styles.titleAction}>Tambah Agen</Text>
            </View>
            <View>
                <GrosirItem />
                <GrosirItem />
                <Button />
            </View>
        </View>
    );
};

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

export default GrosirList;
