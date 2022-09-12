import { useTranslation } from "react-i18next";
import { IoPersonOutline, IoTrashOutline } from "react-icons/io5";
import ReactHtmlParser from "react-html-parser";

const LawyerCommentCard = ({ comment, deleting }) => {
  const { t } = useTranslation();

  return (
    <article className="col-span-12 lg:col-span-6 bg-white shadow-gray-sm p-5 rounded-lg mb-5">
      <div className="flex items-center">
        <IoPersonOutline size={32} className="text-blue-700 mr-2" />
        <div className="flex flex-col">
          <small className="text-blue-800">
            {comment && comment.client && comment.client.fullname}
          </small>
          <small className="text-blue-500">
            {comment && comment.client && comment.client.email}
          </small>
        </div>
      </div>
      <div className="flex items-end mt-2">
        <p>{ReactHtmlParser(comment.text)}</p>
        <button
          onClick={() => deleting(true, comment.id)}
          className="border border-red-500 hover:bg-red-500 text-red-500 hover:text-white p-1 text-sm duration-300 rounded-md"
        >
          <IoTrashOutline size={20} />
        </button>
      </div>
    </article>
  );
};

export default LawyerCommentCard;
