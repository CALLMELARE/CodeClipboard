const compile = (data) => {
    const { id, title, content, updated, created, locked, language, type } = data;
    const result = {
        c: content,
        cr: created,
        h: title,
        i: id,
        l: locked,
        la: language,
        t: type,
        up: updated,
    };
    return result;
};

const parse = (data) => {
    if (data) {
        const { i, h, c, up, cr, l, la, t } = data;
        const result = {
            content: c,
            created: cr,
            id: i,
            language: la,
            locked: l,
            title: h,
            type: t,
            updated: up,
        };
        return result;
    }
};

export { compile, parse };
