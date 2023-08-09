import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Input, Layout, Progress } from '@douyinfe/semi-ui';
import { IconHelpCircle, IconPlus, IconSearch, IconServer, IconSetting } from '@douyinfe/semi-icons';
import { NavLink } from 'react-router-dom';

import { sizeFormat } from '../utils/storage';

import CodeHelp from './info/CodeHelp';
import CodeMatrix from './components/CodeMatrix';
import CodeEdit from './components/CodeEdit';
import CodeSettings from './components/CodeSettings';
import { getAllConfig, toggleSettingDrawerVisible } from './store/codeSetting.store';
import { toggleHelpDrawerVisible } from './store/codeHelp.store';
import { generateTitle, initItemData, toggleEditModalVisible } from './store/codeEdit.store';
import { changeKeyword } from './store/storage.store';

const { Header, Footer, Content } = Layout;

function CodeClipboard() {
    // store
    const { enableTitle, titleFormat, defaultType } = useSelector((s) => s.setting.config);
    const { maxVolumn, used } = useSelector((s) => s.storage.info);
    const { dataSource } = useSelector((s) => s.storage);
    const dispatch = useDispatch();

    return (
        <Layout>
            <Header className="cc-header">
                <Dropdown
                    trigger="hover"
                    position="bottomLeft"
                    render={
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <NavLink to="converter" className="navlink">
                                    Text Converter
                                </NavLink>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    }
                >
                    <span className="logo">Code Clipboard</span>
                </Dropdown>
                <span className="func">
                    {dataSource && dataSource.length ? (
                        <Input
                            suffix={<IconSearch />}
                            onChange={(v) => {
                                dispatch(changeKeyword({ keyword: v }));
                            }}
                            style={{ marginRight: '8px', width: 'fit-content' }}
                        />
                    ) : null}
                    <Button
                        theme="borderless"
                        style={{ marginRight: '8px' }}
                        onClick={() => {
                            dispatch(initItemData({ type: defaultType }));
                            if (enableTitle) {
                                dispatch(generateTitle({ titleFormat }));
                            }
                            dispatch(toggleEditModalVisible());
                        }}
                        icon={<IconPlus />}
                    />
                    <IconServer style={{ marginRight: '8px' }} />
                    <Progress className="progress" size="large" percent={(used / maxVolumn) * 100} />
                    <span className="info">{`${sizeFormat(used)} / ${sizeFormat(maxVolumn)}`}</span>
                    {dataSource && dataSource.length ? (
                        <Button
                            icon={<IconHelpCircle />}
                            onClick={() => {
                                dispatch(toggleHelpDrawerVisible());
                            }}
                            theme="borderless"
                        />
                    ) : null}
                    <Button
                        theme="borderless"
                        onClick={() => {
                            dispatch(toggleSettingDrawerVisible());
                            dispatch(getAllConfig());
                        }}
                        icon={<IconSetting />}
                    />
                </span>
            </Header>
            <Content style={{ padding: '16px' }}>
                <CodeMatrix key="matrix" dataSource={dataSource} />
            </Content>
            <Footer className="cc-footer" />
            <CodeEdit />
            <CodeSettings />
            <CodeHelp />
        </Layout>
    );
}

export default CodeClipboard;
