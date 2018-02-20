import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

import { HeaderProps } from './Base';
import Row from './Row';

function Header(props: HeaderProps) {
    return (
        <Row>
            <Text style={styles.text}>{props.text}</Text>
            <View>{props.left}</View>
            <View>{props.right}</View>
        </Row>
    );
}

const styles = StyleSheet.create({
    text: {
        color: colors.whiteText,
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Header;
