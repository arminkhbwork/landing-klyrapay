import path from "node:path";
import { fileURLToPath } from "node:url";

// In nested-folder setups (like this repo), some toolchains resolve PostCSS
// modules from the workspace root. Force Tailwind's PostCSS plugin to use this
// project directory as its base.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const postcssConfig = {
  plugins: {
    "@tailwindcss/postcss": {
      base: __dirname,
    },
  },
};

export default postcssConfig;
