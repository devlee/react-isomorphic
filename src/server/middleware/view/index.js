import views from 'co-views';

import stream from './stream';

const viewMiddleware = async (ctx, next) => {
  ctx.render = ctx.render || views('src/server/view', {
    default: 'swig',
    map: {
      html: 'swig'
    },
    locals: ctx.locals || {}
  });

  ctx.Stream = stream;

  await next();
};

export default viewMiddleware;
