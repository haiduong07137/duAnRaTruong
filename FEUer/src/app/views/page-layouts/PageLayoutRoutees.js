import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation } from "react-i18next";
const LeftSidebarLayout = EgretLoadable({
  loader: () => import("./LeftSidebarCard")
});

const UserProfile = EgretLoadable({
  loader: () => import("./UserProfile")
});

const ViewUserProfile = withTranslation()(UserProfile)

const pageLayoutRoutes = [
  {
    path: ConstantList.ROOT_PATH + "page-layouts/Left-sidebar-card",
    component: LeftSidebarLayout
  },
  {
    path: ConstantList.ROOT_PATH + "page-layouts/user-profile",
    component: ViewUserProfile
  }
];

export default pageLayoutRoutes;
