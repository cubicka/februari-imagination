import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// import PhotoPlaceholder from 'app/components/commons/PhotoPlaceholder';
import { colors } from 'app/components/commons/styles';
import config from 'app/config';
import { Item } from 'app/reducers/ws';

const ItemPresentation: React.SFC<{ item?: Item }> = props => {
    const { item } = props;
    return (
        <View style={styles.wrapper}>
            <View style={styles.imageWrapper}>
            <Image source={{uri: `${config.imageUri}/SFA_LITE/api/v1/upload/${item && item.skucode}.jpg`}}
                        style={{width: 160, height: 160}} />
            </View>
            <Text style={styles.nameText}>{item ? item.description : ''}</Text>
            <Text style={styles.categoryText}>{item ? item.category : ''} / {item ? item.subcategory : ''}</Text>
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
