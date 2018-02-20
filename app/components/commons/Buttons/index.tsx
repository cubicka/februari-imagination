import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from 'app/components/commons/styles';

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
    },
});

export interface Buttons {
    onPress?: (...args: any[]) => any;
}

function Base(name: string, size: number, color: string) {
    return (props: Buttons) => (
        <View style={styles.wrapper}>
            <Icon name={name} size={size} color={color} onPress={props.onPress} />
        </View>
    );
}

export const CategoryButtons = {
    Next: Base('navigate-next', 25, colors.almostWhiteText),
};

const headerButtonsColor = '#fff';
export const HeaderButtons = {
    Back: Base('arrow-back', 25, headerButtonsColor),
    Favorite: Base('favorite-border', 25, headerButtonsColor),
    Menu: Base('menu', 35, headerButtonsColor),
    Search: Base('search', 25, headerButtonsColor),
};

export const ItemButtons = {
    Minus: Base('remove', 25, colors.blue),
    Plus: Base('add', 25, colors.blue),
};
