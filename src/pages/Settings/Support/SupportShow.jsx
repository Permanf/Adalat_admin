import AppLayout from "../../../layouts/AppLayout";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useHistory, Link } from "react-router-dom";
import api from "../../../services/api.service";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { IoArrowUndoOutline, IoPaperPlaneOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import ReactHtmlParser from "react-html-parser";
import EmptyList from "../../../components/Empty/EmptyList";

const SupportShow = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams();
  const [contact, setContact] = useState();
  const [text, setText] = useState("");

  useEffect(() => {
    api.get(`contact/${id}`).then((res) => setContact(res.data.data));
  }, [api]);

  const toAnswer = () => {
    try {
      api.post(`contact/${id}/answer`, { text }).then((res) => {
        toast.success("Hatyňyz ugradyldy!", { duration: 2000 });

        setText("");
      });
    } catch (err) {
      toast.error("Näsazlyk hat iberilmedi", { duration: 2000 });

      console.log(err);
    }
  };

  return (
    <AppLayout>
      <aside className="bg-white px-5 py-3 rounded-lg flex items-center">
        <button
          onClick={() => history.goBack()}
          className="flex items-center justify-center bg-gray-100 text-gray-700 w-10 h-10 rounded-full"
        >
          <IoArrowUndoOutline size={24} />
        </button>
        <h1 className="text-lg font-bold font-montserrat-bold text-gray-700 ml-3">
          {t("support")}
        </h1>
      </aside>

      {contact && (
        <section className="grid grid-cols-12 gap-5">
          <main className="col-span-12 xl:col-span-7 bg-white px-5 py-3 rounded-lg my-5">
            <h1 className="font-montserrat-bold text-lg mb-2">
              Müşderi maglumatlary
            </h1>

            <table className="w-full text-gray-600">
              <tr>
                <td className="py-1 text-gray-800 border-b w-64">Ady: </td>
                <td className="py-1 border-b">{contact.firstname}</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-800 border-b w-64">
                  Familiýasy:
                </td>
                <td className="py-1 border-b">{contact.lastname}</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-800 border-b w-64">
                  Atasynyň ady:
                </td>
                <td className="py-1 border-b">{contact.fathername}</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-800 border-b w-64">
                  Welaýat (Şäher):
                </td>
                <td className="py-1 border-b">{contact.city}</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-800 border-b w-64">Etrap: </td>
                <td className="py-1 border-b">{contact.district}</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-800 border-b w-64">Salgysy: </td>
                <td className="py-1 border-b">{contact.address}</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-800 border-b w-64">Email: </td>
                <td className="py-1 border-b">{contact.email}</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-800 w-64 border-b">Telefon: </td>
                <td className="py-1 border-b">{contact.phone}</td>
              </tr>
              <tr>
                <td className="py-1 text-gray-800 w-64 border-b"> Ýazgysy: </td>
                <td className="py-1  border-b"></td>
              </tr>
              v
            </table>
            <p className="text-gray-600 break-all py-2">
              {ReactHtmlParser(contact.text)}
            </p>

            <aside className="mt-2">
              <h1 className="font-montserrat-bold text-lg mb-4">
                Müşderi iberen faýllary
              </h1>

              {contact.files.length === 0 && (
                <EmptyList message={t("empty_list")} />
              )}

              {contact.files.length > 0 &&
                contact.files.map((file, index) => {
                  return file.link ? (
                    <a
                      href={file.link}
                      key={index}
                      className="border px-4 py-2 flex"
                    >
                      <p> {file.name} </p>
                    </a>
                  ) : (
                    <p className="border px-4 py-2"> {file.name} </p>
                  );
                })}
            </aside>

            <aside className="mt-4">
              <h1 className="font-montserrat-bold text-lg">
                Müşderä ýazylan hatlar
              </h1>

              {contact.histories && contact.histories.length === 0 && (
                <EmptyList message={t("empty_list")} />
              )}

              {contact.histories &&
                contact.histories.length > 0 &&
                contact.histories.map((contact_history, index) => {
                  return (
                    <main key={index} className="border p-3 rounded-md mb-5">
                      <aside className="flex justify-between items-center">
                        <div className="flex">
                          <small className="font-bold block capitalize mr-2">
                            {contact_history.admin.lastname}
                          </small>

                          <small className="font-bold block capitalize">
                            {contact_history.admin.firstname}
                          </small>
                        </div>
                        <div>
                          <small className="text-blue-600">
                            {contact_history.created_at}
                          </small>
                        </div>
                      </aside>

                      <p className="my-3 text-gray-800">
                        {ReactHtmlParser(contact_history.message)}
                      </p>
                    </main>
                  );
                })}
            </aside>
          </main>

          <aside className="col-span-12 xl:col-span-5 bg-white px-5 py-3 rounded-lg my-5">
            <h1 className="font-montserrat-bold text-lg mb-1">Jogap bermek</h1>
            <p className="text-green-700 mb-2"> Email: {contact.email} </p>

            <CKEditor
              editor={DecoupledEditor}
              onReady={(editor) => {
                editor.ui
                  .getEditableElement()
                  .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                  );
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "500px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            />
            <div className="w-full text-center mt-3">
              <button
                disabled={text.length === 0}
                onClick={() => toAnswer()}
                className={`bg-green-600 text-white px-10 py-2 rounded-md ${
                  text.length === 0 ? "opacity-50" : "opacity-100"
                }`}
              >
                <IoPaperPlaneOutline size={24} />
              </button>
            </div>
          </aside>
        </section>
      )}
    </AppLayout>
  );
};

export default SupportShow;
