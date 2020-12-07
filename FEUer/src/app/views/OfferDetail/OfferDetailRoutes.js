import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import OfferDetail from "./OfferDetail";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const AssetTable = EgretLoadable({
  //loader: () => import("./BsTableExample")
  loader: () => import("./OfferDetail")
  //loader: () => import("./AdazzleTable")
  //loader: () => import("./React15TabulatorSample")
});
const ViewComponent = withTranslation()(OfferDetail);

const OfferDetailRoutes = [
  {
    path: ConstantList.ROOT_PATH + "offer/detail/:offerId",
    exact: true,
    component: ViewComponent
  }
];

export default OfferDetailRoutes;
