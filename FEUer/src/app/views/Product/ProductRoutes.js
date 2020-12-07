import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Product = EgretLoadable({
  loader: () => import("./Product")
});
const ViewComponent = withTranslation()(Product);
const productRoutes = [
  {
    path: ConstantList.ROOT_PATH+"product",
    exact: true,
    component: ViewComponent
  }
];

export default productRoutes;
