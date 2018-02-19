import React from 'react';
import { View } from 'react-native';

import { colors } from './styles';

interface PlaceholderProps {
    height: number;
    width: number;
}

const PhotoPlaceholder: React.SFC<PlaceholderProps> = props => {
    const style = {
        backgroundColor: colors.lightBlue,
        height: props.height,
        width: props.width,
    };

    return (
        <View style={style} />
    );
};

export default PhotoPlaceholder;
