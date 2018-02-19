import React from 'react';
import { ScrollView, View } from 'react-native';

import Page from './Page';

function PageWithHeader(header: JSX.Element) {
    return (props: React.Props<{}>) => (
        <Page>
            { header }
            <View style={{ flex: 1 }}>
                <ScrollView>
                    { props.children }
                </ScrollView>
            </View>
        </Page>
    );
}

export default PageWithHeader;
