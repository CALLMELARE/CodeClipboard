import React from 'react';
import { Provider } from 'react-redux';

import init from '../utils/init';

import CodeClipboard from './CodeClipboard';
import store from './store';

init();

function Home() {
    return (
        <Provider store={store}>
            <CodeClipboard />
        </Provider>
    );
}

export default Home;
