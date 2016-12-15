<!DOCTYPE html>
<html lang="{{ locale }}">
  <head>
    <title>{{ title || 'React Isomorphic Seed' }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#00bcd4">
    <link rel="icon" href="/favicon.png">
    <link rel="apple-touch-icon" href="/favicon.png">
    <link rel="manifest" href="/manifest.json">
    {{ css('common') }}
    {{ css('app') }}
  </head>
  <body>
    <div id="app">{{ isomorphicHtml|raw }}</div>
    <script>
      window.__INITIAL_STATE__ = {{ isomorphicState|json|raw }};
    </script>
    {{ script('common') }}
    {{ script('app') }}
  </body>
</html>