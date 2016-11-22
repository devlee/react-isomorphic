import { setCookie, getCookie } from '../../../universal/cookie';

import domain from '../../../universal/domain';

const maxAge = 7 * 24 * 60 * 60 * 1000;

const cookieParam = { maxAge: maxAge, httpOnly: false, path: '/', domain: domain };

const cookieMiddleware = async (ctx, next) => {
  const streamFlag = getCookie('streamFlag', ctx);

  let newStreamFlag;

  if (typeof streamFlag !== 'undefined') {
    newStreamFlag = streamFlag;
  } else {
    newStreamFlag = String(Math.random() > 0.5);
  }

  setCookie('streamFlag', newStreamFlag, cookieParam, ctx);

  await next();
};

export default cookieMiddleware;
