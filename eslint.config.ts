import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

// todo(maximsmol): sublime-lsp does not want to eslint this file

// todo(maximsmol): eslint-mdx
// todo(maximsmol): lint the generated html

export default defineConfig([
  eslint.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    ignores: ["_site/**"],
  },
  {
    rules: {
      "import/order": [
        "warn",
        {
          alphabetize: {
            order: "asc",
          },
          named: true,
          "newlines-between": "always",
        },
      ],
      "import/no-unresolved": "off", // todo(maximsmol): broken. why?

      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-query-selector": "off",
      "unicorn/no-negated-condition": "off",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-anonymous-default-export": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/no-nested-ternary": "off",
      "unicorn/no-await-expression-member": "off",
    },
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
      importPlugin.flatConfigs.typescript,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
]);
