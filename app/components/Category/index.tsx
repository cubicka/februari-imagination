import React from 'react';

import Spacer from 'app/components/commons/Spacer';

import CategorySelector from './CategorySelector';
import ItemCollections from './ItemCollections';
import Page from './Page';

class Category extends React.Component<{}> {
    render() {
        return (
            <Page>
                <CategorySelector />
                <Spacer size={10} />
                <Spacer size={10} />
            </Page>
        );
    }
}

export default Category;
