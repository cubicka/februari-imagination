import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { SearchInput } from 'app/components/commons/Inputs';
import { colors } from 'app/components/commons/styles';
import { State } from 'app/reducers';

interface SearchBarState {
    searchKey: string;
}

interface SearchBarAction {
    search: (key: string) => any;
}

const SearchBar: React.SFC<SearchBarState & SearchBarAction> = props => {
    return (
        <View style={styles.boxWrapper}>
            <Icon name={'search'} size={25} color={'#cad2f7'} style={styles.boxIcon} />
            <SearchInput placeholder={'Apa yang anda cari?'} onChangeText={e => props.search(e)}
                value={props.searchKey} />
        </View>
    );
};

const styles = StyleSheet.create({
    boxIcon: {
        marginHorizontal: 10,
    },
    boxText: {
        color: colors.whiteText,
        fontSize: 14,
        opacity: 0.7,
    },
    boxWrapper: {
        alignItems: 'center',
        backgroundColor: colors.darkBlue,
        borderRadius: 6,
        flexDirection: 'row',
        height: 38,
        justifyContent: 'center',
        marginBottom: 9,
        marginHorizontal: 17,
    },
});

export default connect<SearchBarState, SearchBarAction, {}, State>(
    state => ({
        searchKey: state.ws.searchKey,
    }),
    (dispatch: Dispatch) => ({
        search: (key: string) => dispatch(['ws/searchItem', key]),
    }),
)(SearchBar);
