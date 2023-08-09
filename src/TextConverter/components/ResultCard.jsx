/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { Notification } from '@douyinfe/semi-ui';
import copy from 'copy-to-clipboard';

function ResultCard({ label, text }) {
    const copyToClipboard = (data) => {
        if (data) {
            copy(data);
            const thumbnail = data.length > 30 ? `${data.substring(0, 27)}...` : data;
            Notification.success({
                content: thumbnail,
                duration: 2,
                title: '复制成功',
            });
        } else {
            Notification.error({
                duration: 2,
                title: '复制失败',
            });
        }
    };

    return (
        <div className="tc-result-card" onClick={copyToClipboard.bind(null, text)}>
            <div className="tc-result-card-label">{label}</div>
            <div className="tc-result-card-text">{text}</div>
        </div>
    );
}

export default ResultCard;
