import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { WSPhotoPlaceHolder } from 'app/components/commons/PhotoPlaceholder';
import { colors } from 'app/components/commons/styles';
import { AppPage } from 'app/reducers/app';
import { WS } from 'app/reducers/ws';

interface ActionProps {
    select: (ws: WS) => any;
}

interface GrosirItemProps {
    address: string;
    name: string;
    ws: WS;
}

const GrosirItem: React.SFC<GrosirItemProps & ActionProps> = props => {
    const { address, name, select, ws } = props;
    return (
        <TouchableWithoutFeedback onPress={() => select(ws)}>
            <View style={styles.itemWrapper}>
                <WSPhotoPlaceHolder height={66} width={66} />
                <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={styles.itemTitle}>{name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="room" size={20} color={colors.darkGrayText} />
                        <Text style={styles.itemAddress}>{address}</Text>
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
        select: (ws: WS) => {
            dispatch(['/app/storecode/update', ws.storecode]);
            dispatch(['ws/select', ws]);
        },
    }),
)(GrosirItem);
