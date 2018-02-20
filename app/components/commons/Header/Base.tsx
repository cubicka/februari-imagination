import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

import Row from './Row';

export interface HeaderProps {
    left?: any;
    right?: any;
    text: string;
}

const Header: React.SFC<HeaderProps> = props => {
    return (
        <Row>
            <Text style={styles.text}>{props.text}</Text>
            <View style={styles.left}>{props.left}</View>
            <View style={styles.right}>{props.right}</View>
        </Row>
    );
};

const styles = StyleSheet.create({
    left: {
        position: 'absolute',
        left: 0,
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
});

export default Header;
