module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!src/config/test/setupEnzyme.ts",
    "!src/index.tsx",
    "!src/**/*Container.ts"
  ],
  "setupTestFrameworkScriptFile": "<rootDir>/src/config/test/setupEnzyme.ts"
}
