/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Notification, Typography } from '@douyinfe/semi-ui';
import { IconCode, IconCopy, IconText } from '@douyinfe/semi-icons';
import copy from 'copy-to-clipboard';

import { initItemData, toggleEditModalVisible } from '../store/codeEdit.store';
import { highlightKeyword } from '../../utils/highlighter';
import Icon from '../../icons';
import { languages } from '../../utils/constant';

import CodeHighlight from './CodeHighlight';

function CodeCard({ id, title, content, updated, created, locked, language, type }) {
    const { Title } = Typography;

    // store
    const { keyword } = useSelector((s) => s.storage.search);
    const dispatch = useDispatch();

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
        <div className="cc-card">
            <div className="header">
                <span
                    className="title"
                    onClick={() => {
                        dispatch(
                            initItemData({
                                content,
                                created,
                                id,
                                language,
                                locked,
                                title,
                                type,
                                updated,
                            }),
                        );
                        dispatch(toggleEditModalVisible());
                    }}
                >
                    <Title
                        heading={5}
                        ellipsis={{ showTooltip: true }}
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            lineHeight: '32px',
                        }}
                    >
                        {type === 'text' ? <IconText style={{ marginRight: '8px' }} /> : null}
                        {type === 'code' && !language ? <IconCode style={{ marginRight: '8px' }} /> : null}
                        {type === 'code' && language ? (
                            <Icon src={languages.filter((value) => value.label === language)[0].icon} style={{ marginRight: '8px' }} />
                        ) : null}
                        {keyword && title.toLocaleUpperCase().includes(keyword.toLocaleUpperCase()) ? (
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: highlightKeyword(title, keyword),
                                }}
                            />
                        ) : (
                            title
                        )}
                    </Title>
                </span>
                <span className="func">
                    <Button theme="borderless" icon={<IconCopy style={{ color: '#a9a9a9' }} />} onClick={copyToClipboard(content)} />
                </span>
            </div>
            <div className="content">
                {type === 'code' && <CodeHighlight language={language} content={content} />}
                {type === 'text' && (
                    <pre
                        style={{
                            fontFamily: 'JetBrainsMono',
                            fontSize: '14px',
                        }}
                    >
                        {content}
                    </pre>
                )}
            </div>
            <div className="footer">{type === 'code' ? language : '文本'}</div>
        </div>
    );
}

export default CodeCard;
