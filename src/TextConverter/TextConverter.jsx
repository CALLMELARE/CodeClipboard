import React, { useState } from 'react';
import { Button, Dropdown, Layout, TextArea } from '@douyinfe/semi-ui';
import { IconSetting } from '@douyinfe/semi-icons';
import { NavLink } from 'react-router-dom';

import ResultMatrix from './components/ResultMatrix';

const { Header, Footer, Content } = Layout;

function TextConverter() {
    // 组件内状态
    const [state, setState] = useState({ origin: '' });

    return (
        <Layout>
            <Header className="cc-header">
                <Dropdown
                    trigger="hover"
                    position="bottomLeft"
                    render={
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <NavLink to="/" className="navlink">
                                    Code Clipboard
                                </NavLink>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    }
                >
                    <span className="logo">Text Converter</span>
                </Dropdown>
                <span className="func">
                    <Button theme="borderless" style={{ marginRight: '8px' }} onClick={() => {}} icon={<IconSetting />} />
                </span>
            </Header>
            <Content style={{ padding: '16px' }}>
                <div className="tc-textarea">
                    <TextArea
                        placeholder="请输入…"
                        showClear
                        value={state.origin}
                        onChange={(v) => {
                            setState((e) => ({ ...e, origin: v }));
                        }}
                    />
                </div>
                <div className="tc-result">
                    <ResultMatrix origin={state.origin} />
                </div>
            </Content>
            <Footer className="cc-footer" />
        </Layout>
    );
}

export default TextConverter;
