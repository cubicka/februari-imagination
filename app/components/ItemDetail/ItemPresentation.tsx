import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PhotoPlaceholder from 'app/components/commons/PhotoPlaceholder';
import { colors } from 'app/components/commons/styles';

const ItemPresentation: React.SFC<{}> = () => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.imageWrapper}>
                <PhotoPlaceholder width={160} height={160} />
            </View>
            <Text style={styles.skuText}>NO SKU: 112314012311</Text>
            <Text style={styles.nameText}>Shampoo PANTENE ProV Sachet 2x5ml Daily Moisture Repair</Text>
            <Text style={styles.categoryText}>Kategori / Sub Kategori</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryText: {
        color: colors.lightGrayText,
        fontSize: 14,
    },
    imageWrapper: {
        alignItems: 'center',
        marginBottom: 30,
    },
    nameText: {
        color: colors.grayText,
        fontSize: 16,
        lineHeight: 28,
        marginBottom: 10,
    },
    skuText: {
        color: colors.grayText,
        fontSize: 14,
        marginBottom: 4,
    },
    wrapper: {
        backgroundColor: colors.white,
        paddingBottom: 10,
        paddingHorizontal: 15,
        paddingTop: 20,
    },
});

export default ItemPresentation;
