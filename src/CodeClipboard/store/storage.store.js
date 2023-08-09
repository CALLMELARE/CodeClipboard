import { Toast } from '@douyinfe/semi-ui';
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { exportData } from '../../utils/import';
import { getLocalStorage, getLocalStorageVolume, removeLocalStorage, setLocalStorage } from '../../utils/storage';

export const StorageSlice = createSlice({
    initialState: {
        behavior: {
            isTesting: false,
        },
        dataSource: getLocalStorage('data') || [],
        info: {
            maxVolumn: 5 * 1024 * 1024,
            used: getLocalStorageVolume() || 0,
        },
        search: {
            keyword: '',
            searchResults: [],
            serachPanelVisible: false,
        },
    },
    name: 'storage',
    reducers: {
        changeKeyword: (s, a) => {
            s.search.keyword = a.payload.keyword;
            const result = s.dataSource.filter(
                (item) =>
                    item.h.toLocaleUpperCase().includes(s.search.keyword.toLocaleUpperCase()) ||
                    item.c.toLocaleUpperCase().includes(s.search.keyword.toLocaleUpperCase()),
            );
            console.log(result);
            s.search.searchResults = result;
        },
        exportCodeData: (s) => {
            const time = dayjs(new Date()).format('YYYYMMDDHHmmss');
            const filename = `CodeClipboard_${time}.json`;
            exportData(localStorage.getItem('data'), filename);
            Toast.success({
                content: `已导出${s.dataSource.length}条数据`,
            });
        },
        importCodeData: (s, a) => {
            const fr = new FileReader();
            const file = a.payload;
            fr.readAsText(file.fileInstance);
            fr.onload = () => {
                try {
                    const content = JSON.parse(fr.result);
                    const raw = getLocalStorage('data');
                    const idList = [];
                    raw.forEach((item) => {
                        idList.push(item.i);
                    });
                    console.log(idList);
                    const tempList = [];

                    content.forEach((item) => {
                        if (idList.indexOf(item.i) !== -1) {
                            // exist
                        } else {
                            tempList.push(item);
                        }
                    });
                    setLocalStorage('data', JSON.stringify([...raw, ...tempList]));
                    Toast.success(`成功导入${tempList.length}条数据`);
                    updateDataSource();
                    updateUsedVolumn();
                } catch (err) {
                    Toast.error(`发生错误:${err}`);
                }
            };
        },
        toggleSearchPanelVisible: (s) => {
            s.search.serachPanelVisible = !s.search.serachPanelVisible;
        },
        updateDataSource: (s) => {
            const rawData = getLocalStorage('data');
            s.dataSource = rawData;
        },
        updateMaxVolumn: (s) => {
            s.behavior.isTesting = true;
            let str = '0123456789';
            const t = setInterval(() => {
                const a = () => {
                    try {
                        let n = '';
                        while (n.length < 1024) {
                            n += '0123456789';
                        }
                        str += n;
                        window.localStorage.test = str;
                    } catch {
                        s.info.maxVolumn = str.length + str.info.used;
                        removeLocalStorage('test');
                        Toast.success('测试完毕');
                        s.behavior.isTesting = false;
                        clearInterval(t);
                    }
                };
                a();
            }, 0.1);
        },
        updateUsedVolumn: (s) => {
            const used = getLocalStorageVolume();
            s.info.used = used;
        },
    },
});

export const {
    updateDataSource,
    updateUsedVolumn,
    toggleFirstLoad,
    updateMaxVolumn,
    toggleSearchPanelVisible,
    changeKeyword,
    exportCodeData,
    importCodeData,
} = StorageSlice.actions;

export default StorageSlice.reducer;
