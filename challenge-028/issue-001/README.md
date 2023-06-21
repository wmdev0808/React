# Issue description

This is a very simple reproducible example of the issue that I am running into when trying to add Jest tests for my project.

- Almost all of my tests are working (see `sampleWorkingTest.test.js` for an example). However, any tests that reference `services/firebaseService.js` fail.

- When I try to run them I am getting the following error:

      yarn test sampleBearStore.test.js

      FAIL stores/sampleBearStore.test.js
      ● Test suite failed to run

          Jest encountered an unexpected token

          Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

          Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

          By default "node_modules" folder is ignored by transformers.

          Here's what you can do:
          • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
          • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
          • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
          • If you need a custom transformation specify a "transform" option in your config.
          • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

          You'll find more details and examples of these config options in the docs:
          https://jestjs.io/docs/configuration
          For information about custom transformations, see:
          https://jestjs.io/docs/code-transformation

          Details:

          ...\node_modules\firebase\auth\dist\index.esm.js:1
          ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){export * from '@firebase/auth';
                                                                                            ^^^^^^

          SyntaxError: Unexpected token 'export'

            16 | export const signUp = (email, pw) => {
            17 |     //const auth = getAuth()
          > 18 |
              |   ^
            19 |     return new Promise((resolve) => {
            20 |
            21 |       createUserWithEmailAndPassword(

            at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1449:14)
            at Object.<anonymous> (services/firebaseService.js:18:15)
            at Object.<anonymous> (stores/sampleBearStore.js:10:26)
            at Object.<anonymous> (stores/sampleBearStore.test.js:6:26)

      Test Suites: 1 failed, 1 total
      Tests: 0 total
      Snapshots: 0 total
      Time: 3.441 s
      Ran all test suites.
      error Command failed with exit code 1.
      info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

# The cause of the issue

- Nested dependency(`node_modules` package within another package `node_modules`)

  - Some nested dependency tree could trigger some errors while running the tests because some bundles (especially ESM ones) could be somehow errored.

# Resolution

- In these cases, a `transformIgnorePatterns` whitelisting could not fix the issue. The solution here is to use a custom `resolver`. You may or may not need to remove entries from `transformIgnorePatterns` whitelisting.
