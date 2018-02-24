import codePush from 'react-native-code-push';
import { AppRegistry } from 'react-native';
import App from './app/index';
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
