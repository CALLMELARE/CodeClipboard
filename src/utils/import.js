/* eslint-disable import/prefer-default-export */
const transToFile = async (blob, fileName, fileType = 'text/plain;charset=utf-8') => new window.File([blob], fileName, { type: fileType });

const exportData = (data, filename) => {
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const file = transToFile(blob, filename);
    file.then((res) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(res);
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    });
};

export { exportData };
