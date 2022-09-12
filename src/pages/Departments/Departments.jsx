import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";

import {
  loadDepartments,
  removeDepartment,
} from "../../redux/actions/departmentAction";
import DepartmentCard from "./DepartmentCard";
import AppLayout from "../../layouts/AppLayout";
import EmptyList from "../../components/Empty/EmptyList";
import { IoAddCircleOutline } from "react-icons/io5";
import { setLoading } from "../../redux/reducers/mainReducer";
import DepartmentDelete from "./DepartmentDelete";

const Departments = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);
  const departmentTotal = useSelector((state) => state.department.total);
  const lastPage = useSelector((state) => state.department.last_page);
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState([]);

  const closeDeleteModal = () => deleting(false, null);

  const deleting = (confirmation, id) => {
    setDeleteConfirm({ ...deleteConfirm, delete: confirmation, id });
  };

  const departmentDelete = () => {
    dispatch(removeDepartment(deleteConfirm.id));
    setDeleteConfirm({ ...deleteConfirm, delete: false, id: null });
    dispatch(setLoading(true));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(setLoading(true));
    dispatch(loadDepartments(page));
  }, [page]);

  return (
    <>
      {deleteConfirm.delete && (
        <DepartmentDelete
          deleteConfirm={deleteConfirm.delete}
          departmentDelete={departmentDelete}
          close={closeDeleteModal}
        />
      )}
      <AppLayout>
        <aside className="bg-white p-3 rounded-lg flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
              {t("departments")}
            </h1>
            <small className="flex font-montserrat-medium text-sm text-gray-500">
              <p>{t("total")}:</p>
              <p className="ml-2">{departmentTotal}</p>
            </small>
          </div>

          <NavLink
            to="/department/create"
            className="bg-white font-montserrat-medium text-green-600 hover:bg-green-600 hover:text-white duration-300 flex items-center px-4 rounded-md py-2 text-md"
          >
            <IoAddCircleOutline size={24} className="mr-2" /> Täze
          </NavLink>
        </aside>

        {departments && departments.length === 0 && (
          <EmptyList message={t("empty_list")} />
        )}

        <main className="grid grid-cols-12 gap-5 my-7">
          {departments &&
            departments.map((department, index) => {
              return (
                <DepartmentCard
                  key={index}
                  department={department}
                  deleting={deleting}
                />
              );
            })}
        </main>

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

export default Departments;
