/*!
 * Copyright 2022 Waveful
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { randomInt, randomUUID } from "crypto";

/**
 * Generates a short cryptographically-strong random UUID using numbers and letters.
 * Example: "14usBY8xSYXGPvsA".
 * Use this identifier when you need a strong but very short universally unique id.
 *
 * Length of this UUID: 16 characters.
 * Total number of possible UUIDs: 62^16 = 4.77e+28, precisely 47'672'401'706'823'533'450'263'330'816
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(62^16)) = 0.00000000105% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*62^16) = 2.73e+14 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 */
export function generateShortUuid(): string {
  return generateCustomUuid("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 16);
}

/**
 * Generates a short cryptographically-strong random UUID using numbers and letters.
 * Example: "6ptGBhTKkxTMCMEiiHiwwj".
 * Use this identifier when you need a very strong but still compact universally unique id.
 *
 * Length of this UUID: 22 characters.
 * Total number of possible UUIDs: 62^22 = 2.70e+39, precisely 2'707'803'647'802'660'400'290'261'537'185'326'956'544
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(62^22)) = 0.0000000000000000000185% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*62^22) = 6.52e+19 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 */
export function generateStrongCompactUuid(): string {
  return generateCustomUuid("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 22);
}

/**
 * Generates a short cryptographically-strong random UUID using numbers and lowercase letters.
 * Example: "15amp61jbnu6dzmhxa0i".
 * Use this identifier when you need a strong but short universally unique id that does not contain uppercase letters.
 *
 * Length of this UUID: 20 characters.
 * Total number of possible UUIDs: 36^20 = 1.33e+31, precisely 13'367'494'538'843'734'067'838'845'976'576
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(36^20)) = 0.00000000000374% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*36^20) = 4.58e+15 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 */
export function generateShortLowercaseUuid(): string {
  return generateCustomUuid("0123456789abcdefghijklmnopqrstuvwxyz", 20);
}

/**
 * Generates a long cryptographically-strong random UUID using the RFC 4122 version 4 UUID (122 random bits converted to hex).
 * Example (w/ hyphens): "3e3b35a9-448b-4142-9a92-cb58e5bbafc6".
 * Example (w/o hyphens): "6ed694df65db4464979639d9e6d57e9a".
 * Use this identifier when you need a very strong universally unique id, but having a long string is not a problem.
 *
 * Length of this UUID: 32 characters (or 36 if using hyphens "-").
 * Total number of possible UUIDs: 2^122 = 5.31e+36, precisely 5'316'911'983'139'663'491'615'228'241'121'378'304
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(2^122)) = 0.00000000000000000940% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*2^122) = 2.88e+18 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 * @param shouldRemoveHyphens set to true to remove hyphens from the v4 UUID (instead of 8a480344-a266-4aa5-b0ba-84641a61911d, 8a480344a2664aa5b0ba84641a61911d)
 */
export function generateLongLowercaseUuid(shouldRemoveHyphens: boolean = false): string {
  if (shouldRemoveHyphens) {
    return randomUUID().replace(/-/g, "");
  } else {
    return randomUUID();
  }
}

/**
 * Generates a short cryptographically-strong random UUID by alternating a number with a letter,
 * this alternation is done to avoid the creation of profanity inside the UUID (if we use letters it could create a bad word by chance).
 * Example: "4a8g6z1w7d1a8d1o9o3o"
 * Use this identifier when you need a universally unique id that is frequently presented to users or associated to users.
 *
 * Length of this UUID: 20 characters.
 * Total number of possible UUIDs: (9^10)*(26^10) = 4.92e+23, precisely 492'219'227'058'666'339'787'776
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(9^10)*(26^10)) ≈ 0.000102% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*(9^10)*(26^10)) = 879'304'357'911 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 */
export function generateProfanitySafeUuid(): string {
  const partLength = 10;
  const numbersPart = generateCustomUuid("123456789", partLength); // Not using number '0' since it can be seen as the letter 'O'.
  const lettersPart = generateCustomUuid("abcdefghijklmnopqrstuvwxyz", partLength);
  let resultingString = "";
  for (let i = 0; i < partLength; i++) {
    resultingString += numbersPart[i];
    resultingString += lettersPart[i];
  }
  return resultingString;
}

/**
 * Generates a cryptographically-strong random UUID with the dictionary and the length provided as input.
 * For example if we use dictionary="AB" length=5 we will have as output something like the following: "ABABB".
 * @param dictionary the characters to be used to create the UUID. Duplicates characters are allowed,
 * but take into consideration that duplicates increase the probability of generating that character.
 * @param length the length of the UUID.
 */
export function generateCustomUuid(dictionary: string, length: number): string {
  let result = "";
  const max = dictionary.length;
  for (let i = 0; i < length; i++) {
    // Pick random character from the dictionary and add it to the string we are building.
    result += dictionary[randomInt(0, max)];
  }
  return result;
}

/**
 * Generates a simple timestamp identifier.
 * Example: "2022-1-18-T-22-28-38-831164666".
 * Use this identifier when you need an id that makes it easy to know when that id was created.
 *
 * WARNING: this identifier is not universally unique.
 * WARNING: this identifier does not have a fixed length.
 */
export function generateTimestampId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // JavaScript months are 0-based.
  const day = now.getDate();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const subSec = process != null ? process.hrtime()[1] : now.getMilliseconds(); // Nanoseconds precision if "process" available, otherwise milliseconds precision.
  return year + "-" + month + "-" + day + "-T-" + hour + "-" + min + "-" + sec + "-" + subSec;
}
