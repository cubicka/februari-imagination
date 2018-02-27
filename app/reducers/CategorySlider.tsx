import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { colors } from 'app/components/commons/styles';
import { State } from 'app/reducers';
import { Category } from 'app/reducers/ws';

interface CategoryItemProps {
    isActive?: boolean;
    text: string;

    onPress: () => any;
}

const CategoryItem: React.SFC<CategoryItemProps> = props => {
    const { isActive, onPress, text } = props;
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.itemWrapper, isActive ? { backgroundColor: colors.darkBlue} : {} ]}>
                <Text style={[styles.itemText, { color: isActive ? colors.white : colors.partialWhiteText }]}>
                    { text }
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

interface CategorySliderState {
    categories: Category[];
    activeIdx: string;
    storecode: string;
}

interface CategorySliderAction {
    changeCategory: (storecode: string, idx: string) => any;
}

const CategorySlider: React.SFC<CategorySliderState & CategorySliderAction> = props => {
    const { activeIdx, categories = [], changeCategory, storecode } = props;
    const anyActive = categories.find(c => c.categorycode === activeIdx);
    const categoriesRendered = categories.map((c, idx) => (
        <CategoryItem key={c.categorycode} isActive={anyActive ? c.categorycode === activeIdx : idx === 0}
            text={c.categoryname}
            onPress={() => changeCategory(storecode, c.categorycode)} />
    ));

    return (
        <View style={styles.wrapper}>
        {
            categories && categories.length > 0 &&
            <ScrollView style={styles.scrollWrapper} horizontal={true}>
            {
                categoriesRendered
            }
            </ScrollView>
        }
        {
            (!categories || categories.length === 0) &&
            <View style={styles.loadingWrapper}>
                <ActivityIndicator size={'small'} color={'#fff'} />
            </View>
        }
        </View>
    );
};

const styles = StyleSheet.create({
    itemText: {

    },
    itemWrapper: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 14,
    },
    loadingWrapper: {
        paddingVertical: 14,
    },
    scrollWrapper: {
        flexDirection: 'row',
    },
    wrapper: {
        paddingBottom: 4,
    },
});

export default connect<CategorySliderState, CategorySliderAction, {}, State>(
    state => {
        const storecode = state.app.storecode;
        const categories = state.ws.category[storecode];

        return {
            activeIdx: state.ws.categoryActive[storecode],
            categories,
            storecode,
        };
    },
    (dispatch: Dispatch) => ({
        changeCategory:
            (storecode: string, idx: string) =>
            dispatch(['/ws/categoryActive/update', { id: storecode, value: idx}]),
    }),
)(CategorySlider);
