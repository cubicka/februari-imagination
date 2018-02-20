import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

import HeaderBase, { HeaderProps } from './Base';

const Header: React.SFC<HeaderProps> = props => {
    return (
        <View style={styles.wrapper}>
            <HeaderBase left={props.left} right={props.right} text={props.text} />
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.blue,
    },
});

export default Header;
