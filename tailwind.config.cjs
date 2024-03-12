const { resolveProjectPath } = require('wasp/dev');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    resolveProjectPath('./src/**/*.{js,jsx,ts,tsx}'),
    resolveProjectPath('./node_modules/flowbite-react/lib/esm/**/*.js'),
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
