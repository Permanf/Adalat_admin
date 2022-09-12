import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SmallModal from "../../../components/Modal/SmallModal";
import AppLayout from "../../../layouts/AppLayout";
import { getSmsTemplates } from "../../../redux/actions/smsAction";
import SmsTemplateEditModal from "./SmsTemplateEditModal";

const SmsTemplates = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const sms_templates = useSelector((state) => state.sms.sms_templates);
  const [editTemplate, setEditTemplate] = useState({
    id: null,
    text: null,
    show: false,
  });

  const editTemplateModal = (id, text, show) => {
    setEditTemplate({
      id,
      text,
      show: show ?? editTemplate.show,
    });
  };

  const closeEditModal = () => {
    setEditTemplate({
      id: null,
      text: null,
      show: false,
    });
  };

  useEffect(() => {
    dispatch(getSmsTemplates());
  }, []);

  return (
    <>
      <SmallModal isOpen={editTemplate.show}>
        <SmsTemplateEditModal
          id={editTemplate.id}
          template={editTemplate.text}
          close={closeEditModal}
        />
      </SmallModal>
      <AppLayout>
        <section>
          <header className="bg-white p-3 rounded-lg flex items-center justify-between">
            <aside className="flex items-center">
              <button
                onClick={() => history.goBack()}
                className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full mr-3"
              >
                <IoArrowUndoOutline size={24} />
              </button>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold font-montserrat-bold text-gr mb-2ay-700">
                  {t("sms_center")}
                </h1>
              </div>
            </aside>
          </header>

          <main className="grid grid-cols-12 gap-8 bg-white py-5 px-8 my-3 rounded-lg">
            {sms_templates.length > 0 &&
              sms_templates.map((template, index) => {
                return (
                  <section key={index} className="col-span-12 xl:col-span-6">
                    <h1 className="font-montserrat-bold text-lg mb-2">
                      {t(template.type)}
                      {/* Duzetmeli  */}
                    </h1>
                    <article
                      onClick={() =>
                        editTemplateModal(template.id, template.text, true)
                      }
                      className="w-full border border-gray-100 rounded-lg p-3 h-32 cursor-pointer"
                    >
                      {template.text}
                    </article>
                  </section>
                );
              })}
            {/* <button className="bg-green-600 text-white px-5 py-2.5 rounded-lg w-48">
            {t("save")}
          </button> */}
          </main>
        </section>
      </AppLayout>
    </>
  );
};

export default SmsTemplates;
