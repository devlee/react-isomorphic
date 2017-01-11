import React from 'react';

import { Readable } from 'stream';

import { renderToString } from 'react-dom/server';

import { RouterContext, match } from 'react-router';

import { Provider } from 'react-intl-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from '../../../client/store';

import route from '../../../client/route';

import reducer from '../../../client/reducer';

import { intlPack } from '../../../universal/intl';

let injectTapEventPluginFlag = false;

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

    let locale = ctx.getLocaleFromHeader() || 'en';

    if (!intlPack[locale]) {
      locale = 'en';
    }

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

    if (matchError) {
      throw matchError;
    } else if (matchRedirect) {
      ctx.redirect(matchRedirect.pathname + matchRedirect.search);
    } else if (matchProps) {
      if (!injectTapEventPluginFlag) {
        injectTapEventPlugin();
        injectTapEventPluginFlag = true;
      }

      const tasks = getTasks(matchProps, store);

      await Promise.all(tasks);

      isomorphicHtml = renderToString(
        <Provider store={store}>
          <RouterContext {...matchProps} />
        </Provider>
      );

      const stream = new Readable();
      /* eslint-disable no-underscore-dangle */
      stream._read = () => {};
      stream.push(isomorphicHtml);
      stream.push(null);
      ctx.type = 'html';
      ctx.body = stream.pipe(new ctx.Stream({
        locale,
        ...ctx.locals,
        isomorphicState: store.getState()
      }));
    } else {
      console.error('there was no route found matching the given location');
      ctx.redirect('/');
      ctx.status = 301;
      ctx.body = 'Redirecting to home page';
    }
  });
};
