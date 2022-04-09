# custom-uuid

[![Package Version](https://img.shields.io/npm/v/custom-uuid?color=informational&label=package%20version&logo=npm)](https://www.npmjs.com/package/custom-uuid)
[![Dependencies](https://img.shields.io/static/v1?label=dependencies&message=zero&color=informational&logo=npm)](https://www.npmjs.com/package/custom-uuid?activeTab=dependencies)
[![Requires Node](https://img.shields.io/node/v/custom-uuid?color=informational&label=requires%20node&logo=node.js)](https://nodejs.org/about/releases/)

[![Tests](https://github.com/Waveful/custom-uuid/actions/workflows/run-tests.yml/badge.svg?branch=main)](https://github.com/Waveful/custom-uuid/actions/workflows/run-tests.yml)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/Waveful/custom-uuid?label=test%20coverage&logo=codeclimate)](https://codeclimate.com/github/Waveful/custom-uuid/code?sort=-test_coverage)
[![Maintainability Score](https://img.shields.io/codeclimate/maintainability/Waveful/custom-uuid?logo=codeclimate)](https://codeclimate.com/github/Waveful/custom-uuid/maintainability)

Generate custom and cryptographically-secure string UUIDs (universally unique identifiers).

`custom-uuid` is a lightweight package with zero dependencies. To generate string UUIDs it uses the [crypto module](https://nodejs.org/api/crypto.html) that comes pre-installed in Node.js.

This package should be used only when you need to use **strings** as identifiers.
Some examples of use cases are:
* keys for a key-value DB
* unique file identifiers
* user-facing identifiers
* or generally any use case where you need a unique **string** composed of random characters, and not a random pile of bits

You can simply create a new string UUID by specifying the dictionary of characters and the length of the string to be generated.


## Quickstart

To create a custom UUID...

#### 1. Install

```shell
npm install custom-uuid
```

#### 2. Create a custom UUID (or use a predefined UUID)

ES6 module syntax:

```javascript
import { generateCustomUuid, generateShortUuid, generateStrongCompactUuid } from "custom-uuid";
generateCustomUuid("123456789ABC", 20); // ⇨ 'C12B1B2A9382A488B43A'
generateShortUuid(); // ⇨ 'yT1xoeCt6fvdDf6a'
generateStrongCompactUuid(); // ⇨ 'BYFGhRjnn83hHCarT09H'
```

CommonJS syntax:

```javascript
const { generateCustomUuid, generateShortUuid, generateStrongCompactUuid } = require('custom-uuid');
generateCustomUuid("123456789ABC", 20); // ⇨ 'B5B6699247862A569998'
generateShortUuid(); // ⇨ 'DMDvkPec8QUyV9O1'
generateStrongCompactUuid(); // ⇨ 'xRC4JggRQQFdPwn6MhZs'
```

#### 3. Make sure the custom UUID is unique enough for your use case

With the custom UUID example we are using a dictionary with 12 different characters and a length of 20.
Therefore, the total number of unique identifiers is `12^20 = 3.83e+21`.\
A large pool of identifiers makes it very unlikely to create duplicates.

You can then also calculate the average number of UUIDs to be generated before having the first collision as `sqrt(pi*0.5*(number_of_identifers))`.\
Using the dictionary and the length of our example we get `sqrt(pi*0.5*(12^20)) = 7.76e+10`. So, in this example, on average, we have to create 77 billion identifiers before having the first collision.

Or you can use one of the pre-defined UUIDs that have strong guarantees of uniqueness.


## Pre-defined UUIDs

| Method                                                                                        | Length | Example output                         |
|-----------------------------------------------------------------------------------------------|--------|----------------------------------------|
| [`generateShortUuid()`](#generateShortUuid)                                                   | 16     | `14usBY8xSYXGPvsA`                     |
| [`generateStrongCompactUuid()`](#generateStrongCompactUuid)                                   | 20     | `6ptGBhTKkxTMCMEiiHiw`                 |
| [`generateShortLowercaseUuid()`](#generateShortLowercaseUuid)                                 | 20     | `15amp61jbnu6dzmhxa0i`                 |
| [`generateLongLowercaseUuid()`](#generateLongLowercaseUuidshouldRemoveHyphens-boolean--false) | 36     | `e3703960-ca2d-4802-b426-88467e0e9b98` |
| [`generateProfanitySafeUuid()`](#generateProfanitySafeUuid)                                   | 20     | `4a8g6z1w7d1a8d1o9o3o`                 |

#### generateShortUuid()

Generates a short cryptographically-strong random UUID using numbers and letters.\
Use this identifier when you need a strong but very short universally unique identifier.

* **Length:** 16
* **Dictionary:** `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
* **Example output:** `14usBY8xSYXGPvsA`
* **Average UUIDs to be generated before having the first collision:** 2.73e+14

#### generateStrongCompactUuid()

Generates a short cryptographically-strong random UUID using numbers and letters.\
Use this identifier when you need a very strong but still compact universally unique id.

* **Length:** 20
* **Dictionary:** `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
* **Example output:** `6ptGBhTKkxTMCMEiiHiw`
* **Average UUIDs to be generated before having the first collision:** 1.05e+18

#### generateShortLowercaseUuid()

Generates a short cryptographically-strong random UUID using numbers and lowercase letters.\
Use this identifier when you need a strong but short universally unique id that does not contain uppercase letters.

* **Length:** 20
* **Dictionary:** `0123456789abcdefghijklmnopqrstuvwxyz`
* **Example output:** `15amp61jbnu6dzmhxa0i`
* **Average UUIDs to be generated before having the first collision:** 4.58e+15

#### generateLongLowercaseUuid(shouldRemoveHyphens: boolean = false)

Generates a long cryptographically-strong random UUID using the RFC 4122 version 4 UUID (128 bits in which 122 are random, converted to a hex string).\
Use this identifier when you need a very strong universally unique id, but having a long string is not a problem.

* **Length:** 36
* **Dictionary:** `0123456789abcdef` (bits are converted to hex)
* **Example output:** `e3703960-ca2d-4802-b426-88467e0e9b98`
* **Average UUIDs to be generated before having the first collision:** 2.88e+18

Note: `generateLongLowercaseUuid()` provides [RFC4122 v4-compliant UUIDs](https://datatracker.ietf.org/doc/html/rfc4122) by using `crypto.randomUUID()`, `crypto.randomUUID()` is only available in node >= 14.17.0.

#### generateProfanitySafeUuid()

Generates a short cryptographically-strong random UUID by alternating a number with a letter,
this alternation is done to avoid the creation of profanity inside the UUID (if we use letters it could create a bad word by chance).\
Use this identifier when you need a universally unique id that is frequently presented to users or associated to users.

* **Length:** 20
* **Dictionary:** `123456789` + `abcdefghijklmnopqrstuvwxyz`
* **Example output:** `4a8g6z1w7d1a8d1o9o3o`
* **Average UUIDs to be generated before having the first collision:** 8.79e+11


## License

Apache Version 2.0

See [LICENSE](./LICENSE)
