import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const PrivateOfferAgency = EgretLoadable({
  loader: () => import("./PrivateOfferAgency")
});
const ViewComponent = withTranslation()(PrivateOfferAgency);
const PrivateOfferAgencyRoutes = [
  {
    path: ConstantList.ROOT_PATH+"offerPrivateAgency",
    exact: true,
    component: ViewComponent
  }
];

export default PrivateOfferAgencyRoutes;
