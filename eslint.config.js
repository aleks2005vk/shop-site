import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, import: importPlugin },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always"
        }
      ]
    }
  },
  pluginReact.configs.flat.recommended,
  prettierConfig,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": "error"
    }
  }
]);
