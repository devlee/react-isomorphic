function encode(value) {
  return encodeURIComponent(value);
}

function decode(value) {
  return decodeURIComponent(value);
}

function parse(str) {
  const obj = {};
  const pairs = str.split(/ *; */);
  let pair;

  if (String(pairs[0]) === '') {
    return obj;
  }

  for (let i = 0; i < pairs.length; i += 1) {
    pair = pairs[i].split('=');
    obj[decode(pair[0])] = decode(pair[1]);
  }

  return obj;
}

export function setCookie(name, value, option, ctx) {
  // server
  if (ctx) {
    return ctx.cookies.set(name, value, option);
  }

  // client
  const options = option || {};
  let str = `${encode(name)}=${encode(value)}`;

  if (value === null) {
    options.maxAge = -1;
  }

  if (options.maxAge) {
    options.expires = new Date(+(new Date()) + options.maxAge);
  }

  if (options.path) {
    str += `; path=${options.path}`;
  }

  if (options.domain) {
    str += `; domain=${options.domain}`;
  }

  if (options.expires) {
    str += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.secure) {
    str += '; secure';
  }

  document.cookie = str;
}

export function getCookie(name, ctx) {
  // server
  if (ctx) {
    if (!name) {
      return ctx.cookies;
    }

    return ctx.cookies.get(name);
  }

  // client
  if (!name) {
    return parse(document.cookie);
  }

  return parse(document.cookie)[name];
}

export function clearCookie(name, option, ctx) {
  // server
  if (ctx) {
    return ctx.cookies.set(name, null, option);
  }

  // client
  setCookie(name, null, option);
}
