<!DOCTYPE html>
<html lang="{{ locale }}">
  <head>
    <title>{{ title || 'React Isomorphic Seed' }}</title>
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