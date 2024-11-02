/*!
 * Copyright 2024 Waveful
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

import * as uuidGenerator from "../src/uuid-generator";
import { assert, expect } from "chai";

// Constants
const DEFAULT_NUMBER_OF_TEST_SAMPLES: number = 1000 * 1000;
const NUMBER_OF_UUIDS_TO_BE_PRINTED: number = 20;
const DEFAULT_TEST_TIMEOUT: number = 4 * 60 * 1000; // 4 minutes

describe('uuidGenerator', function() {

  it('Check uniform distribution of uuids', function() {
    const uuidDictionary = "ABC";
    const uuidLength = 3;
    const numberOfTestSamples = 10*1000*1000;

    // Initialize map to collect results.
    const mapOfUuidExtractions: { [key: string]: number } = { };
    for (let i = 0; i < uuidDictionary.length; i++) {
      for (let j = 0; j < uuidDictionary.length; j++) {
        for (let k = 0; k < uuidDictionary.length; k++) {
          const uuid = uuidDictionary[i] + uuidDictionary[j] + uuidDictionary[k];
          mapOfUuidExtractions[uuid] = 0;
        }
      }
    }

    // Create and count UUIDs.
    for (let i = 0; i < numberOfTestSamples; i++) {
      const uuid = uuidGenerator.generateCustomUuid(uuidDictionary, uuidLength);
      mapOfUuidExtractions[uuid]++;
    }
    console.log("Printing extractions...");
    console.log(mapOfUuidExtractions);

    // Compute percentage of each UUID.
    const mapOfUuidPercentages: { [key: string]: number } = { };
    for (const uuid in mapOfUuidExtractions) {
      const numberOfTimesUuidExtracted = mapOfUuidExtractions[uuid];
      const percentageOfTimesUuidExtracted = (numberOfTimesUuidExtracted * 100) / numberOfTestSamples;
      mapOfUuidPercentages[uuid] = percentageOfTimesUuidExtracted;
    }
    console.log("Printing percentage of extractions...");
    console.log(mapOfUuidPercentages);

    // Check for uniform distribution.
    const numberOfPossibleUuids = uuidDictionary.length ** uuidLength;
    const expectedPercentageWithUniformDistribution = 100 / numberOfPossibleUuids;
    const delta = expectedPercentageWithUniformDistribution * 0.025;
    console.log("Expected value: " + expectedPercentageWithUniformDistribution.toFixed(5) + " ±" + delta.toFixed(5));
    for (const uuid in mapOfUuidPercentages) {
      assert.approximately(mapOfUuidPercentages[uuid], expectedPercentageWithUniformDistribution, delta, "The extraction seems to not be a uniform distribution (max 2.5% of error admitted).");
    }
  }).timeout(DEFAULT_TEST_TIMEOUT);

  it('generateShortUuid', function() {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateShortUuid();
      expect(uuid).to.be.a("string");
      assert.equal(uuid.length, 16);
      expect(doesStringContainOnlySimpleCharacters(uuid)).to.be.true;
      listOfUuids.push(uuid);
    }

    // Check no duplicates.
    assert.equal(listOfUuids.length, DEFAULT_NUMBER_OF_TEST_SAMPLES);
    assert.equal(listOfUuids.length, new Set(listOfUuids).size);

    // Print some.
    for (let i = 0; i < NUMBER_OF_UUIDS_TO_BE_PRINTED; i++) {
      const uuid = uuidGenerator.generateShortUuid();
      console.log("Short UUID:                   " + uuid);
    }
  }).timeout(DEFAULT_TEST_TIMEOUT);

  it('generateStrongCompactUuid', function() {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateStrongCompactUuid();
      expect(uuid).to.be.a("string");
      assert.equal(uuid.length, 20);
      expect(doesStringContainOnlySimpleCharacters(uuid)).to.be.true;
      listOfUuids.push(uuid);
    }

    // Check no duplicates.
    assert.equal(listOfUuids.length, DEFAULT_NUMBER_OF_TEST_SAMPLES);
    assert.equal(listOfUuids.length, new Set(listOfUuids).size);

    // Print some.
    for (let i = 0; i < NUMBER_OF_UUIDS_TO_BE_PRINTED; i++) {
      const uuid = uuidGenerator.generateStrongCompactUuid();
      console.log("Short and compact UUID:       " + uuid);
    }
  }).timeout(DEFAULT_TEST_TIMEOUT);

  it('generateShortLowercaseUuid', function() {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateShortLowercaseUuid();
      expect(uuid).to.be.a("string");
      assert.equal(uuid.length, 20);
      expect(doesStringContainOnlySimpleCharacters(uuid)).to.be.true;
      listOfUuids.push(uuid);
    }

    // Check no duplicates.
    assert.equal(listOfUuids.length, DEFAULT_NUMBER_OF_TEST_SAMPLES);
    assert.equal(listOfUuids.length, new Set(listOfUuids).size);

    // Print some.
    for (let i = 0; i < NUMBER_OF_UUIDS_TO_BE_PRINTED; i++) {
      const uuid = uuidGenerator.generateShortLowercaseUuid();
      console.log("Short lowercase UUID:         " + uuid);
    }
  }).timeout(DEFAULT_TEST_TIMEOUT);

  it('generateLongLowercaseUuid without hyphens', function() {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateLongLowercaseUuid(true);
      expect(uuid).to.be.a("string");
      assert.equal(uuid.length, 32);
      expect(doesStringContainOnlySimpleCharacters(uuid)).to.be.true;
      listOfUuids.push(uuid);
    }

    // Check no duplicates.
    assert.equal(listOfUuids.length, DEFAULT_NUMBER_OF_TEST_SAMPLES);
    assert.equal(listOfUuids.length, new Set(listOfUuids).size);

    // Print some.
    for (let i = 0; i < NUMBER_OF_UUIDS_TO_BE_PRINTED; i++) {
      const uuid = uuidGenerator.generateLongLowercaseUuid(true);
      console.log("Long lowercase UUID (w/o -):  " + uuid);
    }
  }).timeout(DEFAULT_TEST_TIMEOUT);

  it('generateLongLowercaseUuid with hyphens', function() {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateLongLowercaseUuid(false);
      expect(uuid).to.be.a("string");
      assert.equal(uuid.length, 36);
      expect(doesStringContainOnlySimpleCharacters(uuid)).to.be.true;
      listOfUuids.push(uuid);
    }

    // Check no duplicates.
    assert.equal(listOfUuids.length, DEFAULT_NUMBER_OF_TEST_SAMPLES);
    assert.equal(listOfUuids.length, new Set(listOfUuids).size);

    // Print some.
    for (let i = 0; i < NUMBER_OF_UUIDS_TO_BE_PRINTED; i++) {
      const uuid = uuidGenerator.generateLongLowercaseUuid(false);
      console.log("Long lowercase UUID (w/ -):   " + uuid);
    }
  }).timeout(DEFAULT_TEST_TIMEOUT);

  it('generateProfanitySafeUuid', function() {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateProfanitySafeUuid();
      expect(uuid).to.be.a("string");
      assert.equal(uuid.length, 20);
      expect(doesStringContainOnlySimpleCharacters(uuid)).to.be.true;
      listOfUuids.push(uuid);
    }

    // Check no duplicates.
    assert.equal(listOfUuids.length, DEFAULT_NUMBER_OF_TEST_SAMPLES);
    assert.equal(listOfUuids.length, new Set(listOfUuids).size);

    // Print some.
    for (let i = 0; i < NUMBER_OF_UUIDS_TO_BE_PRINTED; i++) {
      const uuid = uuidGenerator.generateProfanitySafeUuid();
      console.log("Profanity safe UUID:          " + uuid);
    }
  }).timeout(DEFAULT_TEST_TIMEOUT);

  it('generateCustomUuid', function() {
    // Check validity.
    const listOfUuids = [];
    const uuidDictionary = "AAAAABCDEF";
    const uuidLength = 32;
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateCustomUuid(uuidDictionary, uuidLength);
      expect(uuid).to.be.a("string");
      assert.equal(uuid.length, uuidLength);
      expect(doesStringContainOnlySimpleCharacters(uuid)).to.be.true;
      listOfUuids.push(uuid);
    }

    // Check no duplicates.
    assert.equal(listOfUuids.length, DEFAULT_NUMBER_OF_TEST_SAMPLES);
    assert.equal(listOfUuids.length, new Set(listOfUuids).size);

    // Print some.
    for (let i = 0; i < NUMBER_OF_UUIDS_TO_BE_PRINTED; i++) {
      const uuid = uuidGenerator.generateCustomUuid(uuidDictionary, uuidLength);
      console.log("Custom UUID:                  " + uuid);
    }
  }).timeout(DEFAULT_TEST_TIMEOUT);

  it('generateTimestampId', function() {
    // Check validity.
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateTimestampId();
      expect(uuid).to.be.a("string");
      expect(uuid.length).to.be.greaterThanOrEqual(18);
      expect(uuid.length).to.be.lessThanOrEqual(32);
      expect(doesStringContainOnlySimpleCharacters(uuid)).to.be.true;
    }

    // Print some.
    for (let i = 0; i < NUMBER_OF_UUIDS_TO_BE_PRINTED; i++) {
      const uuid = uuidGenerator.generateTimestampId();
      console.log("Timestamp UUID:               " + uuid);
    }
  }).timeout(DEFAULT_TEST_TIMEOUT);
});

function doesStringContainOnlySimpleCharacters(input: string): boolean {
  const simpleCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
  for (let i = 0; i < input.length; i++) {
    if (!simpleCharacters.includes(input.charAt(i))) {
      return false;
    }
  }
  return true;
}
