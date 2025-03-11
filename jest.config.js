module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transforma arquivos .ts e .tsx
  },
  testEnvironment: "jsdom", // Usando jsdom para testes de DOM
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Certifique-se de que o arquivo de setup está correto
  moduleNameMapper: {
    "\\.css$": "jest-transform-stub", // Ignora arquivos .css
    "@/(.*)": "<rootDir>/src/$1", // Mapeia o alias @ para src/
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"], // Ignora node_modules e .next
};
