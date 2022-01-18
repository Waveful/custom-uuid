import * as anyBaseConverter from "./anyBaseConverter";
import {randomBytes, randomUUID} from "crypto";

/**
 * Generates a short cryptographically-strong random UUID using numbers and lowercase letters.
 * Example: "15q5rref1h5deoiuzycs".
 * Use this identifier when you need a strong but short universally unique id that does not contain uppercase letters.
 *
 * Length of this UUID: 20 characters.
 * Total number of possible UUIDs: 36^20 = 1.33e+31, precisely 13'367'494'538'843'734'067'838'845'976'576
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(36^20)) = 0.00000000000374% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*36^20) = 4.58e+15 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 */
export function generateShortLowercaseUuid() {
  return generateCustomUuid('0123456789abcdefghijklmnopqrstuvwxyz', 20);
}

/**
 * Generates a long cryptographically-strong random UUID using RFC 4122 version 4 UUID (128 random bits converted to hex).
 * Example (w/ hyphens): "3e3b35a9-448b-4142-9a92-cb58e5bbafc6".
 * Example (w/o hyphens): "6ed694df65db4464979639d9e6d57e9a".
 * Use this identifier when you need a very strong universally unique id, but having a long string is not a problem.
 *
 * Length of this UUID: 32 characters (or 36 if using hyphens "-").
 * Total number of possible UUIDs: 2^128 = 3.40e+38, precisely 340'282'366'920'938'463'463'374'607'431'768'211'456
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(2^128)) = 0.000000000000000000147% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*2^128) = 2.31e+19 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 * @param shouldRemoveHyphens set to true to remove hyphens from the v4 UUID (instead of 8a480344-a266-4aa5-b0ba-84641a61911d, 8a480344a2664aa5b0ba84641a61911d)
 */
export function generateLongLowercaseUuid(shouldRemoveHyphens: boolean) {
  if (shouldRemoveHyphens) {
    return randomUUID().replace(/-/g, '');
  } else {
    return randomUUID();
  }
}

/**
 * Generates a short cryptographically-strong random UUID by alternating a number with a lowercase letter,
 * this alternation is done to avoid the creation of profanity inside the UUID (if we use letters it could create a bad word by chance).
 * Example: "2e2r9o3w1r2l5w1b"
 * Use this identifier when you need a universally unique id that is frequently presented to users or associated to users.
 *
 * Length of this UUID: 18 characters.
 * Total number of possible UUIDs: (9^9)*(26^9) = 2.10e+21, precisely 2'103'500'970'336'180'939'264
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(9^8)*(26^8)) ≈ 0.0238% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*(9^8)*(26^8)) = 57'481'924'094 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 */
export function generateProfanitySafeUuid() {
  const partLength = 9;
  const numbersPart = generateCustomUuid('123456789', partLength); // Not using number '0' since it can be seen as the letter 'O'.
  const lettersPart = generateCustomUuid('abcdefghijklmnopqrstuvwxyz', partLength);
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
export function generateCustomUuid(dictionary: string, length: number) {
  // Calculate total combinations of UUIDs with the dictionary and the length provided.
  const totalNumberOfPossibleUuids = dictionary.length ** length;

  // Calculate number of bytes needed to have a total number of combinations equal or a bit greater than the total number of possible UUIDs.
  const bitsNeededForGeneration = Math.ceil(Math.log2(totalNumberOfPossibleUuids));
  const bytesNeededForGeneration = Math.ceil(bitsNeededForGeneration / 8);

  // Create a random HEX string, created from the needed bytes.
  const randomHex = randomBytes(bytesNeededForGeneration).toString('hex');

  // Convert HEX string to the dictionary provided.
  const translated = anyBaseConverter.convert(anyBaseConverter.HEX, dictionary, randomHex);

  // The length can be bigger due to the different number of possible values,
  // or smaller due to zero values that are not printed (e.g., an hex of "0000000000" is simply converted to the zero character string).
  if (translated.length < length) {
    return translated.padStart(
      length, // Length to reach.
      dictionary[0], // Letter for filling the string.
    );
  } else {
    return translated.slice(0, length);
  }
}

/**
 * Generates a simple timestamp identifier.
 * Example: "2022-1-18-T-22-28-38-831164666".
 * Use this identifier when you need an id that makes it easy to know when that id was created.
 *
 * WARNING: this identifier is not universally unique.
 * WARNING: this identifier does not have a fixed length.
 */
export function generateTimestampId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // JavaScript months are 0-based.
  const day = now.getDate();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  if (process != null) {
    const nanoseconds = process.hrtime()[1]; // Nanoseconds.
    return year + "-" + month + "-" + day + "-T-" + hour + "-" + min + "-" + sec + "-" + nanoseconds;
  } else {
    const ms = now.getMilliseconds();
    return year + "-" + month + "-" + day + "-T-" + hour + "-" + min + "-" + sec + "-" + ms;
  }
}
