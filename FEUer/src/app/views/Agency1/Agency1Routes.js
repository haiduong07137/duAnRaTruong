import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const  Agency = EgretLoadable({
  loader: () => import("./Agency")
});
const OfferAgency = EgretLoadable({
  loader: () => import("../OfferAgency/OfferAgency")
});
const OfferPrivateAgency = EgretLoadable({
  loader: () => import("../PrivateOfferAgency/PrivateOfferAgency")
});
const Lead = EgretLoadable({
  loader: () => import("../Lead/Lead")
});
const ViewComponent = withTranslation()(Agency);
const OfferAgencyComponent = withTranslation()(OfferAgency);
const OfferPrivateAgencyComponent = withTranslation()(OfferPrivateAgency);
const LeadComponent = withTranslation()(Lead);

const OfferAgencyRoutes = [
  {
    path: ConstantList.ROOT_PATH+"agency",
    exact: true,
    component: ViewComponent
  }, 
  {
    path: ConstantList.ROOT_PATH+"agency/offer",
    exact: true,
    component: OfferAgencyComponent
  },
  {
    path: ConstantList.ROOT_PATH+"agency/my-offer",
    exact: true,
    component: OfferPrivateAgencyComponent
  }, 
  {
    path: ConstantList.ROOT_PATH+"agency/my-offer/lead/:id",
    exact: true,
    component: LeadComponent
  },
];

export default OfferAgencyRoutes;
