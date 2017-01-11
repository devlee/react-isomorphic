import { Transform } from 'stream';

export default class TransformStream extends Transform {
  constructor(options) {
    super();
    this.started = false;
    this.options = options;
  }

  get isHead() {
    return !this.started;
  }

  head(data) {
    this.push(`<!DOCTYPE html>
      <html lang="${this.options.locale}">
        <head>
          <title>${this.options.title || 'React Isomorphic Seed'}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="theme-color" content="#00bcd4">
          <link rel="icon" href="/favicon.png">
          <link rel="apple-touch-icon" href="/favicon.png">
          <link rel="manifest" href="/manifest.json">
          <link rel="canonical" href="https://devlee.io" />
          ${this.options.css('common')}
          ${this.options.css('app')}
        </head>
        <body>
          <div id="app">${data}</div>`);

    this.started = true;
  }

  body(data) {
    this.push(data.toString());
  }

  footer() {
    this.push(`
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(this.options.isomorphicState)};
          </script>
          <noscript>
            devlee.io
          </noscript>
          ${this.options.script('common')}
          ${this.options.script('app')}
        </body>
      </html>`);

    // end the stream
    this.push(null);
  }

  _transform(chunk, encoding, done) {
    const data = chunk.toString();
    if (this.isHead) {
      this.head(data);
    } else {
      this.body(data);
    }
    done();
  }

  _flush(done) {
    this.footer();
    /* eslint-disable no-underscore-dangle */
    this._lastLineData = null;
    done();
  }
}
