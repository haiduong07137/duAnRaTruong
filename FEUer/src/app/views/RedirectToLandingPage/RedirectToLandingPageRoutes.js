import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const RedirectToLandingPage = EgretLoadable({
  loader: () => import("./RedirectToLandingPage")
});
const ViewComponent = withTranslation()(RedirectToLandingPage);

const homeLayoutSettings = {
  layout1Settings: {
    mode: "full",
    leftSidebar: { show: false, mode: "closed" },
    topbar: { show: false },
  },
  layout2Settings: {
    mode: "full",
    topbar: { show: false },
    navbar: { show: false },
  },
  perfectScrollbar: false,
  footer: { show: false }
}

const RedirectToLandingPageRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"advpro/redirectToWebsite/:id",
    exact: true,
    settings:homeLayoutSettings,
    
    component: ViewComponent
  },
  {
    path:  ConstantList.ROOT_PATH+"advpro/redirectToWebsite",
    exact: true,
    settings:homeLayoutSettings,
    
    component: ViewComponent
  }
];

export default RedirectToLandingPageRoutes;
