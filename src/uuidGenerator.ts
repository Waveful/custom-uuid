import * as anyBaseConverter from "./anyBaseConverter";
import {randomBytes, randomUUID} from "crypto";

/**
 * Generates a simple timestamp UUID.
 * Example: "2021-12-25-T-22-57-23-456903458".
 * WARNING: the probability of creating a duplicate is very high when computers are running in parallel.
 */
export function generateTimestampUuid() {
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

/**
 * Generates a short cryptographically-strong random uuid by alternating a number with a lowercase letter,
 * this alternation is done to avoid the creation of bad words inside the uuid.
 * Length of this UUID: 16 characters.
 * Total number of possible UUIDs: (9^8)*(26^8) = 8.98e+18, precisely 8'989'320'386'052'055'296
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(9^8)*(26^8)) ≈ 5% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*(9^8)*(26^8)) = 3'757'710'931 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 */
export function generateUuidWithoutBadWords() {
  const partLength = 8;
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
 * Generates a short cryptographically-strong random uuid using numbers and lowercase letters.
 * Length of this UUID: 20 characters.
 * Total number of possible UUIDs: 36^20 = 1.33e+31, precisely 13'367'494'538'843'734'067'838'845'976'576
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(36^20)) = 0.00000000000374% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*36^20) = 4.58e+15 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 */
export function generateRandomShortUuid() {
  return generateCustomUuid('0123456789abcdefghijklmnopqrstuvwxyz', 20);
}

/**
 * Generates a long cryptographically-strong random uuid using RFC 4122 version 4 UUID (128 random bits converted to hex).
 * This UUID is lees efficient since it does not use all the lowercase letters.
 * Length of this UUID: 32 characters (or 36 if using hyphens "-").
 * Total number of possible UUIDs: 2^128 = 3.40e+38, precisely 340'282'366'920'938'463'463'374'607'431'768'211'456
 * Probability of creating a duplicate ID when creating one billion (10^9, giga-unit) UUIDs: k^2÷2N = ((10^9)^2)÷(2*(2^128)) = 0.000000000000000000147% (https://preshing.com/20110504/hash-collision-probabilities/)
 * Average UUIDs to be generated before having the first collision: sqrt(pi*0.5*2^128) = 2.31e+19 (https://shortunique.id/classes/default.html#approxmaxbeforecollision)
 * @param shouldRemoveHyphens set to true to remove hyphens from the v4 UUID (instead of 8a480344-a266-4aa5-b0ba-84641a61911d, 8a480344a2664aa5b0ba84641a61911d)
 */
export function generateRandomLongUuid(shouldRemoveHyphens: boolean) {
  if (shouldRemoveHyphens) {
    return randomUUID().replace(/-/g, '');
  } else {
    return randomUUID();
  }
}

function generateCustomUuid(dictionary: string, length: number) {
  // Calculate total combinations of uuids with the dictionary and the length provided.
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
