import AppLayout from "../../layouts/AppLayout";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  // const user = JSON.parse(Cookie.get("user"));
  const user = useSelector((state) => state.user.user);
  // console.log(user)

  useEffect(() => {
    // console.log(user);
  }, []);

  return (
    <AppLayout>
      <section className="font-montserrat-medium">
        {user && (
          <main className="grid grid-cols-12 gap-5">
            <section className="bg-white shadow rounded-lg col-span-12 xl:col-span-6 p-5">
              <h1 className="text-xl uppercase p-3 text-green-600 font-montserrat-bold">
                Maglumat
              </h1>
              <div className="flex text-gray-500 p-3 border-b">
                At:
                <p className="text-gray-900 mx-2"> {user.firstname} </p>
              </div>

              <div className="flex text-gray-500 p-3 border-b">
                Familiýa:
                <p className="text-gray-900 mx-2"> {user.lastname} </p>
              </div>

              <div className="flex text-gray-500 p-3 border-b">
                Elektron poçta:
                <p className="text-gray-900 mx-2"> {user.email} </p>
              </div>

              <div className="flex text-gray-500 p-3 border-b">
                Wezipe:
                <p className="text-gray-900 mx-2"> {user.role} </p>
              </div>

              <div className="flex text-gray-500 p-3">
                Hasaba alynan sene:
                <p className="text-gray-900 mx-2"> {user.created_at} </p>
              </div>
            </section>

            <section className="bg-white shadow rounded-lg col-span-12 xl:col-span-6 p-5">
              <h1 className="text-xl uppercase p-3 text-green-600 font-montserrat-bold">
                Açarsöz
              </h1>

              <form className="flex flex-col mt-3">
                <input
                  type="text"
                  className="border px-5 py-2 mb-4 rounded-md"
                  placeholder="Köne açarsöz"
                />

                <input
                  type="text"
                  className="border px-5 py-2 mb-4 rounded-md"
                  placeholder="Täze açarsöz"
                />

                <input
                  type="text"
                  className="border px-5 py-2 mb-4 rounded-md"
                  placeholder="Täze açarsözi gaýtalaň"
                />

                <button className="bg-green-600 text-white px-5 py-2 w-48 rounded-md mt-2">
                  Üýtget
                </button>
              </form>
            </section>
          </main>
        )}
      </section>
    </AppLayout>
  );
};

export default Profile;
