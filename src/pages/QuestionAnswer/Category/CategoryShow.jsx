import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import EmptyList from "../../../components/Empty/EmptyList";
import SmallModal from "../../../components/Modal/SmallModal";
import getByLocale from "../../../helpers/getByLocale";
import AppLayout from "../../../layouts/AppLayout";
import { getQuestionSubCategories } from "../../../redux/actions/questionAnswerAction";
import AddSubCategory from "./AddSubCategory";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import SubCategory from "./SubCategory";

const CategoryShow = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const categories = useSelector((state) => state.questionAnswer.categories);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState({
    edit: false,
    category: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    delete: false,
    category_id: null,
  });

  const toggleAddModal = () => {
    setAddModal(!addModal);
  };

  const toggleEditModal = (category) => {
    setEditModal({
      edit: !editModal.edit,
      category: !editModal.edit ? category : null,
    });
  };

  const toggleDeleteModal = (category_id) => {
    setDeleteModal({
      delete: !deleteModal.delete,
      category_id: !deleteModal.delete ? category_id : null,
    });
  };

  useEffect(() => {
    dispatch(getQuestionSubCategories(id));
  }, []);

  return (
    <>
      <SmallModal isOpen={addModal} close={toggleAddModal}>
        <AddSubCategory category_id={id} close={toggleAddModal} />
      </SmallModal>

      <SmallModal isOpen={editModal.edit} close={toggleEditModal}>
        <EditCategory category={editModal.category} close={toggleEditModal} />
      </SmallModal>

      <SmallModal isOpen={deleteModal.delete} close={toggleDeleteModal}>
        <DeleteCategory
          category_id={deleteModal.category_id}
          close={toggleDeleteModal}
        />
      </SmallModal>

      <AppLayout>
        <header className="bg-white px-5 py-3 rounded-lg flex items-center justify-between">
          <aside className="flex items-center">
            <button
              onClick={() => history.goBack()}
              className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
            >
              <IoArrowUndoOutline size={24} />
            </button>
            <div className="flex flex-col ml-4">
              <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                {categories && categories.title
                  ? getByLocale(categories.title)
                  : t("question_answer")}
              </h1>
              <small>
                {t("total")}:{categories && categories.length}
              </small>
            </div>
          </aside>

          <button
            onClick={() => toggleAddModal()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {t("add")}
          </button>
        </header>

        {categories && categories.length === 0 && (
          <EmptyList message={t("empty_list")} />
        )}

        {categories && categories.length > 0 && (
          <main className="my-5">
            {categories.map((category, index) => {
              return (
                <SubCategory
                  key={index}
                  category={category}
                  toggleEditModal={toggleEditModal}
                  toggleDeleteModal={toggleDeleteModal}
                />
              );
            })}
          </main>
        )}
      </AppLayout>
    </>
  );
};

export default CategoryShow;
