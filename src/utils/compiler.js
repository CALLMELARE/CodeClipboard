const compile = (data) => {
  const { id, title, content, updated, created, locked, language, type } = data;
  const result = {
    i: id,
    h: title,
    c: content,
    up: updated,
    cr: created,
    l: locked,
    la: language,
    t: type,
  };
  return result;
};

const parse = (data) => {
  if (data) {
    const { i, h, c, up, cr, l, la, t } = data;
    const result = {
      id: i,
      title: h,
      content: c,
      updated: up,
      created: cr,
      locked: l,
      language: la,
      type: t,
    };
    return result;
  }
};

export { compile, parse };
