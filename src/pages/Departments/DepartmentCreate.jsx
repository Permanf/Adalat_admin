import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import AppLayout from "../../layouts/AppLayout";
import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";
import getByLocale from "../../helpers/getByLocale";
import { loadProvinces } from "../../redux/actions/provinceAction";
import { setLoading, setRedirect } from "../../redux/reducers/mainReducer";
import { postDepartment } from "../../redux/actions/departmentAction";
import blobToImage from "../../helpers/blobToImage";

const DepartmentCreate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    select_image: "Surat saýlaň",
    image: "",
    province_id: 1,
  });
  const provinces = useSelector((state) => state.province.provinces);
  const redirect = useSelector((state) => state.main.redirect);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
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
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

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
        const reader = new FileReader();
        blob && reader.readAsDataURL(blob);
        reader.addEventListener("load", () =>
          setInputData({ ...inputData, cropedImage: reader.result })
        );
      },
      "image/png",
      1
    );
  }, [completedCrop]);

  useEffect(() => {
    dispatch(loadProvinces());
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: {
        tm: inputData.tm,
        ru: inputData.ru,
        en: inputData.en,
      },
      image: await blobToImage(inputData.cropedImage, "surat.png"),
      address: inputData.address,
      boss: inputData.boss,
      deputy_head: inputData.deputy_head,
      email: inputData.email,
      phone: inputData.phone,
      latitude: inputData.latitude,
      longitude: inputData.longitude,
      province_id: inputData.province_id,
    };

    dispatch(postDepartment(data));
    dispatch(setLoading(true));
    dispatch(setRedirect(true));
  };

  return (
    <AppLayout>
      {redirect && <Redirect to="/departments" />}
      <form
        onSubmit={(e) => onSubmit(e)}
        className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
      >
        <h1 className="text-2xl font-montserrat-bold"> Täze edara girizmek </h1>
        <p className="text-red-400 mt-3 mb-5">
          {" "}
          ÜNS beriň gyzyl ýyldyzjyk bilen belenen öýjükleri hökman doldurmaly.{" "}
        </p>

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
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </div>
        </aside>
        <aside className="flex flex-col my-2">
          <label className="font-bold" htmlFor="logo">
            {" "}
            Edaranyň suraty{" "}
          </label>

          <div className="relative border border-gray-200 bg-gray-50 rounded-md my-2 px-4 py-2 h-12">
            <label
              className="absolute top-3 left-4 text-gray-400"
              htmlFor="file"
            >
              {inputData.select_image}
            </label>
            <input
              onChange={(e) => {
                onSelectFile(e);
                setInputData({
                  ...inputData,
                  select_image: e.target.files[0].name,
                  image: e.target.files[0],
                });
              }}
              type="file"
              className="opacity-0 absolute top-0 left-0 right-0 bottom-0 w-full"
              accept="image/*"
            />
          </div>
        </aside>

        <main className="grid grid-cols-12 gap-3">
          <h1 className="col-span-12 font-montserrat-bold text-xl text-green-600 my-5">
            {" "}
            Edaranyň ady{" "}
          </h1>

          <aside className="col-span-12 lg:col-span-4 flex flex-col">
            <label className="flex items-center font-bold" htmlFor="title_tm">
              <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
              Edara ady
              <p className="text-red-500 text-md mx-2">*</p>
            </label>
            <input
              id="title_tm"
              type="text"
              required
              onChange={(e) =>
                setInputData({ ...inputData, tm: e.target.value })
              }
              placeholder="Edara adyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          <aside className="col-span-12 lg:col-span-4 flex flex-col">
            <label className="flex items-center font-bold" htmlFor="title_ru">
              <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
              Edara ady
            </label>
            <input
              id="title_ru"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, ru: e.target.value })
              }
              placeholder="Edara adyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          <aside className="col-span-12 lg:col-span-4 flex flex-col">
            <label className="flex items-center font-bold" htmlFor="title_en">
              <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
              Edara ady
            </label>
            <input
              id="title_en"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, en: e.target.value })
              }
              placeholder="Edara adyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>
        </main>

        <main className="grid grid-cols-12 gap-3">
          <h1 className="col-span-12 font-montserrat-bold text-xl text-green-600 my-5">
            {" "}
            Edaranyň başlygy we orunbasary{" "}
          </h1>

          <aside className="col-span-12 lg:col-span-6 flex flex-col">
            <label className="flex items-center font-bold" htmlFor="boss">
              Edaranyň başlygy
            </label>
            <input
              id="boss"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, boss: e.target.value })
              }
              placeholder=" Edaranyň başlygyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          <aside className="col-span-12 lg:col-span-6 flex flex-col">
            <label
              className="flex items-center font-bold"
              htmlFor="deputy_head"
            >
              Edaranyň başlygynyň orunbasary
            </label>
            <input
              id="deputy_head"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, deputy_head: e.target.value })
              }
              placeholder="Edaranyň başlygynyň orunbasaryny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>
        </main>

        <main className="grid grid-cols-12 gap-3">
          <h1 className="col-span-12 font-montserrat-bold text-xl text-green-600 my-5">
            {" "}
            Habarlaşmak üçin{" "}
          </h1>

          <aside className="col-span-12 lg:col-span-6 flex flex-col">
            <label className="flex items-center font-bold" htmlFor="phone">
              Edaranyň telefon belgileri
            </label>
            <input
              id="phone"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, phone: e.target.value })
              }
              placeholder="Edaranyň telefon belgilerini giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          <aside className="col-span-12 lg:col-span-6 flex flex-col">
            <label className="flex items-center font-bold" htmlFor="email">
              Edaranyň elektron poçtasy
            </label>
            <input
              id="email"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
              placeholder="Edaranyň elektron poçtasyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>
        </main>

        <main className="grid grid-cols-12 gap-3">
          <h1 className="col-span-12 font-montserrat-bold text-xl text-green-600 my-5">
            {" "}
            Edaranyň ýerleşýän ýeri{" "}
          </h1>

          <aside className="col-span-12 lg:col-span-6 flex flex-col">
            <label className="flex items-center font-bold" htmlFor="address">
              Edaranyň salgysy
            </label>
            <input
              id="address"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, address: e.target.value })
              }
              placeholder="Edaranyň salgysyny giriziň"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          {provinces && provinces.length > 0 && (
            <aside className="col-span-12 lg:col-span-6 flex flex-col">
              <label
                className="flex items-center font-bold"
                htmlFor="province_id"
              >
                {t("province")}
              </label>
              <select
                onChange={(e) =>
                  setInputData({ ...inputData, province_id: e.target.value })
                }
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
              >
                {provinces.map((province, index) => {
                  return (
                    <option key={index} value={province.id}>
                      {" "}
                      {getByLocale(province.name)}{" "}
                    </option>
                  );
                })}
              </select>
            </aside>
          )}
        </main>

        <main className="grid grid-cols-12 gap-3">
          <h1 className="col-span-12 font-montserrat-bold text-xl text-green-600 my-5">
            {" "}
            Edaranyň kartadaky kordinatalary{" "}
          </h1>

          <aside className="col-span-12 lg:col-span-6 flex flex-col">
            <label className="flex items-center font-bold" htmlFor="latitude">
              Giňişlik (latitude)
            </label>
            <input
              id="latitude"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, latitude: e.target.value })
              }
              placeholder="37.8946111075778"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>

          <aside className="col-span-12 lg:col-span-6 flex flex-col">
            <label className="flex items-center font-bold" htmlFor="longitude">
              Uzynlyk (longitude)
            </label>
            <input
              id="longitude"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, longitude: e.target.value })
              }
              placeholder="58.31579751630882"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
            />
          </aside>
        </main>

        <aside className="flex items-center justify-center mt-10">
          <NavLink
            to="/departments"
            className="bg-gray-50 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold duration-300 border border-gray-200 rounded-lg px-5 py-2 mx-2"
          >
            {t("cancel")}
          </NavLink>

          <button
            type="submit"
            className="bg-white text-green-700 border border-green-700 hover:bg-green-700 hover:text-white duration-300 font-bold rounded-lg px-5 py-2 mx-2"
          >
            {t("save")}
          </button>
        </aside>
      </form>
    </AppLayout>
  );
};

export default DepartmentCreate;
