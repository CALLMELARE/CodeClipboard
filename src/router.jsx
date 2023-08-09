import React from 'react';

import CodeClipboard from './CodeClipboard';
import TextConverter from './TextConverter';

const routes = [
    {
        element: <CodeClipboard />,
        path: '/',
    },
    {
        element: <TextConverter />,
        path: '/converter',
    },
];

export default routes;
