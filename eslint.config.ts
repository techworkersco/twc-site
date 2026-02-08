import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig([
  eslint.configs.recommended,
  {
    ignores: ["_site/**"],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["assets/**/*.js"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.js"],
    extends: [tseslint.configs.strict, tseslint.configs.stylistic],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
]);
