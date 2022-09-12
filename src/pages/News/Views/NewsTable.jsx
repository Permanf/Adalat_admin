import { IoTimeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import cutText from "../../helpers/cutText";
import getByLocale from "../../helpers/getByLocale";

const NewsTable = ({ news }) => {
  const locale = localStorage.getItem("locale");

  return (
    <NavLink
      to={`news/${news.id}`}
      className="bg-gray-50 flex items-center shadow-gray-md col-span-12 duration-500 p-3 hover:bg-green-500 group rounded-xl overflow-hidden"
    >
      <img
        className="h-16 lg:object-cover rounded-xl bg-gray-100 border"
        src={news.image_mini}
        alt={getByLocale(news.title)}
      />
      <div className="px-5">
        <small className="flex items-center text-xs lg:text-base text-gray-400 group-hover:text-white">
          <IoTimeOutline className="mr-2" /> {news.created_at}
        </small>
        <h1 className="text-sm lg:text-lg font-montserrat-bold group-hover:text-white">
          {cutText(getByLocale(news.title), 0, 100)}
        </h1>
      </div>
    </NavLink>
  );
};

export default NewsTable;
