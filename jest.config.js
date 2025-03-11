module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.css$": "jest-transform-stub",
    "@/(.*)": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
