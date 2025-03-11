module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/jest-globals"],
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Garantir que o Jest resolva os caminhos corretamente
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json", // Especificar o tsconfig aqui
    },
  },
};
