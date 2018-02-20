import lodash from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

import CategoryItem, { DummyCategoryItem } from './CategoryItem';

const ItemCollections: React.SFC<{}> = () => {
    const items = lodash.range(20).map(x => {
        return <CategoryItem key={x} />;
    });

    return (
        <View style={styles.wrapper}>
            { items }
            { lodash.range(10).map(x => <DummyCategoryItem key={x} />) }
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default ItemCollections;
