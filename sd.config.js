import { registerTransforms } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
registerTransforms(StyleDictionary);

export default {
  hooks: {
    formats: {
      // Adding a custom format to show how to get an alias's name.
      customFormat: function ({ dictionary, options }) {
        return dictionary.allTokens
          .map((token) => {
            let value = JSON.stringify(token.value);
            // new option added to decide whether or not to output references
            if (options.outputReferences) {
              // the `dictionary` object now has `usesReference()` and
              // `getReferences()` methods. `usesReference()` will return true if
              // the value has a reference in it. `getReferences()` will return
              // an array of references to the whole tokens so that you can access
              // their names or any other attributes.
              if (dictionary.usesReference(token.original.value)) {
                const refs = dictionary.getReferences(token.original.value);
                refs.forEach((ref) => {
                  value = value.replace(ref.value, function () {
                    return `${ref.name}`;
                  });
                });
              }
            }

            return `export const ${token.name} = ${value};`;
          })
          .join(`\n`);
      },
    },
  },

  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'tokens-studio', // <-- apply the tokens-studio transformGroup to apply all transforms
      transforms: ['name/kebab','shadow/css/shorthand'], // <-- add a token name transform for generating token names, default is camel
      buildPath: 'build/scss/',
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
        },
      ],
    },
  },
};
