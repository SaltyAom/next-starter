const { join } = require('path')

const withOffline = require('next-offline')
const withAnalyze = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})
const withPrefresh = require('@prefresh/next')
const withPlugins = require('next-compose-plugins')

const useStyles = require('./tools/useStyles')
const usePreact = require('./tools/usePreact')
const offlineConfig = require('./tools/withOffline')

module.exports = withPlugins(
    [[withOffline, offlineConfig], [withAnalyze], [withPrefresh]],
    {
        swcMinify: true,
        async rewrites() {
            return [
                {
                    source: '/service-worker.js',
                    destination: '/_next/static/service-worker.js'
                }
            ]
        },
        experimental: {
            modern: true,
            polyfillsOptimization: true
        },
        images: {
            deviceSizes: [640, 750, 828, 1080],
            imageSizes: [16, 32, 48, 64, 96],
            path: '/_next/image',
            loader: 'default'
        },
        webpack(config, options) {
            usePreact(config, options)
            useStyles(config, options)

            config.resolve.alias = {
                ...config.resolve.alias,
                '@pages': join(__dirname, 'src/pages'),
                '@layouts': join(__dirname, 'src/layouts'),
                '@components': join(__dirname, 'src/components'),
                '@styles': join(__dirname, 'src/styles'),
                '@services': join(__dirname, 'src/services'),
                '@models': join(__dirname, 'src/models'),
                '@stores': join(__dirname, 'src/stores'),
                '@atoms': join(__dirname, 'src/components/atoms'),
                '@molecules': join(__dirname, 'src/components/molecules'),
                '@organisms': join(__dirname, 'src/components/organisms'),
                '@public': join(__dirname, 'public'),
                '@tailwind': join(__dirname, 'src/services/tailwind')
            }

            return config
        }
    }
)
