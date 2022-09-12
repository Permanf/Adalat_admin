import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  IoArrowUndoOutline,
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import QRCode from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";
import EmptyList from "../../components/Empty/EmptyList";
import AppLayout from "../../layouts/AppLayout";
import {
  appOrderChangeStatus,
  getAppOrder,
} from "../../redux/actions/appAction";

const AppShow = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const appOrder = useSelector((state) => state.adalatApp.app_order);

  useEffect(() => {
    dispatch(getAppOrder(id));
  }, []);

  const statusChange = (e) => {
    e.preventDefault();

    const obj = {
      id: appOrder.id,
      type: e.target.value,
      text: e.target.selectedOptions[0].text,
    };

    dispatch(appOrderChangeStatus(obj));
  };

  return (
    <AppLayout>
      <aside className="bg-white flex items-center px-5 py-3 rounded-lg">
        <button
          onClick={() => history.goBack()}
          className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
        >
          <IoArrowUndoOutline size={24} />
        </button>
        <h1 className="text-lg font-bold font-montserrat-bold text-gray-700 ml-4">
          Sargyt № {appOrder.id}
        </h1>
      </aside>

      {appOrder && (
        <main className="grid grid-cols-12 gap-5 bg-white p-7 my-5 rounded-md">
          <aside className="col-span-12 xl:col-span-7 rounded-lg">
            <h1 className="font-montserrat-bold text-lg p-2">
              Müşderi maglumatlary
            </h1>
            <table className="w-full">
              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">Ady:</td>
                <td className="py-2 text-gray-900 capitalize border-b ml-3">
                  {appOrder.firstname ?? "näbelli"}
                </td>
              </tr>

              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">
                  Familiýasy:
                </td>
                <td className="py-2 text-gray-900 capitalize border-b ml-3">
                  {appOrder.lastname ?? "näbelli"}
                </td>
              </tr>

              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">
                  Atasynyň ady:
                </td>
                <td className="py-2 text-gray-900 capitalize border-b ml-3">
                  {appOrder.fathername ?? "näbelli"}
                </td>
              </tr>

              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">
                  Milleti:
                </td>
                <td className="py-2 text-gray-900 capitalize border-b ml-3">
                  {appOrder.nationality ?? "näbelli"}
                </td>
              </tr>

              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">
                  Passport belgisi:
                </td>
                <td className="py-2 text-gray-900 border-b ml-3">
                  {appOrder.passport_series ?? "näbelli"}
                </td>
              </tr>

              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">
                  Kim tarapyndan berlen:
                </td>
                <td className="py-2 text-gray-900 border-b ml-3">
                  {appOrder.issued_by ?? "näbelli"}
                </td>
              </tr>

              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">
                  Passport berlen senesi:
                </td>
                <td className="py-2 text-gray-900 border-b ml-3">
                  {appOrder.date_issue ?? "näbelli"}
                </td>
              </tr>

              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">
                  Yazgyda duran salgysy:
                </td>
                <td className="py-2 text-gray-900 border-b ml-3">
                  {appOrder.registration ?? "näbelli"}
                </td>
              </tr>

              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">
                  Email:
                </td>
                <td className="py-2 text-gray-900 border-b ml-3">
                  {appOrder.email ?? "näbelli"}
                </td>
              </tr>

              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">
                  Telefon:
                </td>
                <td className="py-2 text-gray-900 border-b ml-3">
                  {appOrder.phone ?? "näbelli"}
                </td>
              </tr>

              <tr>
                <td className="py-2 text-gray-500 w-72 border-b px-4">
                  Sargyt etmegiň görnüşi:
                </td>
                <td className="py-2 text-gray-900 border-b ml-3">
                  {appOrder.type ?? "näbelli"}
                </td>
              </tr>
            </table>

            <div className="mt-5 p-2">
              <h1 className="font-montserrat-bold text-lg mb-4">
                Müşderi iberen faýllary
              </h1>

              {appOrder.files && appOrder.files.length === 0 && (
                <EmptyList message={t("empty_list")} />
              )}

              {appOrder.files && appOrder.files.length > 0 && (
                <main className="p-2">
                  {appOrder.files.map((file, index) => {
                    return file.link ? (
                      <a
                        href={file.link}
                        key={index}
                        className="border px-4 py-2 flex rounded-lg"
                      >
                        <p> {file.name} </p>
                      </a>
                    ) : (
                      <p className="border px-4 py-2"> {file.name} </p>
                    );
                  })}
                </main>
              )}
            </div>
          </aside>

          <aside className="col-span-12 xl:col-span-5">
            <div className="flex items-start justify-between py-3 mb-5">
              <QRCode
                value={"Adalat ministrlik"}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                includeMargin={false}
                renderAs={"svg"}
                imageSettings={{
                  src: "http://95.85.124.22:8080/static/media/logo.83e382d0.png",
                  x: null,
                  y: null,
                  height: 75,
                  width: 62,
                  excavate: true,
                }}
              />

              <NavLink
                to={`/app/upload/${appOrder.client_id}/${appOrder.id}`}
                className="border border-green-500 text-green-500 hover:text-white hover:bg-green-500 duration-300 rounded-lg px-4 py-2"
              >
                Programma yukle
              </NavLink>
            </div>
            <h1 className="flex items-center pb-3 border-b text-md text-gray-600 font-montserrat-bold mr-3">
              Töleg amaly:
              {appOrder.paid === 1 ? (
                <IoCheckmarkDoneCircleOutline
                  className="ml-3 text-green-600"
                  size={28}
                />
              ) : (
                <IoCloseCircleOutline className="ml-3 text-red-600" size={28} />
              )}
            </h1>

            <div className="flex items-center py-5 border-b">
              <h1 className="text-md text-gray-600 font-montserrat-bold mr-3">
                Sargyt ýagdaýy:
              </h1>

              <select
                onChange={(e) => statusChange(e)}
                className="bg-white text-green-500 border border-green-500 text-sm px-3 py-1 rounded-md"
              >
                <option selected={appOrder.status_code == 1} value="1">
                  garaşylýar
                </option>
                <option selected={appOrder.status_code == 2} value="2">
                  kabul edildi
                </option>
                <option selected={appOrder.status_code == 3} value="3">
                  seljerilýär
                </option>
                <option selected={appOrder.status_code == 4} value="4">
                  gaýtarylýar
                </option>
                <option selected={appOrder.status_code == 5} value="5">
                  tamamlandy
                </option>
              </select>
            </div>

            <h1 className="text-md text-gray-600 font-montserrat-bold mt-5">
              Emjam sany:
              <p className="inline ml-2">
                {appOrder.mac_addresses && appOrder.mac_addresses.length}
              </p>
            </h1>

            {appOrder.mac_addresses && appOrder.mac_addresses.length === 0 && (
              <EmptyList message={t("empty_list")} />
            )}

            {appOrder.mac_addresses &&
              appOrder.mac_addresses.length > 0 &&
              appOrder.mac_addresses.map((mac_address, index) => {
                return (
                  <div key={index} className="border my-2 p-2 rounded-md">
                    {mac_address.mac}
                  </div>
                );
              })}
          </aside>
        </main>
      )}
    </AppLayout>
  );
};

export default AppShow;
