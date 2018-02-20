import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PhotoPlaceholder from 'app/components/commons/PhotoPlaceholder';
import { colors } from 'app/components/commons/styles';

const CategoryItem: React.SFC<{}> = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.imageWrapper}>
                <PhotoPlaceholder width={88} height={88} />
            </View>
            <Text style={styles.title}>Quaker Instant Oatmeal</Text>
            <Text style={styles.note}>3 Unit Varian</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    imageWrapper: {
        alignItems: 'center',
        padding: 15,
    },
    note: {
        color: colors.almostWhiteText,
        fontSize: 12,
    },
    title: {
        color: colors.lightGrayText,
        fontSize: 12,
        marginBottom: 7,
    },
    wrapper: {
        flex: 1,
        paddingBottom: 18,
        paddingHorizontal: 8,
    },
});

export default CategoryItem;
