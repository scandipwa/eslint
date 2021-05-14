/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable scandipwa-extensibility/no-non-extensible-components */

/**
 * @fileoverview Class name must match the name of the file it is declared in.
 * @author Jegors Batovs
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/derived-class-names");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 },
  env: {
    es6: true,
  },
});
ruleTester.run("derived-class-names", rule, {
  valid: [
    {
      code: "class Hello {}",
      filename: "Hello.js",
    },
    {
      code: "class FooterComponent {}",
      filename: "Footer.component.js",
    },
    {
      code: "class MyTest {}",
      filename: "my.test.js",
    },
  ],

  invalid: [
    {
      code: "class Hello {}",
      filename: "Goodbye.js",
      errors: [{rule:"derived-class-names"}],
    },
    {
      code: "class FooterComponent {}",
      filename: "Footer.container.js",
      errors: [{rule:"derived-class-names"}],
    },
    {
      code: "class Test {}",
      filename: "my.test.js",
      errors: [{rule:"derived-class-names"}],
    },
  ],
});
