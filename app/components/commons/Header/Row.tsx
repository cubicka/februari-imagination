import React from 'react';
import { StyleSheet, View } from 'react-native';

const Base: React.SFC<{}> = props => {
    return (
        <View style={styles.wrapper}>
            { props.children }
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 56,
    },
});

export default Base;
