import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import App from 'app/components/index';

import store from './store';

interface ProvidersProps {
    store: any;
    children: any;
}

const Providers: React.SFC<ProvidersProps> = () => (
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
);

export default Providers;
