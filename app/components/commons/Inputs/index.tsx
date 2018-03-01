import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

interface LoginInputProps {
    placeholder: string;
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (nextValue: string) => any;
}

export const LoginInput: React.SFC<LoginInputProps> = props => {
    return <View style={styles.wrapper}>
        <TextInput style={styles.login} underlineColorAndroid={'transparent'} {...props} />
    </View>;
};

export const SearchInput: React.SFC<LoginInputProps> = props => {
    return <View style={{ flex: 1 }}>
        <TextInput style={styles.login2} underlineColorAndroid={'transparent'} {...props} />
    </View>;
};

const styles = StyleSheet.create({
    login: {
        color: colors.lightGrayText,
        fontSize: 14,
        paddingLeft: 15,
    },
    login2: {
        color: colors.white,
        fontSize: 14,
    },
    wrapper: {
        borderColor: colors.lightGrayBorder,
        borderRadius: 6,
        borderWidth: 1,
    },
});
