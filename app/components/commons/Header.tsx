import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

interface HeaderProps {
    left?: any;
    right?: any;
    text: string;
}

function Header(props: HeaderProps) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{props.text}</Text>
            <View style={styles.left}>{props.left}</View>
            <View style={styles.right}>{props.right}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    left: {
        position: 'absolute',
        left: 10,
    },
    right: {
        position: 'absolute',
        right: 10,
    },
    text: {
        color: colors.whiteText,
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: colors.blue,
        flexDirection: 'row',
        height: 56,
    },
});

export default Header;
