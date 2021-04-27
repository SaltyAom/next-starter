const { join } = require('path')

const withOffline = require('next-offline')
const withAnalyze = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})
const withPreact = require('next-plugin-preact')
const withPlugins = require('next-compose-plugins')

const withStyles = require('./tools/withStyles')
const { useEsbuildLoader } = require('./tools/useEsbuild')

module.exports = withPlugins(
    [
        [withPreact],
        [withAnalyze],
        [withStyles],
        [
            withOffline,
            {
                workboxOpts: {
                    swDest: 'static/service-worker.js',
                    runtimeCaching: [
                        {
                            urlPattern: /^https?.*/,
                            handler: 'NetworkFirst',
                            options: {
                                cacheName: 'https-calls',
                                networkTimeoutSeconds: 15,
                                expiration: {
                                    maxEntries: 150,
                                    maxAgeSeconds: 6 * 60 * 60 // 6 hours
                                },
                                cacheableResponse: {
                                    statuses: [0, 200]
                                }
                            }
                        }
                    ]
                }
            }
        ]
    ],
    {
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
        webpack(config) {
            useEsbuildLoader(config)

            config.resolve.alias = {
                ...config.resolve.alias,
                '@pages': join(__dirname, 'src/pages'),
                '@layouts': join(__dirname, 'src/layouts'),
                '@components': join(__dirname, 'src/components'),
                '@styles': join(__dirname, 'src/styles'),
                '@services': join(__dirname, 'src/services'),
                '@models': join(__dirname, 'src/models'),
                '@tailwind': join(__dirname, 'src/services/tailwind/index.ts')
            }

            return config
        }
    }
)
