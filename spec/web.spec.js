// Jasmine Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { JSDOM } from 'jsdom';
import { serverListening } from 'server-listening';

// Setup
const url = 'https://pretty-print-json.js.org/';
const jsdomOptions = { resources: 'usable', runScripts: 'dangerously' };
let dom;
const loadWebPage = () => JSDOM.fromURL(url, jsdomOptions)
   .then(serverListening.jsdomOnLoad)
   .then(jsdom => dom = jsdom);
const closeWebPage = () => serverListening.jsdomCloseWindow(dom);

////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {
   const getTags = (elems) => [...elems].map(elem => elem.nodeName.toLowerCase());
   beforeAll(loadWebPage);
   afterAll(closeWebPage);

   it('has the correct URL', () => {
      const actual =   { url: dom.window.location.href };
      const expected = { url: url };
      assertDeepStrictEqual(actual, expected);
      });

   it('title starts with "Pretty-Print JSON"', () => {
      const actual =   { title: dom.window.document.title.substring(0, 17) };
      const expected = { title: 'Pretty-Print JSON' };
      assertDeepStrictEqual(actual, expected);
      });

   it('body has exactly one header, main, and footer -- body.children', () => {
      const actual =   getTags(dom.window.document.body.children);
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   it('body has exactly one header, main, and footer -- querySelectorAll()', () => {
      const actual =   getTags(dom.window.document.querySelectorAll('body >*'));
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {
   beforeAll(loadWebPage);
   afterAll(closeWebPage);

   it('has a 🚀 traveling to 🪐!', () => {
      const html =     dom.window.document.documentElement.outerHTML;
      const actual =   { '🚀': !!html.match(/🚀/g), '🪐': !!html.match(/🪐/g) };
      const expected = { '🚀': true,                '🪐': true };
      assertDeepStrictEqual(actual, expected);
      });

   });
