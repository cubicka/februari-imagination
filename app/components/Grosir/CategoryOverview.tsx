import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { colors } from 'app/components/commons/styles';
import { AppPage } from 'app/reducers/app';

import CategoryItem from 'app/components/Category/CategoryItem';

interface CategoryOverviewProps {
    title: string;
}

interface CategoryOverviewActions {
    goToCategory: () => any;
}

const CategoryOverview: React.SFC<CategoryOverviewProps & CategoryOverviewActions> = props => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{props.title}</Text>
                <TouchableWithoutFeedback onPress={props.goToCategory}>
                    <View>
                        <Text style={styles.titleAction}>Lihat Semua</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.itemWrapper}>
                <CategoryItem />
                <CategoryItem />
                <CategoryItem />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
    },
    title: {
        color: colors.grayText,
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
    },
    titleAction: {
        color: colors.blueText,
        fontSize: 12,
        fontWeight: 'bold',
    },
    titleWrapper: {
        alignItems: 'center',
        borderColor: colors.grayBorder,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 40,
        paddingLeft: 20,
        paddingRight: 15,
    },
    wrapper: {
        backgroundColor: colors.white,
        marginTop: 10,
    },
});

export default connect<{}, CategoryOverviewActions>(
    null,
    (dispatch: Dispatch) => ({
        goToCategory: () => dispatch(['/app/currentPage/update', AppPage.Category]),
    }),
)(CategoryOverview);
