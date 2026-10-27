import { config as tseslintConfig, parser as tsParser, plugin as tsPlugin } from "typescript-eslint";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslintConfig(
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["*.config.{ts,js}", "tsconfig.json"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: join(__dirname, "tsconfig.json"),
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["*.config.{ts,js}", "tsconfig.json"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
      },
    },
  },
  {
    ignores: ["node_modules/", "dist/", "build/", "src/e2e/"],
  }
);
