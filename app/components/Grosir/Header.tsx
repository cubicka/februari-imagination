import React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { Buttons, HeaderButtons } from 'app/components/commons/Buttons';
import HeaderBase from 'app/components/commons/Header';
import { AppPage } from 'app/reducers/app';

import CategorySlider from './CategorySlider';
// import SearchBar from './SearchBar';

const BackWithAction = connect<{}, Buttons>(
    null,
    (dispatch: Dispatch) => ({
        onPress: () => dispatch(['/app/currentPage/update', AppPage.Home]),
    }),
)(HeaderButtons.Back);

const SearchAction = connect<{}, Buttons>(
    null,
    (dispatch: Dispatch) => ({
        onPress: () => dispatch(['/app/currentPage/update', AppPage.Search]),
    }),
)(HeaderButtons.Search);

const Header = (name: string) => (
    <HeaderBase
        left={<BackWithAction />}
        right={<SearchAction />}
        text={name} >
        <CategorySlider />
    </HeaderBase>
);

export default Header;
