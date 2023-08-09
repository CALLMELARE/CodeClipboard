import { Toast } from '@douyinfe/semi-ui';
import { createSlice } from '@reduxjs/toolkit';

import { setCfg } from '../../utils/setting';
import { getLocalStorage, setLocalStorage } from '../../utils/storage';

export const CodeSettingSlice = createSlice({
    initialState: {
        behavior: {
            settingDrawerVisible: false,
            settingOSVisible: false,
        },
        config: {
            defaultType: getLocalStorage('config')?.defaultType || '',
            enableTitle: getLocalStorage('config')?.enableTitle,
            listType: getLocalStorage('config')?.listType || '',
            titleFormat: getLocalStorage('config')?.titleFormat || '',
        },
        data: {},
    },
    name: 'setting',
    reducers: {
        deleteAllData: () => {
            setLocalStorage('data', '[]');
            Toast.success('数据已清空');
        },
        getAllConfig: (s) => {
            const cfg = getLocalStorage('config');
            const { listType, defaultType, enableTitle, titleFormat } = cfg;
            s.config.listType = listType;
            s.config.defaultType = defaultType;
            s.config.enableTitle = enableTitle;
            s.config.titleFormat = titleFormat;
        },
        setAllConfig: (s, a) => {
            const { listType, defaultType, enableTitle, titleFormat } = a.payload;
            if (listType) {
                s.config.listType = listType;
                setCfg('listType', listType);
            }
            if (defaultType) {
                s.config.defaultType = defaultType;
                setCfg('defaultType', defaultType);
            }
            if (enableTitle !== undefined) {
                s.config.enableTitle = enableTitle;
                setCfg('enableTitle', enableTitle);
            }
            if (titleFormat !== undefined) {
                s.config.titleFormat = titleFormat;
                setCfg('titleFormat', titleFormat);
            }
        },
        toggleSettingDrawerVisible: (s) => {
            const prev = s.behavior.settingDrawerVisible;
            s.behavior.settingDrawerVisible = !prev;
        },
        toggleSettingOSVisible: (s) => {
            const prev = s.behavior.settingOSVisible;
            s.behavior.settingOSVisible = !prev;
        },
    },
});

export const { toggleSettingDrawerVisible, toggleSettingOSVisible, deleteAllData, getAllConfig, setAllConfig } = CodeSettingSlice.actions;

export default CodeSettingSlice.reducer;
