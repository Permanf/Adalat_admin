import { useEffect, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'

import AppLayout from '../../layouts/AppLayout'
import TM_FLAG from '../../assets/images/locales/tm.jpg'
import RU_FLAG from '../../assets/images/locales/ru.jpg'
import EN_FLAG from '../../assets/images/locales/en.jpg'

import { postService } from '../../redux/actions/serviceAction'
import { setLoading } from '../../redux/reducers/mainReducer'
import blobToImage from '../../helpers/blobToImage'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useTranslation } from 'react-i18next'


const ServiceCreate = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [inputData, setInputData] = useState({
        select_image: 'Surat saýlaň',
        image: '',
    })
    const [title, setTitle] = useState(null)
    const [text, setText] = useState(null)
    const [type, setType] = useState(null)
    const redirect = useSelector(state => state.main.redirect)

    const [upImg, setUpImg] = useState();
    const [newCropedImage, setNewCropedImage] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 10, });
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
            title,
            text,
            type,
            image: await blobToImage(newCropedImage, 'surat.png')
        }

        dispatch(postService(data))
        dispatch(setLoading(true))
    }

    return (
        <AppLayout>
            {
                redirect && <Redirect to="/services" />
            }
            <form onSubmit={e => onSubmit(e)} className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl">
                <h1 className="text-2xl font-montserrat-bold"> Täze hyzmat girizmek </h1>
                <p className="text-red-400 my-3"> ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly. </p>

                <aside className="grid grid-cols-12 gap-5">
                    <ReactCrop
                        className="col-span-12 lg:col-span-7 w-full"
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
                                height: Math.round(completedCrop?.height ?? 0)
                            }}
                        />
                    </div>
                </aside>

               
                <aside className="flex flex-col my-4">
                    <label className="font-bold" htmlFor="logo"> Suraty </label>

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

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_tm">
                        <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                        Hyzmatyň sözbaşy
                        <p className="text-red-500 text-lg mx-2">*</p>
                    </label>
                    <input
                        id="title_tm"
                        type="text"
                        required
                        onChange={e => setTitle({...title, tm: e.target.value})}
                        placeholder="Hyzmatyň sözbaşyny giriziň"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_ru">
                        <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                        Hyzmatyň sözbaşy
                    </label>
                    <input
                        id="title_ru"
                        type="text"
                        onChange={e => setTitle({...title, ru: e.target.value})}
                        placeholder="Hyzmatyň sözbaşyny giriziň"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="title_en">
                        <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                        Hyzmatyň sözbaşy
                    </label>
                    <input
                        id="title_en"
                        type="text"
                        onChange={e => setTitle({...title, en: e.target.value})}
                        placeholder="Hyzmatyň sözbaşyny giriziň"
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_tm">
                        <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                        Hyzmatyň ýazgysy
                        <p className="text-red-500 text-lg mx-2">*</p>
                    </label>
                    
                    <CKEditor
                        editor={ DecoupledEditor }
                        onReady={ editor => {
                            editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                            );
                        } }
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setText({...text, tm: data})
                        }}
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_ru">
                        <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                        Hyzmatyň ýazgysy
                    </label>
                    
                    <CKEditor
                        editor={ DecoupledEditor }
                        onReady={ editor => {
                            editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                            );
                        } }
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setText({...text, ru: data})
                        }}
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold mb-2" htmlFor="text_en">
                        <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                        Hyzmatyň ýazgysy
                    </label>
                    
                    
                    <CKEditor
                        editor={ DecoupledEditor }
                        onReady={ editor => {
                            editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                            );
                        } }
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setText({...text, en: data})
                        }}
                    />
                </aside>

                <aside className="flex flex-col my-4">
                    <label className="flex items-center font-bold" htmlFor="text_en">
                        Hyzmatyň görnüşi
                        <p className="text-red-500 text-lg mx-2">*</p>
                    </label>
                    <select
                        onChange={e => setType(e.target.value)}
                        className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-2"
                    >
                        <option value="rayat"> Raýatlara </option>
                        <option value="karhana"> Kärhanalara </option>
                        <option value="hokumet"> Hökümet edaralara </option>
                    </select>
                </aside>

                <aside className="flex items-center justify-center my-10">
                    <NavLink
                        to="/services"
                        className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
                    >
                        { t('cancel') }
                    </NavLink>

                    <button
                        type="submit"
                        className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
                    >
                        { t('save') }
                    </button>
                </aside>
            </form>
        </AppLayout>
    )
}

export default ServiceCreate
