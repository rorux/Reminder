/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(scss)": "identity-obj-proxy"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "^@utils(.*)$": "<rootDir>/utils$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@screens(.*)$": "<rootDir>/src/screens$1",
    "^@router(.*)$": "<rootDir>/src/router$1",
    "^@store(.*)$": "<rootDir>/src/store$1",
    "^@services(.*)$": "<rootDir>/src/services$1",
  },
};
