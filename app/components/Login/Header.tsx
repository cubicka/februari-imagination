import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

const Header: React.SFC<{}> = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>DIDI</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: colors.whiteText,
        fontSize: 32,
        textAlign: 'center',
    },
    wrapper: {
        justifyContent: 'center',
        backgroundColor: colors.blue,
        height: '30%',
    },
});

export default Header;
