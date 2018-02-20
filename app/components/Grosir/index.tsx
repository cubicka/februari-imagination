import React from 'react';

import CategoryOverview from './CategoryOverview';
import Page from './Page';

const Grosir: React.SFC<{}> = () => {
    return (
        <Page>
            <CategoryOverview title={'Item Terbaru'} />
            <CategoryOverview title={'Item Terlaris'} />
        </Page>
    );
};

export default Grosir;
