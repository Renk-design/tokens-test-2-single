import StyleDictionary from 'style-dictionary';
import { registerTransforms } from '@tokens-studio/sd-transforms';

// sd-transforms, 2nd parameter for options can be added
// See docs: https://github.com/tokens-studio/sd-transforms
registerTransforms(StyleDictionary, {
  expand: {
    composition: false,
    typography: false,
    border: false,
    shadow: false,
  },
  excludeParentKeys: true,
});

const sd = StyleDictionary.extend({
  source: [
    "tokens.json"
  ],
  preprocessors: [
    "tokens-studio"
  ],
  platforms: {
    scss: {
      buildPath: "build/scss/",
      prefix: "gf",
      transformGroup: "tokens-studio",
      transforms: [
        "name/kebab"
      ],
      files: [
        {
          destination: "variables.scss",
          format: "scss/variables"
        }
      ]
    }
  }
});

sd.cleanAllPlatforms();
sd.buildAllPlatforms();
