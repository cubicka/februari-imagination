import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { ItemButtons } from 'app/components/commons/Buttons';
import { colors } from 'app/components/commons/styles';
import { Currency } from 'app/util/formatter';

interface UnitCounterProps {
    name: string;
    price: number;
}

class UnitCounter extends React.Component<UnitCounterProps> {
    state = {
        startCounting: false,
        count: 0,
    };

    decrease = () => {
        this.setState({ count: Math.max(0, this.state.count - 1) });
    }

    increase = () => {
        this.setState({ count: this.state.count + 1 });
    }

    startCounting = () => {
        this.setState({ startCounting: true });
    }

    render() {
        const { name, price} = this.props;
        const { count, startCounting } = this.state;

        return (
            <View style={styles.wrapper}>
                <View style={styles.leftWrapper}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.priceText}>Rp {Currency(price)}</Text>
                </View>
                {
                    !startCounting &&
                    <View style={styles.countWrapper}>
                        <TouchableWithoutFeedback onPress={this.startCounting}>
                            <View style={styles.buyTextWrapper}>
                                <Text style={styles.buyText}>Beli</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                }
                {
                    startCounting &&
                    <View style={styles.countWrapper}>
                        <ItemButtons.Plus onPress={this.increase} />
                        <Text style={styles.countText}>{count}</Text>
                        <ItemButtons.Minus onPress={this.decrease} />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buyText: {
        color: colors.white,
        fontSize: 18,
        height: 60,
        lineHeight: 60,
        textAlign: 'center',
    },
    buyTextWrapper: {
        backgroundColor: colors.green,
        flex: 1,
    },
    countText: {
        color: colors.grayText,
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
    },
    countWrapper: {
        alignItems: 'center',
        borderLeftColor: colors.grayBorder,
        borderLeftWidth: 1,
        flexDirection: 'row',
        flexGrow: 14,
        height: 60,
        width: 0,
    },
    leftWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        flexGrow: 19,
        height: 60,
        width: 0,
    },
    nameText: {
        color: colors.grayText,
        flex: 1,
        fontSize: 14,
        paddingLeft: 14,
    },
    priceText: {
        color: colors.amberText,
        flex: 1,
        fontSize: 14,
    },
    wrapper: {
        alignItems: 'center',
        borderColor: colors.grayBorder,
        borderRadius: 6,
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
});

export default UnitCounter;
