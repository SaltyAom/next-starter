import { OpenGraph } from '@components'

export default function Index() {
    return (
        <>
            <OpenGraph
                canonical=""
                title=""
                description=""
                image={{
                    src: '/',
                    width: 1920,
                    height: 1080
                }}
                icon="/"
            />

            <h1 className="flex justify-center items-center w-full h-screen text-blue-500 text-2xl">
                Hi friends!
            </h1>
        </>
    )
}
