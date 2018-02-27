import React from 'react';
import RN, { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Spacer from 'app/components/commons/Spacer';
import { colors } from 'app/components/commons/styles';
import wrap from 'app/util/wrapper';

interface Props extends React.Props<null> {
    backgroundColor: string;
    borderRadius?: number;
    isLoading?: boolean;
    textColor: any;
    onPress: () => void;
}

const WideButton: React.SFC<Props> = props => {
    const { backgroundColor, borderRadius = 4, isLoading = false, textColor, onPress } = props;
    const viewStyles = [
        styles.button,
        { backgroundColor, borderRadius, flexDirection: 'row', justifyContent: 'center' } as RN.ViewStyle,
    ];

    return <TouchableHighlight onPress={isLoading ? () => null : onPress} style={{ borderRadius }}>
        <View style={viewStyles}>
            {
                isLoading &&
                <ActivityIndicator size={'small'} color={textColor} />
            }
            {
                isLoading &&
                <Spacer size={10} />
            }
            <Text style={[ styles.label, { color: textColor } ]}>{props.children}</Text>
        </View>
    </TouchableHighlight>;
};

const styles = StyleSheet.create({
    button: {
        padding: 16,
    } as RN.ViewStyle,
    label: {
        color: 'white',
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
    },
});

export const BlueWideButton = wrap(WideButton, { backgroundColor: colors.blue, textColor: colors.white });
