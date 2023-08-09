import { getLocalStorage, setLocalStorage } from './storage';

const init = () => {
    const cfg = getLocalStorage('config');
    const data = getLocalStorage('data');
    if (!cfg || JSON.stringify(cfg) === '{}') {
        const cfg = {
            defaultType: 'text',
            enableTitle: true,
            listType: 'triple',
            mode: 'light',
            titleFormat: '[CodeSnippet]YYYYMMDD_HH:mm:ss',
        };
        setLocalStorage('config', cfg);
    }
    if (!data || JSON.stringify(data) === '[]') {
        setLocalStorage('data', []);
    }
};

export default init;
