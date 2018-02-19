import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import HeaderBase from 'app/components/commons/Header';
import PageWithHeader from 'app/components/commons/PageWithHeader';
import { AppPage } from 'app/reducers/app';

import SearchBar from './SearchBar';

interface BackButtonProps {
    onPress: () => any;
}

const BackButton: React.SFC<BackButtonProps> = props => {
    return <View style={{ padding: 10 }}>
        <Icon name={'arrow-back'} size={25} color={'#fff'} onPress={props.onPress} />
    </View>;
};

const BackButtonConnected = connect<{}, BackButtonProps>(
    null,
    (dispatch: Dispatch) => ({
        onPress: () => dispatch(['/app/currentPage/update', AppPage.Home]),
    }),
)(BackButton);

const Header = (
    <View>
        <HeaderBase
            left={<BackButtonConnected />}
            right={<Icon name={'favorite-border'} size={25} color={'#fff'} />}
            text={'Toko Bagus Sentosa'}
        />
        <SearchBar />
    </View>
);

export default PageWithHeader(Header);
