const compile = (data) => {
  const { id, title, content, updated, created, locked, language } = data;
  const result = {
    i: id,
    t: title,
    c: content,
    up: updated,
    cr: created,
    l: locked,
    la: language,
  };
  return result;
};

const parse = (data) => {
  if (data) {
    const { i, t, c, up, cr, l, la } = data;
    const result = {
      id: i,
      title: t,
      content: c,
      updated: up,
      created: cr,
      locked: l,
      language: la,
    };
    return result;
  }
};

export { compile, parse };
