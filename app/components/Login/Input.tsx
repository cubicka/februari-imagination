import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import { Dispatch } from 'app/actionTypes';
import { BlueWideButton } from 'app/components/commons/Buttons/wideButtons';
import { LoginInput } from 'app/components/commons/Inputs';
import Spacer from 'app/components/commons/Spacer';
import { State } from 'app/reducers';

interface StateProps {
    isLoggingIn: boolean;
}

interface ActionProps {
    login: (username: string, password: string) => any;
}

interface InputState {
    password: string;
    username: string;
}

class Input extends React.Component<StateProps & ActionProps, InputState> {
    state = {
        password: '',
        username: '',
    };

    onChangeText = (label: 'username' | 'password') => (value: string) => {
        if (label === 'username') this.setState({ username: value });
        if (label === 'password') this.setState({ password: value });
    }

    handleLogin = () => {
        const { login } = this.props;
        const { password, username } = this.state;

        login(username, password);
    }

    render() {
        const { isLoggingIn } = this.props;
        const { password, username } = this.state;
        return (
            <View style={styles.wrapper}>
                <LoginInput placeholder={'Username'} value={username} onChangeText={this.onChangeText('username')} />
                <Spacer size={20} />
                <LoginInput
                    placeholder={'Password'} value={password} onChangeText={this.onChangeText('password')}
                    secureTextEntry={true} />
                <Spacer size={20} />
                <BlueWideButton isLoading={isLoggingIn} onPress={this.handleLogin}>Masuk</BlueWideButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
    },
});

export default connect<StateProps, ActionProps, {}, State>(
    state => ({
        isLoggingIn: state.auth.isLoggingIn,
    }),
    (dispatch: Dispatch) => ({
        login: (username: string, password: string) => dispatch(['auth/login', username, password]),
    }),
)(Input);
