import { useTranslation } from "react-i18next"
import { useState, useEffect, useCallback, useRef } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from "react-redux"



const LiteratureFileAddImage = ({ litId, close, newCropedImage, setNewCropedImage }) => {

    const [inputData, setInputData] = useState({
        select_image: 'Surat saýlaň',
        image: '',
    })


    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, });
    const [completedCrop, setCompletedCrop] = useState(null);

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        canvas.toBlob(
            (blob) => {
                const reader = new FileReader()
                blob && reader.readAsDataURL(blob)
                reader.addEventListener('load', () => setNewCropedImage(reader.result))
            },
            'image/png',
            1
        );

    }, [completedCrop]);


    // const addImage = async(image)=>{
    //     try{
    //         const formData = new FormData()
    //         formData.append('image', image)
    //         const response = await api.post('/law-literature/image',formData)
    //         if (response.status ===200){
    //             toast.success(t('success_added'), {
    //                 duration: 2000,
    //             })
    //         }
    //     }
    //     catch(e){
    //         toast.error(t('error_not_added'), {
    //             duration: 2000,
    //         })
    //     }
    // }



    return (
        <>

            <p className="text-red-400 my-2"> ÜNS BERIŇ. Saýlanan suraty kesip täze görnüşini ýüklemeli! Suraty kesmek üçin suratyň üstüne basyň. </p>

            <aside className="grid grid-cols-12">
                {
                    inputData.image &&
                    <p className="col-span-12 font-bold mb-2"> Saýlanan surat: </p>
                }
                <ReactCrop
                    className="col-span-12"
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                />
                <div className="col-span-12">
                    {
                        newCropedImage &&
                        <p className="col-span-12 font-bold mt-7"> Surat kesilen görnüşi: </p>
                    }
                    <canvas
                        className="max-w-full my-2 h-auto"
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            // height: Math.round(completedCrop?.height ?? 0)
                        }}
                    />
                </div>
            </aside>


            <aside className="flex flex-col my-2">
                <label className="font-bold" htmlFor="logo"> Surat: </label>

                <div className="relative border border-gray-200 bg-gray-50 rounded-md my-2 px-4 py-2 h-12">
                    <label className="absolute top-3 left-4 text-gray-400" htmlFor="file">
                        {inputData.select_image}
                    </label>
                    <input
                        onChange={e => {
                            onSelectFile(e)
                            setInputData({ ...inputData, select_image: e.target.files[0].name, image: e.target.files[0] })
                        }}
                        type="file"
                        className="opacity-0 absolute top-0 left-0 right-0 bottom-0 w-full"
                        accept="image/*"
                    />
                </div>
            </aside>



        </>
    )
}

export default LiteratureFileAddImage