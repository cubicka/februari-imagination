import React from 'react';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { Buttons, HeaderButtons } from 'app/components/commons/Buttons';
import HeaderBase from 'app/components/commons/Header';
import { AppPage } from 'app/reducers/app';

const BackWithAction = connect<{}, Buttons>(
    null,
    (dispatch: Dispatch) => ({
        onPress: () => dispatch(['/app/showItemDetail/update', false]),
    }),
)(HeaderButtons.Back);

const Header = (
    <HeaderBase left={<BackWithAction />} text={'Detail Produk'} />
);

export default Header;
