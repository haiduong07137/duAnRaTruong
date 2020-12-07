import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Lead = EgretLoadable({
  loader: () => import("./Lead")
});
const ViewComponent = withTranslation()(Lead);
const LeadRoutes = [
  {
    path: ConstantList.ROOT_PATH+"lead",
    exact: true,
    component: ViewComponent
  }, 
];

export default LeadRoutes;
