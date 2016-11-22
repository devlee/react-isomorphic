export default router => {
  router.get('/test', ctx => {
    ctx.body = 'test';
  });
};
