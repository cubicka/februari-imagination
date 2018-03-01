import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { colors } from 'app/components/commons/styles';
import CategoryItem from 'app/components/Grosir/CategoryItem';
import { State } from 'app/reducers';
import { Item } from 'app/reducers/ws';

interface ItemState {
    items: Item[];
    isSearching: boolean;
}

class ItemCollections extends React.Component<ItemState> {
    state = { numColumns: 1 };

    onLayout = () => {
        const {width} = Dimensions.get('window');
        const itemWidth = 120;
        const numColumns = Math.floor(width / itemWidth);
        this.setState({ numColumns });
    }

    render() {
        const { isSearching, items = [] } = this.props;
        const itemsWithKey = items.map(item => Object.assign({}, item, {key: item.skucode}));
        return (
            !isSearching ?
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

export default connect<ItemState, {}, {}, State>(
    state => {
        return {
            isSearching: state.ws.isSearching,
            items: state.ws.searchItems,
        };
    },
)(ItemCollections);
