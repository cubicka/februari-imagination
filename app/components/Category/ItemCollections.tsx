import lodash from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from 'app/components/commons/styles';
import { State } from 'app/reducers';
import { Item } from 'app/reducers/ws';

import CategoryItem, { DummyCategoryItem } from './CategoryItem';

interface ItemState {
    items: Item[];
}

interface ItemAction {
    getItems: (storecode: string, categorycode: string) => any;
}

interface ItemProps {
    storecode: string;
    categorycode: string;
}

class ItemCollections extends React.Component<ItemState & ItemAction & ItemProps> {
    getItem() {
        const { getItems, categorycode, storecode } = this.props;
        getItems(storecode, categorycode);
    }

    componentDidMount() {
        this.getItem();
    }

    componentWillReceiveProps(nextProps: any) {
        if (this.props.storecode !== nextProps.storecode || this.props.categorycode !== nextProps.categorycode) {
            this.getItem();
        }
    }

    render() {
        const { items } = this.props;
        const itemsRendered = items.map(item => {
            return <CategoryItem key={item.skucode} name={item.description} />;
        });

        return (
            <View style={styles.wrapper}>
                { itemsRendered }
                { lodash.range(10).map(x => <DummyCategoryItem key={x} />) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default ItemCollections;
