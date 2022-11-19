module.exports = {
    root: true,
    parser: 'babel-eslint',
    extends: ['plugin:react/recommended', 'prettier'],
    plugins: ['prettier', 'react-hooks', 'simple-import-sort'],
    rules: {
        'no-console': ['error'],
        'prettier/prettier': ['error'],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
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
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
            rules: {
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            ['^react', '^@?\\w'],
                            ['^\\u0000'],
                            ['^gg-ukit', '^@?\\w'],
                            ['^\\u0000'],
                            ['(modules)(/.*|$)'],
                            ['^\\u0000'],
                            ['(components)(/.*|$)'],
                            ['^\\u0000'],
                            ['^.+\\.?(less)$'],
                        ],
                    },
                ],
            },
        },
    ],
};
