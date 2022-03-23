module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    project: ["./tsconfig.json"]
  },
  ignorePatterns: [".eslintrc.js", "/build/", "/coverage/", "/test/"],
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: "*.ts",
      extends: [ ],
      rules: {
        "sort-imports": ["error", { "ignoreCase": true }],
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-inferrable-types": "off", // Disallows explicit type declarations for variables that can be easily inferred.
        "@typescript-eslint/no-non-null-assertion": "warn",
      }
    }
  ],
  rules: {
    "array-bracket-spacing": "off",
    "comma-spacing": "off",
    "complexity": ["off", 30], // Limit cyclomatic complexity (measures the number of linearly independent paths through a program's source code). Default is 20.
    "dot-notation": "warn", // Prefer the dot notation (foo.bar) over the square-bracket notation (foo["bar"]).
    "indent": "off", // Check indentation.
    "linebreak-style": "off", // Allow mixed 'LF' and 'CRLF' as linebreaks.
    "max-len": ["warn", { "code": 300, "ignoreComments": true, "ignoreUrls": true, "ignoreStrings": true, "ignoreTemplateLiterals": true, "ignoreRegExpLiterals": true }], // Enforce a maximum line length.
    "max-params": ["warn", 12], // Enforce a maximum number of parameters in function definitions.
    "new-cap": "off", // No initial capital letter for functions.
    "no-await-in-loop": "warn", // Program is not taking full advantage of the parallelization benefits of async/await. Use Promise.all().
    "no-param-reassign": "off", // Disallow reassignment of function parameters.
    "no-trailing-spaces": "off", // Spaces in new lines or after a line of code.
    "no-unused-vars": "warn", // Variables declared but not used.
    "no-warning-comments": "off", // Warns about "to do" or "fix me" comments.
    "padded-blocks": ["off", "never"], // Disallows (never) or enforces (always) empty lines at the beginning and ending of block statements, function bodies, class static blocks, classes, and switch statements
    "object-curly-spacing": ["warn", "always"], // Enforces consistent spacing inside braces of object literals.
    "operator-linebreak": ["warn", "before"], // Enforces linebreak to be placed before operator.
    "quotes": ["off", "double"], // Enforce the consistent use of either backticks, double, or single quotes
    "require-jsdoc": "off", // Require JSDoc comment.
    "spaced-comment": "off", // Require whitespace in a comment just after "//"
    "valid-jsdoc": "off", // The JSDoc comment must be valid (all parameters and all types specified).
  },
};
