import {expect, assert} from "chai";
import * as uuidGenerator from "../src/uuidGenerator";

// Constants
const DEFAULT_NUMBER_OF_TEST_SAMPLES: number = 10000;
const NUMBER_OF_UUIDS_TO_BE_PRINTED: number = 20;

describe('uuidGenerator', () => {

  it('generateTimestampUuid', () => {
    // Check validity.
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateTimestampUuid();
      expect(uuid).to.be.a("string");
      expect(uuid.length).to.be.greaterThanOrEqual(18);
      expect(uuid.length).to.be.lessThanOrEqual(32);
      expect(doesStringContainOnlySimpleCharacters(uuid)).to.be.true;
    }

    // Print some.
    for (let i = 0; i < NUMBER_OF_UUIDS_TO_BE_PRINTED; i++) {
      const uuid = uuidGenerator.generateTimestampUuid();
      console.log("Timestamp UUID:               " + uuid);
    }
  });

  it('generateUuidWithoutBadWords', () => {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateUuidWithoutBadWords();
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
      const uuid = uuidGenerator.generateUuidWithoutBadWords();
      console.log("UUID without bad words:       " + uuid);
    }
  });

  it('generateRandomShortUuid', () => {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateRandomShortUuid();
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
      const uuid = uuidGenerator.generateRandomShortUuid();
      console.log("Random short UUID:            " + uuid);
    }
  });

  it('generateRandomLongUuid without hyphens', () => {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateRandomLongUuid(true);
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
      const uuid = uuidGenerator.generateRandomLongUuid(true);
      console.log("Random long UUID (no '-'):    " + uuid);
    }
  });

  it('generateRandomLongUuid with hyphens', () => {
    // Check validity.
    const listOfUuids = [];
    for (let i = 0; i < DEFAULT_NUMBER_OF_TEST_SAMPLES; i++) {
      const uuid = uuidGenerator.generateRandomLongUuid(false);
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
      const uuid = uuidGenerator.generateRandomLongUuid(false);
      console.log("Random long UUID:             " + uuid);
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
