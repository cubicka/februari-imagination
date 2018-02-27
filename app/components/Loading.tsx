import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

const Loading: React.SFC<{}> = () => {
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator size={'large'} color={colors.white} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.blue,
        flex: 1,
        justifyContent: 'center',
    },
});

export default Loading;
