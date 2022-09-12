import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import EmptyList from "../../components/Empty/EmptyList";
import AppLayout from "../../layouts/AppLayout";
import { getLawyerComments } from "../../redux/actions/lawyerAction";
import LawyerCommentCard from "./LawyerCommentCard";

const LawyerComments = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.lawyer.comments);

  useEffect(() => {
    dispatch(getLawyerComments(id));
  }, []);

  return (
    <AppLayout>
      <aside className="bg-white p-3 rounded-lg flex items-center">
        <button
          onClick={() => history.goBack()}
          className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
        >
          <IoArrowUndoOutline size={24} />
        </button>
        <div className="flex flex-col ml-3">
          <h1 className="text-lg font-bold font-montserrat-bold text-gray-700">
            {t("lawyer_comments")}
          </h1>
          <small className="flex font-montserrat-medium text-sm text-gray-500">
            <p>{t("total")}:</p>
            <p className="ml-2">{comments.length}</p>
          </small>
        </div>
      </aside>

      <main className="my-5">
        {comments.length === 0 && <EmptyList message={t("empty_list")} />}

        {comments.length > 0 && (
          <aside className="my-3">
            {comments.map((comment, index) => {
              return <LawyerCommentCard key={index} comment={comment} />;
            })}
          </aside>
        )}
      </main>
    </AppLayout>
  );
};

export default LawyerComments;
