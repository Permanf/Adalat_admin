import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  IoAddCircleOutline,
  IoArrowUndoOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import AppLayout from "../../layouts/AppLayout";
import api from "../../services/api.service";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";
import EmptyList from "../../components/Empty/EmptyList";
import { useParams, useHistory } from "react-router-dom";
import getByLocale from "../../helpers/getByLocale";
import ServiceCategoryEdit from "./ServiceCategoryEdit";
import SmallModal from "../../components/Modal/SmallModal";
import ServiceCategoryDelete from "./ServiceCategoryDelete";
import ServiceCategoryItemEdit from "./ServiceCategoryItemEdit";
import ServiceCategoryItemDelete from "./ServiceCategoryItemDelete";

const ServiceCategoryShow = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();

  const [category, setCategory] = useState([]);
  const [categoryEdit, setCategoryEdit] = useState(false);
  const [categoryDelete, setCategoryDelete] = useState(false);
  const [itemEdit, setItemEdit] = useState({
    item: [],
    edit: false,
  });
  const [itemDelete, setItemDelete] = useState({
    id: 0,
    delete: false,
  });
  const [title, setTitle] = useState([]);
  const [price, setPrice] = useState(0);

  const getServiceCategory = () => {
    api
      .get(`services/categories/${id}`)
      .then((res) => setCategory(res.data.data))
      .catch((err) => {
        toast.error("Bölüm ýüklenmedi", {
          duration: 2000,
        });
      });
  };

  useEffect(() => {
    getServiceCategory();
  }, []);

  const toggleEditModal = () => {
    setCategoryEdit(!categoryEdit);
  };

  const toggleDeleteModal = () => {
    setCategoryDelete(!categoryDelete);
  };

  const toggleItemEditModal = (item) => {
    setItemEdit({ item: itemEdit.edit ? [] : item, edit: !itemEdit.edit });
  };

  const toggleItemDeleteModal = (id) => {
    setItemDelete({
      id: itemDelete.delete ? [] : id,
      delete: !itemDelete.delete,
    });
  };

  const removeItem = (id) => {
    setCategory({
      ...category,
      items: category.items.filter((item) => item.id !== id),
    });
  };

  const categoryItemSave = () => {
    const data = {
      title,
      price,
    };

    title &&
      title.tm &&
      title.tm.length > 0 &&
      title &&
      title.ru &&
      title.ru.length > 0 &&
      api
        .post(`services/categories/${id}/items`, data)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          toast.error("Hyzmat sanawa goşulmady", {
            duration: 2000,
          });
        });
  };

  return (
    <>
      <SmallModal isOpen={categoryEdit}>
        <ServiceCategoryEdit close={toggleEditModal} />
      </SmallModal>

      <SmallModal isOpen={itemEdit.edit}>
        <ServiceCategoryItemEdit
          item={itemEdit.item}
          close={toggleItemEditModal}
        />
      </SmallModal>

      <SmallModal isOpen={categoryDelete}>
        <ServiceCategoryDelete id={id} close={toggleDeleteModal} />
      </SmallModal>

      <SmallModal isOpen={itemDelete.delete}>
        <ServiceCategoryItemDelete
          id={itemDelete.id}
          returnUrl={history.location.pathname}
          removeItem={removeItem}
          close={toggleItemDeleteModal}
        />
      </SmallModal>
      <AppLayout>
        <section>
          <header className="bg-white p-3 rounded-lg flex items-center justify-between">
            <aside className="flex items-center">
              <button
                onClick={() => history.goBack()}
                className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full mr-3"
              >
                <IoArrowUndoOutline size={24} />
              </button>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                  {category.title && getByLocale(category.title)}
                </h1>
                <small className="flex font-montserrat-medium text-sm text-gray-500">
                  <p>{t("total")}:</p>
                  <p className="ml-2">
                    {category && category.items && category.items.length}
                  </p>
                </small>
              </div>
            </aside>

            <aside className="flex">
              <button
                onClick={() => toggleEditModal()}
                className="flex bg-green-50 text-green-700 text-sm px-3 py-2 mr-2 rounded-lg"
              >
                <IoPencilOutline className="mr-1" size={18} />
                {t("edit")}
              </button>
              <button
                onClick={() => toggleDeleteModal()}
                className="flex bg-red-50 text-red-700 text-sm px-3 py-2 mr-2 rounded-lg"
              >
                <IoTrashOutline className="mr-1" size={18} />
                {t("remove")}
              </button>
            </aside>
          </header>

          <main className="grid grid-cols-12 gap-5 my-5">
            <section className="xl:order-1 order-2 col-span-12 xl:col-span-9 bg-white rounded-lg p-5">
              <h1 className="font-montserrat-bold text-lg text-gray-700 mb-4">
                {t("service_item_list")}
              </h1>

              {category && category.items && category.items.length === 0 && (
                <EmptyList message="Sanaw boş" />
              )}
              {category &&
                category.items &&
                category.items.length > 0 &&
                category.items.map((categoryItem, index) => {
                  return (
                    <aside
                      key={index}
                      className="flex items-center justify-between border border-gray-100 hover:bg-gray-50 text-gray-800 px-5 py-2 cursor-pointer rounded-md mb-2"
                    >
                      <div className="flex flex-col">
                        <strong className="text-gray-600">
                          {categoryItem.title && categoryItem.title.tm}
                        </strong>
                        <small className="text-green-600">
                          {t("price")}: {categoryItem.price} TMT
                        </small>
                      </div>

                      <div className="flex">
                        <button
                          onClick={() => toggleItemEditModal(categoryItem)}
                          className="flex bg-green-50 text-green-700 text-sm px-3 py-2 mr-2 rounded-lg"
                        >
                          <IoPencilOutline size={18} />
                        </button>
                        <button
                          onClick={() => toggleItemDeleteModal(categoryItem.id)}
                          className="flex bg-red-50 text-red-700 text-sm px-3 py-2 rounded-lg"
                        >
                          <IoTrashOutline size={18} />
                        </button>
                      </div>
                    </aside>
                  );
                })}
            </section>

            <section className="xl:order-2 order-1 col-span-12 xl:col-span-3 bg-white rounded-lg h-125 p-5">
              <form>
                <div className="flex flex-col">
                  <label className="flex items-center mb-2" htmlFor="title_tm">
                    <img
                      data-tip="Türkmen dilinde"
                      className="w-6 h-4 mr-3"
                      src={TM_FLAG}
                      alt="TM"
                    />
                    <p> Hyzmat ady </p>
                  </label>
                  <input
                    required
                    id="title_tm"
                    onChange={(e) => setTitle({ ...title, tm: e.target.value })}
                    type="text"
                    placeholder="Hyzmat adyny giriziň"
                    className="border p-2 rounded mr-1 mb-4 w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="flex items-center mb-2" htmlFor="title_ru">
                    <img
                      data-tip="Rus dilinde"
                      className="w-6 h-4 mr-3"
                      src={RU_FLAG}
                      alt="RU"
                    />
                    <p> Hyzmat ady </p>
                  </label>
                  <input
                    required
                    id="title_ru"
                    onChange={(e) => setTitle({ ...title, ru: e.target.value })}
                    type="text"
                    placeholder="Hyzmat adyny giriziň"
                    className="border p-2 rounded mr-1 mb-4 w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="flex items-center mb-2" htmlFor="title_en">
                    <img
                      data-tip="Iňlis dilinde"
                      className="w-6 h-4 mr-3"
                      src={EN_FLAG}
                      alt="EN"
                    />
                    <p> Hyzmat ady </p>
                  </label>
                  <input
                    id="title_en"
                    onChange={(e) => setTitle({ ...title, en: e.target.value })}
                    type="text"
                    placeholder="Hyzmat adyny giriziň"
                    className="border p-2 rounded mr-1 mb-4 w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="flex items-center mb-2" htmlFor="price">
                    <p> Hyzmatyň bahasy </p>
                  </label>
                  <input
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="Hyzmatyň bahasyny giriziň"
                    className="border p-2 rounded mr-1 mb-4 w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => categoryItemSave()}
                  className="flex items-center justify-center mx-auto text-green-600 hover:bg-green-600 hover:text-white border border-green-600 duration-300 p-2 rounded"
                >
                  <IoAddCircleOutline size={22} className="mr-2" /> Sanawa goş
                </button>
              </form>
            </section>
          </main>
        </section>
      </AppLayout>
    </>
  );
};

export default ServiceCategoryShow;
