import * as fs from 'fs/promises';
import { watch as fsWatch } from 'fs';
import { marpCli } from '@marp-team/marp-cli';
import bs from 'browser-sync';
import { debounce } from 'throttle-debounce';
import fromMarkdown from 'mdast-util-from-markdown';
import toMarkdown from 'mdast-util-to-markdown';
import { toImageDataURL } from 'mdast-qrcode';
var syntax = require('micromark-extension-frontmatter');
var frontmatter = require('mdast-util-frontmatter');

const slideDeckPath = './slides/slide-deck.md';
const slideDeckQrCodePath = './slides/tmp-slide-deck-qrcode.md';
const reload = bs.reload;
bs({
  port: 8080,
  server: {
    baseDir: './dist',
    routes: {
      '/images': './slides/images/'
    }
  },
  notify: true,
  open: false
});

const handleChanged = debounce(1000, (filename: string) => {
  console.log(filename);
  fs.readFile(slideDeckPath)
    .then((data) =>
      toImageDataURL(
        fromMarkdown(data, {
          extensions: [syntax(['yaml', 'toml'])],
          mdastExtensions: [frontmatter.fromMarkdown(['yaml', 'toml'])]
        })
      )
    )
    .then((tree) =>
      fs.writeFile(
        slideDeckQrCodePath,
        toMarkdown(tree, {
          bullet: '-',
          rule: '-',
          extensions: [frontmatter.toMarkdown(['yaml', 'toml'])]
        })
      )
    )
    .then(() => marpCli([slideDeckQrCodePath, '-o', './dist/index.html']))
    .then((exitStatus) => {
      if (exitStatus > 0) {
        console.error(`Failure (Exit status: ${exitStatus})`);
      } else {
        console.log('Success');
        reload('*.html');
      }
    })
    .catch(console.error);
});

fsWatch(slideDeckPath, { persistent: false }, (_eventType, filename) => {
  if (filename) {
    handleChanged(filename);
  }
});

handleChanged('*** start');
