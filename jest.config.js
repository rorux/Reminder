/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "\\.(scss)$": "identity-obj-proxy",
    "^@utils(.*)$": "<rootDir>/utils$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@screens(.*)$": "<rootDir>/src/screens$1",
    "^@router(.*)$": "<rootDir>/src/router$1",
    "^@store(.*)$": "<rootDir>/src/store$1",
    "^@services(.*)$": "<rootDir>/src/services$1",
  },
};
