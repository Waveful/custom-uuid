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

import {expect, assert} from "chai";
import * as anyBaseConverter from "../src/any-base-converter";

describe('anyBaseConverter', function() {

  it('Default alphabets are correct', () => {
    assert.equal(anyBaseConverter.BIN, '01');
    assert.equal(anyBaseConverter.OCT, '01234567');
    assert.equal(anyBaseConverter.DEC, '0123456789');
    assert.equal(anyBaseConverter.HEX, '0123456789abcdef');
  });

  it('convert', () => {
    assert.equal(anyBaseConverter.convert(anyBaseConverter.HEX, anyBaseConverter.BIN, '2d5e'), '10110101011110');
    assert.equal(anyBaseConverter.convert(anyBaseConverter.BIN, anyBaseConverter.HEX, '10110101011110'), '2d5e');

    assert.equal(anyBaseConverter.convert(anyBaseConverter.DEC, anyBaseConverter.HEX, '11614'), '2d5e');
    assert.equal(anyBaseConverter.convert(anyBaseConverter.HEX, anyBaseConverter.DEC, '2d5e'), '11614');

    assert.equal(anyBaseConverter.convert(anyBaseConverter.OCT, anyBaseConverter.DEC, '26536'), '11614');
    assert.equal(anyBaseConverter.convert(anyBaseConverter.DEC, anyBaseConverter.OCT, '11614'), '26536');

    const numbersLettersAndPunctuationsAlphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-.,';
    const conversion = anyBaseConverter.convert(anyBaseConverter.DEC, numbersLettersAndPunctuationsAlphabet, '123456789123456789');
    const deConversion = anyBaseConverter.convert(numbersLettersAndPunctuationsAlphabet, anyBaseConverter.DEC, conversion);
    assert.equal(deConversion, '123456789123456789');
  });

  it('convert with random input', () => {
    const numberOfSamples = 10000;
    for (let i = 0; i < numberOfSamples; i++) {
      const randomDecNumber = Math.floor(Math.random() * 1000*1000);
      const randomDecNumberString = randomDecNumber.toString();
      const correctHexString = randomDecNumber.toString(16);
      const conversion = anyBaseConverter.convert(anyBaseConverter.DEC, anyBaseConverter.HEX, randomDecNumberString);
      const deConversion = anyBaseConverter.convert(anyBaseConverter.HEX, anyBaseConverter.DEC, conversion);
      assert.equal(conversion, correctHexString);
      assert.equal(deConversion, randomDecNumberString);
    }
  });

  it('convert with invalid input', () => {
    expect(() => anyBaseConverter.convert(anyBaseConverter.BIN, "", '010101')).to.throw();
    expect(() => anyBaseConverter.convert(anyBaseConverter.BIN, anyBaseConverter.DEC, '010101-NOT-WORK')).to.throw();
  });

  it('convert to same alphabet', () => {
    assert.equal(anyBaseConverter.convert(anyBaseConverter.BIN, '01', '010101'), '010101');
    assert.equal(anyBaseConverter.convert(anyBaseConverter.DEC, '0123456789', '265369'), '265369');
  });
});
