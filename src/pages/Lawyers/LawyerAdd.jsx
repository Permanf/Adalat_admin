import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect, useCallback, useRef } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import blobToImage from "../../helpers/blobToImage"
import { setLoading, setRedirect } from "../../redux/reducers/mainReducer"
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import { useTranslation } from "react-i18next"
import AppLayout from "../../layouts/AppLayout"

import TM_FLAG from '../../assets/images/locales/tm.jpg'
import RU_FLAG from '../../assets/images/locales/ru.jpg'
import EN_FLAG from '../../assets/images/locales/en.jpg'
import { postLawyer } from "../../redux/actions/lawyerAction"

const LawyerAdd = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [imageInput, setImageInput] = useState({
        select_image: 'Surat saýlaň',
        image: '',
    })
    const [lawyer, setLawyer] = useState([]);
    const redirect = useSelector(state => state.main.redirect)

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

    const onSubmit = e => {
        e.preventDefault()

        // const image = await blobToImage(newCropedImage, 'banner.png')

        dispatch(postLawyer(lawyer))
        dispatch(setLoading(true))
        dispatch(setRedirect(true))
    }

    return (
        <>
            {
                redirect &&
                <Redirect to="/lawyers" />
            }

            <AppLayout>
                <form onSubmit={e => onSubmit(e)} className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl">
                    <h1 className="text-2xl font-montserrat-bold mb-3"> Hukukçy goşmak </h1>
                    {/* <p className="text-red-400 my-2">
                        ÜNS BERIŇ. Saýlanan suraty kesip täze görnüşini ýüklemeli!
                        Suraty kesmek üçin suratyň üstüne basyň.
                        Gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly
                    </p> */}
                    <p className="text-red-400 mt-2 mb-5">
                        ÜNS BERIŇ. Gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly
                    </p>

                    {/* <aside className="grid grid-cols-12">
                        {
                            imageInput.image &&
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
                        <label className="font-bold" htmlFor="logo"> Suraty: </label>

                        <div className="relative border border-gray-200 bg-gray-50 rounded-md my-2 px-4 py-2 h-12">
                            <label className="absolute top-3 left-4 text-gray-400" htmlFor="file">
                                { imageInput.select_image }
                            </label>
                            <input
                                onChange={e => {
                                    onSelectFile(e)
                                    setImageInput({...imageInput, select_image: e.target.files[0].name, image: e.target.files[0]})
                                }}
                                type="file"
                                className="opacity-0 absolute top-0 left-0 right-0 bottom-0 w-full"
                                accept="image/*"
                            />
                        </div>
                    </aside> */}

                    <aside className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 xl:col-span-4 flex flex-col">
                            <label className="flex items-center font-bold" htmlFor="title_tm">
                                <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                                Hukukçy ady
                                <p className="text-red-500 text-lg mx-2">*</p>
                            </label>
                            <input
                                id="title_tm"
                                type="text"
                                required
                                onChange={e => setLawyer({...lawyer, title: {...lawyer.title, tm: e.target.value}})}
                                placeholder="Hukukçy adyny giriziň"
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                            />
                        </div>

                        <div className="col-span-12 xl:col-span-4 flex flex-col">
                            <label className="flex items-center font-bold" htmlFor="title_ru">
                                <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                                Hukukçy ady
                            </label>
                            <input
                                id="title_ru"
                                type="text"
                                onChange={e => setLawyer({...lawyer, title: {...lawyer.title, ru: e.target.value}})}
                                placeholder="Hukukçy adyny giriziň"
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                            />
                        </div>

                        <div className="col-span-12 xl:col-span-4 flex flex-col">
                            <label className="flex items-center font-bold" htmlFor="title_en">
                                <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                                Hukukçy ady
                            </label>
                            <input
                                id="title_en"
                                type="text"
                                onChange={e => setLawyer({...lawyer, title: {...lawyer.title, en: e.target.value}})}
                                placeholder="Hukukçy adyny giriziň"
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                            />
                        </div>
                    </aside>


                    <aside className="grid grid-cols-12 gap-5 my-3">
                        <div className="col-span-12 xl:col-span-6 flex flex-col">
                            <label className="flex items-center font-bold" htmlFor="phone">
                                Telefon belgi
                                <p className="text-red-500 text-lg mx-2">*</p>
                            </label>
                            <input
                                id="phone"
                                type="text"
                                required
                                onChange={e => setLawyer({...lawyer, phone: e.target.value})}
                                placeholder="Hukukçy adyny giriziň"
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                            />
                        </div>

                        <div className="col-span-12 xl:col-span-6 flex flex-col">
                            <label className="flex items-center font-bold" htmlFor="email">
                                Email salgy
                            </label>
                            <input
                                id="email"
                                type="text"
                                onChange={e => setLawyer({...lawyer, email: e.target.value})}
                                placeholder="Hukukçy adyny giriziň"
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                            />
                        </div>
                    </aside>


                    <aside className="grid grid-cols-12 gap-5 my-3">
                        <div className="col-span-12 xl:col-span-6 flex flex-col">
                            <label className="flex items-center font-bold mb-1" htmlFor="website">
                                Web saýt
                            </label>
                            <input
                                id="website"
                                type="text"
                                onChange={e => setLawyer({...lawyer, website: e.target.value})}
                                placeholder="Hukukçy adyny giriziň"
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                            />
                        </div>

                        <div className="col-span-12 xl:col-span-6 flex flex-col">
                            <label className="flex items-center font-bold" htmlFor="license_number">
                                Ygtyýarnama belgi
                                <p className="text-red-500 text-lg mx-2">*</p>
                            </label>
                            <input
                                id="license_number"
                                type="text"
                                required
                                onChange={e => setLawyer({...lawyer, license_number: e.target.value})}
                                placeholder="Hukukçy adyny giriziň"
                                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                            />
                        </div>
                    </aside>


                    <aside className="flex flex-col my-4">
                        <label className="flex items-center font-bold mb-3" htmlFor="description_tm">
                            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                            Hukukçy barada maglumat
                            <p className="text-red-500 text-lg mx-2">*</p>
                        </label>

                        <CKEditor
                            editor={ DecoupledEditor }
                            config={ {
                                toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "link",
                                    "bulletedList",
                                    "numberedList",
                                    "blockQuote",
                                    "ckfinder",
                                    "|",
                                    "imageTextAlternative",
                                    "imageUpload",
                                    "imageStyle:full",
                                    "imageStyle:side",
                                    "|",
                                    "mediaEmbed",
                                    "insertTable",
                                    "tableColumn",
                                    "tableRow",
                                    "mergeTableCells",
                                    "|",
                                    "undo",
                                    "redo"
                                ]
                            } }
                            onReady={ editor => {
                                editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                                );
                            } }
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setLawyer({...lawyer, description: {...lawyer.description, tm: data}})
                            }}
                        />
                    </aside>

                    <aside className="flex flex-col my-4">
                        <label className="flex items-center font-bold mb-3" htmlFor="description_ru">
                            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                            Hukukçy barada maglumat
                        </label>

                        <CKEditor
                            editor={ DecoupledEditor }
                            config={ {
                                toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "link",
                                    "bulletedList",
                                    "numberedList",
                                    "blockQuote",
                                    "ckfinder",
                                    "|",
                                    "imageTextAlternative",
                                    "imageUpload",
                                    "imageStyle:full",
                                    "imageStyle:side",
                                    "|",
                                    "mediaEmbed",
                                    "insertTable",
                                    "tableColumn",
                                    "tableRow",
                                    "mergeTableCells",
                                    "|",
                                    "undo",
                                    "redo"
                                ]
                            } }
                            onReady={ editor => {
                                editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                                );
                            } }
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setLawyer({...lawyer, description: {...lawyer.description, ru: data}})
                            }}
                        />
                    </aside>

                    <aside className="flex flex-col my-4">
                        <label className="flex items-center font-bold mb-3" htmlFor="description_en">
                            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                            Hukukçy barada maglumat
                        </label>

                        <CKEditor
                            editor={ DecoupledEditor }
                            config={ {
                                toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "link",
                                    "bulletedList",
                                    "numberedList",
                                    "blockQuote",
                                    "ckfinder",
                                    "|",
                                    "imageTextAlternative",
                                    "imageUpload",
                                    "imageStyle:full",
                                    "imageStyle:side",
                                    "|",
                                    "mediaEmbed",
                                    "insertTable",
                                    "tableColumn",
                                    "tableRow",
                                    "mergeTableCells",
                                    "|",
                                    "undo",
                                    "redo"
                                ]
                            } }
                            onReady={ editor => {
                                editor.ui.getEditableElement().parentElement.insertBefore(
                                editor.ui.view.toolbar.element,
                                editor.ui.getEditableElement()
                                );
                            } }
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setLawyer({...lawyer, description: {...lawyer.description, en: data}})
                            }}
                        />
                    </aside>

                    <aside className="flex items-center justify-center mt-7">
                        <NavLink
                            to="/lawyers"
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
        </>
    )
}

export default LawyerAdd