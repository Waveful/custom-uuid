# custom-uuid

[![Package Version](https://img.shields.io/npm/v/custom-uuid?color=informational&label=package%20version&logo=npm)](https://www.npmjs.com/package/custom-uuid)
[![Requires Node](https://img.shields.io/node/v/custom-uuid?color=informational&label=requires%20node&logo=node.js)](https://nodejs.org/about/releases/)

[![Tests](https://github.com/Waveful/custom-uuid/actions/workflows/run-tests.yml/badge.svg?branch=main)](https://github.com/Waveful/custom-uuid/actions/workflows/run-tests.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1048e2f2b98910709833/test_coverage)](https://codeclimate.com/github/Waveful/custom-uuid/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/1048e2f2b98910709833/maintainability)](https://codeclimate.com/github/Waveful/custom-uuid/maintainability)

Generate custom and cryptographically secure UUIDs (universally unique identifiers).\
You can simply create a new UUID by specifying the dictionary of characters and the length of the UUID.


## Quickstart

To create a custom UUID...

#### 1. Install

```shell
npm install custom-uuid
```

#### 2. Create a custom UUID

ES6 module syntax:

```javascript
import { generateCustomUuid } from "custom-uuid";
generateCustomUuid("123456789ABC", 20); // ⇨ 'C12B1B2A9382A488B43A'
```

CommonJS syntax:

```javascript
const { generateCustomUuid } = require('custom-uuid');
generateCustomUuid("123456789ABC", 20); // ⇨ 'B5B6699247862A569998'
```

#### 3. Make sure the custom UUID is unique enough for your use case

In this example we are using a dictionary with 12 different characters and a length of 20.
Therefore, the total number of unique identifiers is `12^20 = 3.83e+21`.\
A large pool of identifiers makes it very unlikely to create duplicates.

You can then also calculate the average number of UUIDs to be generated before having the first collision as `sqrt(pi*0.5*(number_of_identifers))`.\
Using the dictionary and the length of our example we get `sqrt(pi*0.5*(12^20)) = 7.76e+10`. So, in this example, on average, we have to create 77 billion identifiers before having the first collision.

Or you can use one of the pre-defined UUIDs that have strong guarantees of uniqueness.


## Pre-defined UUIDs

| Method                       | Length | Example output                       | Average UUIDs to be generated before having the first collision |
|------------------------------|--------|--------------------------------------|-----------------------------------------------------------------|
| generateShortUuid()          | 16     | 14usBY8xSYXGPvsA                     | 2.73e+14                                                        |
| generateStrongCompactUuid()  | 22     | 6ptGBhTKkxTMCMEiiHiwwj               | 6.52e+19                                                        |
| generateShortLowercaseUuid() | 20     | 15amp61jbnu6dzmhxa0i                 | 4.58e+15                                                        |
| generateLongLowercaseUuid()  | 36     | e3703960-ca2d-4802-b426-88467e0e9b98 | 2.88e+18                                                        |
| generateProfanitySafeUuid()  | 20     | 4a8g6z1w7d1a8d1o9o3o                 | 8.79e+11                                                        |

\
Note: `generateLongLowercaseUuid()` provides [RFC4122 v4-compliant UUIDs](https://datatracker.ietf.org/doc/html/rfc4122) by using `crypto.randomUUID()`, `crypto.randomUUID()` is only available in node >= 14.17.0.


## License

Apache Version 2.0

See [LICENSE](./LICENSE)
