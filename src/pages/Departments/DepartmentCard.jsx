import { useTranslation } from "react-i18next";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import cutText from "../../helpers/cutText";
import getByLocale from "../../helpers/getByLocale";

const DepartmentCard = ({ department, deleting }) => {
  const { t } = useTranslation();
  const locale = localStorage.getItem("locale");

  return (
    <aside className="col-span-12 xl:col-span-6 bg-white transform lg:hover:scale-95 duration-500 shadow-gray rounded-xl w-full p-2 lg:p-5 mb-5">
      <NavLink
        to="/"
        // to={`department/${department.id}`}
      >
        <div className="flex flex-col items-start w-full">
          <img
            className="w-full rounded-xl p-2"
            src={department.image_mini}
            alt={getByLocale(department.title)}
          />
          <div className="w-full ml-5">
            <h1 className="font-montserrat-bold text-xl text-green-600 mt-5 lg:mt-0">
              {cutText(getByLocale(department.title), 0, 60)}
            </h1>

            <table className="min-w-full divide-y divide-gray-200 mt-4">
              <tr>
                <td className="w-28 text-xs py-2"> Salgysy: </td>
                <td className="text-xs py-2"> {department.address} </td>
              </tr>
              <tr>
                <td className="w-28 text-xs py-2"> Email: </td>
                <td className="text-xs py-2"> {department.email} </td>
              </tr>
              <tr>
                <td className="w-28 text-xs py-2"> Telefon: </td>
                <td className="text-xs py-2"> {department.phone} </td>
              </tr>
              {/* <tr>
                                <td className="w-28 text-xs py-2"> Başlygy: </td>
                                <td className="text-xs py-2"> { department.boss } </td>
                            </tr>
                            <tr>
                                <td className="w-28 text-xs py-2"> Orunbasary: </td>
                                <td className="text-xs py-2"> { department.deputy_head } </td>
                            </tr> */}
              <tr>
                <td className="w-28 text-xs py-2"> Welaýat(şäher): </td>
                <td className="text-xs py-2">
                  {getByLocale(department.province.name)}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </NavLink>

      <div className="flex items-center absolute bottom-2 right-2">
        <NavLink
          to={`/department/${department.id}/edit`}
          className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white duration-300 rounded-lg text-sm px-2 py-1 mr-2"
        >
          <IoPencilOutline size={20} />
        </NavLink>

        <button
          onClick={() => deleting(true, department.id)}
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 rounded-lg text-sm px-2 py-1"
        >
          <IoTrashOutline size={20} />
        </button>
      </div>
    </aside>
  );
};

export default DepartmentCard;
