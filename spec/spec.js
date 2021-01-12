// Jasmine Specification Cases

// Imports
const { serverListening } = require('server-listening');
const { JSDOM } =       require('jsdom');

// Setup
const url = 'https://pretty-print-json.js.org/';
const jsdomOptions = { resources: 'usable', runScripts: 'dangerously' };
let dom;
const loadWebPage = () => JSDOM.fromURL(url, jsdomOptions)
   .then(serverListening.jsdomOnLoad)
   .then((jsdom) => dom = jsdom);
const closeWebPage = () => serverListening.jsdomCloseWindow(dom);

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {
   beforeAll(loadWebPage);
   afterAll(closeWebPage);

   it('has the correct URL -> ' + url, () => {
      const actual =   { url: dom.window.location.href };
      const expected = { url: url };
      expect(actual).toEqual(expected);
      });

   it('has exactly one header, main, and footer', () => {
      const $ = dom.window.$;
      const actual =   {
         header: $('body >header').length,
         main:   $('body >main').length,
         footer: $('body >footer').length
         };
      const expected = { header: 1, main: 1, footer: 1 };
      expect(actual).toEqual(expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {
   beforeAll(loadWebPage);
   afterAll(closeWebPage);

   it('has a 🚀 traveling to 🪐!', () => {
      const html = dom.window.document.documentElement.outerHTML;
      const actual =   { '🚀': !!html.match(/🚀/g), '🪐': !!html.match(/🪐/g) };
      const expected = { '🚀': true,                '🪐': true };
      expect(actual).toEqual(expected);
      });

   });
