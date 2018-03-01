import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

import Row from './Row';

export interface HeaderProps {
    left?: any;
    right?: any;
    text: any;
}

const Header: React.SFC<HeaderProps> = props => {
    return (
        <View style={{backgroundColor: colors.blue}}>
        <Row>
            <View style={styles.text}>{props.text}</View>
            <View style={styles.left}>{props.left}</View>
            <View style={styles.right}>{props.right}</View>
        </Row>
        </View>
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
        flex: 1,
        paddingLeft: 30,
    },
});

export default Header;
