import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { colors } from 'app/components/commons/styles';
import config from 'app/config';
import { Item } from 'app/reducers/ws';

export const DummyCategoryItem: React.SFC<{}> = () => (
    <View style={[styles.wrapper]}>
        <View style={[styles.imageWrapper, { paddingVertical: 0}]}>
            <View style={{width: 88, height: 0}} />
        </View>
    </View>
);

interface CategoryItemProps {
    name: string;
    skucode: string;
    item: Item;
}

interface CategoryItemAction {
    onPress?: (...args: any[]) => any;
}

const CategoryItem: React.SFC<CategoryItemAction & CategoryItemProps> = props => {
    const { name, skucode } = props;
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[styles.wrapper, styles.wrapperBorder]}>
                <View style={styles.imageWrapper}>
                    <Image source={{uri: `${config.imageUri}/SFA_LITE/api/v1/upload/${skucode}.jpg`}}
                        style={{width: 88, height: 88}} />
                </View>
                <Text style={styles.title}>{name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    imageWrapper: {
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    note: {
        color: colors.almostWhiteText,
        fontSize: 12,
        maxWidth: 100,
    },
    title: {
        color: colors.lightGrayText,
        fontSize: 12,
        marginBottom: 7,
        maxWidth: 100,
    },
    wrapper: {
        width: 120,
        paddingHorizontal: 5,
    },
    wrapperBorder: {
        borderColor: colors.grayBorder,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        paddingBottom: 18,
    },
});

export default connect<{}, CategoryItemAction, CategoryItemProps>(
    null,
    (dispatch: Dispatch, ownProps) => ({
        onPress: () => dispatch(['ws/showDetail', ownProps.item ]),
    }),
)(CategoryItem);
