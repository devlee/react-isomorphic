import React from 'react';

import { renderToString } from 'react-dom/server';

import { RouterContext, match } from 'react-router';

import { Provider } from 'react-intl-redux';

import configureStore from '../../../client/store';

import route from '../../../client/route';

import reducer from '../../../client/reducer';

import { intlPack } from '../../../universal/intl';

function getTasks(renderProps, store) {
  let tasks = [];

  Object.keys(renderProps.components).map(component => {
    if (component && component.WrappedComponent && component.WrappedComponent.fetchData) {
      const tempTasks = component.WrappedComponent.fetchData(store.getState(),
        store.dispatch, renderProps.params);
      if (Array.isArray(tempTasks)) {
        tasks = tasks.concat(tempTasks);
      } else if (tempTasks.then) {
        tasks.push(tempTasks);
      }
    }

    return component;
  });

  return tasks;
}

export default router => {
  router.get('/*', async ctx => {
    let matchError;
    let matchRedirect;
    let matchProps;
    let isomorphicHtml;

    const locale = ctx.getLocaleFromHeader() || 'zh';

    const store = configureStore(reducer, {
      intl: intlPack[locale]
    });

    const state = store.getState();

    await match({
      routes: route(state),
      location: ctx.url
    }, (err, redirectLocation, renderProps) => {
      matchError = err;
      matchRedirect = redirectLocation;
      matchProps = renderProps;
    });

    if (matchProps) {
      const tasks = getTasks(matchProps, store);

      await Promise.all(tasks);

      isomorphicHtml = renderToString(
        <Provider store={store}>
          <RouterContext {...matchProps} />
        </Provider>
      );
    }

    if (matchError) {
      throw matchError;
    } else if (matchRedirect) {
      ctx.redirect(matchRedirect.pathname + matchRedirect.search);
    } else if (isomorphicHtml) {
      ctx.body = await ctx.render('app', {
        isomorphicHtml,
        isomorphicState: state,
        locale: 'en'
      });
    } else {
      console.error('there was no route found matching the given location');
      ctx.redirect('/');
    }
  });
};
