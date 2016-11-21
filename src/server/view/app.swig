<!DOCTYPE html>
<html>
  <head>
    <title>{{ title || 'React Isomorphic Seed' }}</title>
    {{ css('common') }}
  </head>
  <body>
    <div id="app">{{ isomorphicHtml|raw }}</div>
    {{ script('common') }}
    {{ script('app') }}
  </body>
</html>