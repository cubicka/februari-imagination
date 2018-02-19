import React from 'react';

import GrosirList from './GrosirList';
import Page from './Page';
import PromoSlider from './PromoSlider';

function Home() {
    return (
        <Page>
            <PromoSlider />
            <GrosirList />
        </Page>
    );
}

export default Home;
