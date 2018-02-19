import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HeaderBase from 'app/components/commons/Header';
import PageWithHeader from 'app/components/commons/PageWithHeader';

const Header = (
    <HeaderBase
        left={<Icon name="menu" size={35} color="#fff" />}
        text={'DIDI'}
    />
);

export default PageWithHeader(Header);
