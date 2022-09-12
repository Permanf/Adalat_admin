import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import SmallModal from "../../components/Modal/SmallModal";
import { saveLastUpdated } from "../../redux/actions/lawsAction";
import { setLoading } from "../../redux/reducers/mainReducer";

import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";

import TM_FLAG from "../../assets/images/locales/tm.jpg";
import RU_FLAG from "../../assets/images/locales/ru.jpg";
import EN_FLAG from "../../assets/images/locales/en.jpg";

const LawLastUpdatedAdd = ({ lastUpdateModal, closeLastUpdatedModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [lastUpdated, setLastUpdated] = useState([]);
  const save = () => {
    dispatch(saveLastUpdated(lastUpdated));
    dispatch(setLoading(true));
    closeLastUpdatedModal();
  };

  return (
    <SmallModal isOpen={lastUpdateModal}>
      <main className="container">
        <Tabs
          defaultTab="tm"
          onChange={(tabId) => {
            console.log(tabId);
          }}
        >
          <TabList className="flex gap-5 items-center mb-4">
            <label htmlFor="last_update" className="font-montserrat-bold block">
              {t("last_updated")}
            </label>
            <Tab tabFor="tm">
              <img className="w-10" src={TM_FLAG} alt="TM" />
            </Tab>
            <Tab tabFor="ru">
              <img className="w-10" src={RU_FLAG} alt="RU" />
            </Tab>
            <Tab tabFor="en">
              <img className="w-10" src={EN_FLAG} alt="EN" />
            </Tab>
          </TabList>

          <TabPanel tabId="tm">
            <textarea
              id="last_update"
              type="text"
              onChange={(e) =>
                setLastUpdated({ ...lastUpdated, tm: e.target.value })
              }
              placeholder={t("turkmen")}
              className="border rounded-xl px-4 py-2 block w-full h-40 max-h-96"
            ></textarea>
          </TabPanel>

          <TabPanel tabId="ru">
            <textarea
              id="last_update"
              type="text"
              onChange={(e) =>
                setLastUpdated({ ...lastUpdated, ru: e.target.value })
              }
              placeholder={t("russian")}
              className="border rounded-xl px-4 py-2 block w-full h-40 max-h-96"
            ></textarea>
          </TabPanel>

          <TabPanel tabId="en">
            <textarea
              id="last_update"
              type="text"
              onChange={(e) =>
                setLastUpdated({ ...lastUpdated, en: e.target.value })
              }
              placeholder={t("english")}
              className="border rounded-xl px-4 py-2 block w-full h-40 max-h-96"
            ></textarea>
          </TabPanel>
        </Tabs>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => save()}
            className="bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            {t("save")}
          </button>
          <button
            onClick={() => closeLastUpdatedModal()}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl"
          >
            {t("cancel")}
          </button>
        </div>
      </main>
    </SmallModal>
  );
};

export default LawLastUpdatedAdd;
