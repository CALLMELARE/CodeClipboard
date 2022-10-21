const compile = (data) => {
  const { title, content, updated, created, locked, language } = data;
  const result = {
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
  const { t, c, up, cr, l, la } = data;
  const result = {
    title: t,
    content: c,
    updated: up,
    created: cr,
    locked: l,
    language: la,
  };
  return result;
};

export { compile, parse };
