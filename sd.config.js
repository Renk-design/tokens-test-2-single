import { registerTransforms } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
registerTransforms(StyleDictionary);

export default {

  source: ['tokens.json'],
  platforms: {
    scss: {
      transformGroup: 'tokens-studio', // <-- apply the tokens-studio transformGroup to apply all transforms
      transforms: ['name/kebab','shadow/css/shorthand'], // <-- add a token name transform for generating token names, default is camel
      buildPath: 'build/scss/',
      prefix: 'gf',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
        },
      ],
    },
  },
};
