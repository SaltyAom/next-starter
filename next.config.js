const { join } = require('path')

const withAnalyze = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})

const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([[withAnalyze]], {
    swcMinify: true,
    images: {
        deviceSizes: [640, 750, 828, 1080],
        imageSizes: [16, 32, 48, 64, 96],
        path: '/_next/image',
        loader: 'default'
    },
    webpack(config, options) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@app': join(__dirname, 'src/app'),
            '@layouts': join(__dirname, 'src/layouts'),
            '@components': join(__dirname, 'src/components'),
            '@shared': join(__dirname, 'src/components/shared'),
            '@modules': join(__dirname, 'src/components/modules'),
            '@styles': join(__dirname, 'src/styles'),
            '@services': join(__dirname, 'src/services'),
            '@models': join(__dirname, 'src/models'),
            '@stores': join(__dirname, 'src/stores'),
            '@public': join(__dirname, 'public'),
            '@': __dirname
        }

        return config
    },
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US'
    }
})
