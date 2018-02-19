import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import PhotoPlaceholder from 'app/components/commons/PhotoPlaceholder';
import { colors } from 'app/components/commons/styles';
import { AppPage } from 'app/reducers/app';

interface ActionProps {
    changePage: () => any;
}

const GrosirItem: React.SFC<ActionProps> = props => {
    return (
        <TouchableWithoutFeedback onPress={props.changePage}>
            <View style={styles.itemWrapper}>
                <PhotoPlaceholder height={66} width={66} />
                <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={styles.itemTitle}>Toko Bagus Sentosa</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="room" size={20} color={colors.darkGrayText} />
                        <Text style={styles.itemAddress}>Jalan Kebon Kawung No. 2</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    itemAddress: {
        color: colors.lightGrayText,
        fontSize: 14,
    },
    itemTitle: {
        color: colors.darkGrayText,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    itemWrapper: {
        borderColor: colors.darkBorder,
        borderRadius: 6,
        borderWidth: 1,
        flexDirection: 'row',
        marginVertical: 10,
        paddingLeft: 9,
        paddingVertical: 15,
    },
});

export default connect<{}, ActionProps>(
    null,
    (dispatch: Dispatch) => ({
        changePage: () => dispatch(['/app/currentPage/update', AppPage.GrosirHome]),
    }),
)(GrosirItem);
