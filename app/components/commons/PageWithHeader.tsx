import React from 'react';
import { ScrollView, View } from 'react-native';

import Page from './Page';

function PageWithHeader(header: JSX.Element) {
    return (props: React.Props<{}>) => (
        <Page>
            { header }
            <View style={{ flex: 1 }}>
                { props.children }
            </View>
        </Page>
    );
}

export default PageWithHeader;
