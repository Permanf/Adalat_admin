import { useTranslation } from "react-i18next";
import AppLayout from "../../layouts/AppLayout";

const Settings = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <h1> Databases </h1>
    </AppLayout>
  );
};

export default Settings;
