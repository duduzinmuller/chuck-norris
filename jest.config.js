module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Aplica ts-jest a arquivos .ts e .tsx
  },
  testEnvironment: "jsdom", // Usando jsdom para testes de DOM
  moduleNameMapper: {
    "\\.css$": "jest-transform-stub", // Ignora arquivos .css
    "@/(.*)": "<rootDir>/src/$1", // Mapeia o alias @ para src/
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"], // Ignora node_modules e .next
};
