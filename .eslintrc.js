module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'max-len': 'off',
    'space-before-function-paren': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-v-html': 0,
    'no-debugger': 0,
    camelcase: ['error', { properties: 'never' }],
    'vue/html-indent': ['error', 2],
    'at-rule-no-unknown': 0,
    indent: ['error', 2],
    'no-alert': 'error',
    curly: ['error', 'multi-line'],
    'object-curly-spacing': ['error', 'always'],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/namespace': ['error', { allowComputed: true }],
    'comma-dangle': ['error', 'never'],
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'spaced-comment': 'warn',
    'new-cap': 0,
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'never',
        prev: 'import',
        next: 'import'
      }
    ],
    'no-unused-expressions': 0
  },
  ignorePatterns: ['static/draco/*']
}
