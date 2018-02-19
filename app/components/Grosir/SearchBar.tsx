import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from 'app/components/commons/styles';

const SearchBar: React.SFC<{}> = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.boxWrapper}>
                <Icon name={'search'} size={25} color={'#cad2f7'} style={styles.boxIcon} />
                <Text style={styles.boxText}>{'Apa yang anda cari?'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boxIcon: {
        marginHorizontal: 10,
    },
    boxText: {
        color: colors.whiteText,
        fontSize: 14,
        opacity: 0.7,
    },
    boxWrapper: {
        alignItems: 'center',
        backgroundColor: colors.darkBlue,
        borderRadius: 6,
        flexDirection: 'row',
        height: 38,
        marginBottom: 9,
        marginHorizontal: 17,
    },
    wrapper: {
        backgroundColor: colors.blue,
    },
});

export default SearchBar;
