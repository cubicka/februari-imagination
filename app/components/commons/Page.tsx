import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from './styles';

function Page(props: React.Props<{}>) {
    return (
        <View style={styles.wrapper}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.gray,
        flex: 1,
    },
});

export default Page;
