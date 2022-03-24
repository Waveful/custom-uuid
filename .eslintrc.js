module.exports = {
  root: true,
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  ignorePatterns: [".eslintrc.js", "/build/", "/coverage/", "/test/"],
  extends: [
    "eslint:recommended",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:mocha/recommended",
    "plugin:promise/recommended",
    "plugin:security/recommended",
  ],
  plugins: [
    "mocha",
    "promise",
    "security",
  ],
  reportUnusedDisableDirectives: true, // Reports unused eslint-disable comments
  overrides: [
    {
      // Additional rules for TypeScript files.
      files: "*.ts",
      extends: [],
      rules: {
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-non-null-assertion": "warn",
        "sort-imports": ["error", { ignoreCase: true }],

        "@typescript-eslint/no-inferrable-types": "off" // Disallows explicit type declarations for variables that can be easily inferred.
      }
    }
  ],
  rules: {
    "comma-dangle": ["warn", "always-multiline"], // Disallows (never) or enforces (always-multiline) trailing commas.
    "dot-notation": "warn", // Prefer the dot notation (foo.bar) over the square-bracket notation (foo["bar"]).
    "guard-for-in": "warn", // Looping over objects with a for in loop will include properties that are inherited through the prototype chain. This behavior can lead to unexpected items in your for loop.
    "max-len": ["warn", { code: 300, ignoreComments: true, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true }], // Enforce a maximum line length.
    "max-params": ["warn", 12], // Enforce a maximum number of parameters in function definitions.
    "no-await-in-loop": "error", // Program is not taking full advantage of the parallelization benefits of async/await. Use Promise.all().
    "no-loop-func": "error", // Disallows creation of functions in loops. Writing functions within loops tends to result in errors due to the way the function creates a closure around the loop.
    "no-unused-vars": "warn", // Variables declared but not used.
    "object-curly-spacing": ["warn", "always"], // Enforces consistent spacing inside braces of object literals.
    "operator-linebreak": ["warn", "before"], // Enforces linebreak to be placed before operator.

    "array-bracket-spacing": ["off", "never"], // Disallows (never) or enforces (always) spaces inside of brackets (e.g. [ 'foo', 'bar' ] or ['foo', 'bar']).
    "comma-spacing": "off", // Enforces spacing around commas.
    "complexity": ["off", 30], // Limit cyclomatic complexity (measures the number of linearly independent paths through a program's source code). Default is 20.
    "indent": "off", // Check indentation.
    "linebreak-style": "off", // Allow mixed 'LF' and 'CRLF' as linebreaks.
    "new-cap": "off", // No initial capital letter for functions.
    "no-param-reassign": "off", // Disallow reassignment of function parameters.
    "no-trailing-spaces": "off", // Spaces in new lines or after a line of code.
    "no-warning-comments": "off", // Warns about "to do" or "fix me" comments.
    "padded-blocks": ["off", "never"], // Disallows (never) or enforces (always) empty lines at the beginning and ending of block statements, function bodies, class static blocks, classes, and switch statements.
    "quotes": ["off", "double"], // Enforce the consistent use of either backticks, double, or single quotes.
    "require-jsdoc": "off", // Require JSDoc comment.
    "security/detect-non-literal-fs-filename": "off", // Detects variable in filename argument of fs calls, which might allow an attacker to perform a path traversal attack.
    "security/detect-object-injection": "off", // Bracket object notation (variable[key]) with user input grants access to every property available on the object, including prototypes, which can lead to Remote Code Execution.
    "spaced-comment": "off", // Require whitespace in a comment just after "//".
    "valid-jsdoc": "off", // The JSDoc comment must be valid (all parameters and all types specified).
  }
};
