import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { colors } from 'app/components/commons/styles';

interface CategoryItemProps {
    isActive?: boolean;
    text: string;
}

const CategoryItem: React.SFC<CategoryItemProps> = props => {
    return (
        <TouchableWithoutFeedback>
            <View style={styles.itemWrapper}>
                <Text style={[styles.itemText, { color: props.isActive ? colors.white : colors.partialWhiteText }]}>
                    { props.text }
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const CategorySlider: React.SFC<{}> = () => {
    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.scrollWrapper} horizontal={true}>
                <CategoryItem text={'Type something'} isActive={true} />
                <CategoryItem text={'Type something'} />
                <CategoryItem text={'Type something'} />
                <CategoryItem text={'Type something'} />
                <CategoryItem text={'Type something'} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    itemText: {

    },
    itemWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 14,
    },
    scrollWrapper: {
        flexDirection: 'row',
    },
    wrapper: {
    },
});

export default CategorySlider;
