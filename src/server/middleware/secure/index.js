const secureMiddleware = async (ctx, next) => {
  if (ctx.secure) {
    await next();
  } else {
    // TODO HTTPS
    // ctx.redirect(`https://${ctx.header.host}${ctx.url}`);
    await next();
  }
};

export default secureMiddleware;
