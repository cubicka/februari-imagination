import React from 'react';
import { Image, View } from 'react-native';

import { colors } from './styles';

// tslint:disable:no-var-requires
const wsImage = require('../../../resources/ws.png');
// tslint:enable:no-var-requires

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

export const WSPhotoPlaceHolder: React.SFC<PlaceholderProps> = props => {
    const style = {
        height: props.height,
        width: props.width,
    };

    return (
        <Image source={wsImage} style={style} />
    );
};

export default PhotoPlaceholder;
