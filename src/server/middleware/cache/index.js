const cacheMiddleware = async (ctx, next) => {
  console.log('cache middleware');
  await next();
};

export default cacheMiddleware;
