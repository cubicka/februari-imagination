import React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { Buttons, HeaderButtons } from 'app/components/commons/Buttons';
import HeaderBase from 'app/components/commons/Header';
import { AppPage } from 'app/reducers/app';

import SearchBar from './SearchBar';

const BackWithAction = connect<{}, Buttons>(
    null,
    (dispatch: Dispatch) => ({
        onPress: () => dispatch(['/app/currentPage/update', AppPage.Home]),
    }),
)(HeaderButtons.Back);

const Header = (name: string) => (
    <HeaderBase
            left={<BackWithAction />}
            right={<HeaderButtons.Favorite />}
            text={name} >
        <SearchBar />
    </HeaderBase>
);

export default Header;
