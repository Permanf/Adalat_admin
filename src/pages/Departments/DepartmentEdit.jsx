import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../../layouts/AppLayout";
import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";
import getByLocale from "../../helpers/getByLocale";
import { loadProvinces } from "../../redux/actions/provinceAction";
import { setLoading, setRedirect } from "../../redux/reducers/mainReducer";
import { updateDepartment } from "../../redux/actions/departmentAction";
import api from "../../services/api.service";
import DepartmentAddImage from "./DepartmentAddImage";

const DepartmentEdit = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [departmentSections, setDepartmentSections] = useState([]);
  const [department, setDepartment] = useState([]);
  const [addImageModal, setAddImageModal] = useState(false);
  const provinces = useSelector((state) => state.province.provinces);
  const redirect = useSelector((state) => state.main.redirect);

  const openAddImageModal = () => setAddImageModal(true);
  const closeAddImageModal = () => setAddImageModal(false);

  useEffect(() => {
    dispatch(loadProvinces());

    try {
      api.get(`department/${id}`).then((res) => {
        setDepartment(res.data.data);
        setDepartmentSections(res.data.data.sections);
      });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    if (department.province_id) {
      try {
        api.get(`province/${department.province_id}/sections`).then((res) => {
          setDepartmentSections(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [department.province_id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: department.id,
      title: {
        tm: department.title.tm,
        ru: department.title.ru,
        en: department.title.en,
      },
      address: department.address,
      boss: department.boss,
      deputy_head: department.deputy_head,
      email: department.email,
      phone: department.phone,
      latitude: department.latitude,
      longitude: department.longitude,
      province_id: department.province_id,
      department_section_id: department.department_section_id,
    };

    dispatch(updateDepartment(data));
    dispatch(setLoading(true));
    dispatch(setRedirect(true));
  };

  return (
    <>
      {redirect && <Redirect to="/departments" />}

      {addImageModal && (
        <DepartmentAddImage
          departmentId={department.id}
          open={openAddImageModal}
          close={closeAddImageModal}
        />
      )}
      <AppLayout>
        {department && (
          <form
            onSubmit={(e) => onSubmit(e)}
            className="bg-white p-8 mb-10 shadow-gray-sm rounded-xl"
          >
            <h1 className="text-2xl font-montserrat-bold">
              Edara suratyny üýtgetmek
            </h1>
            <p className="text-red-400 mt-3 mb-5">
              ÜNS BERIŇ. Suraty kesilen görnüşini ýüklemeli.
            </p>
            <img
              onClick={() => openAddImageModal()}
              src={department.image_mini}
              alt="Edara"
              className="rounded-md cursor-pointer mb-8"
            />

            <h1 className="text-2xl font-montserrat-bold">
              Edara maglumatlary üýtgetmek
            </h1>
            <p className="text-red-400 mt-3 mb-5">
              ÜNS BERIŇ. Gyzyl ýyldyzjyk bilen belenen öýjükleri hökman
              doldurmaly.
            </p>

            <main className="grid grid-cols-12 gap-3">
              <h1 className="col-span-12 font-montserrat-bold text-xl text-green-600 my-5">
                Edaranyň ady
              </h1>

              <aside className="col-span-12 lg:col-span-4 flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="title_tm"
                >
                  <img className="w-8 mr-3" src={TM_FLAG} alt="TM" />
                  Edara ady
                  <p className="text-red-500 text-md mx-2">*</p>
                </label>
                <input
                  id="title_tm"
                  type="text"
                  required
                  onChange={(e) =>
                    setDepartment({
                      ...department,
                      title: { ...department.title, tm: e.target.value },
                    })
                  }
                  value={department.title && department.title.tm}
                  placeholder="Edara adyny giriziň"
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
              </aside>

              <aside className="col-span-12 lg:col-span-4 flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="title_ru"
                >
                  <img className="w-8 mr-3" src={RU_FLAG} alt="RU" />
                  Edara ady
                </label>
                <input
                  id="title_ru"
                  type="text"
                  onChange={(e) =>
                    setDepartment({
                      ...department,
                      title: { ...department.title, ru: e.target.value },
                    })
                  }
                  value={department.title && department.title.ru}
                  placeholder="Edara adyny giriziň"
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
              </aside>

              <aside className="col-span-12 lg:col-span-4 flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="title_en"
                >
                  <img className="w-8 mr-3" src={EN_FLAG} alt="EN" />
                  Edara ady
                </label>
                <input
                  id="title_en"
                  type="text"
                  onChange={(e) =>
                    setDepartment({
                      ...department,
                      title: { ...department.title, en: e.target.value },
                    })
                  }
                  value={department.title && department.title.en}
                  placeholder="Edara adyny giriziň"
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
              </aside>
            </main>

            <main className="grid grid-cols-12 gap-3">
              <h1 className="col-span-12 font-montserrat-bold text-xl text-green-600 my-5">
                Edaranyň başlygy we orunbasary
              </h1>

              <aside className="col-span-12 lg:col-span-6 flex flex-col">
                <label className="flex items-center font-bold" htmlFor="boss">
                  Edaranyň başlygy
                </label>
                <input
                  id="boss"
                  type="text"
                  onChange={(e) =>
                    setDepartment({ ...department, boss: e.target.value })
                  }
                  value={department.boss}
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
                    setDepartment({
                      ...department,
                      deputy_head: e.target.value,
                    })
                  }
                  value={department.deputy_head}
                  placeholder="Edaranyň başlygynyň orunbasaryny giriziň"
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
              </aside>
            </main>

            <main className="grid grid-cols-12 gap-3">
              <h1 className="col-span-12 font-montserrat-bold text-xl text-green-600 my-5">
                Habarlaşmak üçin
              </h1>

              <aside className="col-span-12 lg:col-span-6 flex flex-col">
                <label className="flex items-center font-bold" htmlFor="phone">
                  Edaranyň telefon belgileri
                </label>
                <input
                  id="phone"
                  type="text"
                  onChange={(e) =>
                    setDepartment({ ...department, phone: e.target.value })
                  }
                  value={department.phone}
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
                    setDepartment({ ...department, email: e.target.value })
                  }
                  value={department.email}
                  placeholder="Edaranyň elektron poçtasyny giriziň"
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
              </aside>
            </main>

            <main className="grid grid-cols-12 gap-3">
              <h1 className="col-span-12 font-montserrat-bold text-xl text-green-600 my-5">
                Edaranyň ýerleşýän ýeri
              </h1>

              <aside className="col-span-12 lg:col-span-4 flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="address"
                >
                  Edaranyň salgysy
                </label>
                <input
                  id="address"
                  type="text"
                  onChange={(e) =>
                    setDepartment({ ...department, address: e.target.value })
                  }
                  value={department.address}
                  placeholder="Edaranyň salgysyny giriziň"
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
              </aside>

              {provinces && provinces.length > 0 && (
                <aside className="col-span-12 lg:col-span-4 flex flex-col">
                  <label
                    className="flex items-center font-bold"
                    htmlFor="province_id"
                  >
                    {t("province")}
                  </label>
                  <select
                    onChange={(e) =>
                      setDepartment({
                        ...department,
                        province_id: e.target.value,
                      })
                    }
                    className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                  >
                    {provinces.map((province, index) => {
                      return (
                        <option
                          selected={
                            department.province &&
                            department.province.id === province.id
                          }
                          key={index}
                          value={province.id}
                        >
                          {getByLocale(province.name)}
                        </option>
                      );
                    })}
                  </select>
                </aside>
              )}

              {departmentSections && departmentSections.length > 0 && (
                <aside className="col-span-12 lg:col-span-4 flex flex-col">
                  <label
                    className="flex items-center font-bold"
                    htmlFor="province_id"
                  >
                    {t("department_section")}
                  </label>
                  <select
                    onChange={(e) => {
                      setDepartment({
                        ...department,
                        department_section_id: e.target.value,
                      });
                    }}
                    className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                  >
                    {departmentSections.map((departmentSection, index) => {
                      return (
                        <option
                          selected={
                            department.department_section_id ===
                            departmentSection.id
                          }
                          key={index}
                          value={departmentSection.id}
                        >
                          {departmentSection.name}
                        </option>
                      );
                    })}
                  </select>
                </aside>
              )}
            </main>

            <main className="grid grid-cols-12 gap-3">
              <h1 className="col-span-12 font-montserrat-bold text-xl text-green-600 my-5">
                Edaranyň kartadaky kordinatalary
              </h1>

              <aside className="col-span-12 lg:col-span-6 flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="latitude"
                >
                  Giňişlik (latitude)
                </label>
                <input
                  id="latitude"
                  type="text"
                  onChange={(e) =>
                    setDepartment({ ...department, latitude: e.target.value })
                  }
                  value={department.latitude}
                  placeholder="37.8946111075778"
                  className="border border-gray-200 bg-gray-50 focus:outline-none focus:border-gray-400 duration-300 rounded-md my-2 px-4 py-3"
                />
              </aside>

              <aside className="col-span-12 lg:col-span-6 flex flex-col">
                <label
                  className="flex items-center font-bold"
                  htmlFor="longitude"
                >
                  Uzynlyk (longitude)
                </label>
                <input
                  id="longitude"
                  type="text"
                  onChange={(e) =>
                    setDepartment({ ...department, longitude: e.target.value })
                  }
                  value={department.longitude}
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
        )}
      </AppLayout>
    </>
  );
};

export default DepartmentEdit;
