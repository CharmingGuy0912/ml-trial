const path = require('path')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:all',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:storybook/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: [
    'babel',
    'import',
    'jsx-a11y',
    'react',
    'atomic-design-hierarchy',
    'redux-saga'
  ],
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx'],
        map: [
          ['@', path.resolve(__dirname, 'app')],
          ['@/config', path.resolve(__dirname, 'app/config')]
        ]
      }
    },
    react: {
      version: '17.0'
    }
  },
  rules: {
    'array-bracket-newline': ['error', 'consistent'],
    'array-element-newline': ['error', 'consistent'],
    'arrow-body-style': ['off', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'atomic-design-hierarchy/hierarchical-import': ['error', {
      'templates': 0,
      'atoms': 1,
      'molecules': 2,
      'organisms': 3,
      'pages': 4
    }],
    'babel/no-invalid-this': 'warn',
    'capitalized-comments': ['error', 'always', {
      ignorePattern: 'pragma|ignored|prettier-ignore',
      ignoreInlineComments: true
    }],
    indent: ['error', 2, {
      SwitchCase: 1
    }],
    'linebreak-style': ['off', 'unix'],
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'class-methods-use-this': 'off',
    'default-param-last': 'off',
    'dot-location': ['error', 'property'],
    'func-style': ['error', 'declaration', {
      allowArrowFunctions: true
    }],
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['off'],
    'generator-star-spacing': ['error', 'after'],
    'implicit-arrow-linebreak': 'off',
    'lines-around-comment': ['error', {
      beforeBlockComment: true,
      allowBlockStart: true
    }],
    'max-len': ['error', {
      code: 120
    }],
    'max-lines-per-function': 'off',
    'new-cap': ['error', {
      capIsNewExceptions: ['Loadable']
    }],
    'no-confusing-arrow': 'off',
    'no-empty-function': ['error', {
      allow: ['arrowFunctions']
    }],
    'no-extend-native': 'off',
    'no-extra-parens': ['error', 'functions'],
    'no-invalid-this': 'off',
    'no-magic-numbers': ['off', {
      ignore: [-1, 0, 1]
    }],
    'no-process-env': 0,
    'object-curly-spacing': ['error', 'never'],
    'object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: true
    }],
    'one-var': ['error', 'never'],
    'padded-blocks': ['error', 'never'],
    'prefer-template': 'error',
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'sort-imports': ['error', {
      allowSeparatedGroups: true,
      ignoreDeclarationSort: true
    }],
    'import/first': ['error', 'absolute-first'],
    'import/order': ['error', {
      alphabetize: {
        order: 'asc'
      },
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always'
    }],
    'import/exports-last': ['error'],
    'import/newline-after-import': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': ['error', {
      ignore: ['react-hook-form', 'virtual:*'],
      caseSensitive: true
    }],
    'import/no-webpack-loader-syntax': 'error',
    'import/prefer-default-export': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/label-has-for': ['error', {
      components: ['Label'],
      required: {
        some: ['nesting', 'id']
      },
      allowChildren: true
    }],
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/require-default-props': 'error',
    'react/self-closing-comp': 'error',
    'react/jsx-props-no-spreading': ['error', {
      exceptions: [
        'FormattedMessage',
        'LazyComponent',
        'ReactSelect',
        'As',
        'input'
      ]
    }]
  },
  overrides: [{
    files: '*messages.js',
    rules: {
      'sort-keys': 'off'
    }
  }, {
    files: '**/routes/*.jsx',
    rules: {
      'sort-keys': 'off'
    }
  }, {
    files: '**/config/**.js',
    rules: {
      'sort-keys': 'off'
    }
  }, {
    files: '*.test.js*',
    rules: {
      'no-magic-numbers': 'off',
      'max-statements': 'off',
      'max-lines': 'off',
      'no-import-assign': 'off',
      'no-undefined': 'off',
      'function-paren-newline': 'off',
      'react/display-name': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'atomic-design-hierarchy/hierarchical-import': 'off'
    }
  },
    {
      files: '*.stories.js*',
      rules: {
        'atomic-design-hierarchy/hierarchical-import': 'off',
        'no-magic-numbers': 'off',
        'max-statements': 'off',
        'max-lines': 'off',
        'no-import-assign': 'off',
        'no-undefined': 'off',
        'function-paren-newline': 'off',
        'react/display-name': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off'
      }
    },
    {
      files: '**/__mocks__/*.js*',
      rules: {
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off'
      }
    }]
}
