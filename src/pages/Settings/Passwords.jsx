import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import EmptyList from "../../components/Empty/EmptyList";
import ReactPaginate from "react-paginate";
import AppLayout from "../../layouts/AppLayout";
import {
  IoArrowUndoOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoKeyOutline,
  IoRepeat,
} from "react-icons/io5";
import { useHistory } from "react-router-dom";
import generatePassword from "../../helpers/generatePassword";
import SmallModal from "../../components/Modal/SmallModal";
import { getPasswords, postPassword } from "../../redux/actions/passwordAction";
import { setLoading } from "../../redux/reducers/mainReducer";

const Passwords = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const passwords = useSelector((state) => state.password.passwords);
  const total = useSelector((state) => state.password.total);
  const lastPage = useSelector((state) => state.password.last_page);
  const [page, setPage] = useState(1);
  const [password, setPassword] = useState(generatePassword(8));
  const [newPasswordForm, setNewPasswordForm] = useState({ show: false });

  const newPassword = () => {
    setPassword(generatePassword(8));
  };

  const showNewPasswordForm = () => {
    setNewPasswordForm({ newPasswordForm, show: true });
  };
  const hideNewPasswordForm = () => {
    setNewPasswordForm({ newPasswordForm, show: false });
  };

  const savePassword = () => {
    hideNewPasswordForm();
    dispatch(postPassword(password));
    dispatch(setLoading(true));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(getPasswords(page));
  }, [page]);

  return (
    <>
      {newPasswordForm.show && (
        <SmallModal isOpen={newPasswordForm.show}>
          <main className="flex flex-col">
            <label className="my-2" htmlFor="password">
              {t("generated_password")}:
            </label>
            <input
              id="password"
              type="text"
              className="border px-4 py-2 mb-5 rounded-md"
              placeholder="Açarsöz"
              value={password}
            />
            <aside className="flex justify-between mt-4">
              <div>
                <button
                  data-tip="Täze açarsöz"
                  onClick={() => newPassword()}
                  className="border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-500 px-4 py-1.5 mr-2 rounded-md"
                >
                  <IoRepeat size={24} />
                </button>

                <button
                  data-tip="Ýatda sakla"
                  onClick={() => savePassword()}
                  className="border border-green-600 hover:bg-green-600 hover:text-white text-green-500 px-4 py-1.5 ml-2 rounded-md"
                >
                  <IoCheckmarkCircleOutline size={24} />
                </button>
              </div>
              <div>
                <button
                  data-tip="Bes et"
                  onClick={() => hideNewPasswordForm()}
                  className="border border-red-600 hover:bg-red-600 hover:text-white text-red-500 px-4 py-1.5 ml-2 rounded-md"
                >
                  <IoCloseOutline size={24} />
                </button>
              </div>
            </aside>
          </main>
        </SmallModal>
      )}
      <AppLayout>
        <aside className="bg-white px-5 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => history.goBack()}
              className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
            >
              <IoArrowUndoOutline size={24} />
            </button>
            <div className="flex flex-col ml-4">
              <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
                {t("passwords")}
              </h1>
              <small>
                {t("total")}: {total}
              </small>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => showNewPasswordForm()}
              className="bg-green-600 text-white px-3 py-2 mx-1 rounded-md"
            >
              {t("add")}
            </button>
          </div>
        </aside>

        {passwords.length === 0 && <EmptyList message={t("empty_list")} />}

        {passwords.length > 0 && (
          <main>
            {passwords.map((question, index) => {
              return (
                <aside key={index} className="bg-white px-5 py-3 my-2">
                  <div className="flex">
                    <IoKeyOutline size={24} />
                    <p className="mx-2"> {question.password} </p>
                  </div>
                  <small>{question.created_at}</small>
                </aside>
              );
            })}
          </main>
        )}

        {lastPage > 1 && (
          <ReactPaginate
            previousClassName={"hidden"}
            nextClassName={"hidden"}
            breakLabel={"..."}
            breakClassName={
              "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm"
            }
            pageCount={lastPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={(data) => setPage(data.selected + 1)}
            pageLinkClassName={
              "bg-white rounded-xl border-gray-300 hover:text-gray-800 hover:bg-gray-50 md:inline-flex relative items-center m-1 px-4 py-2 border text-sm"
            }
            containerClassName={
              "relative z-0 inline-flex justify-center rounded-md mb-16 w-full"
            }
            activeLinkClassName={
              "bg-green-600 border-green-600 text-white font-montserrat-bold"
            }
          />
        )}
      </AppLayout>
    </>
  );
};

export default Passwords;
