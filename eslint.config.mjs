// import { defineConfig, globalIgnores } from "eslint/config";
// import nextVitals from "eslint-config-next/core-web-vitals";
// import nextTs from "eslint-config-next/typescript";

// const eslintConfig = defineConfig([
//   ...nextVitals,
//   ...nextTs,
//   globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
//   {
//     rules: {
//       "@typescript-eslint/no-explicit-any": "off",
//       "@typescript-eslint/only-export-components": "on",
//       "@typescript-eslint/no-unused-vars": [
//         "warn",
//         {
//           vars: "all",
//           args: "after-used",
//           ignoreRestSiblings: true,
//           argsIgnorePattern: "^_",
//         },
//       ],
//     },
//   },
// ]);

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",

      // Aturan untuk mendeteksi import atau variabel yang tidak terpakai
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
