import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppLayout from "../../layouts/AppLayout";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useHistory, useParams } from "react-router-dom";
import api from "../../services/api.service";
import toast from "react-hot-toast";

const ClientEdit = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const [client, setClient] = useState([]);
  const [password, setPassword] = useState([]);

  useEffect(() => {
    api
      .get(`client/${id}/`)
      .then((res) => {
        setClient(res.data.data);
      })
      .catch((err) => {
        toast.error("Maglumatlar ýüklenmedi", { duration: 2000 });
      });
  }, []);

  const saveClient = () => {
    api
      .put(`client/${id}`, client)
      .then((res) => toast.success(t("success_saved"), { duration: 2000 }))
      .catch((err) => console.log(err));
  };

  const savePassword = () => {
    api
      .put(`client/${id}/password`, password)
      .then((res) => {
        toast.success(t("success_saved"), { duration: 2000 });
        setPassword({
          password: "",
          password_confirmation: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AppLayout>
        <header className="bg-white p-3 rounded-lg flex items-center">
          <button
            onClick={() => history.goBack()}
            className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
          >
            <IoArrowUndoOutline size={24} />
          </button>
          <div className="flex flex-col ml-3">
            <h1 className="text-lg font-bold font-montserrat-bold text-gray-700 capitalize">
              {client && client.fullname}
            </h1>
            <small className="flex font-montserrat-medium text-sm text-gray-500">
              Maglumatlary
            </small>
          </div>
        </header>

        <section className="grid grid-cols-12 gap-5 my-5 mx-auto overflow-x-auto">
          <main className="bg-white col-span-12 xl:col-span-8 rounded-lg p-5">
            <h1 className="text-lg font-montserrat-bold mb-5">
              Maglumatlary üýtgetmek
            </h1>
            <aside className="grid grid-cols-12 gap-5 mb-5">
              <div className="col-span-12 xl:col-span-4">
                <label
                  htmlFor="name"
                  className="font-montserrat-bold text-gray-500 mb-2 block"
                >
                  Ady:
                </label>
                <input
                  type="text"
                  placeholder="Ady"
                  value={client.firstname}
                  onChange={(e) =>
                    setClient({ ...client, firstname: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg px-5 py-3 w-full"
                />
              </div>

              <div className="col-span-12 xl:col-span-4">
                <label
                  htmlFor="name"
                  className="font-montserrat-bold text-gray-500 mb-2 block"
                >
                  Familiýasy:
                </label>
                <input
                  type="text"
                  placeholder="Familiýasy"
                  value={client.lastname}
                  onChange={(e) =>
                    setClient({ ...client, lastname: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg px-5 py-3 w-full"
                />
              </div>

              <div className="col-span-12 xl:col-span-4">
                <label
                  htmlFor="name"
                  className="font-montserrat-bold text-gray-500 mb-2 block"
                >
                  Atasynyň ady:
                </label>
                <input
                  type="text"
                  placeholder="Atasynyň ady"
                  value={client.fathername}
                  onChange={(e) =>
                    setClient({ ...client, fathername: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg px-5 py-3 w-full"
                />
              </div>
            </aside>

            <aside className="grid grid-cols-12 gap-5 mb-5">
              <div className="col-span-12 xl:col-span-4">
                <label
                  htmlFor="name"
                  className="font-montserrat-bold text-gray-500 mb-2 block"
                >
                  Email:
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  value={client.email}
                  onChange={(e) =>
                    setClient({ ...client, email: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg px-5 py-3 w-full"
                />
              </div>

              <div className="col-span-12 xl:col-span-4">
                <label
                  htmlFor="name"
                  className="font-montserrat-bold text-gray-500 mb-2 block"
                >
                  Telefon:
                </label>
                <input
                  type="text"
                  placeholder="Telefon"
                  value={client.phone}
                  onChange={(e) =>
                    setClient({ ...client, phone: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg px-5 py-3 w-full"
                />
              </div>

              <div className="col-span-12 xl:col-span-4">
                <label
                  htmlFor="name"
                  className="font-montserrat-bold text-gray-500 mb-2 block"
                >
                  Doglan senesi:
                </label>
                <input
                  type="text"
                  placeholder="Doglan senesi"
                  value={client.born_date}
                  onChange={(e) =>
                    setClient({ ...client, born_date: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg px-5 py-3 w-full"
                />
              </div>
            </aside>

            <aside className="grid grid-cols-12 gap-5 mb-5">
              <div className="col-span-12 xl:col-span-6">
                <label
                  htmlFor="name"
                  className="font-montserrat-bold text-gray-500 mb-2 block"
                >
                  Email tassyklanan:
                </label>
                <select
                  onChange={(e) =>
                    setClient({ ...client, email_verified: e.target.value })
                  }
                  className="bg-white border border-gray-200 rounded-lg px-5 py-3 w-full"
                >
                  <option selected={client.email_confirmed === false} value="0">
                    Ýok
                  </option>
                  <option selected={client.email_confirmed === true} value="1">
                    Hawa
                  </option>
                </select>
              </div>

              <div className="col-span-12 xl:col-span-6">
                <label
                  htmlFor="name"
                  className="font-montserrat-bold text-gray-500 mb-2 block"
                >
                  Telefon tassyklanan:
                </label>
                <select
                  onChange={(e) =>
                    setClient({ ...client, phone_verified: e.target.value })
                  }
                  className="bg-white border border-gray-200 rounded-lg px-5 py-3 w-full"
                >
                  <option selected={client.phone_confirmed == 0} value="0">
                    Ýok
                  </option>
                  <option selected={client.phone_confirmed == 1} value="1">
                    Hawa
                  </option>
                </select>
              </div>
            </aside>

            <button
              onClick={() => saveClient()}
              className="bg-green-500 text-white px-7 py-3 rounded-lg mt-3"
            >
              {t("save")}
            </button>

            <hr className="border-b border-gray-100 xl:my-7 my-4" />

            <h1 className="text-lg font-montserrat-bold mb-5">
              Açarsözüni üýtgetmek
            </h1>

            <aside className="grid grid-cols-12 gap-5 mb-5">
              <div className="col-span-12 xl:col-span-6">
                <label
                  htmlFor="name"
                  className="font-montserrat-bold text-gray-500 mb-2 block"
                >
                  Täze açarsöz:
                </label>
                <input
                  type="password"
                  placeholder="Täze açarsöz"
                  value={password.password}
                  onChange={(e) =>
                    setPassword({ ...password, password: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg px-5 py-3 w-full"
                />
              </div>

              <div className="col-span-12 xl:col-span-6">
                <label
                  htmlFor="name"
                  className="font-montserrat-bold text-gray-500 mb-2 block"
                >
                  Täze açarsöz gaýtalaň:
                </label>
                <input
                  type="password"
                  placeholder="Täze açarsöz gaýtalaň"
                  value={password.password_confirmation}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      password_confirmation: e.target.value,
                    })
                  }
                  className="border border-gray-200 rounded-lg px-5 py-3 w-full"
                />
              </div>
            </aside>

            <button
              onClick={() => savePassword()}
              className="bg-green-500 text-white px-7 py-3 rounded-lg mt-3"
            >
              {t("save")}
            </button>
          </main>

          <aside className="bg-white col-span-12 xl:col-span-4 rounded-lg p-5">
            <h1 className="text-lg font-montserrat-bold mb-2"> Maglumatlar </h1>
            <table className="w-full">
              <tr className="border-b">
                <td className="text-gray-500 w-36 p-2"> Ady: </td>
                <td className="p-2 capitalize"> {client.firstname} </td>
              </tr>

              <tr className="border-b">
                <td className="text-gray-500 w-36 p-2"> Familiyasy: </td>
                <td className="p-2 capitalize"> {client.lastname} </td>
              </tr>

              <tr className="border-b">
                <td className="text-gray-500 w-36 p-2"> Atasynyn ady: </td>
                <td className="p-2 capitalize">
                  {client.fathername ?? "bellenmedik"}
                </td>
              </tr>

              <tr className="border-b">
                <td className="text-gray-500 w-36 p-2"> Doglan senesi: </td>
                <td className="p-2">{client.born_date ?? "bellenmedik"}</td>
              </tr>

              <tr className="border-b">
                <td className="text-gray-500 w-36 p-2 align-top"> Email: </td>
                <td className="p-2">
                  <p>{client.email}</p>
                  <p>
                    {client.email_confirmed ? (
                      <small className="text-green-500">tassyklanan</small>
                    ) : (
                      <small className="text-red-500">tassyklanmadyk</small>
                    )}
                  </p>
                </td>
              </tr>

              <tr className="border-b">
                <td className="text-gray-500 w-36 p-2"> Telefon: </td>
                <td className="p-2">
                  <p>{client.phone}</p>
                  <p>
                    {client.phone_confirmed ? (
                      <small className="text-green-500">tassyklanan</small>
                    ) : (
                      <small className="text-red-500">tassyklanmadyk</small>
                    )}
                  </p>
                </td>
              </tr>
            </table>

            <div className="my-5">
              <h1 className="text-lg font-montserrat-bold mb-2">
                Tassyklamak üçin
              </h1>

              <p className="py-2 text-gray-500">
                SMS kody:
                <strong className="text-gray-800 mx-3">
                  {client.phone_confirm_code}
                </strong>
              </p>
              <p className="py-2 text-gray-500">
                Email kody:
                <strong className="text-gray-800 mx-3">
                  {client.email_confirm_code}
                </strong>
              </p>
            </div>
          </aside>
        </section>
      </AppLayout>
    </>
  );
};

export default ClientEdit;
