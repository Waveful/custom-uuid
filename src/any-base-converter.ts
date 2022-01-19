// Inspired by https://github.com/HarasimowiczKamil/any-base

export const BIN: string = "01";
export const OCT: string = "01234567";
export const DEC: string = "0123456789";
export const HEX: string = "0123456789abcdef";

/**
 * Converts input from source alphabet to destination alphabet.
 * @param srcAlphabet source alphabet.
 * @param dstAlphabet destination alphabet
 * @param input input represented as a string or array of points.
 */
export function convert(srcAlphabet: string, dstAlphabet: string, input: string) {
  if (!srcAlphabet || !dstAlphabet || !srcAlphabet.length || !dstAlphabet.length) {
    throw new Error("Bad alphabet");
  }

  let divide;
  let newlen;
  const inputMap: { [key: string]: number } = { };
  const fromBase: number = srcAlphabet.length;
  const toBase: number = dstAlphabet.length;
  let length: number = input.length;
  let result: string = "";

  if (!isValid(srcAlphabet, input)) {
    throw new Error('Input "' + input + '" contains non-alphabetic digits (' + srcAlphabet + ")");
  }

  if (srcAlphabet === dstAlphabet) {
    return input;
  }

  for (let i = 0; i < length; i++) {
    inputMap[i] = srcAlphabet.indexOf(input[i]);
  }
  do {
    divide = 0;
    newlen = 0;
    for (let i = 0; i < length; i++) {
      divide = divide * fromBase + inputMap[i];
      if (divide >= toBase) {
        inputMap[newlen++] = parseInt(String(divide / toBase), 10);
        divide = divide % toBase;
      } else if (newlen > 0) {
        inputMap[newlen++] = 0;
      }
    }
    length = newlen;
    result = dstAlphabet.slice(divide, divide + 1).concat(result);
  } while (newlen !== 0);

  return result;
}

/**
 * Returns true if input is valid for the source alphabet.
 * @param srcAlphabet source alphabet.
 * @param input input represented as a string or array of points.
 */
function isValid(srcAlphabet: string, input: string) {
  for (const inputChar of input) {
    if (srcAlphabet.indexOf(inputChar) === -1) {
      return false; // If input contains a character that is not included in srcAlphabet then it is NOT valid.
    }
  }
  return true;
}
