import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/tests/**/*",
    "!src/main.tsx"
  ],
  coverageProvider: "babel",
  coverageReporters: ["json", "lcov", "text", "clover"],
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"]
};

export default config;
