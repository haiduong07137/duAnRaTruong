import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const OfferAgency = EgretLoadable({
  loader: () => import("./OfferAgency")
});
const ViewComponent = withTranslation()(OfferAgency);
const OfferAgencyRoutes = [
  {
    path: ConstantList.ROOT_PATH+"offerAgency",
    exact: true,
    component: ViewComponent
  },
  {
    path: ConstantList.ROOT_PATH + "offerAgency/:agencyId",
    exact: true,
    component: ViewComponent
  }
];

export default OfferAgencyRoutes;
