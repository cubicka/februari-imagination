import React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { Buttons, HeaderButtons } from 'app/components/commons/Buttons';
import HeaderBase from 'app/components/commons/Header/BaseView';
import { AppPage } from 'app/reducers/app';

import SearchBar from './SearchBar';

const BackWithAction = connect<{}, Buttons>(
    null,
    (dispatch: Dispatch) => ({
        onPress: () => dispatch(['/app/currentPage/update', AppPage.GrosirHome]),
    }),
)(HeaderButtons.Back);

const Header = (
    <HeaderBase
        left={<BackWithAction />}
        text={<SearchBar />} >
    </HeaderBase>
);

export default Header;
