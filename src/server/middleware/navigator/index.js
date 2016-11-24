const navigatorMiddleware = async (ctx, next) => {
  global.navigator = global.navigator || {};

  global.navigator.userAgent = ctx.req.headers['user-agent'] || 'all';

  await next();
};

export default navigatorMiddleware;
