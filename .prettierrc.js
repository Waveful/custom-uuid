module.exports = {
  // Include parentheses around a sole arrow function parameter.
  // Valid options:
  // "always" - Always include parens. Example: (x) => x
  // "avoid" - Omit parens when possible. Example: x => x
  // Default = "always"
  arrowParens: "always",

  // Put the ">" of a multi-line HTML element at the end of the last line instead of being alone on the next line.
  // Default= false
  bracketSameLine: false,

  // Print spaces between brackets in object literals.
  // Valid options:
  // true - Example: { foo: bar }.
  // false - Example: {foo: bar}.
  // Default = true
  bracketSpacing: true,

  // When Prettier identifies cases where it looks like you've placed some code it knows how to format within a string in another file,
  // like in a tagged template in JavaScript with a tag named html or in code blocks in Markdown,
  // it will by default try to format that code.
  // Valid options:
  // "auto" – Format embedded code if Prettier can automatically identify it.
  // "off" - Never automatically format embedded code.
  // Default = "auto"
  embeddedLanguageFormatting: "auto",

  // It is a way to say to Prettier roughly how long you’d like lines to be.
  // Default = 80
  printWidth: 120,

  // By default, Prettier will not change wrapping in markdown text since some services use a linebreak-sensitive renderer, e.g. GitHub comments and BitBucket.
  // To have Prettier wrap prose to the print width, change this option to "always".
  // If you want Prettier to force all prose blocks to be on a single line and rely on editor/viewer soft wrapping instead, you can use "never".
  // Valid options:
  // "always" - Wrap prose if it exceeds the print width.
  // "never" - Un-wrap each block of prose into one line.
  // "preserve" - Do nothing, leave prose as-is. First available in v1.9.0
  proseWrap: "preserve",

  // Change when properties in objects are quoted.
  // Valid options:
  // "as-needed" - Only add quotes around object properties where required.
  // "consistent" - If at least one property in an object requires quotes, quote all properties.
  // "preserve" - Respect the input use of quotes in object properties.
  // Default = "as-needed"
  quoteProps: "consistent",

  // If true adds a semicolon at the end of every statement.
  // Default = true
  semi: true,

  // Double or single quotes? Prettier chooses the one which results in the fewest number of escapes.
  // In case of a tie or the string not containing any quotes, Prettier defaults to what specified in singleQuote.
  // Default = false
  singleQuote: false,

  // Print trailing commas wherever possible in multi-line comma-separated syntactic structures.
  // A single-line array, for example, never gets trailing commas.
  // Default = "es5"
  trailingComma: "none"
};
