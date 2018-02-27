import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import PhotoPlaceholder from 'app/components/commons/PhotoPlaceholder';
import { colors } from 'app/components/commons/styles';
import { AppPage } from 'app/reducers/app';

export const DummyCategoryItem: React.SFC<{}> = () => (
    <View style={[styles.wrapper]}>
        <View style={[styles.imageWrapper, { paddingVertical: 0}]}>
            <View style={{width: 88, height: 0}} />
        </View>
    </View>
);

interface CategoryItemProps {
    name: string;
}

interface CategoryItemAction {
    onPress?: (...args: any[]) => any;
}

const CategoryItem: React.SFC<CategoryItemAction & CategoryItemProps> = props => {
    const { name } = props;
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[styles.wrapper, styles.wrapperBorder]}>
                <View style={styles.imageWrapper}>
                    <PhotoPlaceholder width={88} height={88} />
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
        flexGrow: 1,
        paddingHorizontal: 5,
    },
    wrapperBorder: {
        borderColor: colors.grayBorder,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        paddingBottom: 18,
    },
});

export default connect<{}, CategoryItemAction>(
    null,
    (dispatch: Dispatch) => ({
        onPress: () => dispatch(['/app/currentPage/update', AppPage.ItemDetail ]),
    }),
)(CategoryItem);
