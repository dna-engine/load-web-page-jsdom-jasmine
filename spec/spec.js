// Jasmine Specification Cases

// Import
const { JSDOM } = require('jsdom');

// Setup
const url  = 'https://dragonsgrill.org/';
let window, $;
const loadWebPage = (done) => {
   const handleWebPage = (dom) => {
      const waitForScripts = () => {
         window = dom.window;
         $ = dom.window.jQuery;
         done();
         };
      dom.window.onload = waitForScripts;
      };
   const options = { resources: 'usable', runScripts: 'dangerously' };
   JSDOM.fromURL(url, options).then(handleWebPage);
   };
const closeWebPage = () => window.close();

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   beforeAll(loadWebPage);
   afterAll(closeWebPage);

   it('has the correct URL -> ' + url, () => {
      expect(window.location.href).toBe(url);
      });

   it('has exactly one header, main, and footer', () => {
      const actual = {
         header: $('body >header').length,
         main:   $('body >main').length,
         footer: $('body >footer').length
         };
      const expected = { header: 1, main: 1, footer: 1 };
      expect(actual).toEqual(expected);
      });

   });
