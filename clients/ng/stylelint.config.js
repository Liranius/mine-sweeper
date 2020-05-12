module.exports = {
  extends: ['stylelint-prettier/recommended'],
  plugins: [
    'stylelint-scss',
    'stylelint-order'
  ],
  rules: {
    // Possible errors
    'color-no-invalid-hex': true,
    'font-family-no-missing-generic-family-keyword': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'unit-no-unknown': true,
    'property-no-unknown': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep']
      }
    ],
    'media-feature-name-no-unknown': true,
    'comment-no-empty': true,
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,

    // Limit language features
    'unit-blacklist': [],
    'shorthand-property-no-redundant-values': true,
    'value-no-vendor-prefix': true,
    'property-blacklist': [''],
    'property-no-vendor-prefix': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-no-important': true,
    'declaration-property-unit-blacklist': {},
    'declaration-property-unit-whitelist': {
      'font-size': ['px', 'rem', 'vmin']
    },
    'declaration-property-value-whitelist': {
      'float': ['none']
    },
    'selector-max-compound-selectors': 4,
    'selector-max-empty-lines': 0,
    'selector-max-id': 1,
    'selector-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'at-rule-blacklist': ['extend'],

    // Stylistic issues
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'font-family-name-quotes': 'always-where-recommended',
    'function-comma-space-after': 'always',
    'function-comma-space-before': 'never',
    'function-name-case': 'lower',
    'function-parentheses-space-inside': 'never',
    'function-url-quotes': 'never',
    'function-whitespace-after': 'always',
    'font-weight-notation': 'numeric',
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    'string-quotes': [
      'double',
      {
        'avoidEscape': true
      }
    ],
    'length-zero-no-unit': true,
    'unit-case': 'lower',
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['family']
      }
    ],
    'value-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',
    'value-list-max-empty-lines': 0,
    'property-case': 'lower',
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-property-value-blacklist': {
      '/^border/': ['none']
    },
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-before': 'always',
    'block-opening-brace-newline-after': 'always',
    'block-opening-brace-space-before': 'always',
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-quotes': 'always',
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'single',
    'selector-type-case': 'lower',
    'selector-list-comma-newline-after': 'always-multi-line',
    'selector-list-comma-space-after': 'always-single-line',
    'selector-list-comma-space-before': 'never',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ],
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-case': 'lower',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'at-rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'blockless-after-same-name-blockless'],
        except: ['first-nested'],
        ignoreAtRules: ['else']
      }
    ],
    'at-rule-name-space-after': 'always',
    'at-rule-semicolon-space-before': 'never',
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested']
      }
    ],
    'comment-whitespace-inside': 'always',
    indentation: 2,
    'max-empty-lines': [
      1,
      {
        ignore: ['comments']
      }
    ],
    'no-eol-whitespace': [
      true,
      {
        ignore: ['empty-lines']
      }
    ],

    // Sass rules
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-empty-line-before': 'never',
    'scss/at-else-if-parentheses-space-before': 'always',
    'scss/at-function-named-arguments': 'never',
    'scss/at-function-parentheses-space-before': 'always',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'scss/at-mixin-argumentless-call-parentheses': 'always',
    'scss/at-mixin-named-arguments': 'never',
    'scss/at-mixin-parentheses-space-before': 'always',
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-colon-newline-after': 'always-multi-line',
    'scss/dollar-variable-colon-space-after': 'always-single-line',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-empty-line-before': [
      'always',
      {
        except: ['after-comment', 'after-dollar-variable', 'first-nested']
      }
    ],
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-pattern': '^_?[a-z]+[\\w-]*$',
    'scss/at-extend-no-missing-placeholder': true,
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/double-slash-comment-empty-line-before': 'always',
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/declaration-nested-properties': 'never',
    'scss/operator-no-newline-after': true,
    'scss/operator-no-newline-before': true,
    // 'scss/operator-no-unspaced': true, // Causing url parsing error, temporarily disabled.
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/no-duplicate-dollar-variables': true,

    // Order rules
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      {
        type: 'at-rule',
        hasBlock: false
      },
      'rules',
      {
        type: 'at-rule',
        hasBlock: true
      }
    ],
    'order/properties-order': [
      [
        'content',
        'position', 'top', 'right', 'bottom', 'left',
        'display', 'flex-flow', 'flex-direction', 'flex-wrap', 'justify-content', 'align-content', 'align-items',
        'flex', 'flex-grow', 'flex-shrink', 'flex-basis', 'align-self', 'order',
        'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
        'outline', 'outline-width', 'outline-style', 'outline-color', 'outline-offset',
        'box-shadow', 'box-sizing',
        'border-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius', 'border-top-left-radius',
        'border', 'border-width', 'border-style', 'border-color',
        'border-top', 'border-top-width', 'border-top-style', 'border-top-color',
        'border-right', 'border-right-width', 'border-right-style', 'border-right-color',
        'border-bottom', 'border-bottom-width', 'border-bottom-style', 'border-bottom-color',
        'border-left', 'border-left-width', 'border-left-style', 'border-left-color',
        'border-image', 'border-image-source', 'border-image-slice', 'border-image-width', 'border-image-outset', 'border-image-repeat',
        'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
        'max-width', 'max-height', 'min-width', 'min-height', 'width', 'height',
        'background', 'background-attachment', 'background-clip', 'background-origin', 'background-size', 'background-color', 'background-image', 'background-position', 'background-repeat',
        'table-layout', 'border-collapse', 'border-spacing', 'caption-side', 'empty-cells',
        'font', 'font-style', 'font-variant', 'font-weight', 'font-size', 'line-height', 'font-family'
      ],
      {
        unspecified: 'bottom'
      }
    ]
  }
};
