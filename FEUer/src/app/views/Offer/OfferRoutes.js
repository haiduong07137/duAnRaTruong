import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import Offers from "./Offers";
import MyOffers from "./MyOffers";
import OfferDetail from '../OfferDetail/OfferDetail'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const AssetTable = EgretLoadable({
  //loader: () => import("./BsTableExample")
  loader: () => import("./Offers")
  //loader: () => import("./AdazzleTable")
  //loader: () => import("./React15TabulatorSample")
});
const OffersComponent = withTranslation()(Offers);
const MyOffersComponent = withTranslation()(MyOffers);
const OfferDetailComponent = withTranslation()(OfferDetail);
const OfferRoutes = [
  {
    path: ConstantList.ROOT_PATH + "offers/list",
    exact: true,
    component: OffersComponent
  },
  {
    path: ConstantList.ROOT_PATH + "offers/my-list",
    exact: true,
    component: MyOffersComponent
  },
  {
    path: ConstantList.ROOT_PATH + "offers/list/:offerId",
    exact: true,
    component: OfferDetailComponent
  },{
    path: ConstantList.ROOT_PATH + "offers/my-list/:offerId",
    exact: true,
    component: OfferDetailComponent
  },
];

export default OfferRoutes;
