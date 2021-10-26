module.exports = {
    roots: ['<rootDir>'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
        '\\.(css|scss|less|sass)$': '<rootDir>/__mocks__/styleMock.js',
        '^@pages(.*)$': '<rootDir>/src/pages$1',
        '^@layouts(.*)$': '<rootDir>/src/layouts$1',
        '^@components(.*)$': '<rootDir>/src/components$1',
        '^@styles(.*)$': '<rootDir>/src/styles$1',
        '^@services(.*)$': '<rootDir>/src/services$1',
        '^@models(.*)$': '<rootDir>/src/models$1',
        '^@stores(.*)$': '<rootDir>/src/stores$1',
        '^@atoms(.*)$': '<rootDir>/src/atoms$1',
        '^@molecules(.*)$': '<rootDir>/src/molecules$1',
        '^@organisms(.*)$': '<rootDir>/src/organisms$1',
        '^@public(.*)$': '<rootDir>/public$1',
        '^@tailwind(.*)$': '<rootDir>/src/services/tailwind$1',
        '^~(.*)$': '<rootDir>$1',
    },
    transform: {
        // Use babel-jest to transpile tests with the next/babel preset
        // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
        '^.+\\.(js|jsx|ts|tsx)$': [
            'babel-jest',
            {
                presets: ['next/babel'],
                plugins: [
                    [
                        'module-resolver',
                        {
                            root: ['./'],
                            alias: {
                                '@pages': './src/pages',
                                '@layouts': './src/layouts',
                                '@components': './src/components',
                                '@styles': './src/styles',
                                '@services': './src/services',
                                '@models': './src/models',
                                '@stores': './src/stores',
                                '@atoms': './src/components/atoms',
                                '@molecules': './src/components/molecules',
                                '@organisms': './src/components/organisms',
                                '@public': './public',
                                '@tailwind': './src/services/tailwind',
                                '~': './'
                            }
                        }
                    ]
                ]
            }
        ]
    }
}
