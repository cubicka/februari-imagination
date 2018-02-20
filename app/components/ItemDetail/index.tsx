import React from 'react';
import { View } from 'react-native';

import ItemPresentation from './ItemPresentation';
import Page from './Page';
import UnitCounter from './UnitCounter';

const ItemDetail: React.SFC<{}> = () => {
    return (
        <Page>
            <ItemPresentation />
            <View style={{ backgroundColor: '#fff', padding: 15 }}>
                <UnitCounter name={'KALENG'} price={34000} />
                <UnitCounter name={'LUSIN'} price={34000} />
                <UnitCounter name={'KARDUS'} price={34000} />
            </View>
        </Page>
    );
};

export default ItemDetail;
