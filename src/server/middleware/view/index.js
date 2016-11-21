import views from 'co-views';

const viewMiddleware = async (ctx, next) => {
  ctx.render = ctx.render || views('src/server/view', {
    default: 'swig',
    map: {
      html: 'swig'
    },
    locals: ctx.locals || {}
  });

  await next();
};

export default viewMiddleware;
