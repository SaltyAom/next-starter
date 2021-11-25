import {
    useState,
    useReducer,
    useCallback,
    useRef,
    DetailsHTMLAttributes
} from 'react'

import { RotateCw } from 'react-feather'

import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop/types'

import { Slider } from '@mui/material'

import tw from '@tailwind'

import type { ImagePickerComponent } from './types'

function imageSize(url: string): Promise<[number, number]> {
    const img = document.createElement('img')

    const promise = new Promise<[number, number]>((resolve, reject) => {
        img.onload = () => {
            // Natural size is the actual image size regardless of rendering.
            // The 'normal' `width`/`height` are for the **rendered** size.
            const width = img.naturalWidth
            const height = img.naturalHeight

            // Resolve promise with the width and height
            resolve([width, height])
        }

        // Reject promise on error
        img.onerror = reject
    })

    // Setting the source makes it start downloading and eventually call `onload`
    img.src = url

    return promise
}

const ImagePicker: ImagePickerComponent = ({
    imageRef,
    fallback = 'https://pbs.twimg.com/profile_images/1305491092918292485/q6p8QmUl_400x400.jpg'
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [isShowingDialog, toggleDialog] = useReducer((v) => !v, false)
    const [preview, updatePreview] = useState('')
    const [size, updateSize] = useState([0, 0])

    const previewImageRef = useRef<HTMLImageElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const cropRef = useRef<Area>({ x: 0, y: 0, width: 0, height: 0 })

    const selectImage = useCallback(() => {
        inputRef.current!.click()
    }, [])

    const handleNewImage: DetailsHTMLAttributes<HTMLInputElement>['onChange'] =
        useCallback(
            async (event) => {
                const {
                    currentTarget: { files }
                } = event

                if (!files || !files[0]) return

                const file = files[0]

                if (!['image/jpeg', 'image/png'].includes(file.type)) return

                const reader = new FileReader()
                reader.readAsDataURL(file)

                reader.onload = async (e) => {
                    updatePreview(e.target!.result as string)
                    setCrop({ x: 0, y: 0 })
                    setZoom(1)
                    updateSize(await imageSize(e.target!.result as string))
                    toggleDialog()
                }
            },
            [toggleDialog]
        )

    const rotateImage = () => {
        const canvas = document.createElement('canvas')
        const img = new Image()

        const ctx = canvas.getContext('2d')!
        img.src = preview

        const [width, height] = size
        canvas.width = height
        canvas.height = width
        img.width = height
        img.height = width

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // save the unrotated context of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        ctx.save()

        // move to the center of the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2)

        // rotate the canvas to the specified degrees
        ctx.rotate((90 * Math.PI) / 180)

        // draw the image
        // since the context is rotated, the image will be rotated also
        ctx.drawImage(img, -width / 2, -height / 2)

        // we’re done with the rotating so restore the unrotated context
        ctx.restore()

        updateSize([height, width])

        updatePreview(canvas.toDataURL('jpg'))
    }

    const handleImageProcess: DetailsHTMLAttributes<HTMLFormElement>['onSubmit'] =
        useCallback(
            async (e) => {
                e.preventDefault()

                const image = new Image()
                const canvas = document.createElement('canvas')

                const ctx = canvas.getContext('2d')
                image.src = preview

                const { x, y, width, height } = cropRef.current!
                canvas.width = width
                canvas.height = height

                ctx!.drawImage(image, x, y, width, height, 0, 0, width, height)
                previewImageRef.current!.src = canvas.toDataURL('jpg')

                toggleDialog()
                canvas.toBlob((blob) => {
                    if (!blob) return

                    const container = new DataTransfer()
                    container.items.add(new File([blob], 'profile.jpg'))

                    // eslint-disable-next-line no-param-reassign
                    imageRef.current = container.files
                })
            },
            [preview]
        )

    const onCropComplete = useCallback((_, croppedArea: Area) => {
        cropRef.current = croppedArea
    }, [])

    return (
        <>
            {isShowingDialog && (
                <article
                    className={tw`flex justify-center items-center z-50 fixed top-0 left-0 w-full h-screen`}
                >
                    <button
                        type="button"
                        aria-label="Close"
                        className={tw`z-0 fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,.25)]`}
                        onClick={toggleDialog}
                    />
                    <div
                        className={tw`z-10 fixed w-full px-4`}
                    >
                        <form
                            className={tw`flex flex-col max-w-sm w-full bg-white mx-auto p-4 rounded`}
                            onSubmit={handleImageProcess}
                        >
                            <div
                                className={tw`relative w-[300px] h-[300px] md:w-[360px] md:h-[360px] rounded bg-black overflow-hidden mx-auto`}
                            >
                                <Cropper
                                    image={preview}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>
                            <section className={tw`flex items-center gap-2`}>
                                <Slider
                                    min={1}
                                    max={3}
                                    step={0.01}
                                    value={zoom}
                                    className={tw`my-4 flex-1`}
                                    valueLabelDisplay="off"
                                    onChange={(e) => {
                                        setZoom(
                                            parseFloat(
                                                // @ts-ignore
                                                e.target?.value as string
                                            )
                                        )
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={rotateImage}
                                    className={tw`flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-gray-200 text-gray-700`}
                                >
                                    <RotateCw width={18} /> หมุนภาพ
                                </button>
                            </section>
                            <button
                                type="submit"
                                className={tw`py-3 rounded-lg text-lg font-medium bg-black text-white`}
                            >
                                Save
                            </button>
                        </form>
                    </div>
                </article>
            )}
            <div className={tw`mx-auto`}>
                <button
                    type="button"
                    className={tw`flex flex-col items-center mb-2 gap-4`}
                    onClick={selectImage}
                >
                    <div
                        className={tw`relative w-[144px] h-[144px] mx-auto bg-gray-300 rounded-full overflow-hidden`}
                    >
                        <img
                            ref={previewImageRef}
                            className={tw`absolute w-full object-cover object-center`}
                            src={fallback}
                            alt="Takodachi"
                        />
                    </div>
                    <h3 className={tw`text-xl text-gray-700`}>รูปถ่าย</h3>
                    <input
                        ref={inputRef}
                        hidden
                        onChange={handleNewImage}
                        type="file"
                        accept="image/jpeg, image/png"
                        maxLength={5 * 1024 * 1024}
                    />
                </button>
            </div>
        </>
    )
}

export default ImagePicker
