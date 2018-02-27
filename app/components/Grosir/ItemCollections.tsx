import lodash from 'lodash';
import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { colors } from 'app/components/commons/styles';
import { State } from 'app/reducers';
import { Item } from 'app/reducers/ws';

import CategoryItem, { DummyCategoryItem } from './CategoryItem';

interface ItemState {
    items: Item[];
    storecode: string;
    categorycode: string;
}

interface ItemAction {
    getItems: (storecode: string, categorycode: string) => any;
}

class ItemCollections extends React.Component<ItemState & ItemAction> {
    state = { numColumns: 1 };

    getItem(x?: string, y?: string) {
        const { getItems, categorycode, storecode } = this.props;
        getItems(x || storecode, y || categorycode);
    }

    onLayout = () => {
        const {width} = Dimensions.get('window');
        const itemWidth = 120;
        const numColumns = Math.floor(width / itemWidth);
        this.setState({ numColumns });
    }

    componentDidMount() {
        this.getItem();
    }

    componentWillReceiveProps(nextProps: any) {
        if (this.props.storecode !== nextProps.storecode || this.props.categorycode !== nextProps.categorycode) {
            this.getItem(nextProps.storecode, nextProps.categorycode);
        }
    }

    render() {
        const { items = [] } = this.props;
        const itemsWithKey = items.map(item => Object.assign({}, item, {key: item.skucode}));
        return (
            items.length > 0 ?
            <FlatList data={itemsWithKey} style={styles.wrapper} numColumns={3}
                renderItem={({item}) => <CategoryItem key={item.skucode} skucode={item.skucode} item={item}
                name={item.description} />} /> :
            <View style={{ flex: 1, justifyContent: 'center', marginTop: 20 }}>
                <ActivityIndicator size={'large'} color={colors.blue} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingBottom: 50,
        backgroundColor: colors.white,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default connect<ItemState, ItemAction, {}, State>(
    state => {
        const storecode = state.app.storecode;
        const categories = state.ws.category[storecode] || [];
        const categorycode = state.ws.categoryActive[storecode] || (categories[0] ? categories[0].categorycode : '' );

        return {
            categorycode,
            storecode,
            items: (state.ws.items[storecode] || {})[categorycode],
        };
    },
    (dispatch: Dispatch) => ({
        getItems: (storecode: string, categorycode: string) => dispatch(['ws/getItems', storecode, categorycode]),
    }),
)(ItemCollections);
