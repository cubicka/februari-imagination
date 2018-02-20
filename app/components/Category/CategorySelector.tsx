import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { CategoryButtons } from 'app/components/commons/Buttons';
import { colors } from 'app/components/commons/styles';

const CategorySelector: React.SFC<{}> = () => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Ganti Kategori</Text>
                <CategoryButtons.Next />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    title: {
        color: colors.lightGrayText,
        flex: 1,
        fontSize: 16,
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
});

export default CategorySelector;
