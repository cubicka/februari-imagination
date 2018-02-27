import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Spacer from 'app/components/commons/Spacer';

import Header from './Header';
import Input from './Input';

const Login: React.SFC<{}> = () => {
    return (
        <View style={styles.wrapper}>
                <Header />
                <Spacer size={48} />
                <Input />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: { flex: 1 },
});

export default Login;
