import React from 'react';
import { Provider } from 'react-redux';

import TextConverter from './TextConverter';
import store from './store';

function Home() {
    return (
        <Provider store={store}>
            <TextConverter />
        </Provider>
    );
}

export default Home;
