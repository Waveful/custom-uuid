import {expect, assert} from "chai";
import * as uuidGenerator from "../src/uuidGenerator";

// Constants
const DEFAULT_NUMBER_OF_TEST_SAMPLES: number = 50000;
const NUMBER_OF_UUIDS_TO_BE_PRINTED: number = 20;

describe('uuidGenerator', () => {

  it('generateShortLowercaseUuid', () => {
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
  });

  it('generateLongLowercaseUuid without hyphens', () => {
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
  });

  it('generateLongLowercaseUuid with hyphens', () => {
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
  });

  it('generateUuidWithoutBadWords', () => {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateProfanitySafeUuid();
      expect(uuid).to.be.a("string");
      assert.equal(uuid.length, 18);
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
  });

  it('generateCustomUuid', () => {
    // Check validity.
    const listOfUuids = [];
    const uuidDictionary = "AAAAABCDEF";
    const uuidLength = 64;
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
  });

  it('generateTimestampId', () => {
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
  });
});

function doesStringContainOnlySimpleCharacters(input: string) {
  const simpleCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
  for (let i = 0; i < input.length; i++) {
    if (!simpleCharacters.includes(input.charAt(i))) {
      return false;
    }
  }
  return true;
}
