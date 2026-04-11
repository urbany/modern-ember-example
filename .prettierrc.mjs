export default {
  plugins: [
    'prettier-plugin-ember-template-tag',
    'prettier-plugin-tailwindcss',
  ],
  singleQuote: true,
  overrides: [
    {
      files: '*.{js,gjs,ts,gts,mjs,mts,cjs,cts}',
      options: {
        singleQuote: true,
        templateSingleQuote: false,
      },
    },
  ],
};
