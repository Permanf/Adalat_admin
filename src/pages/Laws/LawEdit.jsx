import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";

import { setLoading, setRedirect } from "../../redux/reducers/mainReducer";
import AppLayout from "../../layouts/AppLayout";
import { NavLink, Redirect, useParams } from "react-router-dom";
import {
  getLawFile,
  loadLawConfirmDepartments,
  loadLaws,
  putLaw,
} from "../../redux/actions/lawsAction";
import getByLocale from "../../helpers/getByLocale";
import { loadYears } from "../../redux/actions/yearAction";
import LawFileAddImage from "./LawFileAddImage";
import Modal from "../../components/Modal/Modal";

const LawEdit = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const [editLaw, setEditLaw] = useState([]);
  const [editImage, setEditImage] = useState(false);
  const lawConfirmDepartments = useSelector(
    (state) => state.laws.law_confirm_departments
  );
  const law_file = useSelector((state) => state.laws.law_file);
  const laws = useSelector((state) => state.laws.laws);
  const redirect = useSelector((state) => state.main.redirect);
  const years = useSelector((state) => state.year.years);

  const closeAddImage = () => {
    setEditImage(false);
  };

  useEffect(() => {
    // console.log(editLaw);
  }, [editLaw]);

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id,
      title: {
        tm: editLaw.title.tm,
        ru: editLaw.title.ru,
        en: editLaw.title.en,
      },
      // text: {
      //     tm: editLaw.text.tm,
      //     ru: editLaw.text.ru,
      //     en: editLaw.text.en,
      // },
      year_id: editLaw.year_id,
      laws_id: editLaw.laws_id,
      manual: editLaw.manual,
      confirmed_date: editLaw.confirmed_date,
      code: editLaw.code,
      law_confirm_department_id: editLaw.lawConfirmedDepartment.id,
    };

    dispatch(putLaw(payload));
    dispatch(setLoading(true));
    dispatch(setRedirect(true));
  };

  useEffect(() => {
    dispatch(getLawFile(id));
    dispatch(loadLawConfirmDepartments());
    dispatch(loadLaws());
  }, [dispatch]);

  useEffect(() => {
    setEditLaw(law_file);
  }, [laws, law_file, lawConfirmDepartments]);

  useEffect(() => {
    dispatch(loadYears());
    setEditLaw(law_file);
  }, [law_file]);

  return (
    <>
      {redirect && <Redirect to={`/law/${editLaw.laws_id}`} />}

      {editImage && (
        <Modal isOpen={editImage} close={closeAddImage}>
          <LawFileAddImage lawID={id} close={closeAddImage} />
        </Modal>
      )}

      <AppLayout>
        <form
          onSubmit={(e) => onSubmit(e)}
          className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
        >
          <aside className="flex flex-col">
            <h1 className="text-2xl font-montserrat-bold">
              Hukuknamany ????tgetmek
            </h1>
            <p className="text-red-400 my-1">
              ??NS beri?? gyzyl ??yldyzjyk bilen belenen ????j??kleri h??kman
              doldurmaly.
            </p>
          </aside>

          <div
            onClick={() => setEditImage(!editImage)}
            className="text-green-500 hover:text-green-700 cursor-pointer duration-700"
          >
            <img
              className="w-36 my-3 rounded-xl"
              src={law_file.image}
              alt="Image"
              srcSet={law_file.image}
            />
          </div>

          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_tm">
              <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
              Hukuk ady
              <p className="text-red-500 text-lg mx-2">*</p>
            </label>
            <input
              id="title_tm"
              type="text"
              required
              onChange={(e) =>
                setEditLaw({
                  ...editLaw,
                  title: { ...editLaw.title, tm: e.target.value },
                })
              }
              value={editLaw.title && editLaw.title.tm}
              placeholder="T??zelik s??zba??yny girizi??"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_ru">
              <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
              Hukuk ady
            </label>
            <input
              id="title_ru"
              type="text"
              onChange={(e) =>
                setEditLaw({
                  ...editLaw,
                  title: { ...editLaw.title, ru: e.target.value },
                })
              }
              value={editLaw.title && editLaw.title.ru}
              placeholder="T??zelik s??zba??yny girizi??"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
            />
          </aside>

          <aside className="flex flex-col my-4">
            <label className="flex items-center font-bold" htmlFor="title_en">
              <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
              Hukuk ady
            </label>
            <input
              id="title_en"
              type="text"
              onChange={(e) =>
                setEditLaw({
                  ...editLaw,
                  title: { ...editLaw.title, en: e.target.value },
                })
              }
              value={editLaw.title && editLaw.title.en}
              placeholder="T??zelik s??zba??yny girizi??"
              className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
            />
          </aside>

          {/* <aside className="flex flex-col my-4">
                        <label className="flex items-center font-bold mb-2" htmlFor="text_tm">
                            <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                            Hukuk ??azgysy
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
                                setEditLaw({...editLaw, text: {...editLaw.text, tm: data}})
                            }}
                            data={editLaw.text && editLaw.text.tm}
                        />
                    </aside> */}

          {/* <aside className="flex flex-col my-4">
                        <label className="flex items-center font-bold mb-2" htmlFor="text_ru">
                            <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                            Hukuk ??azgysy
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
                                setEditLaw({...editLaw, text: {...editLaw.text, ru: data}})
                            }}
                            data={editLaw.text && editLaw.text.ru}
                        />
                    </aside> */}

          {/* <aside className="flex flex-col my-4">
                        <label className="flex items-center font-bold mb-2" htmlFor="text_en">
                            <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                            Hukuk ??azgysy
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
                                setEditLaw({...editLaw, text: {...editLaw.text, en: data}})
                            }}
                            data={editLaw.text && editLaw.text.en}
                        />
                    </aside> */}

          <aside className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-6 flex flex-col">
              <label className="flex items-center font-bold" htmlFor="code">
                D??wlet belgi alny??y
              </label>
              <input
                id="code"
                type="text"
                onChange={(e) =>
                  setEditLaw({ ...editLaw, code: e.target.value })
                }
                value={editLaw.code && editLaw.code}
                placeholder="D??wlet belgi alny??y"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
              />
            </div>

            <div className="col-span-12 lg:col-span-6 flex flex-col">
              <label
                className="flex items-center font-bold"
                htmlFor="confirmed_date"
              >
                Kabul edilen senesi
              </label>
              <input
                id="confirmed_date"
                type="text"
                onChange={(e) =>
                  setEditLaw({ ...editLaw, confirmed_date: e.target.value })
                }
                value={editLaw.confirmed_date && editLaw.confirmed_date}
                placeholder="Kabul edilen senesi"
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300  my-2 px-4 py-3"
              />
            </div>
          </aside>

          <aside className="grid grid-cols-12 gap-5 my-3">
            {lawConfirmDepartments && lawConfirmDepartments.length > 0 && (
              <div className="col-span-12 lg:col-span-6 flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="department_id"
                >
                  {t("confirm_department")}
                </label>
                <select
                  onChange={(e) =>
                    setEditLaw({
                      ...editLaw,
                      law_confirm_department_id: e.target.value,
                    })
                  }
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3"
                >
                  {lawConfirmDepartments.map((lawConfirmDepartment, index) => {
                    return (
                      <option
                        selected={lawConfirmDepartment.id}
                        key={index}
                        value={lawConfirmDepartment.id}
                      >
                        {lawConfirmDepartment.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {years && years.length > 0 && editLaw.year && (
              <div className="col-span-12 lg:col-span-6 flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="year_id"
                >
                  {t("confirmation_year")}
                </label>
                <select
                  onChange={(e) =>
                    setEditLaw({ ...editLaw, year_id: e.target.value })
                  }
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3"
                >
                  {years.map((year, index) => {
                    return (
                      <option
                        selected={editLaw.year.id === year.id}
                        key={index}
                        value={year.id}
                      >
                        {year.year}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </aside>

          <aside className="grid grid-cols-12 gap-5">
            {laws && laws.length > 0 && (
              <div className="col-span-12 lg:col-span-6 flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="department_id"
                >
                  Namany?? g??rn????i
                </label>
                <select
                  onChange={(e) =>
                    setEditLaw({ ...editLaw, department_id: e.target.value })
                  }
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3"
                >
                  {laws.map((law, index) => {
                    return (
                      law &&
                      law.id && (
                        <option
                          selected={law.id === editLaw.laws_id}
                          key={index}
                          value={law.id}
                        >
                          {getByLocale(law.title)}
                        </option>
                      )
                    );
                  })}
                </select>
              </div>
            )}

            <div className="col-span-12 lg:col-span-6 flex flex-col">
              <label className="flex items-center font-bold" htmlFor="manual">
                Gollanma
              </label>
              <select
                onChange={(e) =>
                  setEditLaw({ ...editLaw, manual: e.target.value })
                }
                className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 my-2 px-4 py-3"
              >
                <option selected={editLaw.manual === 0} value="0">
                  ??ok
                </option>
                <option selected={editLaw.manual === 1} value="1">
                  Hawa
                </option>
              </select>
            </div>
          </aside>

          <aside className="flex items-center justify-center mt-10">
            <NavLink
              to="/laws"
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
    </>
  );
};

export default LawEdit;
