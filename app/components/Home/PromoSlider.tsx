import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

import { colors } from 'app/components/commons/styles';

function PromoSlider() {
    // tslint:disable-next-line
    return <Swiper containerStyle={styles.swiper} style={styles.swiper}>
        <View style={styles.itemWrapper}>
            <View style={styles.item}>
                <Text style={styles.text}>{'Beli 2 Slope A Mild\nBisa Beli 1 Renceng Kopi Kapal Api'}</Text>
            </View>
        </View>
        <View style={styles.itemWrapper}>
            <View style={styles.item}>
                <Text style={styles.text}>{'Beli 3 Slope A Mild\nBisa Beli 1 Renceng Kopi Kapal Api'}</Text>
            </View>
        </View>
        <View style={styles.itemWrapper}>
            <View style={styles.item}>
                <Text style={styles.text}>{'Beli 4 Slope A Mild\nBisa Beli 1 Renceng Kopi Kapal Api'}</Text>
            </View>
        </View>
        <View style={styles.itemWrapper}>
            <View style={styles.item}>
                <Text style={styles.text}>{'Beli 5 Slope A Mild\nBisa Beli 1 Renceng Kopi Kapal Api'}</Text>
            </View>
        </View>
        <View style={styles.itemWrapper}>
            <View style={styles.item}>
                <Text style={styles.text}>{'Beli 1 Slope A Mild\nBisa Beli 1 Renceng Kopi Kapal Api'}</Text>
            </View>
        </View>
    </Swiper>;
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#3d9fea',
        justifyContent: 'center',
        flex: 1,
        paddingBottom: 20,
    },
    itemWrapper: {
        flex: 1,
        margin: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    swiper: {
        flex: 0,
        height: 128,
    },
    text: {
        color: colors.whiteText,
        lineHeight: 24,
        textAlign: 'center',
    },
});

export default PromoSlider;
