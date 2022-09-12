import { useTranslation } from "react-i18next"
import { useState, useEffect, useCallback, useRef } from 'react'
import blobToImage from "../../helpers/blobToImage"
import { setLoading } from "../../redux/reducers/mainReducer"
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect } from 'react-router-dom'
import { postBanner } from "../../redux/actions/bannerAction"
import Modal from "../../components/Modal/Modal"
import { addDepartmentImage } from "../../redux/actions/departmentAction"


const DepartmentAddImage = ({departmentId, open, close}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const redirect = useSelector(state => state.main.redirect)
    const [inputData, setInputData] = useState({
        select_image: 'Surat saýlaň',
        image: '',
    })


    const [upImg, setUpImg] = useState();
    const [newCropedImage, setNewCropedImage] = useState();
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

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            id: departmentId,
            image: await blobToImage(newCropedImage, 'department.png'),
        }

        dispatch(addDepartmentImage(data))
        dispatch(setLoading(true))
    }

    return (
        <Modal isOpen={open} close={close}>
            {
                redirect && <Redirect to="/departments" />
            }
            <form onSubmit={e => onSubmit(e)} className="bg-white font-montserrat-medium p-8 mb-10 rounded-xl">
                <h1 className="text-2xl font-montserrat-bold mb-3"> Edara surat goşmak </h1>

                <aside className="grid grid-cols-12 gap-5">
                    <ReactCrop
                        className="col-span-12 lg:col-span-7"
                        src={upImg}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                    />
                    <div className="col-span-12 lg:col-span-5">
                        <canvas
                            className="max-w-full h-auto"
                            ref={previewCanvasRef}
                            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                            style={{
                                width: Math.round(completedCrop?.width ?? 0),
                                // height: Math.round(completedCrop?.height ?? 0)
                            }}
                        />
                    </div>
                </aside>

               
                <aside className="flex flex-col my-4">
                    <label className="font-bold" htmlFor="logo"> Surat: </label>

                    <div className="relative border border-gray-200 bg-gray-50 rounded-md my-2 px-4 py-2 h-12">
                        <label className="absolute top-3 left-4 text-gray-400" htmlFor="file">
                            { inputData.select_image }
                        </label>
                        <input
                            onChange={e => {
                                onSelectFile(e)
                                setInputData({...inputData, select_image: e.target.files[0].name, image: e.target.files[0]})
                            }}
                            type="file"
                            className="opacity-0 absolute top-0 left-0 right-0 bottom-0 w-full"
                            accept="image/*"
                        />
                    </div>
                </aside>

                <aside className="flex items-center justify-center mt-7">
                    <button
                        onClick={ () => close() }
                        className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
                    >
                        { t('cancel') }
                    </button>

                    <button
                        type="submit"
                        className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
                    >
                        { t('save') }
                    </button>
                </aside>
            </form>
        </Modal>
    )
}

export default DepartmentAddImage