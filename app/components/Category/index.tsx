import React from 'react';

import Spacer from 'app/components/commons/Spacer';

import CategorySelector from './CategorySelector';
import ItemCollections from './ItemCollections';
import Page from './Page';

const Category: React.SFC<{}> = () => {
    return (
        <Page>
            <CategorySelector />
            <Spacer size={10} />
            <ItemCollections />
            <Spacer size={10} />
        </Page>
    );
};

export default Category;
