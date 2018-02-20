import React from 'react';
import { View } from 'react-native';

interface Props {
    size: number;
}

const Spacer: React.SFC<Props> = props => {
    const { size } = props;
    return <View style={{ width: size, height: size }} />;
};

export default Spacer;
