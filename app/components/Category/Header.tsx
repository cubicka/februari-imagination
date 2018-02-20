import React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { Buttons, HeaderButtons } from 'app/components/commons/Buttons';
import HeaderBase from 'app/components/commons/Header';
import { AppPage } from 'app/reducers/app';

import CategorySlider from './CategorySlider';

const BackWithAction = connect<{}, Buttons>(
    null,
    (dispatch: Dispatch) => ({
        onPress: () => dispatch(['/app/currentPage/update', AppPage.GrosirHome]),
    }),
)(HeaderButtons.Back);

const Header = (
    <HeaderBase left={<BackWithAction />} right={<HeaderButtons.Search />} text={'Dry & Canned Goods'}>
        <CategorySlider />
    </HeaderBase>
);

export default Header;
