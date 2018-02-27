import codePush from 'react-native-code-push';
import { AppRegistry } from 'react-native';
import App from './app/index';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

if (__DEV__) {
    AppRegistry.registerComponent(
        'salvation',
        () => App,
    );
} else {
    AppRegistry.registerComponent(
        'salvation',
        () => codePush({
            installMode: codePush.InstallMode.IMMEDIATE,
            updateDialog: {
                title: 'Ada update.'
            },
            checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
        })(App),
    );
}
