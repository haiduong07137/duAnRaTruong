import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Validate = EgretLoadable({
  loader: () => import("./Validate")
});
const ViewComponent = withTranslation()(Validate);
const ValidateRoutes = [
  {
    path: ConstantList.ROOT_PATH+"validate",
    exact: true,
    component: ViewComponent
  }, 
];

export default ValidateRoutes;
