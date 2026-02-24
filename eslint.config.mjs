import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['**/dist', '**/.nuxt', '**/.output'],
  rules: {
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/indent': ['error', 2],
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    '@stylistic/max-statements-per-line': 'off',

    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    'no-console': 'off',
    'no-use-before-define': 'off',

    'camelcase': [
      'error',
      {
        properties: 'never',
      },
    ],

    'vue/require-v-for-key': 'error',
    'vue/no-v-html': 0,
    'vue/multi-word-component-names': 'off',
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    'vue/no-multiple-template-root': 'off',
    'vue/require-default-prop': 'off',

    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
      },
    ],

    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: false,
      },
    ],

    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],

    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'a', 'span'],
        allowEmptyLines: false,
      },
    ],

    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'never',
      },
    ],

    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/block-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
  },
})
