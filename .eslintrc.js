const path = require('path');
module.exports = {
    root: true,
    parser: 'babel-eslint',
    extends: ['plugin:react/recommended', 'prettier'],
    plugins: ['prettier', 'react-hooks', '@typescript-eslint', 'simple-import-sort'],
    rules: {
        'no-console': ['error'],
        'prettier/prettier': ['error'],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    },
    settings: {
        react: {
            version: '17.0',
        },
        'import/resolver': {
            webpack: {
                config: './webpack.config.client.js',
            },
        },
    },
    overrides: [
        {
            parser: '@typescript-eslint/parser',
            extends: ['plugin:react/recommended', 'prettier', 'plugin:@typescript-eslint/recommended'],
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: path.join(__dirname, 'tsconfig.json'),
            },
        },
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/no-unused-vars': ['error'],
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            ['^react', '^@?\\w'],
                            ['^\\u0000'],
                            ['^gg-ukit', '^@?\\w'],
                            ['^\\u0000'],
                            ['(src)(/.*|$)'],
                            ['^\\u0000'],
                            ['(modules)(/.*|$)'],
                            ['^\\u0000'],
                            ['(components)(/.*|$)'],
                            ['^\\u0000'],
                            ['(pages)(/.*|$)'],
                            ['^\\u0000'],
                            ['^.+\\.?(less)$'],
                        ],
                    },
                ],
            },
        },
    ],
};
