const errorMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // TODO 错误日志收集系统
    console.error(err);
    ctx.body = {
      message: err.message
    };
    ctx.status = err.status || 500;
  }
};

export default errorMiddleware;
