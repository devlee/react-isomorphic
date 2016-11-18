<!DOCTYPE html>
<html>
  <head>
    <title>{{ title || 'React Isomorphic Seed' }}</title>
    {{ css('common') }}
  </head>
  <body>
    {{ user }}
    {{ script('common') }}
    {{ script('app') }}
  </body>
</html>