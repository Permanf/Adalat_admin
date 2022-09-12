import { IoTimeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import cutText from "../../../helpers/cutText";
import getByLocale from "../../../helpers/getByLocale";

const NewsCard = ({ news }) => {
  const locale = localStorage.getItem("locale");
  // console.log(news,"-----dd");

  return (
    <NavLink
      to={`news/${news.id}`}
      className="bg-gray-50 flex lg:flex-col shadow-gray-md col-span-12 md:col-span-6 xl:col-span-4 duration-700 border-b-4 border-white hover:border-green-600 p-3 rounded-xl overflow-hidden"
    >
      <img
        className="w-36 h-24 lg:w-full lg:h-60 lg:object-cover rounded-xl bg-gray-100 border"
        src={news.image_mini}
        alt={getByLocale(news.title)}
      />
      <div className="px-5 lg:py-3">
        <small className="flex items-center text-xs lg:text-base text-gray-400 mb-2">
          <IoTimeOutline className="mr-2" /> {news.created_at}
        </small>
        <h1 className="text-sm lg:text-lg font-montserrat-bold mb-2">
          {cutText(getByLocale(news.title), 0, 100)}
        </h1>
      </div>
    </NavLink>
  );
};

export default NewsCard;
