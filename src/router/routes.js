import React from "react";
import { Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import WebsiteStatistics from "../pages/WebisteStatistics/WebsiteStatistics";

// Pages
const Home = React.lazy(() => import("../pages/Home/Home"));
const Icons = React.lazy(() => import("../pages/Icons/Icons"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Clients = React.lazy(() => import("../pages/Clients/Clients"));
const ClientEdit = React.lazy(() => import("../pages/Clients/ClientEdit"));
const News = React.lazy(() => import("../pages/News/News"));
const NewsCreate = React.lazy(() => import("../pages/News/NewsCreate"));
const NewsEdit = React.lazy(() => import("../pages/News/NewsEdit"));
const NewsShow = React.lazy(() => import("../pages/News/NewsShow"));
const Services = React.lazy(() => import("../pages/Services/Services"));
const ServiceCreate = React.lazy(() =>
  import("../pages/Services/ServiceCreate")
);
const ServiceEdit = React.lazy(() => import("../pages/Services/ServiceEdit"));
const ServiceShow = React.lazy(() => import("../pages/Services/ServiceShow"));
const Profile = React.lazy(() => import("../pages/Auth/Profile"));
const Statistics = React.lazy(() => import("../pages/Statistics/Statistics"));
const Departments = React.lazy(() =>
  import("../pages/Departments/Departments")
);
const DepartmentCreate = React.lazy(() =>
  import("../pages/Departments/DepartmentCreate")
);
const DepartmentEdit = React.lazy(() =>
  import("../pages/Departments/DepartmentEdit")
);
const DepartmentShow = React.lazy(() =>
  import("../pages/Departments/DepartmentShow")
);
const AdalatDeparts = React.lazy(() =>
  import("../pages/AdalatDepartments/Depart")
);
const AdalatDepartsAdd = React.lazy(() =>
  import("../pages/AdalatDepartments/DepartAdd")
);
const AdalatDepartsShow = React.lazy(() =>
  import("../pages/AdalatDepartments/DepartShow")
);
const AdalatDepartsEdit = React.lazy(() =>
  import("../pages/AdalatDepartments/DepartEdit")
);

const Laws = React.lazy(() => import("../pages/Laws/Laws"));
const LawAdd = React.lazy(() => import("../pages/Laws/LawAdd"));
const LawShow = React.lazy(() => import("../pages/Laws/LawShow"));
const LawFileShow = React.lazy(() => import("../pages/Laws/LawFileShow"));
const LawEdit = React.lazy(() => import("../pages/Laws/LawEdit"));
const LawEditText = React.lazy(() => import("../pages/Laws/LawEditText"));
const LawFiles = React.lazy(() => import("../pages/Laws/LawFiles"));
const Lawyers = React.lazy(() => import("../pages/Lawyers/Lawyers"));
const LawyerAdd = React.lazy(() => import("../pages/Lawyers/LawyerAdd"));
const LawyerEdit = React.lazy(() => import("../pages/Lawyers/LawyerEdit"));
const LawyerComments = React.lazy(() =>
  import("../pages/Lawyers/LawyerComments")
);
const Sites = React.lazy(() => import("../pages/Sites/Sites"));
const SiteAdd = React.lazy(() => import("../pages/Sites/SiteAdd"));
const Events = React.lazy(() => import("../pages/Posts/Events"));
const Posts = React.lazy(() => import("../pages/Posts/Posts"));
const PostCreate = React.lazy(() => import("../pages/Posts/PostCreate"));
const PostEdit = React.lazy(() => import("../pages/Posts/PostEdit"));
const PostShow = React.lazy(() => import("../pages/Posts/PostShow"));
const Banners = React.lazy(() => import("../pages/Banners/Banners"));
const BannerAdd = React.lazy(() => import("../pages/Banners/BannerAdd"));
const Subscribers = React.lazy(() =>
  import("../pages/Subscribers/Subscribers")
);
const Questions = React.lazy(() => import("../pages/Question/Questions"));
const QuestionShow = React.lazy(() => import("../pages/Question/QuestionShow"));
const About = React.lazy(() => import("../pages/Settings/About"));
const Settings = React.lazy(() => import("../pages/Settings/Settings"));
const Support = React.lazy(() => import("../pages/Settings/Support/Support"));
const SupportShow = React.lazy(() =>
  import("../pages/Settings/Support/SupportShow")
);
const Passwords = React.lazy(() => import("../pages/Settings/Passwords"));
const Archives = React.lazy(() => import("../pages/Settings/Archives"));
const Provinces = React.lazy(() => import("../pages/Settings/Provinces"));
const Databases = React.lazy(() => import("../pages/Settings/Databases"));
const SmsCenter = React.lazy(() => import("../pages/Settings/SMS/SmsCenter"));
const SmsTemplates = React.lazy(() =>
  import("../pages/Settings/SMS/SmsTemplates")
);
const AdalatApp = React.lazy(() => import("../pages/AdalatApp/App"));
const AdalatAppShow = React.lazy(() => import("../pages/AdalatApp/AppShow"));
const AppList = React.lazy(() => import("../pages/AdalatApp/AppList"));
const AppUpload = React.lazy(() => import("../pages/AdalatApp/AppUpload"));
const Payments = React.lazy(() => import("../pages/Payments/Payments"));
const ServiceCategories = React.lazy(() =>
  import("../pages/Services/ServiceCategory")
);
const ServiceCategoriesShow = React.lazy(() =>
  import("../pages/Services/ServiceCategoryShow")
);
const QuestionAnswer = React.lazy(() =>
  import("../pages/QuestionAnswer/QuestionAnswer")
);
const QuestionAnswerCategoryShow = React.lazy(() =>
  import("../pages/QuestionAnswer/Category/CategoryShow")
);
const QuestionAnswerSubCategoryShow = React.lazy(() =>
  import("../pages/QuestionAnswer/Category/SubCategoryShow")
);
const QuestionAnswerSubCategoryAdd = React.lazy(() =>
  import("../pages/QuestionAnswer/Category/SubCategoryAdd")
);
const LegalAid = React.lazy(() => import("../pages/LegalAid/LegalAid"));
const AddLegalAid = React.lazy(() => import("../pages/LegalAid/AddLegalAid"));
const EditLegalAid = React.lazy(() => import("../pages/LegalAid/EditLegalAid"));
const ShowLegalAid = React.lazy(() => import("../pages/LegalAid/ShowLegalAid"));

const LiteratureShow = React.lazy(() =>
  import("../pages/Literatures/LiteratureShow")
);
const LiteratureAdd = React.lazy(() =>
  import("../pages/Literatures/LiteratureAdd")
);
const LiteratureEdit = React.lazy(() =>
  import("../pages/Literatures/LiteratureEdit")
);

const LegalActs = React.lazy(() => import("../pages/LegalActs/LegalActs"));
const LegalActsAdd = React.lazy(() =>
  import("../pages/LegalActs/LegalActsAdd")
);
const LegalActsShow = React.lazy(() =>
  import("../pages/LegalActs/LegalActsShow")
);
const LegalActsEdit = React.lazy(() =>
  import("../pages/LegalActs/LegalActsEdit")
);

const NotFound = React.lazy(() => import("../pages/404/NotFound"));

const SubCategoryFileShow = React.lazy(() =>
  import("../pages/QuestionAnswer/File/SubCategoryFileShow")
);
const SubCategoryFileEdit = React.lazy(() =>
  import("../pages/QuestionAnswer/File/SubCategoryFileEdit")
);

///////Kanuncylyk
const Legislation = React.lazy(() =>
  import("../pages/Legislation/Legislation")
);
const LegislationAdd = React.lazy(() =>
  import("../pages/Legislation/LegislationAdd")
);
const LegislationEdit = React.lazy(() =>
  import("../pages/Legislation/LegislationEdit")
);
const LegislationShow = React.lazy(() =>
  import("../pages/Legislation/LegislationShow")
);
const LegislationFiles = React.lazy(() =>
  import("../pages/Legislation/Files/LegislationFiles")
);
const LegislationFilesAdd = React.lazy(() =>
  import("../pages/Legislation/Files/LegislationFilesAdd")
);
const LegislationFilesEdit = React.lazy(() =>
  import("../pages/Legislation/Files/LegislationFilesEdit")
);
const LegislationFilesShow = React.lazy(() =>
  import("../pages/Legislation/Files/LegislationFilesShow")
);

///////Maslahat
const Receptions = React.lazy(() => import("../pages/Receptions/Receptions"));
const ReceptionAdd = React.lazy(() =>
  import("../pages/Receptions/ReceptionAdd")
);
const ReceptionShow = React.lazy(() =>
  import("../pages/Receptions/ReceptionShow")
);
const ReceptionEdit = React.lazy(() =>
  import("../pages/Receptions/ReceptionEdit")
);

const Routes = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />

        <Route exact path="/login" render={() => <Login />} />

        <PrivateRoute exact path="/profile" component={Profile} />
        {/* namalar */}
        <PrivateRoute exact path="/legalActs" component={LegalActs} />
        <PrivateRoute exact path="/legalActs/add" component={LegalActsAdd} />
        <PrivateRoute exact path="/legalActs/:id" component={LegalActsShow} />
        <PrivateRoute
          exact
          path="/legalActs/edit/:id"
          component={LegalActsEdit}
        />
        {/*  */}
        <PrivateRoute exact path="/news" component={News} />

        <PrivateRoute exact path="/news/create" component={NewsCreate} />

        <PrivateRoute exact path="/news/:id" component={NewsShow} />

        <PrivateRoute exact path="/news/:id/edit" component={NewsEdit} />

        <PrivateRoute exact path="/events" component={Events} />

        <PrivateRoute exact path="/posts" component={Posts} />

        <PrivateRoute exact path="/post/create" component={PostCreate} />

        <PrivateRoute exact path="/post/:id" component={PostShow} />

        <PrivateRoute exact path="/post/:id/edit" component={PostEdit} />

        <PrivateRoute exact path="/services" component={Services} />

        <PrivateRoute exact path="/service/create" component={ServiceCreate} />

        <PrivateRoute exact path="/service/:id" component={ServiceShow} />

        <PrivateRoute exact path="/service/:id/edit" component={ServiceEdit} />

        <PrivateRoute exact path="/questions" component={Questions} />

        <PrivateRoute exact path="/question/:id" component={QuestionShow} />

        <PrivateRoute exact path="/clients" component={Clients} />

        <PrivateRoute exact path="/client/:id/edit" component={ClientEdit} />

        <PrivateRoute exact path="/subscribers" component={Subscribers} />

        <PrivateRoute exact path="/statistics" component={Statistics} />

        <PrivateRoute exact path="/departments" component={Departments} />

        <PrivateRoute
          exact
          path="/department/create"
          component={DepartmentCreate}
        />

        <PrivateRoute exact path="/department/:id" component={DepartmentShow} />

        <PrivateRoute
          exact
          path="/department/:id/edit"
          component={DepartmentEdit}
        />
        {/* adalat edaralary */}
        <PrivateRoute
          exact
          path="/adalat-edaralary"
          component={AdalatDeparts}
        />
        <PrivateRoute
          exact
          path="/adalat-edaralary/add"
          component={AdalatDepartsAdd}
        />
        <PrivateRoute
          exact
          path="/adalat-edaralary/:id"
          component={AdalatDepartsShow}
        />
        <PrivateRoute
          exact
          path="/adalat-edaralary/edit/:id"
          component={AdalatDepartsEdit}
        />
        {/* end */}

        <PrivateRoute exact path="/laws" component={Laws} />

        <PrivateRoute exact path="/law/:id" component={LawShow} />

        <PrivateRoute exact path="/law/category/:id/add" component={LawAdd} />

        <PrivateRoute exact path="/law/file/:id" component={LawFileShow} />

        <PrivateRoute exact path="/law/file/:id/edit" component={LawEdit} />

        <PrivateRoute
          exact
          path="/law/file/:id/edit_text"
          component={LawEditText}
        />

        <PrivateRoute exact path="/lawfile/:id/files" component={LawFiles} />

        {/*  */}
        <PrivateRoute exact path="/literature/add" component={LiteratureAdd} />
        <PrivateRoute
          exact
          path="/literature/edit/:id"
          component={LiteratureEdit}
        />
        <PrivateRoute exact path="/literature/:id" component={LiteratureShow} />
        {/*  */}

        <PrivateRoute exact path="/lawyers" component={Lawyers} />

        <PrivateRoute exact path="/lawyer/add" component={LawyerAdd} />

        <PrivateRoute exact path="/lawyer/:id/edit" component={LawyerEdit} />

        <PrivateRoute
          exact
          path="/lawyer/:id/comments"
          component={LawyerComments}
        />

        <PrivateRoute exact path="/sites" component={Sites} />

        <PrivateRoute exact path="/site/add" component={SiteAdd} />

        <PrivateRoute exact path="/support" component={Support} />

        <PrivateRoute exact path="/support/:id" component={SupportShow} />

        <PrivateRoute exact path="/settings" component={Settings} />

        <PrivateRoute exact path="/passwords" component={Passwords} />

        <PrivateRoute exact path="/archives" component={Archives} />

        <PrivateRoute exact path="/banners" component={Banners} />

        <PrivateRoute exact path="/banner/add" component={BannerAdd} />

        <PrivateRoute exact path="/about" component={About} />

        <PrivateRoute exact path="/provinces" component={Provinces} />

        <PrivateRoute exact path="/databases" component={Databases} />

        <PrivateRoute exact path="/sms_center" component={SmsCenter} />

        <PrivateRoute exact path="/sms_templates" component={SmsTemplates} />

        <PrivateRoute exact path="/adalat_emtp" component={AdalatApp} />

        <PrivateRoute exact path="/adalat_emtp/:id" component={AdalatAppShow} />

        <PrivateRoute exact path="/apps" component={AppList} />

        <PrivateRoute
          exact
          path="/app/upload/:client_id?/:app_order_id?"
          component={AppUpload}
        />

        <PrivateRoute exact path="/payments" component={Payments} />

        <PrivateRoute
          exact
          path="/service_categories"
          component={ServiceCategories}
        />

        <PrivateRoute
          exact
          path="/service_categories/:id"
          component={ServiceCategoriesShow}
        />

        <PrivateRoute
          exact
          path="/question_answer"
          component={QuestionAnswer}
        />

        <PrivateRoute
          exact
          path="/question_answer/category/:id"
          component={QuestionAnswerCategoryShow}
        />

        <PrivateRoute
          exact
          path="/question_answer/subcategory/:id"
          component={QuestionAnswerSubCategoryShow}
        />

        <PrivateRoute
          exact
          path="/question_answer/subcategory/:id/add"
          component={QuestionAnswerSubCategoryAdd}
        />
        {/* my editted question_answer */}
        <PrivateRoute
          exact
          path="/question_answer/subcategory/file/:id"
          component={SubCategoryFileShow}
        />
        <PrivateRoute
          exact
          path="/question_answer/subcategory/file/:id/edit"
          component={SubCategoryFileEdit}
        />
        <PrivateRoute exact path="/legislations" component={Legislation} />
        <PrivateRoute
          exact
          path="/legislations/add"
          component={LegislationAdd}
        />
        <PrivateRoute
          exact
          path="/legislations/:id/edit"
          component={LegislationEdit}
        />
        <PrivateRoute
          exact
          path="/legislations/:id/show"
          component={LegislationShow}
        />
        <PrivateRoute
          exact
          path="/legislation_files"
          component={LegislationFiles}
        />
        <PrivateRoute
          exact
          path="/legislation_files/add"
          component={LegislationFilesAdd}
        />
        <PrivateRoute
          exact
          path="/legislation_files/:id/edit"
          component={LegislationFilesEdit}
        />
        <PrivateRoute
          exact
          path="/legislation_files/:id/show"
          component={LegislationFilesShow}
        />
        <PrivateRoute exact path="/receptions" component={Receptions} />
        <PrivateRoute exact path="/receptions/add" component={ReceptionAdd} />
        <PrivateRoute
          exact
          path="/receptions/:id/edit"
          component={ReceptionEdit}
        />
        <PrivateRoute
          exact
          path="/receptions/:id/show"
          component={ReceptionShow}
        />
        <PrivateRoute
          exact
          path="/statistics_website"
          component={WebsiteStatistics}
        />

        {/* my editted end */}
        <PrivateRoute exact path="/legalaid" component={LegalAid} />

        <PrivateRoute exact path="/legalaid/add" component={AddLegalAid} />

        <PrivateRoute exact path="/legalaid/:id" component={ShowLegalAid} />

        <PrivateRoute
          exact
          path="/legalaid/:id/edit"
          component={EditLegalAid}
        />

        <Route exact path="/icons" render={() => <Icons />} />

        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
