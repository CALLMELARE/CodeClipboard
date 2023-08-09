/* eslint-disable react/prop-types */
import React from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

function CodeHighlight({ language, content }) {
    return (
        content && (
            <pre
                style={{ fontFamily: 'JetBrainsMono', fontSize: '14px' }}
                dangerouslySetInnerHTML={{
                    __html: hljs.highlight(content, { language: language || 'text' }).value,
                }}
            />
        )
    );
}

export default CodeHighlight;
