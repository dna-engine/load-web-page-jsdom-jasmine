// Jasmine Specification Cases

var url  = 'http://dnajs.org/';

var assert = require('assert');
var jsdom =  require('jsdom');
var window, $;
function loadWebPage(done) {
   function handleWebPage(error, win) {
     window = win;    //make "window" object available to test cases
     $ = win.jQuery;  //make jQuery available to use in test cases
     done();
     }
   var features = {  //tell jsdom to load and run JavaScript files
      FetchExternalResources:   ['script'],
      ProcessExternalResources: ['script']
      };
   jsdom.env({ url: url, features: features, done: handleWebPage });
   }
function closeWebPage() { window.close(); }

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   beforeAll(loadWebPage);
   afterAll(closeWebPage);

   it('has the correct URL', () => {
      expect(window.location.href).toBe(url);
      });

   it('has exactly one header, main, and footer', () => {
      var actual =   {
          header: $('body >header').length,
          main:   $('body >main').length,
          footer: $('body >footer').length
          };
      var expected = { header: 1, main: 1, footer: 1 };
      expect(actual).toEqual(expected);
      });

   });
