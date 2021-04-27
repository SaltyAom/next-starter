import Document, { Html, Head, Main, NextScript } from 'next/document'

import { languageCode } from '@services/constants'

import { OpenGraphMeta } from '@components'

class MyDocument extends Document {
    render() {
        return (
            <Html lang={languageCode}>
                <Head>
                    <OpenGraphMeta />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
