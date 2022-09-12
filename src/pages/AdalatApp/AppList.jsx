import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import EmptyList from "../../components/Empty/EmptyList";
import AppLayout from "../../layouts/AppLayout";
import { getAppList } from "../../redux/actions/appAction";

const AppList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const app_list = useSelector((state) => state.adalatApp.app_list);

  useEffect(() => {
    dispatch(getAppList());
  }, [dispatch]);

  return (
    <AppLayout>
      <header className="bg-white px-5 py-3 rounded-lg flex items-center justify-between w-full">
        <div>
          <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
            EMTP
          </h1>
          <small>
            {t("total")}: {app_list.length}
          </small>
        </div>
        <NavLink
          to="/app/upload"
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          {t("upload")}
        </NavLink>
      </header>

      {app_list.length === 0 && <EmptyList message={t("empty_list")} />}

      <main className="bg-white p-5 my-5 rounded-lg">
        {app_list.length > 0 && (
          <table className="w-full">
            <thead className="text-left bg-gray-100">
              <tr>
                <th className="px-3 py-2 rounded-tl-lg rounded-bl-lg">ID</th>
                <th className="px-3 py-2">Faýl ady</th>
                <th className="px-3 py-2">Müşderi</th>
                <th className="px-3 py-2 rounded-tr-lg rounded-br-lg">
                  Möhleti
                </th>
              </tr>
            </thead>
            <tbody>
              {app_list.map((app, index) => {
                return (
                  <tr key={index}>
                    <td className="px-3 py-2 border-b border-gray-100">
                      {app.id}
                    </td>
                    <td className="px-3 py-2 border-b border-gray-100">
                      {app.filename}
                    </td>
                    <td className="px-3 py-2 border-b border-gray-100">
                      {app.client &&
                        app.client.firstname + " " + app.client.lastname}
                    </td>
                    <td className="px-3 py-2 border-b border-gray-100">
                      {app.expires_at}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </AppLayout>
  );
};

export default AppList;
